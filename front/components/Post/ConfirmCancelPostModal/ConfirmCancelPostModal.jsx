import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CONFIRM_CANCEL_POST_MODAL_CLOSE,
  NEW_POST_MODAL_CLOSE_REQUEST,
  UPDATE_POST_MODAL_CLOSE_REQUEST,
} from '../../../reducers/modal';
import { ModalBackdrop, MessageForm } from './styles';

const ConfirmCancelPostModal = () => {
  const dispatch = useDispatch();

  const onClickCancel = useCallback(() => {
    dispatch({ type: NEW_POST_MODAL_CLOSE_REQUEST });
    dispatch({ type: UPDATE_POST_MODAL_CLOSE_REQUEST });
    dispatch({ type: CONFIRM_CANCEL_POST_MODAL_CLOSE });
  }, []);

  const onClickClose = useCallback(() => {
    dispatch({ type: CONFIRM_CANCEL_POST_MODAL_CLOSE });
  }, []);

  return (
    <ModalBackdrop>
      <MessageForm>
        <div>
          취소하시겠습니까?
          <br />
          작성한 모든 내용이 사라집니다.
        </div>
        <div onClick={onClickCancel}>확인</div>
        <div onClick={onClickClose}>돌아가기</div>
      </MessageForm>
    </ModalBackdrop>
  );
};

export default ConfirmCancelPostModal;
