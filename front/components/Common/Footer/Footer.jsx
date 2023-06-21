import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiFillInfoCircle, AiOutlineComment } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { FooterForm, InfoLink, WritePostButton } from './styles';
import {
  INFO_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
  NEW_POST_MODAL_OPEN,
} from '../../../reducers/modal';

const Footer = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const onOpenAppInfo = useCallback(() => {
    dispatch({ type: INFO_MODAL_OPEN });
  }, []);

  const onOpenNewPostModal = useCallback(() => {
    if (me) {
      dispatch({ type: NEW_POST_MODAL_OPEN });
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me]);

  return (
    <FooterForm>
      <Link href="/">
        <a>
          <div>
            <AiOutlineComment />
            <span>커뮤니티</span>
          </div>
        </a>
      </Link>
      <Link href="/search">
        <a>
          <div>
            <BsSearch />
            <span>검색</span>
          </div>
        </a>
      </Link>
      <InfoLink onClick={onOpenAppInfo}>
        <a>
          <div>
            <AiFillInfoCircle />
            <span>정보</span>
          </div>
        </a>
      </InfoLink>
      <Link href="/myprofile">
        <a>
          <div>
            <CgProfile />
            <span>프로필</span>
          </div>
        </a>
      </Link>
      <WritePostButton onClick={onOpenNewPostModal}>
        <FaPencilAlt />
      </WritePostButton>
    </FooterForm>
  );
};

export default Footer;
