import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MainTextForm = styled.section`
  padding-top: 10px;
  word-break: break-all;
`;
const PostUserInfo = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    margin-right: 10px;
  }
  span:last-child {
    position: absolute;
    right: 0;
  }
`;

const PostTitle = styled.h3`
  font-weight: 400;
`;

const PostBody = styled.article`
  line-height: 24px;
  margin-top: 20px;
  & > div:first-child {
    white-space: pre-wrap;
  }
  & > textarea {
    all: unset;
    width: 100%;
    overflow: hidden;
  }
`;

const ViewsCommentsLiked = styled.div`
  font-size: 14px;
  margin: 15px 0;
  color: rgb(160, 160, 160);
  & > span:not(:last-child) {
    margin-right: 10px;
  }
`;

const PostMainText = () => {
  const { currentPost } = useSelector(state => state.post);
  const year = currentPost.createdAt.slice(0, 4);
  const month = currentPost.createdAt.slice(5, 7);
  const day = currentPost.createdAt.slice(8, 10);
  const commentCount =
    currentPost.Comments.length +
    currentPost.Comments.reduce(
      (acc, cur) => acc + cur?.Nested_Comments.length,
      0,
    );

  return (
    <MainTextForm>
      <PostUserInfo>
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${currentPost.User.profile_img}`}
        />

        <span>{currentPost.User.nickname}</span>
        <span>{`${year}년 ${month}월 ${day}일`}</span>
      </PostUserInfo>
      <PostTitle>{currentPost.title}</PostTitle>
      <PostBody>
        <div>{currentPost.content}</div>
        <br />
        {currentPost.Images.length !== 0 &&
          currentPost.Images.map(image => {
            return (
              <img
                key={image.id}
                src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${image.src}`}
                style={{
                  maxWidth: '100%',
                }}
              ></img>
            );
          })}
      </PostBody>
      <ViewsCommentsLiked>
        <span>조회 {currentPost.views}회</span>
        <span>
          댓글
          {` ${commentCount}`}
        </span>
        <span>공감 {currentPost.Likers.length}</span>
      </ViewsCommentsLiked>
    </MainTextForm>
  );
};

export default PostMainText;
