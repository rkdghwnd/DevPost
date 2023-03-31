import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  CONFIRM_REMOVE_POST_MODAL_OPEN,
  UPDATE_POST_MODAL_OPEN,
} from '../../reducers/modal';
import { POST_OPTION_TOGGLE_REQUEST } from '../../reducers/option';

const PostOptionForm = styled.div`
  @keyframes slideDown {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: ${props => (props.postOptionVisible ? 'slideDown' : '')};
  animation-duration: 0.3s;
  animation-delay: 0s;

  width: 150px;
  height: 100px;
  box-shadow: -2px 2px 8px hsl(0deg 0% 0% / 0.38);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45px;
  right: 5px;
  background-color: white;
  z-index: 5;

  & > div {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
  }
  & > div:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const PostOption = () => {
  const dispatch = useDispatch();
  const { postOptionVisible } = useSelector(state => state.option);
  const { currentPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);

  const onClickUpdate = useCallback(() => {
    dispatch({ type: UPDATE_POST_MODAL_OPEN });
    dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
  }, []);

  const onClickRemove = useCallback(() => {
    const isMyPost = me && me.Posts.some(post => post.id === currentPost?.id);
    if (isMyPost) {
      dispatch({
        type: CONFIRM_REMOVE_POST_MODAL_OPEN,
      });
      dispatch({ type: POST_OPTION_TOGGLE_REQUEST });
    }
  }, [me, currentPost]);

  return (
    <PostOptionForm postOptionVisible={postOptionVisible}>
      <div onClick={onClickUpdate}>수정하기</div>
      <div onClick={onClickRemove}>삭제하기</div>
    </PostOptionForm>
  );
};

export default PostOption;
