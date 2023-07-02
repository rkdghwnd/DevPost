import React from 'react';
import PropTypes from 'prop-types';
import { MessageBox } from './styles';

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
