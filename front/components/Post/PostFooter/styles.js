import styled from 'styled-components';

export const PostFooterButtonForm = styled.div`
  margin-top: 1px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #f5f6f7;
  border-bottom: 1px solid #f5f6f7;
  color: rgb(160, 160, 160);

  & > div {
    margin-right: 10px;
    cursor: pointer;
  }
  & > div:hover {
    color: orange;
  }
  & > div > :first-child {
    margin-right: 10px;
  }
`;
