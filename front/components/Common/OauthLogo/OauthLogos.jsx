import React from 'react';
import { OauthLogo } from './styles';

const OauthLogos = () => {
  return (
    <OauthLogo>
      <a href={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/kakao/auth`}>
        <img
          src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/kakao-auth-image.png`}
        ></img>
      </a>
      <a href={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/google/auth`}>
        <img
          src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/google-auth-image.png`}
        ></img>
      </a>
      <a href={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/facebook/auth`}>
        <img
          src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/facebook-auth-image.png`}
        ></img>
      </a>
    </OauthLogo>
  );
};

export default OauthLogos;
