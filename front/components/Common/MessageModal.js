import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_MODAL_TOGGLE_REQUEST } from '../../reducers/modal';
import Router from 'next/router';
import {
  RESET_LOG_IN_ERROR,
  RESET_SIGN_UP_DONE,
  RESET_SIGN_UP_ERROR,
  RESET_UPDATE_MY_INFO_DONE,
  RESET_UPDATE_MY_INFO_ERROR,
} from '../../reducers/user';
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageForm = styled.div`
  width: 400px;
  height: 100px;
  border-radius: 5px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    display: block;
    margin-bottom: 15px;
  }

  & > button {
    all: unset;
    width: 100px;
    height: 30px;
    border-bottom: 1px solid rgb(235, 235, 235);
    border-radius: 20px;
    text-align: center;
    background-color: skyblue;
    cursor: pointer;
  }
`;

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
