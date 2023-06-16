import React, { useCallback } from 'react';
import styled from 'styled-components';
import useInput from '../../../hooks/input';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_CANCEL_POST_MODAL_OPEN } from '../../../reducers/modal';
import { ADD_POST_REQUEST } from '../../../reducers/post';
import UploadImageForm from './UploadImageForm';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 996;
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

const WritePostForm = styled.section`
  display: flex;
  background-color: white;
  height: 90%;
  flex-direction: column;
  padding: 20px;

  @keyframes newPostModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes newPostModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${({ newPostModalSlideUp }) =>
    newPostModalSlideUp ? 'newPostModalSlideUp' : 'newPostModalSlideDown'};
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

const Spinner = styled(Spin)`
  font-size: 20px;
`;

const PostModal = () => {
  const dispatch = useDispatch();

  const [title, onChangeTitle] = useInput('');
  const [mainText, onChangeMainText] = useInput('');

  const { newPostModalSlideUp, addPostLoading } = useSelector(
    state => state.modal,
  );
  const { imagePaths } = useSelector(state => state.post);

  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onCancelNewPost = useCallback(() => {
    dispatch({ type: CONFIRM_CANCEL_POST_MODAL_OPEN });
  }, []);

  const onNewPost = useCallback(() => {
    if (!title || !title.trim()) {
      alert('제목을 입력하세요');
    }
    if (!mainText || !mainText.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach(p => {
      formData.append('image', p); // req.body에 들어감(이미지나 파일 아닌 텍스트(이미지경로))
    });
    formData.append('title', title);
    formData.append('content', mainText); // req.body에 들어감

    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [title, mainText, imagePaths]);

  return (
    <ModalBackdrop>
      <WritePostForm
        newPostModalSlideUp={newPostModalSlideUp}
        onClick={onStopEventBubbling}
      >
        <WritePostHeader>
          <AiOutlineClose onClick={onCancelNewPost} />
          <span>글 작성</span>
          {addPostLoading ? (
            <Spinner indicator={<LoadingOutlined />} />
          ) : (
            <AiOutlineCheck onClick={onNewPost} />
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
      </WritePostForm>
    </ModalBackdrop>
  );
};

export default PostModal;
