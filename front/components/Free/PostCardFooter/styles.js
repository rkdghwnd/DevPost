import { BsFillBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';

export const FooterForm = styled.div`
  margin: 5px 0;

  & > button {
    all: unset;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 4px;
    padding: 1px 6px 4px 6px;
    cursor: pointer;
    color: rgb(217, 217, 217);
    margin-right: 10px;
    position: relative;
  }
  & > button:first-child:hover {
    & > :last-child {
      display: block;
    }
  }
  & > button:nth-child(2):hover {
    & > :last-child {
      display: block;
    }
  }
  & > button:last-child:hover {
    & > :last-child {
      display: block;
    }
  }

  & > button > :first-child {
    vertical-align: middle;
  }
  & > button:last-child {
    width: 25px;
    float: right;
    text-align: center;
  }
  & > button:last-child:after {
    content: '';
    clear: both;
  }
  span {
    margin-left: 5px;
    font-size: 13px;
  }
`;

export const LikeButton = styled.button``;
export const CommentButton = styled.button``;
export const BookmarkButton = styled.button``;
export const BsFillBookmarkIcon = styled(BsFillBookmarkFill)`
  vertical-align: middle;
`;
