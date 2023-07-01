import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid rgb(235, 235, 235);
  z-index: 9;
  @media (max-width: 765px) {
    display: none;
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  button {
    width: 80px;
    height: 45px;
    margin-right: 15px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    cursor: pointer;
  }
  button:first-of-type {
    background-color: white;
  }
  button:last-of-type {
    background-color: skyblue;
  }
  & > a {
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    color: #48b4e0;
    padding: 10px;
    border-radius: 10px;
    margin-left: 15px;
    :hover {
      background-color: rgb(250, 250, 250);
      color: #1890ff;
      transition: all 0.2s ease-out;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-out;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;
