import React, { useCallback } from 'react';
import { BsBookmark, BsFileEarmarkPost } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import {
  LOAD_MY_BOOKMARK_REQUEST,
  LOAD_MY_COMMENTS_REQUEST,
  LOAD_MY_POSTS_REQUEST,
} from '../../../reducers/post';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  MyProfileRecordForm,
  MyPostsButton,
  MyCommentsButton,
  MyBookmarkButton,
} from './styles';

const MyProfileRecordButton = ({
  setPostsVisible,
  setCommentsVisible,
  setBookmarkVisible,
  postsVisible,
  commentsVisible,
  bookmarkVisible,
}) => {
  const dispatch = useDispatch();

  const onClickPosts = useCallback(() => {
    dispatch({ type: LOAD_MY_POSTS_REQUEST });
    setPostsVisible(state => !state);
    setCommentsVisible(false);
    setBookmarkVisible(false);
  }, []);

  const onClickComments = useCallback(() => {
    dispatch({ type: LOAD_MY_COMMENTS_REQUEST });
    setPostsVisible(false);
    setCommentsVisible(state => !state);
    setBookmarkVisible(false);
  }, []);

  const onClickBookmark = useCallback(() => {
    dispatch({ type: LOAD_MY_BOOKMARK_REQUEST });
    setPostsVisible(false);
    setCommentsVisible(false);
    setBookmarkVisible(state => !state);
  }, []);

  return (
    <MyProfileRecordForm>
      <MyPostsButton onClick={onClickPosts} postsVisible={postsVisible}>
        <BsFileEarmarkPost />
        <span>게시글</span>
      </MyPostsButton>
      <MyCommentsButton
        onClick={onClickComments}
        commentsVisible={commentsVisible}
      >
        <FaRegCommentDots />
        <span>댓글</span>
      </MyCommentsButton>
      <MyBookmarkButton
        onClick={onClickBookmark}
        bookmarkVisible={bookmarkVisible}
      >
        <BsBookmark />
        <span>북마크</span>
      </MyBookmarkButton>
    </MyProfileRecordForm>
  );
};

MyProfileRecordButton.propTypes = {
  setPostsVisible: PropTypes.func.isRequired,
  setCommentsVisible: PropTypes.func.isRequired,
  setBookmarkVisible: PropTypes.func.isRequired,
  postsVisible: PropTypes.bool.isRequired,
  commentsVisible: PropTypes.bool.isRequired,
  bookmarkVisible: PropTypes.bool.isRequired,
};

export default MyProfileRecordButton;
