import styled from 'styled-components';

export const MainTextWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const MainTextForm = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover h4 {
    color: gray;
    transition: color 0.3s ease;
  }
  h4 {
    font-weight: 700;
    color: black;
    font-weight: 400;
  }
  p {
    font-size: 13px;
    color: rgb(153, 153, 153);
    margin-right: 10px;
    line-height: 17px;
    margin-top: 5px;
  }
`;
