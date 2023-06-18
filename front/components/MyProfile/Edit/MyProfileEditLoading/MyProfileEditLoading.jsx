import React from 'react';
import AppLayout from '../../../Common/AppLayout';
import { EditForm, EditFormHeader, ProfileImage, InputLabel } from './style';

const MyProfileEditLoading = () => {
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

export default MyProfileEditLoading;
