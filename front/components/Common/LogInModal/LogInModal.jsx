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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LogInModal = () => {
  const dispatch = useDispatch();

  const logInSchema = z.object({
    email: z
      .string()
      .nonempty('이메일은 필수 입력입니다.')
      .email('이메일 형식에 맞지 않습니다.'),
    nickname: z
      .string()
      .nonempty('닉네임은 필수 입력입니다.')
      .min(2, '닉네임은 최소 2글자 이상이어야 합니다.'),
    password: z
      .string()
      .nonempty('비밀번호는 필수 입력입니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        '비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야 합니다.',
      ),
    passwordConfirm: z
      .string()
      .nonempty('비밀번호 확인은 필수 입력입니다.')
      .refine(val => val === watch('password'), {
        message: '비밀번호가 일치하지 않습니다.',
      }),
  });

  const { logInModalSlideUp } = useSelector(state => state.modal);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm({ mode: 'onChange', resolver: zodResolver(logInSchema) });

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
