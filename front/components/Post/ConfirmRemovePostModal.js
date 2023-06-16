import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_REMOVE_POST_MODAL_CLOSE } from '../../reducers/modal';
import { REMOVE_POST_REQUEST } from '../../reducers/post';

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
  }
  & > div:not(:first-child) {
    padding: 15px 0;
    width: 100%;
    border-top: 1px solid rgb(235, 235, 235);
    cursor: pointer;
  }
`;

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
