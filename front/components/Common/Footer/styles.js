import styled from 'styled-components';

export const FooterForm = styled.section`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-top: 1px solid rgb(230, 230, 230);
  color: rgb(153, 153, 153);

  a {
    text-decoration: none;
    color: rgb(153, 153, 153);
  }

  a > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }
  a > div > span {
    font-size: 12px;
    margin-top: 5px;
  }

  @media (min-width: 765px) {
    display: none;
  }
`;

export const InfoLink = styled.div`
  cursor: pointer;
`;

export const WritePostButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: skyblue;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  bottom: 75px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
`;
