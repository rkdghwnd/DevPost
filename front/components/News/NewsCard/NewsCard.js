import React from 'react';
import styled from 'styled-components';
import NewsCardMainText from './NewsCardMainText';
import PropTypes from 'prop-types';

const NewsCardForm = styled.article`
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(240, 240, 240);
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }
  &:hover {
    background-color: rgb(250, 250, 250);
  }
`;

const NewsCardHeader = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  img {
    width: 14px;
    border-radius: 50%;
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
  }
`;

const NewsCard = ({ post }) => {
  const offset = 1000 * 60 * 60 * 9;
  const postTime = new Date(post.time + offset).toISOString();
  const currentTime = postTime.slice(0, 10);

  return (
    <NewsCardForm newsName={post.news_name} image={post.image}>
      <ul>
        <NewsCardHeader>
          <img
            src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/${post.news_name}.png`}
          />
          <span>{post.news_name}</span>
          <div>{currentTime}</div>
        </NewsCardHeader>
        <NewsCardMainText post={post} />
      </ul>
    </NewsCardForm>
  );
};

NewsCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default NewsCard;
