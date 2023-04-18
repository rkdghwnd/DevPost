import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import {
  LOG_IN_MODAL_OPEN,
  NEW_POST_MODAL_OPEN,
} from '../../../reducers/modal';
import HeaderOption from '../../Option/HeaderOption';
import { HEADER_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { RESET_IMAGE } from '../../../reducers/post';
import SearchInput from './SearchInput';

const Header = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid rgb(235, 235, 235);
  z-index: 9;
  @media (max-width: 765px) {
    display: none;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  button {
    width: 80px;
    height: 45px;
    margin-right: 15px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    cursor: pointer;
  }
  button:first-of-type {
    background-color: white;
  }
  button:last-of-type {
    background-color: skyblue;
  }
  & > a {
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    color: #48b4e0;
    margin-left: 15px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-out;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

const DesktopHeader = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { headerOptionVisible } = useSelector(state => state.option);

  const onClickLogInModal = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_OPEN });
  }, []);

  const onClickNewPostModal = useCallback(() => {
    if (me) {
      dispatch({ type: RESET_IMAGE });
      dispatch({ type: NEW_POST_MODAL_OPEN });
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me]);

  const onClickOption = useCallback(e => {
    dispatch({ type: HEADER_OPTION_TOGGLE_REQUEST });
    e.stopPropagation();
  }, []);

  return (
    <Header>
      <HeaderInner>
        <Link href="/">
          <a>DEVPOST</a>
        </Link>
        <SearchInput />
        {me === null && <button onClick={onClickLogInModal}>로그인</button>}
        {me && (
          <ProfileWrapper>
            <ProfileImage
              src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${me.profile_img}`}
              tabIndex={1}
              onClick={onClickOption}
            />
            {headerOptionVisible && <HeaderOption />}
          </ProfileWrapper>
        )}
        {me && <button onClick={onClickNewPostModal}>글쓰기</button>}
      </HeaderInner>
    </Header>
  );
};

export default DesktopHeader;
