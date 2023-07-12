import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LOG_IN_MODAL_OPEN, POST_MODAL_OPEN } from '../../../reducers/modal';
import HeaderOption from '../HederOption/HeaderOption';
import { HEADER_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { RESET_IMAGE } from '../../../reducers/post';
import SearchInput from '../SearchInput/SearchInput';
import { Header, HeaderInner, ProfileWrapper, ProfileImage } from './styles';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { headerOptionVisible } = useSelector(state => state.option);

  const onClickLogInModal = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_OPEN });
  }, []);

  const onClickPostModal = useCallback(() => {
    if (me) {
      dispatch({ type: RESET_IMAGE });
      dispatch({ type: POST_MODAL_OPEN, data: 'new' });
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
              onClick={onClickOption}
            />
            {headerOptionVisible && <HeaderOption />}
          </ProfileWrapper>
        )}
        {me && <button onClick={onClickPostModal}>글쓰기</button>}
      </HeaderInner>
    </Header>
  );
};

export default AppHeader;
