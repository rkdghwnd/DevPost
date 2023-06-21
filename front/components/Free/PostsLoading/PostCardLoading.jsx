import React from 'react';
import {
  PostCardForm,
  PostCardHeader,
  MainTextWrapper,
  MainTextForm,
  FooterForm,
  LikeButton,
  CommentButton,
  BookmarkButton,
} from './styles';

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
