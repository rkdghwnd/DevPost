import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
const BlogCardForm = styled.article`
  display: flex;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid rgb(240, 240, 240);
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  & > div:last-child {
    margin-left: 10px;
    flex: 1 1 auto;
  }
  img {
    width: 80px;
    height: 80px;
  }
  a {
    text-decoration: none;
  }
`;

const BlogCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    font-size: 12px;
    background-color: ${props =>
      props.blogName &&
      `rgb(${props.blogName[0].charCodeAt() - 20},${
        props.blogName[1].charCodeAt() + 40
      },${props.blogName[2].charCodeAt() + 70})`};
    color: white;
    border-radius: 5px;
    padding: 3px;
  }
  span {
    color: rgb(170, 170, 170);
    font-size: 14px;
  }
`;

const BlogTitle = styled.h3`
  line-height: 25px;
  margin-top: 5px;
  font-weight: 400;
  font-size: 15px;
  color: black;
  &:hover {
    color: gray;
    transition: color 0.3s ease;
  }
`;

const BlogCard = ({ post }) => {
  const offset = 1000 * 60 * 60 * 9;
  const postTime = new Date(post.time + offset).toISOString().slice(0, 10);

  return (
    <BlogCardForm>
      <Link href={post.link}>
        <a>
          <img
            src={
              post.image
                ? `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/${post.image}`
                : `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/public/images/no-image-icon2.PNG`
            }
          />
        </a>
      </Link>
      <div>
        <BlogCardHeader blogName={post.blog_name}>
          <div>{post.blog_name}</div>
          <span>{postTime}</span>
        </BlogCardHeader>
        <Link href={post.link}>
          <a>
            <BlogTitle>{post.title}</BlogTitle>
          </a>
        </Link>
      </div>
    </BlogCardForm>
  );
};

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogCard;
