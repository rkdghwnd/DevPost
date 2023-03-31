import React, { useCallback } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/input';
import { useDispatch } from 'react-redux';
import { VERIFY_PASSWORD_REQUEST } from '../../reducers/user';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 995;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoForm = styled.div`
  width: 300px;
  height: 150px;
  text-align: left;
  border-radius: 5px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > input {
    all: unset;
    border-radius: 5px;
    border: 1px solid rgb(150, 150, 150);
    padding: 5px;
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

const VerifyPasswordModal = () => {
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput('');
  const onVerifyPassword = useCallback(() => {
    dispatch({ type: VERIFY_PASSWORD_REQUEST, data: { password } });
  }, [password]);

  return (
    <ModalBackdrop>
      <InfoForm>
        <h4>비밀번호를 입력해주세요</h4>
        <input type="password" value={password} onChange={onChangePassword} />
        <button onClick={onVerifyPassword}>확인</button>
      </InfoForm>
    </ModalBackdrop>
  );
};

export default VerifyPasswordModal;
