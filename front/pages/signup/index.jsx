import React, { useState, useCallback, useEffect, useRef } from 'react';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  BackButton,
  SignUpButton,
  SignUpForm,
  SignupWrapper,
  Input,
} from './styles';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/Common/AppLayout';
import { useRouter } from 'next/router';
import {
  useNicknameValidate,
  useOnChange,
  usePasswordValidate,
} from '../../hooks/validate';
import { LOADING } from '../../reducers';

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

  const [email, setEmail] = useState('');
  const [nicknameValidateError, isNicknameValidate] =
    useNicknameValidate(false); // 닉네임 최소2 글자 이상인지
  const [passwordValidateError, isPasswordValidate] =
    usePasswordValidate(false); // 패스워드가 영어 + 숫자 + 특수문자 갖춰져 있느지
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [nickname, onChangeNickname] = useOnChange('', isNicknameValidate);
  const [password, onChangePassword] = useOnChange('', isPasswordValidate);
  const [passwordCheck, onChangePasswordCheck] = useOnChange(
    '',
    setPasswordMatchError,
    password,
  );

  const [emailValidateError, setEmailValidateError] = useState(false);

  const isEmailValidate = useCallback(email => {
    if (/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      setEmailValidateError(() => false);
      return true;
    } else {
      setEmailValidateError(() => true);
      return false;
    }
  }, []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.currentTarget.value);
    // 이메일 형식을 만족하고 있는지
    isEmailValidate(e.currentTarget.value);
  }, []);

  const onClickSignUp = useCallback(() => {
    // 이메일 형식을 만족하고 있는지
    const verify1 = isEmailValidate(email);
    // 패스워드가 영어 + 숫자 + 특수문자 갖춰져 있는지
    const verify2 = isPasswordValidate(password);
    // 패스워드가 일치하는지 setPasswordMatchError
    setPasswordMatchError(passwordCheck !== password);
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
  }, [email, password, nickname, passwordCheck]);

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
            <Input
              type="email"
              placeholder="아이디"
              value={email}
              onChange={onChangeEmail}
              validateError={emailValidateError}
            />
            {emailValidateError ? (
              <div>이메일 형식을 만족하지 않습니다.</div>
            ) : null}
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
                비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야
                합니다.
              </div>
            ) : null}
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              validateError={passwordMatchError}
            />
            {passwordMatchError ? (
              <div>비밀번호가 일치하지 않습니다.</div>
            ) : null}
            <SignUpButton
              ref={submitButton}
              signUpStatus={signUpStatus}
              onClick={onClickSignUp}
            >
              회원가입
            </SignUpButton>
          </SignUpForm>
        </SignupWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST, // 로그인 유지
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default signup;
