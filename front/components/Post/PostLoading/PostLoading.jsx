import React from 'react';
import CommentSkeleton from './Comment/CommentSkeleton';
import DesktopHeader from '../Common/AppLayout/DesktopHeader/DesktopHeader';
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

const post = () => {
  return (
    <>
      <DesktopHeader />
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
