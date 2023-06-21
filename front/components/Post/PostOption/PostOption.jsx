import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CONFIRM_REMOVE_POST_MODAL_OPEN,
  UPDATE_POST_MODAL_OPEN,
} from '../../../reducers/modal';
import { POST_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { PostOptionForm } from './styles';

const PostOption = () => {
  const dispatch = useDispatch();
  const { postOptionVisible } = useSelector(state => state.option);
  const { currentPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);

  const onClickUpdate = useCallback(() => {
    dispatch({ type: UPDATE_POST_MODAL_OPEN });
    dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
  }, []);

  const onClickRemove = useCallback(() => {
    const isMyPost = me && me.Posts.some(post => post.id === currentPost?.id);
    if (isMyPost) {
      dispatch({
        type: CONFIRM_REMOVE_POST_MODAL_OPEN,
      });
      dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
    }
  }, [me, currentPost]);

  return (
    <PostOptionForm postOptionVisible={postOptionVisible}>
      <div onClick={onClickUpdate}>수정하기</div>
      <div onClick={onClickRemove}>삭제하기</div>
    </PostOptionForm>
  );
};

export default PostOption;
