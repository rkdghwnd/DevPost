import React from 'react';
import CommentSkeleton from '../../Post/CommentSkeleton/CommentSkeleton';
import {
  PostForm,
  PostMenu,
  MainTextForm,
  PostUserInfo,
  PostTitle,
  PostBody,
  ViewsCommentsLiked,
  PostFooterButtonForm,
} from './styles';
import AppHeader from '../../Common/AppHeader/AppHeader';

const post = () => {
  return (
    <>
      <AppHeader />
      <PostForm>
        <PostMenu>
          <span></span>
          <span></span>
          <span></span>
        </PostMenu>
        <MainTextForm>
          <PostUserInfo>
            <div />
            <span></span>
            <span></span>
          </PostUserInfo>
          <PostTitle></PostTitle>
          <PostBody />
          <PostBody />
          <PostBody />
          <PostBody />
          <ViewsCommentsLiked>
            <span></span>
            <span></span>
            <span></span>
          </ViewsCommentsLiked>
        </MainTextForm>
        <PostFooterButtonForm>
          <div></div>
          <div></div>
          <div></div>
        </PostFooterButtonForm>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </PostForm>
    </>
  );
};

export default post;
