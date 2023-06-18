import React from 'react';
import { CommentForm, CommentBody, CommentSubMenu } from './styles';

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
