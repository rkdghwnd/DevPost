import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/input';
import { useRouter } from 'next/router';
import { SEARCH_POSTS_REQUEST } from '../../../reducers/post';

const SearchInputWrapper = styled.div`
  flex: 1 0 auto;
  margin: 10px 20px;
  border: 1px solid rgb(235, 235, 235);
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 30px;

  & > :first-child {
    margin: 0 10px;
    cursor: pointer;
    z-index: 999;
  }

  input {
    flex: 1 1 auto;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
  }
`;
const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [keyword, onChangeKeyword] = useInput('');

  const onSearch = useCallback(
    e => {
      if (e.key === 'Enter') {
        router.push('/search');
      }
      dispatch({ type: SEARCH_POSTS_REQUEST, keyword: e.currentTarget.value });
    },
    [router],
  );

  const onClickSearch = useCallback(() => {
    console.log(keyword);
    if (keyword) {
      dispatch({
        type: SEARCH_POSTS_REQUEST,
        keyword,
      });
      router.push('/search');
    }
  }, [keyword, router]);

  return (
    <SearchInputWrapper>
      <BsSearch onClick={onClickSearch} />
      <input
        type="text"
        placeholder="찾고싶은 주제 혹은 닉네임을 입력하세요"
        onChange={onChangeKeyword}
        onKeyUp={onSearch}
      />
    </SearchInputWrapper>
  );
};

export default SearchInput;
