import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_FILTER_LIST } from '../../reducers/posts';

const Box = styled.div`
  @media (min-width: 765px) {
    width: 120px;
    height: 40px;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 30px;
    background-color: ${({ filteredList, tag }) =>
      filteredList.includes(tag) ? 'skyblue' : 'white'};

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin: 5px 0;

    cursor: pointer;

    &:hover {
      background-color: skyblue;
      transition: all 0.5s ease-out;
    }
  }
`;

const FilterBox = ({ tag }) => {
  const dispatch = useDispatch();
  const { filteredList } = useSelector(state => state.posts);
  return (
    <Box
      filteredList={filteredList}
      tag={tag}
      onClick={() => {
        dispatch({ type: TOGGLE_FILTER_LIST, tag });
        console.log('click');
      }}
    >
      <span>{tag}</span>
    </Box>
  );
};

FilterBox.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default FilterBox;
