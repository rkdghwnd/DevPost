import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMENT_MODAL_CLOSE_REQUEST,
  LOG_IN_MODAL_OPEN,
} from '../../../reducers/modal';
import CommentInputDesktop from '../../Post/CommentInputDesktop';
import CommentInner from './CommentInner';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);

  @media (min-width: 765px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CommentForm = styled.div`
  @keyframes commentModalslideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes commentModalslideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.commentModalSlideUp
      ? 'commentModalslideUp'
      : 'commentModalslideDown'};
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 5px;
  background-color: white;
  padding: 20px;

  & > div {
    position: relative;
    margin-bottom: 10px;
  }
  & > div > h4 {
    text-align: center;
    font-weight: 500;
    font-size: 16px;
  }

  @media (min-width: 765px) {
    position: relative;
    width: 600px;
    max-height: 900px;
  }
`;

const CloseButton = styled(AiOutlineClose)`
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
`;

const LogInBox = styled.div`
  padding: 20px;
  color: rgb(200, 200, 200);
  cursor: pointer;
`;

const CommentModal = () => {
  const { commentModalSlideUp } = useSelector(state => state.modal);
  const { currentPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const commentCount =
    currentPost?.Comments.length +
    currentPost?.Comments.reduce(
      (acc, cur) => acc + cur?.Nested_Comments.length,
      0,
    );
  const addInfo = {
    user: me,
    content: '',
    purpose: 'add',
    onClose: () => {},
  };
  const dispatch = useDispatch();

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
