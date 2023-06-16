import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ADD_COMMENT_REQUEST,
  ADD_NESTED_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
  UPDATE_NESTED_COMMENT_REQUEST,
} from '../../../reducers/post';
import PropTypes from 'prop-types';
import { MESSAGE_MODAL_TOGGLE_REQUEST } from '../../../reducers/modal';

const CommentInputWrapper = styled.section`
  padding: 15px;
`;
const CommentInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > img {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    border-radius: 10px;
  }

  & > textarea {
    all: unset;
    width: 100%;
    height: auto;
    word-break: break-all;
    border-radius: 5px;
    border: 1px solid rgb(200, 200, 200);
    background-color: rgb(240, 240, 240);
    padding: 10px;
    font-size: 14px;
  }
  & > textarea:focus {
    border: 1px solid skyblue;
    box-shadow: 0 0 3px blue;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    height: 20px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
  }
  & > :hover {
    border-radius: 10px;
    background-color: rgb(245, 245, 245);
    transition: background-color 0.3s ease-out;
  }
`;

const CloseInputButton = styled.div`
  width: 40px;
  padding: 2px;
`;

const AddCommentButton = styled.div`
  width: 80px;
  padding: 2px;
`;

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
    <CommentInputWrapper>
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
