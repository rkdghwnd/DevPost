import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMENT_MODAL_CLOSE_REQUEST,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';
import CommentInputDesktop from '../../Post/CommentInputDesktop/CommentInputDesktop';
import CommentInner from '../CommentInner/CommentInner';
import { ModalBackdrop, CommentForm, CloseButton, LogInBox } from './styles';

const CommentModal = () => {
  const dispatch = useDispatch();
  const { commentModalSlideUp } = useSelector(state => state.modal);
  const { currentPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const commentCount = currentPost?.Comments.length;
  const addInfo = {
    user: me,
    content: '',
    purpose: 'add',
    onClose: () => {},
  };

  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onToggleCommentModal = useCallback(() => {
    dispatch({ type: COMMENT_MODAL_CLOSE_REQUEST });
  }, []);

  const onClickLogInBox = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_OPEN });
  }, []);

  return (
    <ModalBackdrop>
      <CommentForm
        onClick={onStopEventBubbling}
        commentModalSlideUp={commentModalSlideUp}
      >
        <div>
          <h4>댓글 {commentCount}개</h4>
          <CloseButton onClick={onToggleCommentModal} />
        </div>
        {me ? null : (
          <LogInBox onClick={onClickLogInBox}>로그인이 필요합니다.</LogInBox>
        )}
        <CommentInner />
        {me && <CommentInputDesktop info={addInfo} />}
      </CommentForm>
    </ModalBackdrop>
  );
};

CommentModal.propTypes = {
  onClickComment: PropTypes.func.isRequired,
  isOpenedComment: PropTypes.bool.isRequired,
};

export default CommentModal;
