import React from 'react';
import styled from 'styled-components';
import { FaSmile, FaCommentDots } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { COMMENT_MODAL_OPEN, LOG_IN_MODAL_OPEN } from '../../../reducers/modal';
import {
  ADD_BOOKMARK_REQUEST,
  LIKE_POST_REQUEST,
  REMOVE_BOOKMARK_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../../../reducers/post';
import LikeToolTip from './ToolTip/LikeToolTip';
import BookmarkToolTip from './ToolTip/BookmarkToolTip';
import CommentToolTip from './ToolTip/CommentToolTip';

const FooterForm = styled.div`
  margin: 5px 0;

  & > button {
    all: unset;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 4px;
    padding: 1px 6px 4px 6px;
    cursor: pointer;
    color: rgb(217, 217, 217);
    margin-right: 10px;
    position: relative;
  }
  & > button:first-child:hover {
    & > :last-child {
      display: block;
    }
  }
  & > button:nth-child(2):hover {
    & > :last-child {
      display: block;
    }
  }
  & > button:last-child:hover {
    & > :last-child {
      display: block;
    }
  }

  & > button > :first-child {
    vertical-align: middle;
  }
  & > button:last-child {
    width: 25px;
    float: right;
    text-align: center;
  }
  & > button:last-child:after {
    content: '';
    clear: both;
  }
  span {
    margin-left: 5px;
    font-size: 13px;
  }
`;

const LikeButton = styled.button``;
const CommentButton = styled.button``;
const BookmarkButton = styled.button``;
const BsFillBookmarkIcon = styled(BsFillBookmarkFill)`
  vertical-align: middle;
`;

const PostCardFooter = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  const commentCount =
    post?.Comments.length +
    post?.Comments.reduce((acc, cur) => acc + cur.Nested_Comments.length, 0);

  const isAlreadyLike = post?.Likers.some(v => v.id === me?.id);
  const isAlreadyBookmark = post?.Bookmarkers.some(v => v.id === me?.id);

  const clikedStyle = {
    color: 'orange',
    backgroundColor: 'rgb(247, 244, 235)',
    border: '1px solid transparent',
  };

  const likeColor = isAlreadyLike ? clikedStyle : {};
  const isExistComment = post?.Comments.some(v => {
    if (v.User.id === me?.id) {
      return true;
    }
    if (v.Nested_Comments.some(vv => vv.User.id === me?.id)) {
      return true;
    }
    return false;
  })
    ? clikedStyle
    : {};

  const bookmarkColor = isAlreadyBookmark ? clikedStyle : {};

  const onClickLikeButton = useCallback(() => {
    if (me) {
      // 좋아요를 이미 누른 상태인지 아닌지
      if (isAlreadyLike) {
        dispatch({
          type: UNLIKE_POST_REQUEST,
          postId: post.id,
          mode: 'post_card',
        });
      } else {
        dispatch({
          type: LIKE_POST_REQUEST,
          postId: post.id,
          mode: 'post_card',
        });
      }
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, isAlreadyLike]);

  const onToggleCommentModal = useCallback(() => {
    dispatch({
      type: COMMENT_MODAL_OPEN,
      postId: post?.id,
      open: true,
    });
  }, []);

  const onClickBookmarkButton = useCallback(() => {
    if (me) {
      if (isAlreadyBookmark) {
        dispatch({
          type: REMOVE_BOOKMARK_REQUEST,
          postId: post?.id,
          mode: 'post_card',
        });
      } else {
        dispatch({
          type: ADD_BOOKMARK_REQUEST,
          postId: post?.id,
          mode: 'post_card',
        });
      }
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, isAlreadyBookmark]);

  return (
    <FooterForm>
      <LikeButton onClick={onClickLikeButton} style={likeColor}>
        <FaSmile />
        <span>{post?.Likers.length}</span>
        <LikeToolTip />
      </LikeButton>

      <CommentButton onClick={onToggleCommentModal} style={isExistComment}>
        <FaCommentDots />
        <span>{commentCount}</span>
        <CommentToolTip />
      </CommentButton>
      <BookmarkButton onClick={onClickBookmarkButton} style={bookmarkColor}>
        <BsFillBookmarkIcon />
        <BookmarkToolTip />
      </BookmarkButton>
    </FooterForm>
  );
};

PostCardFooter.propTypes = {
  post: PropTypes.object,
};

export default PostCardFooter;
