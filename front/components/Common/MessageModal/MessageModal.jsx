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

const MessageModal = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.modal);
  const {
    signUpDone,
    signUpError,
    logInError,
    updateMyInfoError,
    updateMyInfoDone,
  } = useSelector(state => state.user);

  // 확인 눌렀을때 닫히도록
  const onToggleMessageInfo = useCallback(() => {
    // 메세지 초기화
    dispatch({ type: MESSAGE_MODAL_TOGGLE_REQUEST, message: '' });

    // 로그인 에러, 회원가입, 프로필 수정 에러 상태 초기화
    if (logInError) {
      dispatch({ type: RESET_LOG_IN_ERROR });
    }
    if (signUpError) {
      dispatch({ type: RESET_SIGN_UP_ERROR });
    }
    if (updateMyInfoError) {
      dispatch({ type: RESET_UPDATE_MY_INFO_ERROR });
    }
    // 회원가입 성공시 상태 초기화
    if (signUpDone) {
      dispatch({ type: RESET_SIGN_UP_DONE });
      Router.replace('/');
    }

    // 프로필 수정 성공시 상태 초기화
    if (updateMyInfoDone) {
      dispatch({ type: RESET_UPDATE_MY_INFO_DONE });
      Router.replace('/myprofile');
    }
  }, [
    signUpDone,
    logInError,
    signUpError,
    updateMyInfoError,
    updateMyInfoDone,
  ]);

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
