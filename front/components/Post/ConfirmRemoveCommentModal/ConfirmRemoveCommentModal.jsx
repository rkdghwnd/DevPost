import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_REMOVE_COMMENT_MODAL_CLOSE } from '../../../reducers/modal';
import {
  REMOVE_COMMENT_REQUEST,
  REMOVE_NESTED_COMMENT_REQUEST,
} from '../../../reducers/post';
import { ModalBackdrop, MessageForm } from './styles';

const ConfirmRemoveCommentModal = () => {
  const dispatch = useDispatch();
  const { commentId, commentTarget, nestedCommentId } = useSelector(
    state => state.modal,
  );
  const { currentPost } = useSelector(state => state.post);
  const onClickClose = useCallback(() => {
    dispatch({ type: CONFIRM_REMOVE_COMMENT_MODAL_CLOSE });
  }, []);

  const onClickRemove = useCallback(() => {
    if (commentTarget === 'comment') {
      dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: {
          commentId,
          postId: currentPost.id,
        },
      });
    } else {
      dispatch({
        type: REMOVE_NESTED_COMMENT_REQUEST,
        data: {
          commentId,
          postId: currentPost.id,
          nestedCommentId,
        },
      });
    }
    dispatch({ type: CONFIRM_REMOVE_COMMENT_MODAL_CLOSE });
  }, [commentTarget, commentId, currentPost, nestedCommentId]);

  return (
    <ModalBackdrop>
      <MessageForm>
        <div>댓글을 삭제 하시겠습니까?</div>
        <div onClick={onClickRemove}>확인</div>
        <div onClick={onClickClose}>취소</div>
      </MessageForm>
    </ModalBackdrop>
  );
};

export default ConfirmRemoveCommentModal;
