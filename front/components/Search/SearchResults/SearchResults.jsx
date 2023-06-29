import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import PostCard from '../../Free/PostCard/PostCard';
import BlogCard from '../../Blog/BlogCard/BlogCard';
import NewsCard from '../../News/NewsCard/NewsCard';
import HotDealCard from '../../HotDeal/HotDealCard/HotDealCard';
import { useSelector } from 'react-redux';
import shortId from 'shortid';
import { Spin } from 'antd';
import { SpinnerContainer } from './styles';
import { LOADING } from '../../../reducers';

const SearchResults = () => {
  const { searchPosts, searchPostsStatus } = useSelector(state => state.post);

  return (
    <>
      {searchPostsStatus === LOADING ? (
        <SpinnerContainer>
          <Spin indicator={<LoadingOutlined spin />}></Spin>
        </SpinnerContainer>
      ) : searchPosts.length === 0 ? (
        <>
          <br />
          <div>검색결과가 없습니다.</div>
        </>
      ) : (
        searchPosts.map(post =>
          post.content ? (
            <PostCard key={shortId.generate()} post={post} />
          ) : post.blog_name ? (
            <BlogCard key={shortId.generate()} post={post} />
          ) : post.news_name ? (
            <NewsCard key={shortId.generate()} post={post} />
          ) : post.site_name ? (
            <HotDealCard key={shortId.generate()} post={post} />
          ) : (
            ''
          ),
        )
      )}
    </>
  );
};

export default SearchResults;
