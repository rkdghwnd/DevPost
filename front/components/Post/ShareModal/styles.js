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
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > :nth-child(3) {
    position: relative;
  }

  @keyframes shareModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes shareModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.shareModalSlideUp ? 'shareModalSlideUp' : 'shareModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;

export const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
`;

export const KakaoShareButton = styled.a`
  cursor: pointer;
`;

export const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;
