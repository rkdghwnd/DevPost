import { BsFillFilePostFill } from 'react-icons/bs';
import styled from 'styled-components';

export const CommentForm = styled.article`
  padding: 10px;
  border-bottom: 1px solid #f5f6f7;
  cursor: pointer;
  img {
    width: 35px;
    height: 35px;
    border-radius: 13px;
  }
  & > div {
    margin-left: 10px;
    font-size: 14px;
  }
`;

export const CommentBody = styled.p`
  margin: 5px 0;
  line-height: 20px;
`;

export const CommentSubInfo = styled.div`
  font-size: 13px;
  margin-top: 5px;
  color: rgb(130, 130, 130);

  & > span:first-child {
    margin-right: 5px;
  }
  & > span:not(:first-child) {
    margin-left: 7px;
    font-weight: 700;
    color: rgb(100, 100, 100);
  }
`;

export const PostTitle = styled.h4`
  color: rgb(190, 190, 190);
  font-weight: 400;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

export const PostIcon = styled(BsFillFilePostFill)`
  margin-right: 5px;
  vertical-align: bottom;
`;
