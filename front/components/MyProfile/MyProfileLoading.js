import React from 'react';
import styled from 'styled-components';
import AppLayout from '../Common/AppLayout/AppLayout';

const MyProfileForm = styled.div`
  background-color: white;
  padding: 20px 20px 0 20px;
  min-height: 960px;
  @media (min-width: 765px) {
    max-width: 800px;
    min-height: 920px;
    margin: 0 auto;
    transform: translateY(80px);
  }
`;

const MyProfileHeader = styled.div`
  position: relative;
  margin-bottom: 10px;
  & > div {
    margin: 0 auto;
    width: 75px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }

  & > :last-child {
    position: absolute;
    right: 10px;
    top: 0;
    animation: pulse 2s infinite ease-in-out;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  div {
    width: 100px;
    height: 100px;
    border-radius: 30px;
    margin-bottom: 10px;
    cursor: pointer;
    animation: pulse 2s infinite ease-in-out;
  }
  a {
    width: 140px;
    height: 20px;
    text-decoration: none;
    color: orange;
    animation: pulse 2s infinite ease-in-out;
  }
  span {
    margin-bottom: 20px;
  }
`;

const MyProfileRecordForm = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  text-align: center;
  border-top: 1px solid #f5f6f7;
  border-bottom: 1px solid #f5f6f7;

  li {
    margin: 0 10px;
    padding: 10px;
    flex: 1 1 auto;
    cursor: pointer;
    height: 50px;
    animation: pulse 2s infinite ease-in-out;
  }

  li > :first-child {
    font-size: 25px;
  }
  span {
    display: block;
    margin-top: 5px;
  }

  .swiper-pagination-bullet {
  }
`;

const MyPostsButton = styled.li`
  border-bottom: ${props =>
    props.postsVisible ? '1px solid black' : 'transparent'};
`;
const MyCommentsButton = styled.li``;
const MyBookmarkButton = styled.li``;
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
