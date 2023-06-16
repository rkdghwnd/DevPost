import React from 'react';
import NavBar from '../components/Common/NavBar';
import MainContentsWrapper from '../components/Common/MainContentsWrapper';
import AppLayout from '../components/Common/AppLayout/AppLayout';
import NewsCard from '../components/News/NewsCard/NewsCard';
import { useSelector } from 'react-redux';
import { LOAD_NEWS_POSTS_REQUEST } from '../reducers/posts';
import shortId from 'shortid';
import Paginations from '../components/Common/Paginations';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';

const news = () => {
  const { newsPosts } = useSelector(state => state.posts);

  return (
    <>
      <Head>
        <title>뉴스 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {newsPosts[0]?.map(post => {
            return <NewsCard key={shortId.generate()} post={post} />;
          })}
          <Paginations total={newsPosts[1] || 0} />
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
    type: LOAD_NEWS_POSTS_REQUEST,
    page: Number(context.query.page),
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default news;
