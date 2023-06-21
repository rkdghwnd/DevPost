import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../../../reducers/modal';
import {
  CommentForm,
  CommentBody,
  PostTitle,
  PostIcon,
  CommentSubInfo,
} from './styles';

const ShortComment = ({ comment }) => {
  const dispatch = useDispatch();
  const dayTime = `${comment.createdAt.slice(0, 10)} ${comment.createdAt.slice(
    11,
    19,
  )}`;

  const onCloseModal = useCallback(() => {
    dispatch({ type: USER_INFO_MODAL_CLOSE_REQUEST });
  }, []);

  return (
    <Link href={`/post/${encodeURIComponent(comment.Post?.id)}`}>
      <CommentForm onClick={onCloseModal}>
        <div>
          <CommentBody>{comment.content}</CommentBody>
          <PostTitle>
            <PostIcon />
            {comment.Post?.title}
          </PostTitle>
          <CommentSubInfo>
            <span>{dayTime}</span>
          </CommentSubInfo>
        </div>
      </CommentForm>
    </Link>
  );
};

ShortComment.propTypes = {
  comment: PropTypes.object,
};

export default ShortComment;
