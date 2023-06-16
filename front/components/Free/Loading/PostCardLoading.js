import React from 'react';
import styled from 'styled-components';

const PostCardForm = styled.article`
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(240, 240, 240);
  ul {
    list-style-type: none;
    padding-left: 0;
  }
`;

const PostCardHeader = styled.li`
  display: flex;
  align-items: center;

  div:first-child {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    animation: pulse 2s infinite ease-in-out;
    margin-left: 0;
  }

  div {
    width: 70px;
    height: 15px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    animation: pulse 2s infinite ease-in-out;
  }
`;

const MainTextWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

const MainTextForm = styled.li`
  display: flex;
  justify-content: space-between;

  h4 {
    width: 250px;
    height: 20px;
    margin-top: 10px;
    color: black;
    font-weight: 400;
    animation: pulse 2s infinite ease-in-out;
  }
  p {
    width: 500px;
    height: 15px;
    font-weight: 700;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 17px;
    animation: pulse 2s infinite ease-in-out;
  }
  div:last-child {
    width: 80px;
    height: 80px;
    animation: pulse 2s infinite ease-in-out;
  }
`;

const FooterForm = styled.li`
  margin: 5px 0;
  & > button {
    all: unset;
    border-radius: 4px;
    padding: 1px 6px 4px 6px;
    cursor: pointer;
    color: rgb(217, 217, 217);
    margin-right: 10px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > button > :first-child {
    vertical-align: middle;
  }
  & > button:last-child {
    width: 25px;
    height: 20px;
    float: right;
  }
  & > button:last-child:after {
    content: '';
    clear: both;
  }
  span {
    display: block;
    width: 50px;
    height: 20px;
    margin-left: 5px;
    font-size: 13px;
  }
`;
const LikeButton = styled.button``;
const CommentButton = styled.button``;
const BookmarkButton = styled.button``;

const PostCardLoading = () => {
  return (
    <PostCardForm>
      <ul>
        <PostCardHeader>
          <div></div>
          <div></div>
        </PostCardHeader>
        <MainTextWrapper>
          <MainTextForm>
            <div>
              <h4></h4>
              <p></p>
            </div>
            <div>
              <div></div>
            </div>
          </MainTextForm>
        </MainTextWrapper>
        <FooterForm>
          <LikeButton>
            <span></span>
          </LikeButton>
          <CommentButton>
            <span></span>
          </CommentButton>
          <BookmarkButton></BookmarkButton>
        </FooterForm>
      </ul>
    </PostCardForm>
  );
};

export default PostCardLoading;
