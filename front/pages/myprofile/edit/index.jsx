import React, { useCallback, useEffect, useState, useRef } from 'react';
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai';
import { FcCameraIdentification } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import ProfileEditInput from '../../../components/MyProfile/Edit/ProfileEditInput/ProfileEditInput';
import useInput from '../../../hooks/input';
import {
  LOAD_PROFILE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../../../reducers/post';
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MY_INFO_REQUEST,
} from '../../../reducers/user';
import MyProfileEditLoading from '../../../components/MyProfile/Edit/MyProfileEditLoading/MyProfileEditLoading';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AppLayout from '../../../components/Common/AppLayout';
import { EditForm, EditFormHeader, ProfileImage } from './styles';
import {
  useNicknameValidate,
  useOnChange,
  usePasswordValidate,
} from '../../../hooks/validate';
import { LOADING } from '../../../reducers';

const edit = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const Router = useRouter();
  const { me, loadMyInfoStatus } = useSelector(state => state.user);
  const { profileImage } = useSelector(state => state.post);
  const [introduce, onChangeIntroduce] = useInput(me?.introduce);
  const [nicknameValidateError, isNicknameValidate] =
    useNicknameValidate(false);
  const [passwordValidateError, isPasswordValidate] =
    usePasswordValidate(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [nickname, onChangeNickname] = useOnChange('', isNicknameValidate);
  const [password, onChangePassword] = useOnChange('', isPasswordValidate);
  const [passwordCheck, onChangePasswordCheck] = useOnChange(
    '',
    setPasswordMatchError,
    password,
  );

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  useEffect(() => {
    if (!me?.id) {
      Router.replace('/');
    }
  }, [me?.id, Router]);

  useEffect(() => {
    dispatch({ type: LOAD_PROFILE_IMAGE, image: me?.profile_img });
  }, [me]);

  const onClickBack = useCallback(() => {
    Router.back();
  }, [Router]);

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
  if (loadMyInfoStatus === LOADING) {
    return <MyProfileEditLoading />;
  }

  return (
    <>
      <Head>
        <title>내 정보 수정 - DevPost</title>
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
