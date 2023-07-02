import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import wrapper from '../store/configureStore';
import { Normalize } from 'styled-normalize';
import { useDispatch, useSelector } from 'react-redux';
import LogInModal from '../components/Common/LogInModal/LogInModal';
import MessageModal from '../components/Common/MessageModal/MessageModal';
import UpdatePostModal from '../components/Post/UpdatePostModal/UpdatePostModal';
import Script from 'next/script';
import Head from 'next/head';
import ShareModal from '../components/Post/ShareModal/ShareModal';
import useScript from '../hooks/useScript';
import CommentModal from '../components/Free/CommentModal/CommentModal';
import NewPostModal from '../components/Post/NewPostModal/NewPostModal';
import { createGlobalStyle } from 'styled-components';
import VerifyPasswordModal from '../components/MyProfile/Edit/VerifyPasswordModal/VerifyPasswordModal';
import ConfirmRemovePostModal from '../components/Post/ConfirmRemovePostModal/ConfirmRemovePostModal';
import {
  HEADER_OPTION_CLOSE_REQUEST,
  MY_PROFILE_OPTION_CLOSE_REQUEST,
  POST_OPTION_CLOSE_REQUEST,
} from '../reducers/option';
import UserInfoModal from '../components/Free/UserInfoModal/UserInfoModal';
import ConfirmRemoveCommentModal from '../components/Post/ConfirmRemoveCommentModal/ConfirmRemoveCommentModal';
import ConfirmCancelPostModal from '../components/Post/ConfirmCancelPostModal/ConfirmCancelPostModal';
import ConfirmRemoveAccountModal from '../components/MyProfile/Edit/ConfirmRemoveAccountModal/ConfirmRemoveAccountModal';
import InfoModal from '../components/Common/InfoModal/InfoModal';
import '../cssVariable.scss';
import LikeMessage from '../components/Common/LikeMessage';
import BookmarkMessage from '../components/Common/BookmarkMessage';

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding:0;
}

body {
  background-color: rgb(245,245,245);
  width: 100%;
  
}

@keyframes pulse {
  0% {
    
    background-color: rgb(220, 220, 220);
  }

  50% {
    background-color: rgb(210, 210, 210);
  }

  100% {
    background-color: rgb(200, 200, 200);
  }
}

`;

const DevPost = ({ Component }) => {
  const dispatch = useDispatch();
  const {
    commentModalVisual,
    infoModalVisual,
    newPostModalVisual,
    logInModalVisual,
    messageModalVisual,
    updatePostModalVisual,
    shareModalVisual,
    userInfoModalVisual,
    confirmRemoveCommentVisual,
    confirmRemovePostVisual,
    confirmCancelPostModalVisual,
    verifyPasswordModalVisual,
    confirmRemoveAccountModalVisual,
  } = useSelector(state => state.modal);
  const {
    likeMessageVisual,
    unlikeMessageVisual,
    bookmarkMessageVisual,
    unbookmarkMessageVisual,
  } = useSelector(state => state.message);

  // kakao SDK import하기
  const status = useScript('https://developers.kakao.com/sdk/js/kakao.js');

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === 'ready' && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
      }
    }
  }, [status]);

  useEffect(() => {
    window.addEventListener('click', () => {
      dispatch({ type: HEADER_OPTION_CLOSE_REQUEST });
      dispatch({ type: POST_OPTION_CLOSE_REQUEST });
      dispatch({ type: MY_PROFILE_OPTION_CLOSE_REQUEST });
    });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DevPost" />
        <meta property="og:title" content="collect dev articles" />
        <meta
          property="og:description"
          content="개발관련 블로그, 뉴스, 핫딜 게시글을 모았습니다."
        />
        <meta
          property="og:image"
          content={`https://velog.velcdn.com/images/ghwnd6448/post/5037dca3-629e-4343-ac14-72285a597a20/image.PNG`}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="DevPost" />
        <meta property="twitter:title" content="collect dev articles" />
        <meta
          property="twitter:description"
          content="개발관련 블로그, 뉴스, 핫딜 게시글을 모았습니다."
        />
        <meta
          property="twitter:image"
          content={`https://velog.velcdn.com/images/ghwnd6448/post/5037dca3-629e-4343-ac14-72285a597a20/image.PNG`}
        />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}
        />
        <link
          rel="icon"
          href="https://velog.velcdn.com/images/ghwnd6448/post/65ec5631-0cd1-47a7-b1ea-7412bfae77eb/image.png"
        />
      </Head>
      <Normalize />
      <GlobalStyle />
      <Component />
      <Script src="//developers.kakao.com/sdk/js/kakao.min.js"></Script>
      {commentModalVisual ? <CommentModal /> : ''}
      {infoModalVisual ? <InfoModal /> : ''}
      {newPostModalVisual ? <NewPostModal /> : ''}
      {logInModalVisual ? <LogInModal /> : ''}
      {messageModalVisual ? <MessageModal /> : ''}
      {updatePostModalVisual ? <UpdatePostModal /> : ''}
      {shareModalVisual ? <ShareModal /> : ''}
      {userInfoModalVisual ? <UserInfoModal /> : ''}
      {confirmRemoveCommentVisual ? <ConfirmRemoveCommentModal /> : ''}
      {confirmRemovePostVisual ? <ConfirmRemovePostModal /> : ''}
      {confirmCancelPostModalVisual ? <ConfirmCancelPostModal /> : ''}
      {verifyPasswordModalVisual ? <VerifyPasswordModal /> : ''}
      {confirmRemoveAccountModalVisual ? <ConfirmRemoveAccountModal /> : ''}
      {likeMessageVisual ? (
        <LikeMessage message={'좋아요를 눌렀습니다.'} />
      ) : (
        ''
      )}
      {unlikeMessageVisual ? (
        <LikeMessage message={'좋아요를 취소했습니다.'} />
      ) : (
        ''
      )}
      {bookmarkMessageVisual ? (
        <BookmarkMessage message={'북마크에 추가했습니다.'} />
      ) : (
        ''
      )}
      {unbookmarkMessageVisual ? (
        <BookmarkMessage message={'북마크에서 제거했습니다.'} />
      ) : (
        ''
      )}
    </>
  );
};

DevPost.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default wrapper.withRedux(DevPost);
