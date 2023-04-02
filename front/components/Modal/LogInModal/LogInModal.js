import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import useInput from '../../../hooks/input';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOG_IN_MODAL_CLOSE_REQUEST,
  MESSAGE_MODAL_TOGGLE_REQUEST,
} from '../../../reducers/modal';
import { LOG_IN_REQUEST } from '../../../reducers/user';
import LogInInputs from './LogInInputs';
import OauthLogos from './OauthLogos';
import LogInButton from './LogInButton';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);

  @media (min-width: 765px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LogInForm = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  & > h2 {
    text-align: center;
  }

  & > a {
    width: 100px;
    text-decoration: none;
    text-align: right;
    font-weight: 400;
    font-size: 15px;
    color: rgb(150, 150, 150);
    padding: 10px;
    margin: 0 50px 0 auto;
  }

  @keyframes slideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.logInModalSlideUp ? 'slideUp' : 'slideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  @media (min-width: 765px) {
    position: static;
    width: 500px;
  }
`;

const CloseButton = styled(AiOutlineClose)`
  height: 100%;
  font-size: 20px;
  cursor: pointer;
`;

const LogInModal = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logInModalSlideUp } = useSelector(state => state.modal);

  const onToggleLogInModal = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_CLOSE_REQUEST });
  }, []);

  const onLogIn = useCallback(
    e => {
      e.preventDefault();
      if (email && password) {
        dispatch({
          type: LOG_IN_REQUEST,
          data: {
            email,
            password,
          },
        });
      } else {
        dispatch({
          type: MESSAGE_MODAL_TOGGLE_REQUEST,
          message: '아이디 혹은 비밀번호를 입력하세요',
        });
      }
    },
    [email, password],
  );

  return (
    <ModalBackdrop>
      <LogInForm logInModalSlideUp={logInModalSlideUp} onSubmit={onLogIn}>
        <CloseButton onClick={onToggleLogInModal} />
        <h2>Login</h2>
        <LogInInputs
          email={email}
          onChangeEmail={onChangeEmail}
          password={password}
          onChangePassword={onChangePassword}
        />
        <LogInButton />
        <OauthLogos />
        <Link href="/signup">
          <a onClick={onToggleLogInModal}>회원가입</a>
        </Link>
      </LogInForm>
    </ModalBackdrop>
  );
};

export default LogInModal;
