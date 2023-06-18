import React, { useCallback } from 'react';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { SEARCH_POSTS_REQUEST } from '../../../reducers/post';
import { useDispatch } from 'react-redux';
import { RecommendedKeyWordForm } from './styles';

const RecommendKeyword = ({ keyword }) => {
  const dispatch = useDispatch();
  const recommendSearch = useCallback(() => {
    dispatch({ type: SEARCH_POSTS_REQUEST, keyword });
  }, []);
  return (
    <RecommendedKeyWordForm onClick={recommendSearch}>
      <button>
        <BsFillArrowUpRightCircleFill />
        <span>{keyword}</span>
      </button>
    </RecommendedKeyWordForm>
  );
};

RecommendKeyword.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default RecommendKeyword;
