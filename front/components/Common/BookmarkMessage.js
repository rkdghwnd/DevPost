import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const MessageBox = styled.div`
  width: 300px;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 35px;
  background-color: rgb(47, 52, 56);
  border-radius: 10px;
  right: calc(50% - 150px);

  & > span {
    color: white;
  }

  & > a {
    margin-left: 10px;
    color: skyblue;
    text-decoration: none;
  }

  @keyframes likeMessageSlideUp {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes likeMessageFade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateY(-50px);
    }
  }

  animation-name: likeMessageSlideUp;
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-out;
`;

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
