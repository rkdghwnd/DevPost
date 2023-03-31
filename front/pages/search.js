import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import RecommendKeyword from '../components/RecommendKeyword';
import AppLayout from '../components/AppLayout/AppLayout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard/PostCard';
import shortId from 'shortid';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import useInput from '../hooks/input';
import BlogCard from '../components/Card/BlogCard';
import NewsCard from '../components/Card/NewsCard';
import HotDealCard from '../components/Card/HotDealCard';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';

const SearchWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
  padding: 15px;
  background-color: white;
  margin-bottom: 40px;
  min-height: 950px;

  & > h4 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  @media (min-width: 765px) {
    transform: translateY(90px);
    min-height: 800px;
    & > h4 {
      margin-top: 0;
    }
  }
`;

const SearchInputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    background-color: rgb(245, 246, 247);
    border-radius: 10px;
    flex: 1 1 auto;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  div > :first-child {
    font-size: 18px;
    margin-left: 5px;
    color: rgb(204, 204, 204);
    padding: 5px;
    cursor: pointer;
  }
  div > input {
    all: unset;
    width: 80%;
    margin-left: 10px;
  }

  @media (min-width: 765px) {
    display: none;
  }
`;

const KeyWordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  & > * {
    cursor: pointer;
  }
`;

const Spinner = styled(Spin)`
  font-size: 20px;
  text-align: center;
  color: #46a6ff;
  position: absolute;
  left: 45%;
  bottom: 50%;
`;

const search = () => {
  const dispatch = useDispatch();
  const [keyword, onChangeKeyword] = useInput('');
  const { searchPosts, searchPostsLoading } = useSelector(state => state.post);
  const onSearch = useCallback(e => {
    if (e.currentTarget.value) {
      dispatch({
        type: SEARCH_POSTS_REQUEST,
        keyword: e.currentTarget.value,
      });
    }
  }, []);

  const onSubmitSearch = useCallback(
    e => {
      e.preventDefault();
      if (keyword) {
        dispatch({ type: SEARCH_POSTS_REQUEST, keyword });
      }
    },
    [keyword],
  );

  const onClickSearch = useCallback(() => {
    if (keyword) {
      dispatch({ type: SEARCH_POSTS_REQUEST, keyword });
    }
  }, [keyword]);

  return (
    <>
      <Head>
        <title>검색 - PostMoa</title>
      </Head>
      <AppLayout>
        <SearchWrapper>
          <SearchInputForm onSubmit={onSubmitSearch}>
            <div>
              <BsSearch onClick={onClickSearch} />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={onChangeKeyword}
                onKeyUp={onSearch}
              ></input>
            </div>
          </SearchInputForm>
          <h4>검색어 추천</h4>
          <KeyWordWrapper>
            <RecommendKeyword keyword={'이슈'} />
            <RecommendKeyword keyword={'커뮤니티'} />
            <RecommendKeyword keyword={'근황'} />
          </KeyWordWrapper>

          {searchPosts.length === 0 ? (
            <>
              <br />
              <div>검색결과가 없습니다.</div>
            </>
          ) : searchPostsLoading ? (
            <Spinner
              tip="Loading..."
              indicator={<LoadingOutlined spin />}
            ></Spinner>
          ) : (
            searchPosts.map(post =>
              post.content ? (
                <PostCard key={shortId.generate()} post={post} />
              ) : post.blog_name ? (
                <BlogCard key={shortId.generate()} post={post} />
              ) : post.news_name ? (
                <NewsCard key={shortId.generate()} post={post} />
              ) : post.site_name ? (
                <HotDealCard key={shortId.generate()} post={post} />
              ) : (
                ''
              ),
            )
          )}
        </SearchWrapper>
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default search;
