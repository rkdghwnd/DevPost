import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  BlogCardForm,
  BlogCardHeader,
  BlogTitle,
  ThumnailImage,
} from './styles';

const BlogCard = ({ post }) => {
  const offset = 1000 * 60 * 60 * 9;
  const postTime = useMemo(
    () => new Date(post.time + offset).toISOString().slice(0, 10),
    [post.time],
  );

  return (
    <BlogCardForm>
      <a href={post.link} target="_blank" rel="noreferrer noopener">
        <ThumnailImage
          src={
            post.image ||
            `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/no-image-icon2.PNG`
          }
          alt="blog_image"
        />
      </a>
      <div>
        <BlogCardHeader blogName={post.blog_name}>
          <div>{post.blog_name}</div>
          <span>{postTime}</span>
        </BlogCardHeader>
        <a href={post.link} target="_blank" rel="noreferrer noopener">
          <BlogTitle>{post.title}</BlogTitle>
        </a>
      </div>
    </BlogCardForm>
  );
};

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogCard;
