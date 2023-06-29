import styled from 'styled-components';

export const PostCardForm = styled.article`
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  &:hover {
    background-color: rgb(250, 250, 250);
  }
`;

export const PostCardHeader = styled.li`
  display: flex;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
  }
  div {
    flex: 1 1 auto;
    text-align: right;
    font-weight: 400;
    color: #c6c6c6;
    font-size: 14px;
  }
  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
`;
