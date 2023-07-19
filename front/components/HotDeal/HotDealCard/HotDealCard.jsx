import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  HotDealCardForm,
  HotDealCardHeader,
  Label,
  SiteLabel,
  HotDealTitle,
} from './styles';
import Image from 'next/image';

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
      <Image
        src={
          post.image
            ? `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/${post.image}`
            : `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/no-image-icon2.PNG`
        }
        width={80}
        height={80}
        layout="fixed"
        alt="hotdeal_image"
        objectFit="cover"
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
          <a href={post.link} target="_blank" rel="noreferrer noopener">
            {post.title}
          </a>
        </HotDealTitle>
      </div>
    </HotDealCardForm>
  );
};

HotDealCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default HotDealCard;
