import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);

  @media (min-width: 765px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LogInForm = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  & > h2 {
    text-align: center;
  }

  & > a {
    width: 100px;
    text-decoration: none;
    text-align: right;
    font-weight: 400;
    font-size: 15px;
    color: rgb(150, 150, 150);
    padding: 10px;
    margin: 0 50px 0 auto;
  }

  @keyframes logInSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes logInSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.logInModalSlideUp ? 'logInSlideUp' : 'logInSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  @media (min-width: 765px) {
    position: static;
    width: 500px;
  }
`;

export const CloseButton = styled(AiOutlineClose)`
  height: 100%;
  font-size: 20px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 70%;
  margin: 15px auto;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 5px 0;
`;

export const ErrorMessage = styled.small`
  width: 350px;
  margin: 0 auto;
`;
