import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CommentInputDesktop from './CommentInputDesktop';
import { BsArrowReturnRight } from 'react-icons/bs';
import {
  CONFIRM_REMOVE_COMMENT_MODAL_OPEN,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';
import { NESTED_COMMENT_INPUT_VISIBLE } from '../../../reducers/option';

const CommentForm = styled.article`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
  margin-left: 15px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 13px;
  }
  & > div {
    margin-left: 10px;
    font-size: 14px;
  }
  background-color: rgb(250, 250, 250);
`;

const CommentBody = styled.p`
  margin: 5px 0;
  line-height: 20px;
  & > span {
    color: #aaa;
  }
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
  }
`;
const ReplyIcon = styled(BsArrowReturnRight)`
  /* style={{ marginRight: '10px', color: RiGitBranchFill }} */
  margin-right: 10px;
  /* color: rgb(150, 150, 150); */
`;

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
