import React, { useCallback } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import styled from 'styled-components';
import { POST_OPTION_TOGGLE_REQUEST } from '../../reducers/option';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_REQUEST,
} from '../../reducers/post';
import { LOG_IN_MODAL_OPEN } from '../../reducers/modal';
import { useRouter } from 'next/router';

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  font-size: 20px;

  & > :nth-child(1) {
    cursor: pointer;
    position: absolute;
    left: 0;
  }
  & > :nth-child(2) {
    margin-right: 10px;
    cursor: pointer;
  }
  & > :nth-child(3) {
    cursor: pointer;
    margin-right: 10px;
  }

  border-bottom: 1px solid rgb(250, 250, 250);
  padding-bottom: 20px;
`;

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
