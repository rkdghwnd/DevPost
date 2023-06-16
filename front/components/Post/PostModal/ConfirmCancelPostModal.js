import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  CONFIRM_CANCEL_POST_MODAL_CLOSE,
  NEW_POST_MODAL_CLOSE_REQUEST,
  UPDATE_POST_MODAL_CLOSE_REQUEST,
} from '../../../reducers/modal';

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
  border-radius: 5px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > div:first-child {
    padding: 20px;
    font-weight: 700;
    line-height: 30px;
  }
  & > div:not(:first-child) {
    padding: 15px 0;
    width: 100%;
    border-top: 1px solid rgb(235, 235, 235);
    cursor: pointer;
  }
`;

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
