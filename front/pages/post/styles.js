import styled from 'styled-components';

export const PostForm = styled.section`
  padding: 20px;
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
  @media (min-width: 765px) {
    transform: translateY(80px);
  }
`;

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

export const LogInBox = styled.div`
  padding: 20px;
  color: rgb(200, 200, 200);
  cursor: pointer;
`;
