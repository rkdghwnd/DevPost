import React, { useCallback, useRef } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { PageButton, PaginationContainer } from './style';

const ListPagination = ({
  currentPage,
  setCurrentPage,
  totalPageCount,
  isCurrentPost,
}) => {
  const prevButton = useRef();
  const lastButton = useRef();

  const firstPage = currentPage - 2 <= 0 ? 1 : currentPage - 2;
  const lastPage = currentPage + 2;

  const pageNumbers = Array(totalPageCount)
    .fill()
    .map((v, i) => i + 1)
    .slice(firstPage - 1, lastPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  const onPrevPage = useCallback(() => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [isFirstPage, currentPage]);

  const onForwardPage = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [isFirstPage, currentPage]);

  const onClickPage = useCallback(
    page => () => {
      if (currentPage !== page) {
        setCurrentPage(page);
      }
    },
    [currentPage],
  );

  return (
    <PaginationContainer
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      isCurrentPost={isCurrentPost}
    >
      <button ref={prevButton} onClick={onPrevPage}>
        <span>{'<'}</span>
      </button>
      {pageNumbers.map(page => {
        return (
          <PageButton
            key={shortid.generate()}
            onClick={onClickPage(page)}
            currentPage={currentPage}
            page={page}
          >
            {page}
          </PageButton>
        );
      })}
      <button ref={lastButton} onClick={onForwardPage}>
        <span>{'>'}</span>
      </button>
    </PaginationContainer>
  );
};

ListPagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPageCount: PropTypes.number,
  isCurrentPost: PropTypes.bool,
};

export default ListPagination;
