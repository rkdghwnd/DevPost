import React from 'react';
import styled from 'styled-components';

const CommentForm = styled.article`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f6f7;
  div:first-child {
    width: 35px;
    height: 35px;
    border-radius: 13px;
    animation: pulse 2s infinite ease-in-out;
    margin-left: 0;
  }
  & > div {
    margin-left: 10px;
    font-size: 14px;
  }

  & > div > h4 {
    width: 60px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
`;
const CommentBody = styled.p`
  width: 300px;
  height: 20px;
  margin: 5px 0;
  line-height: 20px;
  animation: pulse 2s infinite ease-in-out;
`;

const CommentSubMenu = styled.div`
  padding: 5px 0;

  cursor: pointer;
  & > span:first-child {
    margin-right: 5px;
  }
  & > span:not(:first-child) {
    margin-left: 7px;
  }
  & > span {
    display: inline-block;
    width: 70px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
`;

const CommentSkeleton = () => {
  return (
    <CommentForm>
      <div />
      <div>
        <h4></h4>
        <CommentBody></CommentBody>
        <CommentSubMenu>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </CommentSubMenu>
      </div>
    </CommentForm>
  );
};

export default CommentSkeleton;
