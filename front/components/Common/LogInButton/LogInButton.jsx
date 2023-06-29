import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LogInRequestButton } from './styles';
import { LOADING } from '../../../reducers';

const LogInButton = () => {
  const { logInStatus } = useSelector(state => state.user);
  const submitButton = useRef();

  useEffect(() => {
    if (logInStatus === LOADING) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }, [logInStatus]);

  return (
    <LogInRequestButton
      type="submit"
      logInStatus={logInStatus}
      ref={submitButton}
    >
      로그인
    </LogInRequestButton>
  );
};

export default LogInButton;
