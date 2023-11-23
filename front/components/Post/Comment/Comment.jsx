import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CommentInputDesktop from '../CommentInputDesktop/CommentInputDesktop';
import {
  CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';
import { CommentForm, CommentBody, CommentSubMenu } from './styles';
import Image from 'next/image';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const offset = 1000 * 60 * 60 * 9;
  const CommentTime = new Date(
    new Date(comment.createdAt).getTime() + offset,
  ).toISOString();
  const writtenTime = `${CommentTime.slice(0, 10)} ${CommentTime.slice(
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
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${comment.User.profile_img}`}
          />
        </div>
        <div>
          <h4>{comment.User.nickname}</h4>
          <CommentBody>{comment.content}</CommentBody>
          <CommentSubMenu>
            <span>{writtenTime}</span>
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
      {replyVisible ? <>{<CommentInputDesktop info={replyInfo} />}</> : null}
      {updateVisible ? <>{<CommentInputDesktop info={updateInfo} />}</> : null}
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
