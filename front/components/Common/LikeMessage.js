import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MessageBox = styled.div`
  width: 300px;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 35px;
  background-color: rgb(47, 52, 56);
  & > span {
    color: white;
  }
  border-radius: 10px;
  right: calc(50% - 150px);

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

const LikeMessage = ({ message }) => {
  return (
    <MessageBox>
      <span>{message}</span>
    </MessageBox>
  );
};

LikeMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LikeMessage;
