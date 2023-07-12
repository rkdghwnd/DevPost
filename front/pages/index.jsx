import React from 'react';
import PostCard from '../components/Free/PostCard/PostCard';
import { useSelector } from 'react-redux';
import { LOAD_FREE_POSTS_REQUEST } from '../reducers/post';
import shortId from 'shortid';
import axios from 'axios';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import MainContentsWrapper from '../components/Common/MainContentsWrapper/MainContentsWrapper';
import NavBar from '../components/Common/NavBar/NavBar';
import AppLayout from '../components/Common/AppLayout';
import PostsLoading from '../components/Free/PostsLoading/PostsLoading';
import Paginations from '../components/Common/Paginations/Paginations';
import { LOADING, REJECTED } from '../reducers';
import Custom404 from './404';

const free = () => {
  const { freePosts, loadFreePostsStatus, postTotal, addPostStatus } =
    useSelector(state => state.post);

  if (loadFreePostsStatus === REJECTED) {
    return <Custom404 />;
  }

  if (loadFreePostsStatus === LOADING) {
    return <PostsLoading />;
  }

  return (
    <>
      <Head>
        <title>자유 게시판 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {loadFreePostsStatus === LOADING || addPostStatus === LOADING ? (
            <PostsLoading />
          ) : (
            freePosts.map(post => {
              return <PostCard key={shortId.generate()} post={post} />;
            })
          )}
          <Paginations total={postTotal} />
        </MainContentsWrapper>
      </AppLayout>
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
    type: LOAD_MY_INFO_REQUEST, // 로그인 유지
  });
  context.store.dispatch({
    type: LOAD_FREE_POSTS_REQUEST,
    data: Number(context.query.page),
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default free;
