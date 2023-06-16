import React, { useCallback } from 'react';
import styled from 'styled-components';
import PostCardMainText from './PostCardMainText';
import PostCardFooter from './PostCardFooter';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { USER_INFO_MODAL_OPEN } from '../../../reducers/modal';
import { LOAD_YOUR_INFO_REQUEST } from '../../../reducers/post';

const PostCardForm = styled.article`
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(240, 240, 240);
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  /* ul {
    list-style-type: none;
    padding: 0;
  } */
`;

const PostCardHeader = styled.li`
  display: flex;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
  }
  div {
    flex: 1 1 auto;
    text-align: right;
    font-weight: 400;
    color: #c6c6c6;
    font-size: 14px;
  }
  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const createdAt = post.createdAt.slice(0, 10).split('-');
  const onClickUser = useCallback(() => {
    dispatch({ type: USER_INFO_MODAL_OPEN });
    dispatch({ type: LOAD_YOUR_INFO_REQUEST, userId: post.User.id });
  }, []);

  return (
    <PostCardForm>
      <PostCardHeader>
        <img
          src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${post.User.profile_img}`}
          onClick={onClickUser}
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
