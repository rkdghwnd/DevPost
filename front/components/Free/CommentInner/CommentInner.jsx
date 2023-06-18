import React from 'react';
import Comment from '../../Post/Comment/Comment';
import { FaRegCommentDots } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { CommentWrapper, EmptyCommentForm } from './styles';

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
