import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentsWrapper = styled.div`
  @media (min-width: 765px) {
    transform: translateY(80px);
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 0 10px 25px 10px;
  }
  border-radius: 5px;
`;
const MainContentsWrapper = ({ children }) => {
  return <ContentsWrapper>{children}</ContentsWrapper>;
};

MainContentsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContentsWrapper;
