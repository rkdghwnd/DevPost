import { Spin } from 'antd';
import styled from 'styled-components';

export const MyProfileForm = styled.div`
  background-color: white;
  padding: 20px 20px 0 20px;
  min-height: 960px;

  @media (min-width: 765px) {
    max-width: 800px;
    min-height: 920px;
    margin: 0 auto;
    transform: translateY(80px);
  }
`;

export const MyProfileHeader = styled.div`
  position: relative;
  margin-bottom: 10px;

  span {
    display: block;
    margin: 0 auto;
    width: 75px;
    text-align: center;
    font-size: 18px;
  }
  & > :last-child {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
`;

export const Spinner = styled(Spin)`
  font-size: 20px;
  text-align: center;
  color: #46a6ff;
  position: absolute;
  left: 45%;
  bottom: 50%;
`;
