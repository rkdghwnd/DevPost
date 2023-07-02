import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MessageBox } from './styles';

const BookmarkMessage = ({ message }) => {
  return (
    <MessageBox>
      <span>{message}</span>
      <Link href={`/myprofile`}>
        <a>북마크 보기</a>
      </Link>
    </MessageBox>
  );
};

BookmarkMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default BookmarkMessage;
