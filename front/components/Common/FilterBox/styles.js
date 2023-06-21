import styled from 'styled-components';

export const Box = styled.div`
  @media (min-width: 765px) {
    width: 120px;
    height: 40px;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 30px;
    background-color: ${({ filteredList, tag }) =>
      filteredList.includes(tag) ? 'skyblue' : 'white'};

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin: 5px 0;

    cursor: pointer;

    &:hover {
      background-color: skyblue;
      transition: all 0.5s ease-out;
    }
  }
`;
