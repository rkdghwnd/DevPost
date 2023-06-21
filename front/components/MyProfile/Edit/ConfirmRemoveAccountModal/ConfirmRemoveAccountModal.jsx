import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CONFIRM_REMOVE_ACCOUNT_MODAL_CLOSE } from '../../../../reducers/modal';
import { REMOVE_ACCOUNT_REQUEST } from '../../../../reducers/user';
import { ModalBackdrop, MessageForm } from './styles';

const ConfirmRemoveAccountModal = () => {
  const dispatch = useDispatch();
  const onClickRemove = useCallback(() => {
    dispatch({ type: REMOVE_ACCOUNT_REQUEST });
  }, []);
  const onClickClose = useCallback(() => {
    dispatch({ type: CONFIRM_REMOVE_ACCOUNT_MODAL_CLOSE });
  }, []);
  return (
    <ModalBackdrop>
      <MessageForm>
        <div>회원탈퇴를 하시겠습니까?</div>
        <div onClick={onClickRemove}>확인</div>
        <div onClick={onClickClose}>취소</div>
      </MessageForm>
    </ModalBackdrop>
  );
};

export default ConfirmRemoveAccountModal;
