import React, { useCallback, useEffect } from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import Comment from '../../components/Post/Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { FaRegCommentDots } from 'react-icons/fa';
import { LOG_IN_MODAL_OPEN } from '../../reducers/modal';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import Custom404 from '../404';
import Head from 'next/head';
import { EmptyCommentForm, LogInBox, PostForm } from './styles';
import PostMenu from '../../components/Post/PostMenu';
import PostMainText from '../../components/Post/PostMainText/PostMainText';
import PostFooter from '../../components/Post/PostFooter/PostFooter';
import CommentInputDesktop from '../../components/Post/CommentInputDesktop/CommentInputDesktop';
import PostOption from '../../components/Post/PostOption/PostOption';
import PostLoading from '../../components/Post/PostLoading/PostLoading';
import TopScroll from '../../components/HotDeal/TopScroll/TopScroll';
import DesktopHeader from '../../components/Common/DesktopHeader/DesktopHeader';
import { LOADING, REJECTED, SUCCEEDED } from '../../reducers';
import { useRouter } from 'next/router';

const post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { postOptionVisible } = useSelector(state => state.option);
  const { currentPost, loadPostStatus, removePostStatus } = useSelector(
    state => state.post,
  );
  const { me } = useSelector(state => state.user);

  const addInfo = {
    user: me,
    content: '',
    purpose: 'add',
    onClose: () => {},
  };

  const onClickLogInBox = useCallback(() => {
    dispatch({ type: LOG_IN_MODAL_OPEN });
  }, []);

  useEffect(() => {
    if (removePostStatus === SUCCEEDED) {
      router.push(`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}`);
    }
  }, [removePostStatus, router]);

  if (loadPostStatus === REJECTED) {
    return <Custom404 />;
  }

  if (loadPostStatus === LOADING || !currentPost) {
    return <PostLoading />;
  }

  return (
    <>
      <Head>
        <title>{currentPost.title} - DevPost</title>
      </Head>
      <DesktopHeader />
      <PostForm>
        <PostMenu />
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
      <TopScroll />
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
    data: context.params.postId,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST, // 로그인 유지
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default post;
