import React from 'react';
import NavBar from '../components/NavBar';
import AppLayout from '../components/AppLayout/AppLayout';
import MainContentsWrapper from '../components/MainContentsWrapper';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import BlogCard from '../components/Card/BlogCard';
import { LOAD_BLOG_POSTS_REQUEST } from '../reducers/posts';
import shortId from 'shortid';
import PostsLoading from '../components/Loading/PostsLoading';
import Paginations from '../components/Paginations';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const home = () => {
  const { blogPosts, loadBlogPostsLoading } = useSelector(state => state.posts);

  return (
    <>
      <Head>
        <title>DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {loadBlogPostsLoading ? (
            <PostsLoading />
          ) : (
            blogPosts[0]?.map(post => {
              return <BlogCard key={shortId.generate()} post={post} />;
            })
          )}
          <Paginations total={blogPosts[1] || 0} />
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
    type: LOAD_BLOG_POSTS_REQUEST,
    page: Number(context.query.page),
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default home;
