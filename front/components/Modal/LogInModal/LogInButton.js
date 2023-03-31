import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LoginButton = styled.button`
  display: flex;
  width: 50%;
  padding: 10px;
  background-color: skyblue;
  color: white;
  border-radius: 25px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border: 1px solid rgb(235, 235, 235);
  cursor: pointer;
  opacity: ${props => (props.logInLoading ? '0.5' : '1')};
`;

const LogInButton = () => {
  const { logInLoading } = useSelector(state => state.user);
  const submitButton = useRef();

  useEffect(() => {
    if (logInLoading) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }, [logInLoading]);

  return (
    <LoginButton type="submit" logInLoading={logInLoading} ref={submitButton}>
      로그인
    </LoginButton>
  );
};

export default LogInButton;
