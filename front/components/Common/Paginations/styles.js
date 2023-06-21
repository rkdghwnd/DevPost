import styled from 'styled-components';

export const CustomPagination = styled.div`
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
`;
