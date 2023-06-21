import styled from 'styled-components';

export const CommentInputWrapper = styled.section`
  padding: 15px;
`;

export const CommentInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > img {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    border-radius: 10px;
  }

  & > textarea {
    all: unset;
    width: 100%;
    height: auto;
    word-break: break-all;
    border-radius: 5px;
    border: 1px solid rgb(200, 200, 200);
    background-color: rgb(240, 240, 240);
    padding: 10px;
    font-size: 14px;
  }
  & > textarea:focus {
    border: 1px solid skyblue;
    box-shadow: 0 0 3px blue;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    height: 20px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
  }
  & > :hover {
    border-radius: 10px;
    background-color: rgb(245, 245, 245);
    transition: background-color 0.3s ease-out;
  }
`;

export const CloseInputButton = styled.div`
  width: 40px;
  padding: 2px;
`;

export const AddCommentButton = styled.div`
  width: 80px;
  padding: 2px;
`;
