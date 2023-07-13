import styled from 'styled-components';

export const Input = styled.input`
  width: 70%;
  height: 30px;
  margin: 20px auto 10px auto;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 5px 0px 5px 10px;
  border-radius: 5px;

  border: ${props =>
    props.validateError ? '2px solid rgb(240, 148, 156)' : 'none'};
`;
