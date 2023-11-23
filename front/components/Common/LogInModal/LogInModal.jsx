import React, { useCallback } from 'react';
import Link from 'next/link';
import useInput from '../../../hooks/input';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOG_IN_MODAL_CLOSE_REQUEST,
  MESSAGE_MODAL_TOGGLE_REQUEST,
} from '../../../reducers/modal';
import { LOG_IN_REQUEST } from '../../../reducers/user';
import OauthLogos from '../OauthLogo/OauthLogos';
import LogInButton from '../LogInButton/LogInButton';
import { ModalBackdrop, LogInForm, CloseButton, Input } from './styles';

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
