import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/input';
import { useRouter } from 'next/router';
import { SEARCH_POSTS_REQUEST } from '../../../reducers/post';
import { SearchInputWrapper } from './styles';

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
