import React from 'react';
import RecommendKeyword from '../RecommendKeyword/RecommendKeyword';
import { KeyWordWrapper } from './styles';

const SearchKeywords = () => {
  return (
    <KeyWordWrapper>
      <RecommendKeyword keyword={'Chat GPT'} />
      <RecommendKeyword keyword={'리액트'} />
      <RecommendKeyword keyword={'개발자'} />
    </KeyWordWrapper>
  );
};

export default SearchKeywords;
