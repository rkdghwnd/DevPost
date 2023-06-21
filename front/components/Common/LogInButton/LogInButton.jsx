import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LogInRequestButton } from './styles';

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
    <LogInRequestButton
      type="submit"
      logInLoading={logInLoading}
      ref={submitButton}
    >
      로그인
    </LogInRequestButton>
  );
};

export default LogInButton;
