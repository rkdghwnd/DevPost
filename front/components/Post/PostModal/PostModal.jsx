import React, { useCallback, useEffect } from 'react';
import useInput from '../../../hooks/input';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_CANCEL_POST_MODAL_OPEN } from '../../../reducers/modal';
import {
  ADD_POST_REQUEST,
  LOAD_IMAGE,
  UPDATE_POST_REQUEST,
} from '../../../reducers/post';
import {
  ModalBackdrop,
  WritePostForm,
  WritePostHeader,
  WritePostTitle,
  WritePostBody,
  Spinner,
} from './styles';
import UploadImageForm from '../UploadImageForm/UploadImageForm';
import { LOADING, SUCCEEDED } from '../../../reducers';
import { useRouter } from 'next/router';

const PostModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { postModalSlideUp, postModalStatus } = useSelector(
    state => state.modal,
  );
  const { currentPost, imagePaths, addPostStatus } = useSelector(
    state => state.post,
  );

  const [title, onChangeTitle, setTitle] = useInput('');
  const [mainText, onChangeMainText, setMainText] = useInput('');

  useEffect(() => {
    if (postModalStatus === 'update') {
      dispatch({ type: LOAD_IMAGE, images: currentPost?.Images });
      setTitle(currentPost?.title);
      setMainText(currentPost?.content);
    }
  }, [
    currentPost?.Images,
    postModalStatus,
    currentPost?.title,
    currentPost?.content,
  ]);

  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onCancelPost = useCallback(() => {
    dispatch({ type: CONFIRM_CANCEL_POST_MODAL_OPEN });
  }, []);

  const onPost = useCallback(() => {
    if (!title || !title.trim()) {
      return alert('제목을 입력하세요');
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

    if (postModalStatus === 'update') {
      formData.append('postId', currentPost.id);
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: formData,
      });
    } else if (postModalStatus === 'new') {
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    }
  }, [title, mainText, imagePaths]);

  useEffect(() => {
    if (addPostStatus === SUCCEEDED) {
      router.push(
        `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/post/${currentPost?.id}`,
      );
    }
  }, [router, currentPost, addPostStatus]);

  return (
    <ModalBackdrop>
      <WritePostForm
        postModalSlideUp={postModalSlideUp}
        onClick={onStopEventBubbling}
      >
        <WritePostHeader>
          <AiOutlineClose onClick={onCancelPost} />
          <span>글 {postModalStatus === 'new' ? '작성' : '수정'}</span>
          {addPostStatus === LOADING ? (
            <Spinner indicator={<LoadingOutlined />} />
          ) : (
            <AiOutlineCheck onClick={onPost} />
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
