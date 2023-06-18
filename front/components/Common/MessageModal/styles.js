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
  width: 400px;
  height: 100px;
  border-radius: 5px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    display: block;
    margin-bottom: 15px;
  }

  & > button {
    all: unset;
    width: 100px;
    height: 30px;
    border-bottom: 1px solid rgb(235, 235, 235);
    border-radius: 20px;
    text-align: center;
    background-color: skyblue;
    cursor: pointer;
  }
`;
