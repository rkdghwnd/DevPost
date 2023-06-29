import React, { useState, useCallback, useEffect } from 'react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { MY_PROFILE_OPTION_TOGGLE_REQUEST } from '../../reducers/option';
import PostCard from '../../components/Free/PostCard/PostCard';
import shortId from 'shortid';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import Head from 'next/head';
import ProfileImage from '../../components/MyProfile/ProfileImage/ProfileImage';
import MyProfileRecordButton from '../../components/MyProfile/MyProfileRecordButton/MyProfileRecordButton';
import { MyProfileForm, MyProfileHeader, Spinner } from './styles';
import ShortComment from '../../components/Free/ShortComment/ShortComment';
import MyProfileLoading from '../../components/MyProfile/MyProfileLoading/MyProfileLoading';
import MyProfileOption from '../../components/MyProfile/MyProfileOption/MyProfileOption';
import AppLayout from '../../components/Common/AppLayout';
import { LOADING } from '../../reducers';

const myprofile = () => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { myProfileOptionVisible } = useSelector(state => state.option);
  const {
    myPosts,
    myComments,
    myBookmark,
    loadMyPostsStatus,
    loadMyCommentsStatus,
    loadMyBookmarkStatus,
  } = useSelector(state => state.post);
  const { me, loadMyInfoStatus } = useSelector(state => state.user);
  const [postsVisible, setPostsVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [bookmarkVisible, setBookmarkVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
  }, []);

  useEffect(() => {
    me?.id ? '' : Router.replace('/');
  }, [me?.id]);

  const onClickOption = useCallback(e => {
    dispatch({ type: MY_PROFILE_OPTION_TOGGLE_REQUEST });
    e.stopPropagation();
  }, []);

  if (!me) {
    return;
  }
  if (loadMyInfoStatus === LOADING) {
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
          <ProfileImage />
          <MyProfileRecordButton
            setPostsVisible={setPostsVisible}
            setCommentsVisible={setCommentsVisible}
            setBookmarkVisible={setBookmarkVisible}
            postsVisible={postsVisible}
            commentsVisible={commentsVisible}
            bookmarkVisible={bookmarkVisible}
          />
          {(loadMyPostsStatus === LOADING ||
            loadMyCommentsStatus === LOADING ||
            loadMyBookmarkStatus === LOADING) && (
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
