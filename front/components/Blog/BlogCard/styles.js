import styled from 'styled-components';

export const BlogCardForm = styled.article`
  display: flex;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid rgb(240, 240, 240);
  border-radius: 5px;

  &:hover {
    background-color: rgb(250, 250, 250);
  }
  & > div:last-child {
    margin-left: 10px;
    flex: 1 1 auto;
  }
  img {
    width: 80px;
    height: 80px;
  }
  a {
    text-decoration: none;
  }
`;

export const BlogCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    font-size: 12px;
    background-color: ${props =>
      props.blogName &&
      `rgb(${props.blogName[0].charCodeAt() - 20},${
        props.blogName[1].charCodeAt() + 40
      },${props.blogName[2].charCodeAt() + 70})`};
    color: white;
    border-radius: 5px;
    padding: 3px;
  }
  span {
    color: rgb(170, 170, 170);
    font-size: 14px;
  }
`;

export const BlogTitle = styled.h3`
  line-height: 25px;
  margin-top: 5px;
  font-weight: 400;
  font-size: 15px;
  color: black;
  &:hover {
    color: gray;
    transition: color 0.3s ease;
  }
`;
