import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { CustomPagination } from './styles';

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
        total={parseInt(total / 3, 0)}
        onChange={onChangePage}
      />
    </CustomPagination>
  );
};

Paginations.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Paginations;
