import styled from 'styled-components';

export const EditForm = styled.section`
  input {
    all: unset;
    width: 100%;
    height: 30px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
  }
  textarea {
    all: unset;
    width: 100%;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
  }
`;

export const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ErrorMessage = styled.div`
  color: rgb(240, 148, 156);
`;

export const RemoveAccountButton = styled.button`
  all: unset;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  background-color: rgb(250, 250, 250);
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: rgb(200, 200, 200);
    transition: background-color 0.5s ease;
  }
`;
