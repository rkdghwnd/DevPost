import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import Link from 'next/link';
import {
  HEADER_OPTION_CLOSE_REQUEST,
  HEADER_OPTION_TOGGLE_REQUEST,
} from '../../reducers/option';

const MyProfileOptionForm = styled.div`
  @keyframes slideDown {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: ${props => (props.headerOptionVisible ? 'slideDown' : '')};
  animation-duration: 0.3s;
  animation-delay: 0s;

  display: ${props => (props.headerOptionVisible ? 'block' : 'none')};
  width: 150px;
  height: 100px;
  box-shadow: -2px 2px 8px hsl(0deg 0% 0% / 0.38);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 63px;
  right: 5px;
  background-color: white;

  & > a {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  & > a:hover {
    background-color: rgb(230, 230, 230);
  }
`;
const HeaderOption = () => {
  const dispatch = useDispatch();
  const { headerOptionVisible } = useSelector(state => state.option);
  const onClickOption = useCallback(() => {
    dispatch({ type: HEADER_OPTION_TOGGLE_REQUEST });
  }, []);
  const onClickLogOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
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
