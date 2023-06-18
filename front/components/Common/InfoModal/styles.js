import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoForm = styled.div`
  width: 500px;
  height: 100px;
  font-weight: 700;
  text-align: left;
  border-radius: 5px;
  background-color: white;
  color: black;

  h4 {
    padding: 20px;
    text-align: center;
  }
  div {
    text-align: center;
  }
  a {
    text-decoration: none;
    color: black;
  }

  @keyframes infoModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes infoModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.infoModalSlideUp ? 'infoModalSlideUp' : 'infoModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;
