import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { SEARCH_POSTS_REQUEST } from '../reducers/post';
import { useDispatch } from 'react-redux';

const RecommendedKeyWordForm = styled.div`
  display: flex;
  margin-right: 5px;
  button {
    all: unset;
    padding: 10px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button > :first-child {
    font-size: 20px;
    color: rgb(217, 217, 217);
  }
  button > span {
    margin-left: 10px;
  }
`;

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
