import styled from 'styled-components';

export const TopButton = styled.button`
  all: unset;
  position: fixed;
  width: 40px;
  height: 40px;
  left: 25px;
  bottom: 80px;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  cursor: pointer;
  font-size: 20px;
  color: rgb(200, 200, 200);

  @media (min-width: 765px) {
    bottom: 50px;
  }
`;
