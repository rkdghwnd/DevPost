import React from 'react';
import FilterBox from '../FilterBox/FilterBox';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { FilterContainer } from './styles';

const SideFilter = ({ tags }) => {
  return (
    <FilterContainer>
      {tags.map(tag => {
        return <FilterBox tag={tag} key={shortid.generate()} />;
      })}
    </FilterContainer>
  );
};

SideFilter.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default SideFilter;
