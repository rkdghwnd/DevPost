import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_COMMENT_REQUEST,
  ADD_NESTED_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
  UPDATE_NESTED_COMMENT_REQUEST,
} from '../../../reducers/post';
import PropTypes from 'prop-types';
import { MESSAGE_MODAL_TOGGLE_REQUEST } from '../../../reducers/modal';
import {
  CommentInputWrapper,
  CommentInput,
  ButtonWrapper,
  CloseInputButton,
  AddCommentButton,
} from './styles';

const CommentInputDesktop = ({ info }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState(info.content);
  const { currentPost } = useSelector(state => state.post);
  const textarea = useRef();

  const onChangeTextarea = useCallback(
    e => {
      setCommentText(e.currentTarget.value);

      if (e.currentTarget.value.length > 500) {
        dispatch({
          type: MESSAGE_MODAL_TOGGLE_REQUEST,
          message: '댓글은 500자 이내로 입력 가능합니다.',
        });
        setCommentText(e.currentTarget.value.slice(0, 500));
      }

      textarea.current.style.height = 'auto'; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight - 18 + 'px';
    },
    [textarea],
  );

  const requestComment = useCallback(() => {
    if (info.purpose === 'add') {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          content: commentText,
          postId: currentPost.id,
        },
      });
      setCommentText('');
      textarea.current.style.height = 'auto'; //height 초기화
    } else if (info.purpose === 'update') {
      dispatch({
        type: UPDATE_COMMENT_REQUEST,
        data: {
          commentId: info.commentId,
          postId: currentPost.id,
          content: commentText,
        },
      });
      info.onClose();
    } else if (info.purpose === 'add reply') {
      dispatch({
        type: ADD_NESTED_COMMENT_REQUEST,
        data: {
          commentId: info.commentId,
          postId: currentPost.id,
          content: commentText,
          target: info.target,
        },
      });
      info.onClose();
    } else if (info.purpose === 'update reply') {
      dispatch({
        type: UPDATE_NESTED_COMMENT_REQUEST,
        data: {
          commentId: info.commentId,
          postId: currentPost.id,
          content: commentText,
          nestedCommentId: info.nestedCommentId,
        },
      });
      info.onClose();
    }
  }, [currentPost, commentText, info]);

  const onCloseInput = useCallback(() => {
    info.onClose();
  }, []);

  return (
    <CommentInputWrapper purpose={info.purpose}>
      <CommentInput>
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${info.user.profile_img}`}
        ></img>
        <textarea
          placeholder="댓글을 입력하세요"
          ref={textarea}
          rows={2}
          value={commentText}
          onChange={onChangeTextarea}
          autoFocus
        ></textarea>
      </CommentInput>
      <ButtonWrapper>
        {(info.purpose === 'update' ||
          info.purpose === 'add reply' ||
          info.purpose === 'update reply') && (
          <CloseInputButton onClick={onCloseInput}>닫기</CloseInputButton>
        )}
        <AddCommentButton onClick={requestComment}>댓글 입력</AddCommentButton>
      </ButtonWrapper>
    </CommentInputWrapper>
  );
};

CommentInputDesktop.propTypes = {
  info: PropTypes.object,
};

export default CommentInputDesktop;
