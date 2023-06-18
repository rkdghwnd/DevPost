import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_REMOVE_POST_MODAL_CLOSE } from '../../../reducers/modal';
import { REMOVE_POST_REQUEST } from '../../../reducers/post';
import { ModalBackdrop, MessageForm } from './styles';

const ConfirmRemovePostModal = () => {
  const dispatch = useDispatch();
  const { currentPost } = useSelector(state => state.post);
  const onClickRemove = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: currentPost.id });
    dispatch({ type: CONFIRM_REMOVE_POST_MODAL_CLOSE });
  });
  const onClickClose = useCallback(() => {
    dispatch({ type: CONFIRM_REMOVE_POST_MODAL_CLOSE });
  }, []);

  return (
    <ModalBackdrop>
      <MessageForm>
        <div>글을 삭제 하시겠습니까?</div>
        <div onClick={onClickRemove}>확인</div>
        <div onClick={onClickClose}>취소</div>
      </MessageForm>
    </ModalBackdrop>
  );
};

export default ConfirmRemovePostModal;
