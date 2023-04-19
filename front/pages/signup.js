import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';
import AppLayout from '../components/AppLayout/AppLayout';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import { useRouter } from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const SignupWrapper = styled.section`
  min-height: 500px;
  background-color: white;
  transform: translateY(200px);

  @media (min-width: 765px) {
    width: 600px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const SignUpForm = styled.form`
  max-width: 765px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  & > h2 {
    text-align: center;
  }
  & > div {
    width: 70%;
    margin: 0 auto;
    color: rgb(240, 148, 156);
    font-size: 13px;
  }
  @media (min-width: 765px) {
    width: 100%;
  }
`;

const BackButton = styled(AiOutlineArrowLeft)`
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  top: 25px;
  left: 30px;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  margin: 20px auto 10px auto;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 5px 0px 5px 10px;
  border-radius: 5px;

  border: ${props =>
    props.validateError ? '2px solid rgb(240, 148, 156)' : 'none'};
`;

const SignUpButton = styled.button`
  width: 50%;
  height: 45px;
  background-color: skyblue;
  color: white;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  border: none;
  opacity: ${props => (props.signUpLoading ? '0.5' : '1')};
`;

const signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpError, me } = useSelector(state => state.user);
  const submitButton = useRef();
  const router = useRouter();

  useEffect(() => {
    if (signUpLoading) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }, [signUpLoading]);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [nicknameValidateError, setNicknameValidateError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);

  const isEmailValidate = useCallback(email => {
    if (/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      setEmailValidateError(() => false);
      return true;
    } else {
      setEmailValidateError(() => true);
      return false;
    }
  }, []);

  const isNicknameValidate = useCallback(nickname => {
    if (nickname.length >= 2) {
      setNicknameValidateError(() => false);
      return true;
    } else {
      setNicknameValidateError(() => true);
      return false;
    }
  }, []);

  const isPasswordValidate = useCallback(password => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password,
      )
    ) {
      setPasswordValidateError(() => false);
      return true;
    } else {
      setPasswordValidateError(() => true);
      return false;
    }
  }, []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.currentTarget.value);
    // 이메일 형식을 만족하고 있는지
    isEmailValidate(e.currentTarget.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setNickname(e.currentTarget.value);
    // 닉네임 최소2 글자 이상인지
    isNicknameValidate(e.currentTarget.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.currentTarget.value);
    // 패스워드가 영어 + 숫자 + 특수문자 갖춰져 있느지
    isPasswordValidate(e.currentTarget.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.currentTarget.value);
      // 패스워드가 일치하는지
      setPasswordMatchError(e.currentTarget.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
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
    },
    [email, password, nickname, passwordCheck],
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
          <SignUpForm onSubmit={onSubmit}>
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
            {signUpError === '이미 사용중인 아이디입니다.' ? (
              <div>{signUpError}</div>
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
              type="submit"
              ref={submitButton}
              signUpLoading={signUpLoading}
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
