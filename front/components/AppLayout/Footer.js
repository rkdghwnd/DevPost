import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiFillInfoCircle, AiOutlineComment } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  INFO_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
  NEW_POST_MODAL_OPEN,
} from '../../reducers/modal';

const FooterForm = styled.section`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-top: 1px solid rgb(230, 230, 230);
  color: rgb(153, 153, 153);

  a {
    text-decoration: none;
    color: rgb(153, 153, 153);
  }

  a > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }
  a > div > span {
    font-size: 12px;
    margin-top: 5px;
  }

  @media (min-width: 765px) {
    display: none;
  }
`;

const InfoLink = styled.div`
  cursor: pointer;
`;

const WritePostButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: skyblue;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  bottom: 75px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
`;

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
