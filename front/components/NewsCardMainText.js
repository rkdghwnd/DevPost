import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

const MainTextWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

const MainTextForm = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover h4 {
    color: gray;
    transition: color 0.3s ease;
  }
  h4 {
    font-weight: 700;
    color: black;
    font-weight: 400;
  }
  p {
    font-size: 13px;
    color: rgb(153, 153, 153);
    margin-right: 10px;
  }
  img {
    width: 80px;
    height: 80px;
  }
`;

const NewsCardMainText = ({ post }) => {
  const description = post.description?.includes('...')
    ? post.description
    : post.description + '...';

  return (
    <MainTextWrapper>
      <Link href={post.link}>
        <a>
          <MainTextForm>
            <div>
              <h4>{post.title}</h4>
              <p>{post.description && description}</p>
            </div>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/${
                  post.image || 'no-image-icon2.PNG'
                }`}
              />
            </div>
          </MainTextForm>
        </a>
      </Link>
    </MainTextWrapper>
  );
};

NewsCardMainText.propTypes = {
  post: PropTypes.object,
};

export default NewsCardMainText;
