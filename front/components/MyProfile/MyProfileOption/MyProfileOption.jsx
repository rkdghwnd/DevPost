import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LOG_OUT_REQUEST } from '../../../reducers/user';
import { MY_PROFILE_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { MyProfileOptionForm } from './styles';

const MyProfileOption = () => {
  const dispatch = useDispatch();
  const { myProfileOptionVisible } = useSelector(state => state.option);

  const onClickLogOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);
  const onClickOption = useCallback(() => {
    dispatch({ type: MY_PROFILE_OPTION_TOGGLE_REQUEST });
  }, []);

  return (
    <MyProfileOptionForm
      myProfileOptionVisible={myProfileOptionVisible}
      onClick={onClickOption}
    >
      <Link href="/myprofile/edit">
        <div>프로필 수정</div>
      </Link>
      <div onClick={onClickLogOut}>로그아웃</div>
    </MyProfileOptionForm>
  );
};

export default MyProfileOption;
