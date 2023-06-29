import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../../../reducers/modal';
import shortId from 'shortid';
import PostCard from '../PostCard/PostCard';
import ShortComment from '../ShortComment/ShortComment';
import { LoadingOutlined } from '@ant-design/icons';
import {
  ModalBackdrop,
  UserProfile,
  CloseIcon,
  PostCommentButton,
  InfoForm,
  Spinner,
} from './styles';
import { LOADING } from '../../../reducers';

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const { you, loadYourInfoStatus } = useSelector(state => state.post);
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
        {loadYourInfoStatus === LOADING && (
          <Spinner indicator={<LoadingOutlined spin />}></Spinner>
        )}
      </InfoForm>
    </ModalBackdrop>
  );
};

export default UserInfoModal;
