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

export const CommentForm = styled.div`
  @keyframes commentModalslideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes commentModalslideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.commentModalSlideUp
      ? 'commentModalslideUp'
      : 'commentModalslideDown'};
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 5px;
  background-color: white;
  padding: 20px;

  & > div {
    position: relative;
    margin-bottom: 10px;
  }
  & > div > h4 {
    text-align: center;
    font-weight: 500;
    font-size: 16px;
  }

  @media (min-width: 765px) {
    position: relative;
    width: 600px;
    max-height: 900px;
  }
`;

export const CloseButton = styled(AiOutlineClose)`
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
`;

export const LogInBox = styled.div`
  padding: 20px;
  color: rgb(200, 200, 200);
  cursor: pointer;
`;
