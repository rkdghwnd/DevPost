import React, { useEffect, useCallback } from 'react';
import NavBar from '../components/NavBar';
import HotDealCard from '../components/Card/HotDealCard';
import MainContentsWrapper from '../components/MainContentsWrapper';
import AppLayout from '../components/AppLayout/AppLayout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import {
  LOAD_EARLY_HOTDEAL_POSTS_REQUEST,
  LOAD_MORE_HOTDEAL_POSTS_REQUEST,
} from '../reducers/posts';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import TopScroll from '../components/TopScroll';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import _ from 'underscore';
const Spinner = styled(Spin)`
  text-align: center;
  color: #46a6ff;
  width: 100%;
  margin: 20px auto 0 auto;
`;

const hotdeal = () => {
  const dispatch = useDispatch();
  const { hotDealPosts, hasMoreHotDealPosts, loadHotDealPostsLoading } =
    useSelector(state => state.posts);

  useEffect(() => {
    function onScroll() {
      if (
        hasMoreHotDealPosts &&
        !loadHotDealPostsLoading &&
        window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
      ) {
        const lastId = hotDealPosts[hotDealPosts.length - 1]?.id;
        dispatch({
          type: LOAD_MORE_HOTDEAL_POSTS_REQUEST,
          lastId,
        });
      }
    }

    window.addEventListener('scroll', _.throttle(onScroll), 300);
    return () => {
      window.removeEventListener('scroll', _.throttle(onScroll), 300);
    }; // 해제 안하면 메모리에 쌓임
  }, [hasMoreHotDealPosts, loadHotDealPostsLoading, hotDealPosts]);

  const rowRenderer = useCallback(
    ({ index, key }) => {
      const post = hotDealPosts[index];
      return <HotDealCard key={key} post={post} />;
    },
    [hotDealPosts],
  );

  return (
    <>
      <Head>
        <title>핫딜 - PostMoa</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          <List
            width={780}
            height={100 * hotDealPosts.length}
            rowCount={hotDealPosts.length}
            rowHeight={100}
            rowRenderer={rowRenderer}
            list={hotDealPosts}
          />
          {loadHotDealPostsLoading && (
            <Spinner indicator={<LoadingOutlined spin />}></Spinner>
          )}
        </MainContentsWrapper>
        <TopScroll />
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
    type: LOAD_EARLY_HOTDEAL_POSTS_REQUEST,
    lastId: null,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default hotdeal;
