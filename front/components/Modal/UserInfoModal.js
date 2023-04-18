import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../../reducers/modal';
import { AiOutlineClose } from 'react-icons/ai';
import shortId from 'shortid';
import PostCard from '../PostCard/PostCard';
import ShortComment from '../ShortComment';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoForm = styled.div`
  width: 400px;
  height: 650px;
  font-weight: 700;
  text-align: left;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 15px;
  overflow: auto;

  @keyframes userInfoModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes userInfoModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.userInfoModalSlideUp
      ? 'userInfoModalSlideUp'
      : 'userInfoModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;

const UserProfile = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 250px;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  & > h4 {
    margin: 20px 0;
  }

  & > p {
    font-weight: 400;
    font-size: 14px;
    padding: 0 10px;
    line-height: 20px;
  }
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  cursor: pointer;
`;

const PostCommentButton = styled.div`
  display: flex;

  & > button {
    flex: 1 1 auto;
    background-color: white;
    border: none;

    cursor: pointer;
    padding: 10px;
  }

  & > button:first-child {
    border-bottom: ${props =>
      props.postsVisible ? '1px solid black' : 'none'};
  }
  & > button:last-child {
    border-bottom: ${props =>
      props.commentsVisible ? '1px solid black' : 'none'};
  }
`;
const Spinner = styled(Spin)`
  text-align: center;
  color: #46a6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45%;
`;

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const { you, loadYourInfoLoading } = useSelector(state => state.post);
  const { userInfoModalSlideUp } = useSelector(state => state.modal);
  const [postsVisible, setPostsVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onToggleUserInfo = useCallback(() => {
    dispatch({ type: USER_INFO_MODAL_CLOSE_REQUEST });
  }, []);

  const onClickPosts = useCallback(() => {
    setPostsVisible(true);
    setCommentsVisible(false);
  }, []);

  const onClickComments = useCallback(() => {
    setPostsVisible(false);
    setCommentsVisible(true);
  }, []);

  return (
    <ModalBackdrop onClick={onToggleUserInfo}>
      <InfoForm
        onClick={onStopEventBubbling}
        userInfoModalSlideUp={userInfoModalSlideUp}
      >
        <UserProfile>
          <CloseIcon onClick={onToggleUserInfo} />
          <img
            src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${you?.profile_img}`}
          />
          <h4>{you?.nickname}</h4>
          <p>{you?.introduce}</p>
        </UserProfile>
        <PostCommentButton
          postsVisible={postsVisible}
          commentsVisible={commentsVisible}
        >
          <button onClick={onClickPosts}>게시글</button>
          <button onClick={onClickComments}>댓글</button>
        </PostCommentButton>
        {postsVisible &&
          you?.Posts.map(post => (
            <PostCard key={shortId.generate()} post={post} />
          ))}
        {commentsVisible &&
          you?.Comments.map(comment => (
            <ShortComment key={shortId.generate()} comment={comment} />
          ))}
        {loadYourInfoLoading && (
          <Spinner indicator={<LoadingOutlined spin />}></Spinner>
        )}
      </InfoForm>
    </ModalBackdrop>
  );
};

export default UserInfoModal;
