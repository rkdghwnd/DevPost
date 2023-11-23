import React from 'react';
import { useSelector } from 'react-redux';
import {
  MainTextForm,
  PostUserInfo,
  PostTitle,
  PostBody,
  ViewsCommentsLiked,
} from './styles';
import Image from 'next/image';

const PostMainText = () => {
  const { currentPost } = useSelector(state => state.post);
  const year = currentPost.createdAt.slice(0, 4);
  const month = currentPost.createdAt.slice(5, 7);
  const day = currentPost.createdAt.slice(8, 10);
  const commentCount = currentPost.Comments.length;

  return (
    <MainTextForm>
      <PostUserInfo>
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${currentPost.User.profile_img}`}
          />
        </div>
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
