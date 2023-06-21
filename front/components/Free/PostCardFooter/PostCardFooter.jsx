import React from 'react';
import { FaSmile, FaCommentDots } from 'react-icons/fa';
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
import LikeToolTip from '../LikeToolTip/LikeToolTip';
import BookmarkToolTip from '../BookmarkToolTip/BookmarkToolTip';
import CommentToolTip from '../CommentToolTip/CommentToolTip';
import {
  BookmarkButton,
  BsFillBookmarkIcon,
  CommentButton,
  FooterForm,
  LikeButton,
} from './styles';

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
