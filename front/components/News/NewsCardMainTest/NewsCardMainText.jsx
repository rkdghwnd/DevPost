import React from 'react';
import PropTypes from 'prop-types';
import { MainTextWrapper, MainTextForm } from './styles';
import Image from 'next/image';
const NewsCardMainText = ({ post }) => {
  const description = post.description?.includes('...')
    ? post.description
    : post.description + '...';

  return (
    <MainTextWrapper>
      <a href={post.link} target="_blank" rel="noreferrer noopener">
        <MainTextForm>
          <div>
            <h4>{post.title}</h4>
            <p>{post.description && description}</p>
          </div>
          <div>
            <Image
              src={
                post.image
                  ? `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/${post.image}`
                  : `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/no-image-icon2.PNG`
              }
              width={80}
              height={80}
              layout="fixed"
            />
          </div>
        </MainTextForm>
      </a>
    </MainTextWrapper>
  );
};

NewsCardMainText.propTypes = {
  post: PropTypes.object,
};

export default NewsCardMainText;
