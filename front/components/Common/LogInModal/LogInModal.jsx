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
import {
  ModalBackdrop,
  LogInForm,
  CloseButton,
  Input,
  ErrorMessage,
} from './styles';
import { useForm } from 'react-hook-form';

const LogInModal = () => {
  const dispatch = useDispatch();
  // const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logInModalSlideUp } = useSelector(state => state.modal);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm({ mode: 'onChange' });

  const onToggleLogInModal = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_CLOSE_REQUEST });
  }, []);

  // const onLogIn = useCallback(
  //   e => {
  //     e.preventDefault();
  //     if (email && password) {
  //       dispatch({
  //         type: LOG_IN_REQUEST,
  //         data: {
  //           email,
  //           password,
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: MESSAGE_MODAL_TOGGLE_REQUEST,
  //         message: '아이디 혹은 비밀번호를 입력하세요',
  //       });
  //     }
  //   },
  //   [email, password],
  // );

  return (
    <ModalBackdrop>
      <LogInForm
        noValidate
        logInModalSlideUp={logInModalSlideUp}
        // onSubmit={onLogIn}
        onSubmit={handleSubmit(async ({ email, password }) => {
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
        })}
      >
        <CloseButton onClick={onToggleLogInModal} />
        <h2>Login</h2>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          // value={email}
          // onChange={onChangeEmail}
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          aria-invalid={
            isSubmitted ? (errors.email ? 'true' : 'false') : undefined
          }
        />
        {errors.email && (
          <ErrorMessage role="alert" style={{ color: 'red' }}>
            {errors.email.message}
          </ErrorMessage>
        )}

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          // value={password}
          // onChange={onChangePassword}
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 8,
              message: '8자리 이상 비밀번호를 사용하세요.',
            },
          })}
          aria-invalid={
            isSubmitted ? (errors.password ? 'true' : 'false') : undefined
          }
        />
        {errors.password && (
          <ErrorMessage role="alert" style={{ color: 'red' }}>
            {errors.password.message}
          </ErrorMessage>
        )}

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
