import React, { useCallback } from 'react';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import PostMainText from '../../components/Post/PostMainText';
import PostFooter from '../../components/Post/PostFooter';
import Comment from '../../components/Post/Comment';
import DesktopHeader from '../../components/AppLayout/DesktopHeader/DesktopHeader';
import CommentInputDesktop from '../../components/Post/CommentInputDesktop';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_BOOKMARK_REQUEST,
  LOAD_POST_REQUEST,
  REMOVE_BOOKMARK_REQUEST,
} from '../../reducers/post';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import { POST_OPTION_TOGGLE_REQUEST } from '../../reducers/option';
import PostOption from '../../components/Option/PostOption';
import { FaRegCommentDots } from 'react-icons/fa';
import { LOG_IN_MODAL_OPEN } from '../../reducers/modal';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import PostLoading from '../../components/Loading/PostLoading';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import Custom404 from '../404';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PostForm = styled.section`
  padding: 20px;
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
  @media (min-width: 765px) {
    transform: translateY(80px);
  }
`;
const PostMenu = styled.div`
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

const EmptyCommentForm = styled.div`
  border-top: 2px solid #f5f6f7;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(217, 217, 217);
  border-bottom: 1px solid #f5f6f7;

  & > :first-child {
    font-size: 35px;
    margin-bottom: 20px;
  }
`;

const LogInBox = styled.div`
  padding: 20px;
  color: rgb(200, 200, 200);
  cursor: pointer;
`;

const post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postOptionVisible } = useSelector(state => state.option);
  const { currentPost, loadPostLoading, loadPostError } = useSelector(
    state => state.post,
  );
  const { me } = useSelector(state => state.user);

  const isMyPost = me?.id === currentPost?.UserId;
  const isAleredayBookmark = currentPost?.Bookmarkers.some(
    v => v.id === me?.id,
  );
  const clikedStyle = { color: 'orange' };
  const bookmarkColor = isAleredayBookmark ? clikedStyle : {};

  const addInfo = {
    user: me,
    content: '',
    purpose: 'add',
    onClose: () => {},
  };

  const onClickPostOpition = useCallback(() => {
    if (isMyPost) {
      dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
    }
  }, [isMyPost]);

  const onClickLogInBox = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_OPEN });
  }, []);
  const onClickBookmarkButton = useCallback(() => {
    if (me) {
      if (isAleredayBookmark) {
        dispatch({
          type: REMOVE_BOOKMARK_REQUEST,
          postId: currentPost.id,
          mode: 'post',
        });
      } else {
        dispatch({
          type: ADD_BOOKMARK_REQUEST,
          postId: currentPost.id,
          mode: 'post',
        });
      }
    } else {
      dispatch({ type: LOG_IN_MODAL_OPEN });
    }
  }, [me, isAleredayBookmark, currentPost]);

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (loadPostError) {
    return <Custom404 />;
  }

  if (loadPostLoading || !currentPost) {
    return <PostLoading />;
  }

  return (
    <>
      <Head>
        <title>{currentPost.title} - DevPost</title>
      </Head>
      <DesktopHeader />
      <PostForm>
        <PostMenu>
          <AiOutlineArrowLeft onClick={onClickBack} />
          <BsBookmark onClick={onClickBookmarkButton} style={bookmarkColor} />
          {isMyPost ? <BsThreeDots onClick={onClickPostOpition} /> : null}
        </PostMenu>
        {postOptionVisible ? <PostOption /> : null}
        <PostMainText />
        <PostFooter />
        {currentPost?.Comments.length === 0 ? (
          <EmptyCommentForm>
            <FaRegCommentDots />
            <span>첫 댓글을 남겨주세요</span>
          </EmptyCommentForm>
        ) : (
          currentPost?.Comments.map(comment => {
            return <Comment key={comment.id} comment={comment} />;
          })
        )}
        {me ? (
          <CommentInputDesktop info={addInfo} />
        ) : (
          <LogInBox onClick={onClickLogInBox}>로그인이 필요합니다.</LogInBox>
        )}
      </PostForm>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    postId: context.params.postId,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST, // 로그인 유지
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default post;
