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

export const MessageForm = styled.div`
  border-radius: 5px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > div:first-child {
    padding: 20px;
    font-weight: 700;
  }
  & > div:not(:first-child) {
    padding: 15px 0;
    width: 100%;
    border-top: 1px solid rgb(235, 235, 235);
    cursor: pointer;
  }
`;
