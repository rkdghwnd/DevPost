import React, { useEffect } from 'react';
import NewsCard from '../../components/News/NewsCard/NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_NEWS_POSTS_REQUEST } from '../../reducers/posts';
import shortId from 'shortid';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import NavBar from '../../components/Common/NavBar/NavBar';
import MainContentsWrapper from '../../components/Common/MainContentsWrapper/MainContentsWrapper';
import AppLayout from '../../components/Common/AppLayout';
import Paginations from '../../components/Common/Paginations/Paginations';
import { useFilter } from '../../hooks/useFilter';
import SideFilter from '../../components/Common/SideFilter/SideFilter';
import PostsLoading from '../../components/Free/PostsLoading/PostsLoading';
import { LOADING, REJECTED } from '../../reducers';
import Custom404 from '../404';
import { useRouter } from 'next/router';

const news = () => {
  const dispatch = useDispatch();
  const { newsPosts, filteredList, loadNewsPostsStatus } = useSelector(
    state => state.posts,
  );
  const [tags, visiblePosts] = useFilter(
    newsPosts[0],
    filteredList,
    'news_name',
  );

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  if (loadNewsPostsStatus === REJECTED) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>뉴스 - DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {visiblePosts?.map(post => {
            return <NewsCard key={shortId.generate()} post={post} />;
          })}
          <Paginations total={newsPosts[1] || 0} />
          <SideFilter tags={tags} />
        </MainContentsWrapper>
      </AppLayout>
    </>
  );
};

export const getStaticPaths = async () => {
  const count = await axios
    .get(`${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/news/count`)
    .then(result => result.data);
  const pages =
    parseInt(count / 30) === count / 30
      ? parseInt(count / 30)
      : parseInt(count / 30) + 1;
  const paths = Array(pages)
    .fill()
    .map((v, i) => ({ params: { page: String(i + 1) } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(async context => {
  context.store.dispatch({
    type: LOAD_NEWS_POSTS_REQUEST,
    data: Number(context.params.page) || 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  return {
    revalidate: 60 * 60 * 24,
  };
});

export default news;
