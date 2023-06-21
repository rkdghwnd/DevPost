import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_FILTER_LIST } from '../../../reducers/posts';
import { Box } from './styles';

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
