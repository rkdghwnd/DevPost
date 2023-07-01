import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const PaginationContainer = styled.section`
  @media (max-width: 765px) {
    margin-bottom: 50px;
  }

  display: flex;
  justify-content: center;
  padding: 30px 0 30px 0;
  background-color: white;

  & > button:first-child {
    cursor: pointer;
    width: 35px;
    height: 35px;
    font-size: 20px;
    background-color: white;
    margin-right: 10px;
    border: 1px solid rgb(210, 210, 210);
    border-radius: 5px;
    position: relative;
    color: ${({ isFirstPage }) =>
      isFirstPage ? 'rgb(210, 210, 210)' : 'black'};
    :hover {
      border-color: ${({ isFirstPage }) =>
        isFirstPage ? 'rgb(210, 210, 210)' : '#1890ff'};
      color: ${({ isFirstPage }) =>
        isFirstPage ? 'rgb(210, 210, 210)' : '#1890ff'};
      cursor: ${({ isFirstPage }) => (isFirstPage ? 'not-allowed' : 'pointer')};
    }

    & > span {
      left: 9px;
    }
  }

  & > button:last-child {
    cursor: pointer;
    width: 35px;
    height: 35px;
    font-size: 20px;
    background-color: white;
    margin-left: 10px;
    border: 1px solid rgb(210, 210, 210);
    border-radius: 5px;
    position: relative;
    color: ${({ isLastPage }) => (isLastPage ? 'rgb(210, 210, 210)' : 'black')};
    :hover {
      border-color: ${({ isLastPage }) =>
        isLastPage ? 'rgb(210, 210, 210)' : '#1890ff'};
      color: ${({ isLastPage }) =>
        isLastPage ? 'rgb(210, 210, 210)' : '#1890ff'};
      cursor: ${({ isLastPage }) => (isLastPage ? 'not-allowed' : 'pointer')};
    }

    & > span {
      right: 9px;
    }
  }

  & > button:hover {
    transition: 0.1s all ease-in;
  }

  & > button > span {
    position: absolute;
    top: 4px;
  }
`;

export const PageButton = styled.button`
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin: 0 10px 0 10px;
  background-color: white;

  border: 1px solid rgb(210, 210, 210);
  border-radius: 5px;
  border-color: ${({ currentPage, page }) =>
    currentPage === page ? '#1890ff' : 'rgb(210, 210, 210)'};
  color: ${({ currentPage, page }) =>
    currentPage === page ? '#1890ff' : 'black'};
  &:hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`;

const CommentPagination = ({ currentPage, setCurrentPage, totalPageCount }) => {
  const { currentPost } = useSelector(state => state.post);
  const prevButton = useRef();
  const lastButton = useRef();

  const firstPage = currentPage - 2 <= 0 ? 1 : currentPage - 2;
  const lastPage = currentPage + 2;

  const pageNumbers = Array(totalPageCount)
    .fill()
    .map((v, i) => i + 1)
    .slice(firstPage - 1, lastPage);
  console.log(currentPage);
  console.log(pageNumbers);
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

CommentPagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPageCount: PropTypes.number,
};

export default CommentPagination;
