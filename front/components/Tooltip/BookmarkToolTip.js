import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  position: absolute;
  top: -30px;
  left: -15px;
  display: none;
  border-radius: 8px;
  background-color: #666;
  width: 50px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: white;
  opacity: 0.8;
  @media (min-width: 765px) {
    top: -30px;
    left: -20px;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 7px solid transparent;
  border-top: 7px solid #666;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  position: absolute;
  top: 18px;
  right: 5px;
`;

const BookmarkToolTip = () => {
  return (
    <Message>
      북마크
      <Triangle />
    </Message>
  );
};

export default BookmarkToolTip;
