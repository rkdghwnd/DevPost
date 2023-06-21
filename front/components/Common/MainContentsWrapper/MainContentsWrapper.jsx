import React from 'react';
import PropTypes from 'prop-types';
import { ContentsWrapper } from './styles';

const MainContentsWrapper = ({ children }) => {
  return <ContentsWrapper>{children}</ContentsWrapper>;
};

MainContentsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContentsWrapper;
