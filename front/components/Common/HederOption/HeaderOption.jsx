import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LOG_OUT_REQUEST } from '../../../reducers/user';
import { HEADER_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { MyProfileOptionForm } from './styles';

const HeaderOption = () => {
  const dispatch = useDispatch();
  const { headerOptionVisible } = useSelector(state => state.option);
  const onClickOption = useCallback(() => {
    dispatch({ type: HEADER_OPTION_TOGGLE_REQUEST });
  }, []);
  const onClickLogOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
    // mutate('ME', { me: null, myInfoError: null, myInfoLoading: null });
  }, []);

  return (
    <MyProfileOptionForm
      tabIndex={1}
      autoFocus
      headerOptionVisible={headerOptionVisible}
      onClick={onClickOption}
    >
      <Link href="/myprofile">
        <a>내 프로필</a>
      </Link>
      <a onClick={onClickLogOut}>로그아웃</a>
    </MyProfileOptionForm>
  );
};

export default HeaderOption;
