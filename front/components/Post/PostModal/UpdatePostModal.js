import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../../../hooks/input';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_CANCEL_POST_MODAL_OPEN } from '../../../reducers/modal';
import { LOAD_IMAGE, UPDATE_POST_REQUEST } from '../../../reducers/post';
import UploadImageForm from './UploadImageForm';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  @media (min-width: 765px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UpdatePostForm = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 90%;
  padding: 20px;

  @keyframes updateModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes updateModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.updatePostModalSlideUp
      ? 'updateModalSlideUp'
      : 'updateModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  @media (min-width: 765px) {
    width: 500px;
    height: 60%;
  }
`;
const WritePostHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  & > :first-child {
    position: absolute;
    left: 10px;
    font-size: 23px;
    cursor: pointer;
  }
  span {
    font-size: 17px;
  }
  & > :last-child {
    position: absolute;
    right: 10px;
    font-size: 23px;
    cursor: pointer;
  }
`;
const WritePostTitle = styled.div`
  margin-top: 10px;
  padding: 20px;

  input {
    all: unset;
    width: 100%;
    height: 100%;
  }
  border-bottom: 1px solid rgb(235, 235, 235);
`;
const WritePostBody = styled.div`
  padding: 20px;
  flex: 1 1 auto;
  textarea {
    all: unset;
    width: 100%;
    height: 100%;
  }
`;

const UpdatePostModal = () => {
  const dispatch = useDispatch();

  const { updatePostLoading, currentPost, imagePaths } = useSelector(
    state => state.post,
  );
  const { updatePostModalSlideUp } = useSelector(state => state.modal);
  const [title, onChangeTitle] = useInput(currentPost.title);
  const [mainText, onChangeMainText] = useInput(currentPost.content);

  useEffect(() => {
    dispatch({ type: LOAD_IMAGE, images: currentPost.Images });
  }, [currentPost.Images]);

  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onCancelUpdatePostModal = useCallback(() => {
    dispatch({ type: CONFIRM_CANCEL_POST_MODAL_OPEN });
  }, []);

  const onUpdatePost = useCallback(() => {
    if (!title || !title.trim()) {
      alert('제목을 입력하세요');
    }
    if (!mainText || !mainText.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    formData.append('postId', currentPost.id);
    imagePaths.forEach(p => {
      formData.append('image', p); // req.body에 들어감(이미지나 파일 아닌 텍스트(이미지경로))
    });
    formData.append('title', title);
    formData.append('content', mainText); // req.body에 들어감
    return dispatch({
      type: UPDATE_POST_REQUEST,
      data: formData,
    });
  }, [title, mainText, imagePaths]);

  return (
    <ModalBackdrop>
      <UpdatePostForm
        updatePostModalSlideUp={updatePostModalSlideUp}
        onClick={onStopEventBubbling}
      >
        <WritePostHeader>
          <AiOutlineClose onClick={onCancelUpdatePostModal} />
          <span>글 수정</span>
          {updatePostLoading ? (
            <Spin />
          ) : (
            <AiOutlineCheck onClick={onUpdatePost} />
          )}
        </WritePostHeader>
        <WritePostTitle>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onChangeTitle}
          />
        </WritePostTitle>
        <WritePostBody>
          <textarea value={mainText} onChange={onChangeMainText}></textarea>
        </WritePostBody>
        <UploadImageForm />
      </UpdatePostForm>
    </ModalBackdrop>
  );
};

export default UpdatePostModal;
