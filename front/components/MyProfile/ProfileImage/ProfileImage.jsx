import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ProfileImageForm } from './styles';
import Image from 'next/image';

const ProfileImage = () => {
  const { me } = useSelector(state => state.user);
  return (
    <ProfileImageForm>
      <Link href="/myprofile/edit">
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${me?.profile_img}`}
          alt="my-profile-image"
        />
      </Link>

      <span>{me?.nickname}</span>
      <Link href="/myprofile/edit">프로필 소개 추가...</Link>
    </ProfileImageForm>
  );
};

export default ProfileImage;
