import React, { useEffect } from 'react';
import NavBar from '../../components/Common/NavBar/NavBar';
import AppLayout from '../../components/Common/AppLayout';
import MainContentsWrapper from '../../components/Common/MainContentsWrapper/MainContentsWrapper';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../../components/Blog/BlogCard/BlogCard';
import { LOAD_BLOG_POSTS_REQUEST } from '../../reducers/posts';
import shortId from 'shortid';
import Paginations from '../../components/Common/Paginations/Paginations';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import { useFilter } from '../../hooks/useFilter';
import SideFilter from '../../components/Common/SideFilter/SideFilter';
import { REJECTED } from '../../reducers';
import Custom404 from '../404';
import axios from 'axios';

const blog = () => {
  const dispatch = useDispatch();
  const { blogPosts, filteredList, loadBlogPostsStatus } = useSelector(
    state => state.posts,
  );
  const [tags, visiblePosts] = useFilter(
    blogPosts[0],
    filteredList,
    'blog_name',
  );

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  if (loadBlogPostsStatus === REJECTED) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>DevPost</title>
      </Head>
      <AppLayout>
        <MainContentsWrapper>
          <NavBar />
          {visiblePosts?.map(post => {
            return <BlogCard key={shortId.generate()} post={post} />;
          })}
          <Paginations total={blogPosts[1] || 0} />
          <SideFilter tags={tags} />
        </MainContentsWrapper>
      </AppLayout>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async context => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST, // 로그인 유지
//   });
//   context.store.dispatch({
//     type: LOAD_BLOG_POSTS_REQUEST,
//     data: Number(context.query.page),
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export const getStaticPaths = async () => {
  const count = await axios
    .get(`${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/blog/count`)
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
    type: LOAD_BLOG_POSTS_REQUEST,
    data: Number(context.params.page) || 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  return {
    revalidate: 60 * 60 * 24,
  };
});

export default blog;
