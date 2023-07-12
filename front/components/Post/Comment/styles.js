import styled from 'styled-components';

export const CommentForm = styled.article`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
  & > div:first-child > span {
    border-radius: 13px;
  }
  & > div:last-child {
    margin-left: 10px;
    font-size: 14px;
  }
`;

export const CommentBody = styled.div`
  width: 100%;
  white-space: pre-wrap;
  margin: 5px 0;
  line-height: 20px;
`;

export const CommentSubMenu = styled.div`
  font-size: 13px;
  padding: 5px 0;
  color: rgb(130, 130, 130);
  cursor: pointer;

  & > span:first-child {
    margin-right: 5px;
  }
  & > span:not(:first-child) {
    margin-left: 7px;
    font-weight: 700;
    color: rgb(100, 100, 100);
    padding: 5px;
  }
  & > span:not(:first-child):hover {
    border-radius: 10px;
    background-color: rgb(245, 245, 245);
    transition: background-color 0.3s ease-out;
  }
`;
