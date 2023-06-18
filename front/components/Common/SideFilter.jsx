import React from 'react';
import FilterBox from './FilterBox';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styled from 'styled-components';

const FilterContainer = styled.section`
  @media (min-width: 765px) {
    position: absolute;
    top: 150px;
    left: -140px;
    display: flex;
    flex-direction: column;
  }

  display: none;
`;

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
