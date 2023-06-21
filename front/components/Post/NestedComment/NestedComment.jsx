import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';
import { NESTED_COMMENT_INPUT_VISIBLE } from '../../../reducers/option';
import { CommentForm, ReplyIcon, CommentBody, CommentSubMenu } from './styles';
import CommentInputDesktop from '../CommentInputDesktop/CommentInputDesktop';

const NestedComment = ({ nestedComment, commentId, commentInput }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { currentPost } = useSelector(state => state.post);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const dayTime = `${nestedComment.createdAt.slice(
    0,
    10,
  )} ${nestedComment.createdAt.slice(11, 19)}`;
  const updateInfo = {
    user: me,
    content: nestedComment.content,
    purpose: 'update reply',
    commentId: nestedComment.CommentId,
    nestedCommentId: nestedComment.id,
    onClose: () => {
      setUpdateVisible(false);
    },
    commentInput,
  };
  const replyInfo = {
    user: me,
    content: '',
    purpose: 'add reply',
    commentId: nestedComment.CommentId,
    onClose: () => {
      setReplyVisible(false);
    },
    target: nestedComment.User.nickname,
    commentInput,
  };
  const removeComment = useCallback(() => {
    dispatch({
      type: CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
      commentId: commentId,
      nestedCommentId: nestedComment.id,
    });
  }, [currentPost]);

  const onToggleUpdate = useCallback(() => {
    setUpdateVisible(!updateVisible);
    setReplyVisible(false);
    dispatch({ type: NESTED_COMMENT_INPUT_VISIBLE });
  }, [updateVisible]);

  const onToggleReply = useCallback(() => {
    if (me) {
      setReplyVisible(!replyVisible);
      setUpdateVisible(false);
      dispatch({ type: NESTED_COMMENT_INPUT_VISIBLE });
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, replyVisible]);

  return (
    <>
      <CommentForm>
        <ReplyIcon />
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${nestedComment.User.profile_img}`}
        />
        <div>
          <h4>{nestedComment.User.nickname}</h4>
          <CommentBody>
            <span>{nestedComment.target}</span>
            {` ${nestedComment.content}`}
          </CommentBody>
          <CommentSubMenu>
            <span>{dayTime}</span>
            <span onClick={onToggleReply}>답글 달기</span>
            {nestedComment.User.id === me?.id ? (
              <>
                <span onClick={removeComment}>삭제 하기</span>
                <span onClick={onToggleUpdate}>수정하기</span>
              </>
            ) : null}
          </CommentSubMenu>
        </div>
      </CommentForm>
      {updateVisible ? (
        <>
          <CommentInputDesktop info={updateInfo} />
        </>
      ) : null}
      {replyVisible ? (
        <>
          <CommentInputDesktop info={replyInfo} />
        </>
      ) : null}
    </>
  );
};

NestedComment.propTypes = {
  nestedComment: PropTypes.object,
  commentId: PropTypes.number,
  commentInput: PropTypes.obejct,
};

export default NestedComment;
