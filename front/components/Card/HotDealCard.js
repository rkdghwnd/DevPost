import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HotDealCardForm = styled.article`
  display: flex;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid rgb(240, 240, 240);
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  img {
    width: 80px;
    height: 80px;
  }
  & > div:last-child {
    margin-left: 10px;
    flex: 1 1 auto;
  }
`;

const HotDealCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  span {
    color: rgb(170, 170, 170);
    font-size: 14px;
  }
`;

const Label = styled.div`
  font-size: 12px;
  background-color: skyblue;
  color: white;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5px 0 0;
`;

const SiteLabel = styled.div`
  font-size: 12px;
  background-color: ${({ siteName, siteColor }) => siteColor[siteName]};
  color: white;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5px 0 0;
`;

const HotDealTitle = styled.h3`
  margin-top: 10px;
  line-height: 20px;
  font-weight: 400;
  font-size: 15px;
  & > a {
    text-decoration: none;
    color: black;
  }
  & > a:hover {
    color: gray;
    transition: color 0.3s ease;
  }
`;

const HotDealCard = ({ post }) => {
  const siteColor = {
    에펨코리아: '#b3d9ff',
    루리웹: '#97c1a9',
  };
  const offset = 1000 * 60 * 60 * 9;
  const koreaNow = new Date(new Date().getTime() + offset).toISOString();
  const postTime = new Date(post.time + offset).toISOString();
  // 오늘 날짜랑 같으면 시간만 표시, 아니면 날짜 표시
  const currentTime =
    postTime.slice(0, 10) === koreaNow.slice(0, 10)
      ? postTime.slice(11, 16)
      : postTime.slice(0, 10);

  return (
    <HotDealCardForm>
      <img
        src={
          post.image
            ? `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/${post.image}`
            : `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/no-image-icon2.PNG`
        }
      />
      <div>
        <HotDealCardHeader>
          <div>
            <Label>핫딜</Label>
            <SiteLabel siteColor={siteColor} siteName={post.site_name}>
              {post.site_name}
            </SiteLabel>
          </div>
          <span>{currentTime}</span>
        </HotDealCardHeader>
        <HotDealTitle>
          <a href={post.link}>{post.title}</a>
        </HotDealTitle>
      </div>
    </HotDealCardForm>
  );
};

HotDealCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default HotDealCard;
