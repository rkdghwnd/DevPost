import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MessageBox } from './styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { LOAD_MY_BOOKMARK_REQUEST } from '../../../reducers/post';

const BookmarkMessage = ({ message }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(router.pathname);
  return (
    <MessageBox>
      <span>{message}</span>
      <span
        onClick={() => {
          if (router.pathname === '/myprofile') {
            dispatch({ type: LOAD_MY_BOOKMARK_REQUEST });
          } else {
            router.push('/myprofile');
          }
        }}
      >
        북마크 보기
      </span>
    </MessageBox>
  );
};

BookmarkMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default BookmarkMessage;
