import React from 'react';
import MainContentsWrapper from '../components/MainContentsWrapper';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard/PostCard';
import AppLayout from '../components/AppLayout/AppLayout';
import { useSelector } from 'react-redux';
import { LOAD_FREE_POSTS_REQUEST } from '../reducers/post';
import shortId from 'shortid';
import PostsLoading from '../components/Loading/PostsLoading';
import Paginations from '../components/Paginations';
import axios from 'axios';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const free = () => {
  const { freePosts, loadFreePostsLoading, postTotal, addPostLoading } =
    useSelector(state => state.post);

  return (
    <>
      <Head>
        <title>자유 게시판 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {loadFreePostsLoading || addPostLoading ? (
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
    page: Number(context.query.page),
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default free;
