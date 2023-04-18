import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import styled from 'styled-components';
import MyProfileOption from '../../components/Option/MyProfileOption';
import AppLayout from '../../components/AppLayout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { MY_PROFILE_OPTION_TOGGLE_REQUEST } from '../../reducers/option';
import PostCard from '../../components/PostCard/PostCard';
import {
  LOAD_MY_BOOKMARK_REQUEST,
  LOAD_MY_COMMENTS_REQUEST,
  LOAD_MY_POSTS_REQUEST,
} from '../../reducers/post';
import ShortComment from '../../components/ShortComment';
import shortId from 'shortid';
import MyProfileLoading from '../../components/Loading/MyProfileLoading';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import Head from 'next/head';

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

  span {
    display: block;
    margin: 0 auto;
    width: 75px;
    text-align: center;
    font-size: 18px;
  }
  & > :last-child {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: orange;
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
  }
  li > :first-child {
    font-size: 25px;
  }
  span {
    display: block;
    margin-top: 5px;
  }
`;

const MyPostsButton = styled.li`
  border-bottom: ${props =>
    props.postsVisible ? '1px solid black' : 'transparent'};
`;
const MyCommentsButton = styled.li`
  border-bottom: ${props =>
    props.commentsVisible ? '1px solid black' : 'transparent'};
`;
const MyBookmarkButton = styled.li`
  border-bottom: ${props =>
    props.bookmarkVisible ? '1px solid black' : 'transparent'};
`;

const Spinner = styled(Spin)`
  font-size: 20px;
  text-align: center;
  color: #46a6ff;
  position: absolute;
  left: 45%;
  bottom: 50%;
`;

const myprofile = () => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { myProfileOptionVisible } = useSelector(state => state.option);
  const {
    myPosts,
    myComments,
    myBookmark,
    loadMyPostsLoading,
    loadMyCommentsLoading,
    loadMyBookmarkLoading,
  } = useSelector(state => state.post);
  const { me, loadMyInfoLoading } = useSelector(state => state.user);
  const [postsVisible, setPostsVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [bookmarkVisible, setBookmarkVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  useEffect(() => {
    me?.id ? '' : Router.replace('/');
  }, [me && me.id]);

  const onClickOption = useCallback(e => {
    dispatch({ type: MY_PROFILE_OPTION_TOGGLE_REQUEST });
    e.stopPropagation();
  }, []);

  const onClickPosts = useCallback(() => {
    dispatch({ type: LOAD_MY_POSTS_REQUEST });
    setPostsVisible(state => !state);
    setCommentsVisible(false);
    setBookmarkVisible(false);
  }, []);

  const onClickComments = useCallback(() => {
    dispatch({ type: LOAD_MY_COMMENTS_REQUEST });
    setPostsVisible(false);
    setCommentsVisible(state => !state);
    setBookmarkVisible(false);
  }, []);

  const onClickBookmark = useCallback(() => {
    dispatch({ type: LOAD_MY_BOOKMARK_REQUEST });
    setPostsVisible(false);
    setCommentsVisible(false);
    setBookmarkVisible(state => !state);
  }, []);

  if (!me) {
    return;
  }
  if (loadMyInfoLoading) {
    return <MyProfileLoading />;
  }

  return (
    <>
      <Head>
        <title>내 정보 - DevPost</title>
      </Head>
      <AppLayout>
        <MyProfileForm>
          <MyProfileHeader>
            <span>프로필</span>
            <IoEllipsisHorizontalSharp onClick={onClickOption} />
          </MyProfileHeader>
          {myProfileOptionVisible ? <MyProfileOption /> : null}
          <ProfileImage>
            <Link href="/myprofile/edit">
              <img
                src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${me?.profile_img}`}
              />
            </Link>

            <span>{me?.nickname}</span>
            <Link href="/myprofile/edit">
              <a>프로필 소개 추가...</a>
            </Link>
          </ProfileImage>
          <MyProfileRecordForm>
            <MyPostsButton onClick={onClickPosts} postsVisible={postsVisible}>
              <BsFileEarmarkPost />
              <span>게시글</span>
            </MyPostsButton>
            <MyCommentsButton
              onClick={onClickComments}
              commentsVisible={commentsVisible}
            >
              <FaRegCommentDots />
              <span>댓글</span>
            </MyCommentsButton>
            <MyBookmarkButton
              onClick={onClickBookmark}
              bookmarkVisible={bookmarkVisible}
            >
              <BsBookmark />
              <span>북마크</span>
            </MyBookmarkButton>
          </MyProfileRecordForm>
          {(loadMyPostsLoading ||
            loadMyCommentsLoading ||
            loadMyBookmarkLoading) && (
            <Spinner
              tip="Loading..."
              indicator={<LoadingOutlined spin />}
            ></Spinner>
          )}
          {postsVisible
            ? myPosts?.map(post => (
                <PostCard key={shortId.generate()} post={post} />
              ))
            : null}
          {commentsVisible
            ? myComments.map(comment => (
                <ShortComment key={shortId.generate()} comment={comment} />
              ))
            : null}
          {bookmarkVisible
            ? myBookmark?.map(post => (
                <PostCard key={shortId.generate()} post={post} />
              ))
            : null}
        </MyProfileForm>
      </AppLayout>
    </>
  );
};

export default myprofile;
