import React, { useState, useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/Common/AppLayout';
import { useRouter } from 'next/router';
import { useNicknameValidate, usePasswordValidate } from '../../hooks/validate';
import { LOADING } from '../../reducers';
import {
  BackButton,
  SignUpButton,
  SignUpForm,
  SignupWrapper,
} from '../../pageStyles/signupStyles';
import UserInfoInputs from '../../components/Signup/UserInfoInputs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signup = () => {
  const dispatch = useDispatch();
  const { signUpStatus } = useSelector(state => state.user);
  const submitButton = useRef();
  const router = useRouter();

  useEffect(() => {
    if (signUpStatus === LOADING) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }, [signUpStatus]);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  const [nicknameValidateError, isNicknameValidate] =
    useNicknameValidate(false); // 닉네임 최소2 글자 이상인지
  const [passwordValidateError, isPasswordValidate] =
    usePasswordValidate(false); // 패스워드가 영어 + 숫자 + 특수문자 갖춰져 있느지
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [emailValidateError, setEmailValidateError] = useState(false);

  const signUpSchema = z.object({
    email: z.string().min(1).email('이메일 형식에 맞지 않습니다.'),
    nickname: z.string().min(2, '닉네임은 최소 2글자 이상이어야 합니다.'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        '비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야 합니다.',
      ),
    passwordConfirm: z.string().refine(val => val === watch('password'), {
      message: '비밀번호가 일치하지 않습니다.',
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const isEmailValidate = useCallback(email => {
    if (/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      setEmailValidateError(() => false);
      return true;
    } else {
      setEmailValidateError(() => true);
      return false;
    }
  }, []);

  const onClickSignUp = handleSubmit(
    async ({ email, password, passwordConfirm, nickname }) => {
      // 이메일 형식을 만족하고 있는지
      const verify1 = isEmailValidate(email);
      // 패스워드가 영어 + 숫자 + 특수문자 갖춰져 있는지
      const verify2 = isPasswordValidate(password);
      // 패스워드가 일치하는지 setPasswordMatchError
      setPasswordMatchError(passwordConfirm !== password);
      // 닉네임이 2글자 이상인지
      const verify3 = isNicknameValidate(nickname);
      // +
      // 중복된 이메일인지 -> 요청시 backend 에서 검증
      if (verify1 && verify2 && verify3 && !passwordMatchError) {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: {
            email,
            nickname,
            password,
          },
        });
      }
    },
  );

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <Head>
        <title>회원가입 - DevPost</title>
      </Head>
      <AppLayout>
        <SignupWrapper>
          <SignUpForm>
            <h2>Sign up</h2>
            <BackButton onClick={onClickBack} />
            <UserInfoInputs register={register} watch={watch} errors={errors} />
            <SignUpButton
              ref={submitButton}
              signUpStatus={signUpStatus}
              onClick={onClickSignUp}
              disabled={isSubmitting}
            >
              회원가입
            </SignUpButton>
          </SignUpForm>
        </SignupWrapper>
      </AppLayout>
    </>
  );
};

export default signup;
