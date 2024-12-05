import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiFillInfoCircle, AiOutlineComment } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FooterForm, GithubInfo, WritePostButton } from './styles';
import {
  INFO_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
  POST_MODAL_OPEN,
} from '../../../reducers/modal';
import { RESET_IMAGE } from '../../../reducers/post';
import { useRouter } from 'next/router';

const Footer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector(state => state.user);
  const onOpenAppInfo = useCallback(() => {
    dispatch({ type: INFO_MODAL_OPEN });
  }, []);

  const onOpenNewPostModal = useCallback(() => {
    if (me) {
      dispatch({ type: RESET_IMAGE });
      dispatch({ type: POST_MODAL_OPEN, data: 'new' });
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me]);

  return (
    <FooterForm>
      <Link href="/">
        <div>
          <AiOutlineComment />
          <span>커뮤니티</span>
        </div>
      </Link>
      <Link href="/search">
        <div>
          <BsSearch />
          <span>검색</span>
        </div>
      </Link>
      <GithubInfo onClick={onOpenAppInfo}>
        <div>
          <AiFillInfoCircle />
          <span>정보</span>
        </div>
      </GithubInfo>
      <Link href="/myprofile">
        <div>
          <CgProfile />
          <span>프로필</span>
        </div>
      </Link>
      {router.pathname.includes('/post') || (
        <WritePostButton onClick={onOpenNewPostModal}>
          <FaPencilAlt />
        </WritePostButton>
      )}
    </FooterForm>
  );
};

export default Footer;
