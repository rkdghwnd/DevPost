import styled from 'styled-components';

export const NewsCardForm = styled.article`
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  margin-bottom: 6px;
  &:hover {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.22);
    transition: box-shadow 0.15s ease-out;
  }
`;

export const NewsCardHeader = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    object-fit: cover;
  }

  & > span:first-child {
    border-radius: 50%;
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
  }
`;
