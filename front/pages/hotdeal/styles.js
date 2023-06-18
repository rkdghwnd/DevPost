import { Spin } from 'antd';
import styled from 'styled-components';

export const Spinner = styled(Spin)`
  text-align: center;
  color: #46a6ff;
  width: 100%;
  margin: 20px auto 0 auto;
`;

export const WhiteSpace = styled.div`
  @media (max-width: 765px) {
    height: 60px;
  }
`;
