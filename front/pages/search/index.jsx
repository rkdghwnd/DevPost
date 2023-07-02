import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { SEARCH_POSTS_REQUEST } from '../../reducers/post';
import useInput from '../../hooks/input';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import SearchKeywords from '../../components/Search/SearchKeywords/SearchKeywords';
import SearchResults from '../../components/Search/SearchResults/SearchResults';
import AppLayout from '../../components/Common/AppLayout';
import styled from 'styled-components';

export const SearchWrapper = styled.section`
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

export const SearchInputForm = styled.form`
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

const search = () => {
  const dispatch = useDispatch();
  const [keyword, onChangeKeyword] = useInput('');
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

  return (
    <>
      <Head>
        <title>검색 - DevPost</title>
      </Head>
      <AppLayout>
        <SearchWrapper>
          <SearchInputForm onSubmit={onSubmitSearch}>
            <div>
              <BsSearch />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={onChangeKeyword}
                onKeyUp={onSearch}
              ></input>
            </div>
          </SearchInputForm>
          <h4>검색어 추천</h4>
          <SearchKeywords />
          <SearchResults />
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
