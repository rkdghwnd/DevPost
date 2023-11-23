import React, { useCallback, useMemo } from 'react';
import PostCardMainText from '../PostCardMainText/PostCardMainText';
import PostCardFooter from '../PostCardFooter/PostCardFooter';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { USER_INFO_MODAL_OPEN } from '../../../reducers/modal';
import { LOAD_YOUR_INFO_REQUEST } from '../../../reducers/post';
import { PostCardForm, PostCardHeader } from './styles';
import Image from 'next/image';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const createdAt = useMemo(
    () => post.createdAt.slice(0, 10).split('-'),
    [post.createdAt],
  );
  const onClickUser = useCallback(() => {
    dispatch({ type: USER_INFO_MODAL_OPEN });
    dispatch({ type: LOAD_YOUR_INFO_REQUEST, data: post.User.id });
  }, []);

  return (
    <PostCardForm>
      <PostCardHeader>
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${post.User.profile_img}`}
          onClick={onClickUser}
          alt="profile_image"
        />
        <span onClick={onClickUser}>{post.User.nickname}</span>
        <div>{`${createdAt[0]}년 ${createdAt[1]}월 ${createdAt[2]}일`}</div>
      </PostCardHeader>
      <PostCardMainText post={post} />
      <PostCardFooter post={post} />
    </PostCardForm>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
