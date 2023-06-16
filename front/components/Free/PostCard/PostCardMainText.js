import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../../../reducers/modal';

const MainTextWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

const MainTextForm = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  &:hover h4 {
    color: gray;
    transition: color 0.3s ease;
  }
  h4 {
    font-weight: 700;
    margin-top: 10px;
    color: black;
    font-weight: 400;
  }

  p {
    font-size: 14px;
    color: rgb(153, 153, 153);
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 17px;
  }
  img {
    width: 60px;
    height: 60px;
    padding: 10px;
  }
`;

const PostCardMainText = ({ post }) => {
  const dispatch = useDispatch();
  const cardContent = post?.content;
  const longCardContent = `${post?.content.slice(0, 90)}...`;
  const onModalClose = useCallback(() => {
    dispatch({ type: USER_INFO_MODAL_CLOSE_REQUEST });
  }, []);

  return (
    <MainTextWrapper onClick={onModalClose}>
      <Link href={`/post/${encodeURIComponent(post?.id)}`}>
        <a>
          <MainTextForm>
            <div>
              <h4>{post?.title}</h4>
              <p>{cardContent?.length >= 90 ? longCardContent : cardContent}</p>
            </div>
            <div>
              {post?.Images.length === 0 ? null : (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${post?.Images[0].src}`}
                ></img>
              )}
            </div>
          </MainTextForm>
        </a>
      </Link>
    </MainTextWrapper>
  );
};

PostCardMainText.propTypes = {
  post: PropTypes.object,
};

export default PostCardMainText;
