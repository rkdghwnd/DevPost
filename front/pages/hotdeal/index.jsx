import React, { useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_EARLY_HOTDEAL_POSTS_REQUEST,
  LOAD_MORE_HOTDEAL_POSTS_REQUEST,
} from '../../reducers/posts';
import { LoadingOutlined } from '@ant-design/icons';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import shortId from 'shortid';
import { Spinner, WhiteSpace } from './styles';
import NavBar from '../../components/Common/NavBar/NavBar';
import HotDealCard from '../../components/HotDeal/HotDealCard/HotDealCard';
import MainContentsWrapper from '../../components/Common/MainContentsWrapper/MainContentsWrapper';
import AppLayout from '../../components/Common/AppLayout';
import TopScroll from '../../components/HotDeal/TopScroll/TopScroll';
import SideFilter from '../../components/Common/SideFilter/SideFilter';
import { List } from 'react-virtualized';

const hotdeal = () => {
  const dispatch = useDispatch();
  const {
    hotDealPosts,
    hasMoreHotDealPosts,
    loadHotDealPostsLoading,
    filteredList,
  } = useSelector(state => state.posts);

  const tags = [
    ...new Set(
      hotDealPosts?.map(post => {
        return post.site_name;
      }),
    ),
  ];

  const visiblePosts =
    filteredList.length === 0
      ? hotDealPosts
      : hotDealPosts?.filter(post => {
          return filteredList.includes(post.site_name);
        });

  const viewport = useRef(null);
  const scrollTarget = useRef(null);

  useEffect(() => {
    const options = {
      root: viewport.current,
      threshold: 0,
    };

    const handleIntersection = entries => {
      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          hasMoreHotDealPosts &&
          !loadHotDealPostsLoading
        ) {
          console.log('인피니트 스크롤링 !');
          const lastId = hotDealPosts[hotDealPosts.length - 1]?.id;
          dispatch({
            type: LOAD_MORE_HOTDEAL_POSTS_REQUEST,
            lastId,
          });
        }
      });
    };

    const io = new IntersectionObserver(handleIntersection, options);

    if (scrollTarget.current) {
      io.observe(scrollTarget.current); // 관찰 지정
    }

    return () => io && io.disconnect(); // 모든 요소의 관찰을 중지
  }, [
    viewport,
    scrollTarget,
    loadHotDealPostsLoading,
    hasMoreHotDealPosts,
    hotDealPosts,
  ]);

  const rowRenderer = useCallback(
    ({ index, key }) => {
      const post = visiblePosts[index];
      return <HotDealCard key={shortId.generate()} post={post} />;
    },
    [visiblePosts],
  );

  return (
    <>
      <Head>
        <title>핫딜 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          <List
            width={780}
            height={100 * visiblePosts.length}
            rowCount={visiblePosts.length}
            rowHeight={100}
            rowRenderer={rowRenderer}
            list={visiblePosts}
          />

          {loadHotDealPostsLoading && (
            <Spinner indicator={<LoadingOutlined spin />}></Spinner>
          )}
          <div
            ref={
              hasMoreHotDealPosts && !loadHotDealPostsLoading
                ? scrollTarget
                : undefined
            }
          />
          <WhiteSpace />
          <SideFilter tags={tags} />
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
