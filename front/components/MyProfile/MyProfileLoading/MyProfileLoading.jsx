import React from 'react';
import {
  MyProfileForm,
  MyProfileHeader,
  ProfileImage,
  MyProfileRecordForm,
  MyPostsButton,
  MyCommentsButton,
  MyBookmarkButton,
} from './styles';
import AppLayout from '../../Common/AppLayout';

const MyProfileLoading = () => {
  return (
    <AppLayout>
      <MyProfileForm>
        <MyProfileHeader>
          <div></div>
          <div></div>
        </MyProfileHeader>
        <ProfileImage>
          <div />
          <span></span>
          <a></a>
        </ProfileImage>
        <MyProfileRecordForm>
          <MyPostsButton></MyPostsButton>
          <MyCommentsButton></MyCommentsButton>
          <MyBookmarkButton></MyBookmarkButton>
        </MyProfileRecordForm>
      </MyProfileForm>
    </AppLayout>
  );
};

export default MyProfileLoading;
