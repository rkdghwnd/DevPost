import styled from 'styled-components';

export const Message = styled.div`
  position: absolute;
  top: -50px;
  right: -30px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  font-size: 12px;
  background-color: skyblue;
  border-radius: 10px;
  color: white;
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation-name: fadeOut;
  animation-duration: 3s;
  animation-timing-function: ease;
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid skyblue;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  top: 32px;
  right: 35px;
`;
