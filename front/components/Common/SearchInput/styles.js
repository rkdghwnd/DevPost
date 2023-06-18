import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  flex: 1 0 auto;
  margin: 10px 20px;
  border: 1px solid rgb(235, 235, 235);
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 30px;

  & > :first-child {
    margin: 0 10px;
    cursor: pointer;
    z-index: 999;
  }

  input {
    flex: 1 1 auto;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
  }
`;
