import React, { useEffect, useState } from 'react';
import Comment from '../../Post/Comment/Comment';
import { FaRegCommentDots } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { CommentWrapper, EmptyCommentForm } from './styles';
import NestedComment from '../../Post/NestedComment/NestedComment';
import CommentPagination from '../ComentPagination/CommentPagination';

const CommentInner = () => {
  const { currentPost } = useSelector(state => state.post);
  const totalPageCount = (parseInt(currentPost?.Comments.length / 20) || 0) + 1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(totalPageCount);
  }, [totalPageCount]);

  return (
    <CommentWrapper>
      {currentPost?.Comments.length === 0 ? (
        <EmptyCommentForm>
          <FaRegCommentDots />
          <span>첫 댓글을 남겨주세요</span>
        </EmptyCommentForm>
      ) : (
        currentPost?.Comments.map(comment => {
          if (comment.CommentId) {
            return <NestedComment key={comment.id} nestedComment={comment} />;
          } else {
            return <Comment key={comment.id} comment={comment} />;
          }
        }).slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20)
      )}
      <CommentPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
      />
    </CommentWrapper>
  );
};

export default CommentInner;
