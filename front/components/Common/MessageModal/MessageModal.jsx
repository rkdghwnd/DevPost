import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_MODAL_TOGGLE_REQUEST } from '../../../reducers/modal';
import Router from 'next/router';
import {
  RESET_LOG_IN_ERROR,
  RESET_SIGN_UP_DONE,
  RESET_SIGN_UP_ERROR,
  RESET_UPDATE_MY_INFO_DONE,
  RESET_UPDATE_MY_INFO_ERROR,
} from '../../../reducers/user';
import { ModalBackdrop, MessageForm } from './styles';
import { REJECTED, SUCCEEDED } from '../../../reducers';

const MessageModal = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.modal);
  const { signUpStatus, logInStatus, updateMyInfoStatus, removeAccountStatus } =
    useSelector(state => state.user);

  // 확인 눌렀을때 닫히도록
  const onToggleMessageInfo = useCallback(() => {
    // 메세지 초기화
    dispatch({ type: MESSAGE_MODAL_TOGGLE_REQUEST, message: '' });

    if (signUpStatus === SUCCEEDED) {
      Router.replace('/');
    }

    // 프로필 수정 성공시 상태 초기화
    if (updateMyInfoStatus === SUCCEEDED) {
      Router.replace('/myprofile');
    }

    if (removeAccountStatus === SUCCEEDED) {
      Router.replace('/');
    }
  }, [logInStatus, signUpStatus, updateMyInfoStatus]);

  return (
    <ModalBackdrop>
      <MessageForm>
        <span>{message}</span>
        <button onClick={onToggleMessageInfo}>확인</button>
      </MessageForm>
    </ModalBackdrop>
  );
};

export default MessageModal;
