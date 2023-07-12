import React, { useCallback } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import { POST_OPTION_TOGGLE_REQUEST } from '../../../reducers/option';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_REQUEST,
} from '../../../reducers/post';
import { LOG_IN_MODAL_OPEN } from '../../../reducers/modal';
import { useRouter } from 'next/router';
import { Menu } from './styles';

const PostMenu = () => {
  const dispatch = useDispatch();
  const { currentPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const router = useRouter();

  const isMyPost = me?.id === currentPost?.UserId;
  const isAlreadyBookmark = currentPost?.Bookmarkers.some(v => v.id === me?.id);
  const clikedStyle = { color: 'orange' };
  const bookmarkColor = isAlreadyBookmark ? clikedStyle : {};

  const onClickPostOption = useCallback(e => {
    dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
    e.stopPropagation();
  }, []);
  const onClickBookmarkButton = useCallback(() => {
    if (me) {
      if (isAlreadyBookmark) {
        dispatch({
          type: REMOVE_BOOKMARK_REQUEST,
          data: currentPost.id,
          mode: 'post',
        });
      } else {
        dispatch({
          type: ADD_BOOKMARK_REQUEST,
          data: currentPost.id,
          mode: 'post',
        });
      }
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, isAlreadyBookmark, currentPost]);

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Menu>
      <AiOutlineArrowLeft onClick={onClickBack} />
      <BsBookmark onClick={onClickBookmarkButton} style={bookmarkColor} />
      {isMyPost && <BsThreeDots onClick={onClickPostOption} />}
    </Menu>
  );
};

export default PostMenu;
