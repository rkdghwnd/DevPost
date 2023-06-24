import React, { useCallback } from 'react';
import { FaSmile, FaRegComment } from 'react-icons/fa';
import { CiShare1 } from 'react-icons/ci';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_MODAL_OPEN, SHARE_MODAL_OPEN } from '../../../reducers/modal';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../../reducers/post';
import { PostFooterButtonForm } from './styles';

const PostFooter = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { currentPost } = useSelector(state => state.post);
  const isAlreadyLike = currentPost?.Likers.some(v => v.id === me?.id);
  const likeColor = isAlreadyLike ? { color: 'orange' } : { color: '' };

  const onClickLikeButton = useCallback(() => {
    if (me) {
      // 좋아요를 이미 누른 상태인지 아닌지
      if (isAlreadyLike) {
        dispatch({
          type: UNLIKE_POST_REQUEST,
          data: currentPost.id,
          mode: 'post',
        });
      } else {
        dispatch({
          type: LIKE_POST_REQUEST,
          data: currentPost.id,
          mode: 'post',
        });
      }
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, isAlreadyLike, currentPost]);

  const onClickCommentButton = useCallback(() => {
    if (me) {
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me]);

  const onClickShareButton = useCallback(() => {
    dispatch({ type: SHARE_MODAL_OPEN });
  }, []);

  return (
    <>
      <PostFooterButtonForm>
        <div onClick={onClickLikeButton} style={likeColor}>
          <FaSmile />
          <span>좋아요</span>
        </div>
        <div onClick={onClickCommentButton}>
          <FaRegComment />
          <span>댓글쓰기</span>
        </div>
        <div onClick={onClickShareButton}>
          <CiShare1 />
          <span>공유하기</span>
        </div>
      </PostFooterButtonForm>
    </>
  );
};

PostFooter.propTypes = {
  post: PropTypes.object,
};

export default PostFooter;
