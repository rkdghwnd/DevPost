import React from 'react';
import styled from 'styled-components';

const OauthLogo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
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
