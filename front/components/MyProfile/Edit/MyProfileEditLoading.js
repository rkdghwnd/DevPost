import React from 'react';
import styled from 'styled-components';
import AppLayout from '../../Common/AppLayout/AppLayout';

const EditForm = styled.section`
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

const EditFormHeader = styled.div`
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

const ProfileImage = styled.div`
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

const InputLabel = styled.div`
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

const edit = () => {
  return (
    <AppLayout>
      <EditForm>
        <EditFormHeader>
          <div></div>
          <div></div>
          <div></div>
        </EditFormHeader>
        <ProfileImage>
          <div />
        </ProfileImage>
        <InputLabel>
          <label htmlFor="nickname"></label>
          <div></div>
        </InputLabel>
        <br />
        <input name="nickname" type="text"></input>
        <br />

        <br />
        <InputLabel>
          <label htmlFor="nickname"></label>
          <div></div>
        </InputLabel>
        <br />
        <textarea rows="6" name="nickname" type="text"></textarea>
        <br />
        <br />
      </EditForm>
    </AppLayout>
  );
};

export default edit;
