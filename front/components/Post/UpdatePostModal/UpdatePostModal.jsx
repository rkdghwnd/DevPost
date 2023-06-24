import React, { useCallback, useEffect } from 'react';
import useInput from '../../../hooks/input';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_CANCEL_POST_MODAL_OPEN } from '../../../reducers/modal';
import { LOAD_IMAGE, UPDATE_POST_REQUEST } from '../../../reducers/post';
import {
  ModalBackdrop,
  UpdatePostForm,
  WritePostHeader,
  WritePostTitle,
  WritePostBody,
} from './styles';
import UploadImageForm from '../UploadImageForm/UploadImageForm';

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
      return alert('제목을 입력하세요');
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
