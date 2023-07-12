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

  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 30px;
    margin: 0 auto 10px auto;
    cursor: pointer;
  }
  & > :last-child {
    font-size: 25px;
    position: absolute;
    left: calc(50% + 30px);
    bottom: calc(5%);
  }
`;
