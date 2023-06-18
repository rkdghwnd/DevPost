import styled from 'styled-components';

export const EmptyCommentForm = styled.div`
  border-top: 2px solid #f5f6f7;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(217, 217, 217);
  border-bottom: 1px solid #f5f6f7;

  & > :first-child {
    font-size: 35px;
    margin-bottom: 20px;
  }
`;
export const CommentWrapper = styled.div`
  overflow-y: auto;
  max-height: 820px;
  @media (min-width: 765px) {
    max-height: 670px;
  }
`;
