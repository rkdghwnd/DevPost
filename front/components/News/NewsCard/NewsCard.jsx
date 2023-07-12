import React, { useMemo } from 'react';
import NewsCardMainText from '../NewsCardMainTest/NewsCardMainText';
import PropTypes from 'prop-types';
import { NewsCardForm, NewsCardHeader } from './styles';

const NewsCard = ({ post }) => {
  const offset = 1000 * 60 * 60 * 9;
  const postTime = useMemo(
    () => new Date(post.time + offset).toISOString().slice(0, 10),
    [post.time],
  );

  return (
    <NewsCardForm newsName={post.news_name} image={post.image}>
      <ul>
        <NewsCardHeader>
          <img
            src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/${post.news_name}.png`}
          />
          <span>{post.news_name}</span>
          <div>{postTime}</div>
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
