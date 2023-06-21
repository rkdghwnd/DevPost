import styled from 'styled-components';

export const MyProfileRecordForm = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  text-align: center;
  border-top: 1px solid #f5f6f7;
  border-bottom: 1px solid #f5f6f7;

  li {
    margin: 0 10px;
    padding: 10px;
    flex: 1 1 auto;
    cursor: pointer;
  }
  li > :first-child {
    font-size: 25px;
  }
  span {
    display: block;
    margin-top: 5px;
  }
`;

export const MyPostsButton = styled.li`
  border-bottom: ${props =>
    props.postsVisible ? '1px solid black' : 'transparent'};
`;

export const MyCommentsButton = styled.li`
  border-bottom: ${props =>
    props.commentsVisible ? '1px solid black' : 'transparent'};
`;

export const MyBookmarkButton = styled.li`
  border-bottom: ${props =>
    props.bookmarkVisible ? '1px solid black' : 'transparent'};
`;
