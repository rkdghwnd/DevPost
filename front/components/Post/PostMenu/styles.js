import styled from 'styled-components';

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  font-size: 20px;

  & > :nth-child(1) {
    cursor: pointer;
    position: absolute;
    left: 0;
  }
  & > :nth-child(2) {
    margin-right: 10px;
    cursor: pointer;
  }
  & > :nth-child(3) {
    cursor: pointer;
    margin-right: 10px;
  }

  border-bottom: 1px solid rgb(250, 250, 250);
  padding-bottom: 20px;
`;
