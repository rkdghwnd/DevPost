import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VERIFY_PASSWORD_MODAL_OPEN } from '../../../reducers/modal';

const EditForm = styled.section`
  input {
    all: unset;
    width: 100%;
    height: 30px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
  }
  textarea {
    all: unset;
    width: 100%;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
  }
`;

const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  color: rgb(240, 148, 156);
`;

const RemoveAccountButton = styled.button`
  all: unset;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  background-color: rgb(250, 250, 250);
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: rgb(200, 200, 200);
    transition: background-color 0.5s ease;
  }
`;

const ProfileEditForm = ({
  nickname,
  onChangeNickname,
  introduce,
  onChangeIntroduce,
  password,
  onChangePassword,
  passwordCheck,
  onChangePasswordCheck,
  nicknameValidateError,
  passwordValidateError,
  passwordMatchError,
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  const onOpenVerifyPasswordModal = useCallback(() => {
    dispatch({ type: VERIFY_PASSWORD_MODAL_OPEN });
  }, []);
  return (
    <EditForm>
      <InputLabel>
        <label htmlFor="nickname">닉네임</label>
        <span>2/10</span>
      </InputLabel>
      <br />
      <input
        name="nickname"
        type="text"
        value={nickname}
        onChange={onChangeNickname}
      ></input>
      <br />
      {nicknameValidateError ? (
        <ErrorMessage>닉네임은 최소 2글자 이상이어야 합니다.</ErrorMessage>
      ) : null}
      <br />
      <InputLabel>
        <label htmlFor="nickname">소개</label>
        <span>2/10</span>
      </InputLabel>
      <br />
      <textarea
        rows="6"
        name="nickname"
        type="text"
        value={introduce}
        onChange={onChangeIntroduce}
      ></textarea>
      <br />
      <br />

      {me?.provider === 'local' ? (
        <>
          <InputLabel>
            <label htmlFor="nickname">비밀번호</label>
          </InputLabel>
          <br />
          <input
            name="nickname"
            type="password"
            value={password}
            onChange={onChangePassword}
          ></input>
          <br />
          {passwordValidateError ? (
            <ErrorMessage>
              비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야
              합니다.
            </ErrorMessage>
          ) : null}
          <br />
          <InputLabel>
            <label htmlFor="nickname">비밀번호 확인</label>
          </InputLabel>
          <br />
          <input
            name="nickname"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          ></input>
          {passwordMatchError ? (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          ) : null}
          <RemoveAccountButton onClick={onOpenVerifyPasswordModal}>
            회원탈퇴
          </RemoveAccountButton>
        </>
      ) : (
        '비밀번호 변경은 로컬 로그인만 가능합니다.'
      )}
    </EditForm>
  );
};

ProfileEditForm.propTypes = {
  nickname: PropTypes.string.isRequired,
  onChangeNickname: PropTypes.func.isRequired,
  introduce: PropTypes.string.isRequired,
  onChangeIntroduce: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  passwordCheck: PropTypes.string.isRequired,
  onChangePasswordCheck: PropTypes.func.isRequired,
  nicknameValidateError: PropTypes.bool.isRequired,
  passwordValidateError: PropTypes.bool.isRequired,
  passwordMatchError: PropTypes.bool.isRequired,
};

export default ProfileEditForm;
