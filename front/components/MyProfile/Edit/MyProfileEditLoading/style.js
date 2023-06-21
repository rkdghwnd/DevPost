import styled from 'styled-components';

export const EditForm = styled.section`
  background-color: white;
  padding: 20px;
  min-height: 940px;
  & > input {
    all: unset;
    width: 100%;
    height: 30px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > textarea {
    all: unset;
    width: 100%;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    padding: 5px;
    animation: pulse 2s infinite ease-in-out;
  }
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
    width: 20px;
    height: 20px;
    margin-right: 10px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > :nth-child(2) {
    width: 100px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > :last-child {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    animation: pulse 2s infinite ease-in-out;
  }
`;

export const ProfileImage = styled.div`
  margin-top: 10px;

  div {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 30px;
    margin: 0 auto 10px auto;
    animation: pulse 2s infinite ease-in-out;
  }
`;

export const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  & > label {
    width: 50px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > div {
    width: 40px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
`;
