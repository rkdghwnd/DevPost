import React, { useCallback, useEffect, useState, useRef } from 'react';
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai';
import { FcCameraIdentification } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout/AppLayout';
import ProfileEditInput from '../../components/ProfileEditInput';
import useInput from '../../hooks/input';
import { LOAD_PROFILE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MY_INFO_REQUEST,
} from '../../reducers/user';
import MyProfileEditLoading from '../../components/Loading/MyProfileEditLoading';
import { useRouter } from 'next/router';
import Head from 'next/head';

const EditForm = styled.section`
  background-color: white;
  padding: 20px;
  min-height: 940px;
  @media (min-width: 765px) {
    max-width: 800px;
    min-height: 900px;
    margin: 0 auto;
    transform: translateY(80px);
  }
`;

const EditFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  & > :first-child {
    margin-right: 10px;
    cursor: pointer;
  }
  & > :last-child {
    margin-right: 10px;
    cursor: pointer;
  }
`;

const ProfileImage = styled.div`
  position: relative;
  margin-top: 10px;

  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 30px;
    margin: 0 auto 10px auto;
    cursor: pointer;
  }
  & > :last-child {
    font-size: 25px;
    position: absolute;
    left: calc(50% + 30px);
    bottom: calc(5%);
  }
`;

const edit = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const Router = useRouter();
  const { me, loadMyInfoLoading } = useSelector(state => state.user);
  const { profileImage } = useSelector(state => state.post);
  const [nickname, setNickname] = useState(me?.nickname);
  const [introduce, onChangeIntroduce] = useInput(me?.introduce);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [nicknameValidateError, setNicknameValidateError] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  useEffect(() => {
    me?.id ? '' : Router.replace('/');
  }, [me && me.id]);

  useEffect(() => {
    dispatch({ type: LOAD_PROFILE_IMAGE, image: me?.profile_img });
  }, [me]);

  const isNicknameValidate = useCallback(nickname => {
    if (nickname.length >= 2) {
      setNicknameValidateError(() => false);
      return true;
    } else {
      setNicknameValidateError(() => true);
      return false;
    }
  }, []);
  const onChangeNickname = useCallback(e => {
    setNickname(e.currentTarget.value);
    isNicknameValidate(e.currentTarget.value);
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
  const onChangePassword = useCallback(e => {
    setPassword(e.currentTarget.value);
    isPasswordValidate(e.currentTarget.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.currentTarget.value);
      setPasswordMatchError(e.currentTarget.value !== password);
    },
    [password],
  );

  const onClickBack = useCallback(() => {
    window.history.back();
  }, []);

  const onChangeUploadImage = useCallback(e => {
    const imageFormData = new FormData(); // FormData 형식 객체 생성
    imageFormData.append('image', e.currentTarget.files[0]);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
      mode: 'profile_img',
    });
  }, []);

  const onAddImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);

  const onClickProfileUpdate = useCallback(() => {
    const verify1 = isNicknameValidate(nickname);
    const verify2 = isPasswordValidate(password);
    setPasswordMatchError(passwordCheck !== password);
    const formData = new FormData();
    formData.append('image', profileImage); // req.body에 들어감(이미지나 파일 아닌 텍스트(이미지경로))
    formData.append('nickname', nickname);
    formData.append('introduce', introduce);
    formData.append('password', password);
    if (me.provider === 'local' && verify1 && verify2 && !passwordMatchError) {
      dispatch({ type: UPDATE_MY_INFO_REQUEST, data: formData });
    } else if (me.provider !== 'local' && verify1) {
      dispatch({ type: UPDATE_MY_INFO_REQUEST, data: formData });
    }
  }, [
    me,
    password,
    passwordCheck,
    nickname,
    passwordMatchError,
    introduce,
    profileImage,
  ]);

  if (!me) {
    return;
  }
  if (loadMyInfoLoading) {
    return <MyProfileEditLoading />;
  }

  return (
    <>
      <Head>
        <title>내 정보 수정 - PostMoa</title>
      </Head>
      <AppLayout>
        {me && (
          <EditForm>
            <EditFormHeader>
              <AiOutlineArrowLeft onClick={onClickBack} />
              <span>프로필 수정</span>
              <AiOutlineCheck onClick={onClickProfileUpdate} />
            </EditFormHeader>
            <input
              type="file"
              name="image"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeUploadImage}
            />
            <ProfileImage>
              <img
                src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${profileImage}`}
                onClick={onAddImage}
              />
              <FcCameraIdentification />
            </ProfileImage>
            <ProfileEditInput
              nickname={nickname}
              introduce={introduce}
              password={password}
              passwordCheck={passwordCheck}
              onChangeNickname={onChangeNickname}
              onChangeIntroduce={onChangeIntroduce}
              onChangePassword={onChangePassword}
              onChangePasswordCheck={onChangePasswordCheck}
              nicknameValidateError={nicknameValidateError}
              passwordValidateError={passwordValidateError}
              passwordMatchError={passwordMatchError}
            />
          </EditForm>
        )}
      </AppLayout>
    </>
  );
};

export default edit;
