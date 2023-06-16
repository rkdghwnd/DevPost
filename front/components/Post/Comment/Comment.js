import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CommentInputDesktop from './CommentInputDesktop';
import NestedComment from './NestedComment';
import {
  CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';

const CommentForm = styled.article`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
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

const CommentBody = styled.div`
  width: 100%;
  white-space: pre-wrap;
  margin: 5px 0;
  line-height: 20px;
`;

const CommentSubMenu = styled.div`
  font-size: 13px;
  padding: 5px 0;
  color: rgb(130, 130, 130);
  cursor: pointer;

  & > span:first-child {
    margin-right: 5px;
  }
  & > span:not(:first-child) {
    margin-left: 7px;
    font-weight: 700;
    color: rgb(100, 100, 100);
    padding: 5px;
  }
  & > span:not(:first-child):hover {
    border-radius: 10px;
    background-color: rgb(245, 245, 245);
    transition: background-color 0.3s ease-out;
  }
`;

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const dayTime = `${comment.createdAt.slice(0, 10)} ${comment.createdAt.slice(
    11,
    19,
  )}`;

  const updateInfo = {
    user: me,
    content: comment.content,
    commentId: comment.id,
    purpose: 'update',
    onClose: () => {
      setUpdateVisible(false);
    },
  };

  const replyInfo = {
    user: me,
    content: '',
    commentId: comment.id,
    purpose: 'add reply',
    nestedCommentId: 0,
    onClose: () => {
      setReplyVisible(false);
    },
    target: comment.User.nickname,
  };

  const removeComment = useCallback(() => {
    dispatch({
      type: CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
      commentId: comment.id,
      commentTarget: 'comment',
    });
  }, []);

  const onToggleUpdate = useCallback(() => {
    if (me) {
      setUpdateVisible(!updateVisible);
      setReplyVisible(false);
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, updateVisible]);

  const onToggleReply = useCallback(() => {
    if (me) {
      setReplyVisible(!replyVisible);
      setUpdateVisible(false);
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, replyVisible]);

  return (
    <>
      <CommentForm>
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${comment.User.profile_img}`}
        />
        <div>
          <h4>{comment.User.nickname}</h4>
          <CommentBody>{comment.content}</CommentBody>
          <CommentSubMenu>
            <span>{dayTime}</span>
            <span onClick={onToggleReply}>답글 달기</span>
            {comment.User.id === me?.id ? (
              <>
                <span onClick={removeComment}>삭제 하기</span>
                <span onClick={onToggleUpdate}>수정하기</span>
              </>
            ) : null}
          </CommentSubMenu>
        </div>
      </CommentForm>
      {replyVisible ? (
        <>
          <CommentInputDesktop info={replyInfo} />
        </>
      ) : null}
      {updateVisible ? (
        <>
          <CommentInputDesktop info={updateInfo} />
        </>
      ) : null}
      {comment.Nested_Comments.map(v => {
        return (
          <NestedComment key={v.id} nestedComment={v} commentId={comment.id} />
        );
      })}
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
