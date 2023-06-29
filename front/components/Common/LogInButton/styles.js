import styled from 'styled-components';
import { LOADING } from '../../../reducers';

export const LogInRequestButton = styled.button`
  display: flex;
  width: 50%;
  padding: 10px;
  background-color: skyblue;
  color: white;
  border-radius: 25px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border: 1px solid rgb(235, 235, 235);
  cursor: pointer;
  opacity: ${props => (props.logInStatus === LOADING ? '0.5' : '1')};
`;
