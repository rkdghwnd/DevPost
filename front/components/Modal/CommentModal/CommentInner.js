import React from 'react';
import styled from 'styled-components';
import Comment from '../../Post/Comment';
import { FaRegCommentDots } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const EmptyCommentForm = styled.div`
  border-top: 2px solid #f5f6f7;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(217, 217, 217);
  border-bottom: 1px solid #f5f6f7;

  & > :first-child {
    font-size: 35px;
    margin-bottom: 20px;
  }
`;
const CommentWrapper = styled.div`
  overflow-y: auto;
  max-height: 820px;
  @media (min-width: 765px) {
    max-height: 670px;
  }
`;
const CommentInner = () => {
  const { currentPost } = useSelector(state => state.post);

  return (
    <CommentWrapper>
      {currentPost?.Comments.length === 0 ? (
        <EmptyCommentForm>
          <FaRegCommentDots />
          <span>첫 댓글을 남겨주세요</span>
        </EmptyCommentForm>
      ) : (
        currentPost?.Comments.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })
      )}
    </CommentWrapper>
  );
};

export default CommentInner;
