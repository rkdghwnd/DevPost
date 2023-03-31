import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  width: 70%;
  margin: 20px auto;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 5px 0;
`;
const LogInInputs = ({ email, onChangeEmail, password, onChangePassword }) => {
  return (
    <>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
      />
    </>
  );
};

LogInInputs.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default LogInInputs;
