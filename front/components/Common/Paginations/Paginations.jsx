import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { PageButton, PaginationContainer } from './styles';
import shortid from 'shortid';

const Paginations = ({ total }) => {
  const router = useRouter();
  const prevButton = useRef();
  const lastButton = useRef();

  const currentPage = Number(router.query.page) || 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === parseInt(total / 30, 0);

  const firstPage = currentPage - 2 <= 0 ? 1 : currentPage - 2;
  const lastPage = currentPage + 2;

  const pageNumbers = Array(parseInt(total / 30, 0))
    .fill()
    .map((v, i) => i + 1)
    .slice(firstPage - 1, lastPage);

  useEffect(() => {
    if (isFirstPage) {
      prevButton.current.disabled = true;
    } else if (isLastPage) {
      lastButton.current.disabled = true;
    }
  }, [isFirstPage, isLastPage, prevButton, lastButton]);

  const onPrevPage = useCallback(() => {
    if (!isFirstPage) {
      router.push(`/${router.pathname}?page=${currentPage - 1}`);
    }
  }, [router.pathname, router.query.page, currentPage, isFirstPage]);

  const onClickPage = useCallback(
    page => () => {
      if (currentPage !== page) {
        router.push(`/${router.pathname}?page=${page}`);
      }
    },
    [currentPage, router],
  );

  const onForwardPage = useCallback(() => {
    if (!isLastPage) {
      router.push(`/${router.pathname}?page=${currentPage + 1}`);
    }
  }, [router.pathname, router.query.page, isLastPage, currentPage]);

  return (
    <PaginationContainer isFirstPage={isFirstPage} isLastPage={isLastPage}>
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

Paginations.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Paginations;
