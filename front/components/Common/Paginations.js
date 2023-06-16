import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomPagination = styled.div`
  background-color: white;
  .ant-pagination {
    display: flex;
    justify-content: center;
  }
  padding-top: 10px;
  padding-bottom: 90px;
  @media (min-width: 765px) {
    margin-top: 10px;
    padding-bottom: 0;
  }
  .ant-pagination-item-active {
  }
`;
const Paginations = ({ total }) => {
  const router = useRouter();
  const onChangePage = useCallback(
    p => {
      router.push(`/${router.pathname}?page=${p}`);
    },
    [router.pathname],
  );

  return (
    <CustomPagination>
      <Pagination
        current={Number(router.query.page) || 1}
        showQuickJumper
        showSizeChanger={false}
        total={total}
        onChange={onChangePage}
      />
    </CustomPagination>
  );
};

Paginations.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Paginations;
