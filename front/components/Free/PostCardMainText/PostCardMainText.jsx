import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { USER_INFO_MODAL_CLOSE_REQUEST } from '../../../reducers/modal';
import { MainTextForm, MainTextWrapper } from './styles';
import Image from 'next/image';
import { ThumnailImage } from '../../Blog/BlogCard/styles';

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
        <MainTextForm>
          <div>
            <h4>{post?.title}</h4>
            <p>{cardContent?.length >= 90 ? longCardContent : cardContent}</p>
          </div>
          <div>
            {post?.Images.length === 0 ? null : (
              <ThumnailImage
                src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${post?.Images[0].src}`}
                alt="post_image"
              />
            )}
          </div>
        </MainTextForm>
      </Link>
    </MainTextWrapper>
  );
};

PostCardMainText.propTypes = {
  post: PropTypes.object,
};

export default PostCardMainText;
