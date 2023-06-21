import styled from 'styled-components';

export const RecommendedKeyWordForm = styled.div`
  display: flex;
  margin-right: 5px;
  button {
    all: unset;
    padding: 10px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button > :first-child {
    font-size: 20px;
    color: rgb(217, 217, 217);
  }
  button > span {
    margin-left: 10px;
  }
`;
