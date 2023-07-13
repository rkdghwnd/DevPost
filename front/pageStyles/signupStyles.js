import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { LOADING } from '../reducers';

export const SignupWrapper = styled.section`
  min-height: 500px;
  background-color: white;
  transform: translateY(200px);

  @media (min-width: 765px) {
    width: 600px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const SignUpForm = styled.section`
  max-width: 765px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  & > h2 {
    text-align: center;
  }
  & > div {
    width: 70%;
    margin: 0 auto;
    color: rgb(240, 148, 156);
    font-size: 13px;
  }
  @media (min-width: 765px) {
    width: 100%;
  }
`;

export const BackButton = styled(AiOutlineArrowLeft)`
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  top: 25px;
  left: 30px;
`;

export const SignUpButton = styled.button`
  width: 50%;
  height: 45px;
  background-color: skyblue;
  color: white;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  border: none;
  opacity: ${props => (props.signUpStatus === LOADING ? '0.5' : '1')};
`;
