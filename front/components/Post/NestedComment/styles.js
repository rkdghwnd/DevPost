import { BsArrowReturnRight } from 'react-icons/bs';
import styled from 'styled-components';

export const CommentForm = styled.article`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
  margin-left: 15px;

  & > div:first-of-type > span {
    border-radius: 13px;
  }

  & > div:last-child {
    margin-left: 10px;
    font-size: 14px;
  }

  background-color: rgb(250, 250, 250);
`;

export const CommentBody = styled.p`
  margin: 5px 0;
  line-height: 20px;
  & > span {
    color: #aaa;
  }
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
  }
`;

export const ReplyIcon = styled(BsArrowReturnRight)`
  margin-right: 10px;
`;
