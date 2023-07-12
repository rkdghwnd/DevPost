import styled from 'styled-components';

export const MainTextWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const MainTextForm = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  &:hover h4 {
    color: gray;
    transition: color 0.3s ease;
  }
  h4 {
    font-weight: 700;
    margin-top: 10px;
    color: black;
    font-weight: 400;
  }

  p {
    font-size: 14px;
    color: rgb(153, 153, 153);
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 17px;
  }
  & > div:last-child {
    padding: 10px;
  }
`;
