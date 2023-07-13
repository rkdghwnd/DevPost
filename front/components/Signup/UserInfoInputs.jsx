import React from 'react';
import { Input } from './styles';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const UserInfoInputs = ({
  email,
  onChangeEmail,
  emailValidateError,
  nickname,
  onChangeNickname,
  nicknameValidateError,
  password,
  onChangePassword,
  passwordValidateError,
  passwordCheck,
  onChangePasswordCheck,
  passwordMatchError,
}) => {
  const { signUpStatus } = useSelector(state => state.user);
  return (
    <>
      <Input
        type="email"
        placeholder="아이디"
        value={email}
        onChange={onChangeEmail}
        validateError={emailValidateError}
      />
      {emailValidateError ? <div>이메일 형식을 만족하지 않습니다.</div> : null}
      {signUpStatus === '이미 사용중인 아이디입니다.' ? (
        <div>{signUpStatus}</div>
      ) : null}
      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={onChangeNickname}
        validateError={nicknameValidateError}
      />
      {nicknameValidateError ? (
        <div>닉네임은 최소 2글자 이상이어야 합니다.</div>
      ) : null}
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
        validateError={passwordValidateError}
      />
      {passwordValidateError ? (
        <div>
          비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야 합니다.
        </div>
      ) : null}
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={onChangePasswordCheck}
        validateError={passwordMatchError}
      />
      {passwordMatchError ? <div>비밀번호가 일치하지 않습니다.</div> : null}
    </>
  );
};

UserInfoInputs.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  emailValidateError: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  onChangeNickname: PropTypes.func.isRequired,
  nicknameValidateError: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  passwordValidateError: PropTypes.bool.isRequired,
  passwordCheck: PropTypes.string.isRequired,
  onChangePasswordCheck: PropTypes.func.isRequired,
  passwordMatchError: PropTypes.bool.isRequired,
};

export default UserInfoInputs;
