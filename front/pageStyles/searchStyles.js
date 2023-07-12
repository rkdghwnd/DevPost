import styled from 'styled-components';

export const SearchWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
  padding: 15px;
  background-color: white;
  margin-bottom: 40px;
  min-height: 950px;

  & > h4 {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  @media (min-width: 765px) {
    transform: translateY(90px);
    min-height: 800px;
    & > h4 {
      margin-top: 0;
    }
  }
`;

export const SearchInputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    background-color: rgb(245, 246, 247);
    border-radius: 10px;
    flex: 1 1 auto;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  div > :first-child {
    font-size: 18px;
    margin-left: 5px;
    color: rgb(204, 204, 204);
    padding: 5px;
    cursor: pointer;
  }
  div > input {
    all: unset;
    width: 80%;
    margin-left: 10px;
  }

  @media (min-width: 765px) {
    display: none;
  }
`;
