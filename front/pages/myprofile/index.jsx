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
import ShortComment from '../../components/Free/ShortComment/ShortComment';
import MyProfileLoading from '../../components/MyProfile/MyProfileLoading/MyProfileLoading';
import MyProfileOption from '../../components/MyProfile/MyProfileOption/MyProfileOption';
import AppLayout from '../../components/Common/AppLayout';
import { LOADING } from '../../reducers';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_BOOKMARK_REQUEST } from '../../reducers/post';
import ListPagination from '../../components/Free/ListPagination/ListPagination';
import MyProfileEditLoading from '../../components/MyProfile/Edit/MyProfileEditLoading/MyProfileEditLoading';
import Custom404 from '../404';
import {
  MyProfileForm,
  MyProfileHeader,
  Spinner,
} from '../../pageStyles/myprofileStyles';

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

  const [totalPageCount, setTotalPageCount] = useState(
    (parseInt(myBookmark.length / 20) || 0) + 1,
  );
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setBookmarkVisible(true);
    dispatch({ type: LOAD_MY_BOOKMARK_REQUEST });
  }, []);

  useEffect(() => {
    let pageTarget = 1;
    if (postsVisible) {
      pageTarget = myBookmark;
    } else if (commentsVisible) {
      pageTarget = myComments;
    } else if (bookmarkVisible) {
      pageTarget = myBookmark;
    }
    setTotalPageCount((parseInt(pageTarget.length / 20) || 0) + 1);
    setCurrentPage(1);
  }, [
    bookmarkVisible,
    postsVisible,
    commentsVisible,
    myBookmark,
    myPosts,
    myComments,
  ]);

  if (!me) {
    return <Custom404 />;
  }
  if (loadMyInfoStatus === LOADING) {
    return <MyProfileEditLoading />;
  }

  return (
    <>
      <Head>
        <title>내 정보 - DevPost</title>
      </Head>
      <AppLayout>
        <MyProfileForm>
          <MyProfileHeader>
            {' '}
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
            ? myPosts
                ?.map(post => <PostCard key={shortId.generate()} post={post} />)
                .slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20)
            : null}
          {commentsVisible
            ? myComments
                .map(comment => (
                  <ShortComment key={shortId.generate()} comment={comment} />
                ))
                .slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20)
            : null}
          {bookmarkVisible
            ? myBookmark
                ?.map(post => <PostCard key={shortId.generate()} post={post} />)
                .slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20)
            : null}
          <ListPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
          />
        </MyProfileForm>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST, // 로그인 유지
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default myprofile;
