import React, { useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EARLY_HOTDEAL_POSTS_REQUEST } from '../../reducers/posts';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import shortId from 'shortid';
import NavBar from '../../components/Common/NavBar/NavBar';
import HotDealCard from '../../components/HotDeal/HotDealCard/HotDealCard';
import MainContentsWrapper from '../../components/Common/MainContentsWrapper/MainContentsWrapper';
import AppLayout from '../../components/Common/AppLayout';
import TopScroll from '../../components/HotDeal/TopScroll/TopScroll';
import SideFilter from '../../components/Common/SideFilter/SideFilter';
import { List } from 'react-virtualized';
import { useFilter } from '../../hooks/useFilter';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { LOADING, REJECTED } from '../../reducers';
import PostsLoading from '../../components/Free/PostsLoading/PostsLoading';
import Custom404 from '../404';

const hotdeal = () => {
  const dispatch = useDispatch();
  const {
    hotDealPosts,
    hasMoreHotDealPosts,
    loadHotDealPostsStatus,
    filteredList,
  } = useSelector(state => state.posts);

  const [tags, visiblePosts] = useFilter(
    hotDealPosts,
    filteredList,
    'site_name',
  );

  const viewport = useRef(null);
  const scrollTarget = useRef(null);

  useEffect(() => {
    const io = useInfiniteScroll(
      viewport,
      hasMoreHotDealPosts,
      loadHotDealPostsStatus,
      hotDealPosts,
      scrollTarget,
      dispatch,
    );

    return () => io && io.disconnect(); // 모든 요소의 관찰을 중지
  }, [
    viewport,
    scrollTarget,
    loadHotDealPostsStatus,
    hasMoreHotDealPosts,
    hotDealPosts,
  ]);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  if (loadHotDealPostsStatus === REJECTED) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>핫딜 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {visiblePosts.map(post => {
            return <HotDealCard key={shortId.generate()} post={post} />;
          })}
          {loadHotDealPostsStatus === LOADING && <PostsLoading />}
          <div
            ref={
              hasMoreHotDealPosts && !(loadHotDealPostsStatus === LOADING)
                ? scrollTarget
                : undefined
            }
          />
          <SideFilter tags={tags} />
        </MainContentsWrapper>
      </AppLayout>
      <TopScroll />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(async context => {
  context.store.dispatch({
    type: LOAD_EARLY_HOTDEAL_POSTS_REQUEST,
    data: null,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  return {
    revalidate: 3600,
  };
});

export default hotdeal;
