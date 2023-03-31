import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BsFillFilePostFill } from 'react-icons/bs';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../reducers/modal';

const CommentForm = styled.article`
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
  cursor: pointer;
  img {
    width: 35px;
    height: 35px;
    border-radius: 13px;
  }
  & > div {
    margin-left: 10px;
    font-size: 14px;
  }
`;

const CommentBody = styled.p`
  margin: 5px 0;
  line-height: 20px;
`;

const CommentSubInfo = styled.div`
  font-size: 13px;
  margin-top: 5px;
  color: rgb(130, 130, 130);

  & > span:first-child {
    margin-right: 5px;
  }
  & > span:not(:first-child) {
    margin-left: 7px;
    font-weight: 700;
    color: rgb(100, 100, 100);
  }
`;

const PostTitle = styled.h4`
  color: rgb(190, 190, 190);
  font-weight: 400;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const PostIcon = styled(BsFillFilePostFill)`
  margin-right: 5px;
  vertical-align: bottom;
`;

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
