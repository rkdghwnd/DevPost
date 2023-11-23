import styled from 'styled-components';

export const EditForm = styled.section`
  background-color: white;
  padding: 20px;
  min-height: 940px;
  @media (min-width: 765px) {
    max-width: 800px;
    min-height: 900px;
    margin: 0 auto;
    transform: translateY(80px);
  }
`;

export const EditFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  & > :first-child {
    margin-right: 10px;
    cursor: pointer;
  }
  & > :last-child {
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const ProfileImage = styled.div`
  position: relative;
  margin-top: 10px;

  & > div:first-child {
    display: flex;
    justify-content: center;
    cursor: pointer;
    img {
      width: 100px;
      height: 100px;
    }
  }
  & > div:first-child > span {
    border-radius: 15px;
  }
  & > :last-child {
    font-size: 25px;
    position: absolute;
    left: calc(50% + 30px);
    bottom: calc(5%);
  }
`;
