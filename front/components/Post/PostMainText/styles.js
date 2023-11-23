import styled from 'styled-components';

export const MainTextForm = styled.section`
  padding-top: 10px;
  word-break: break-all;
`;

export const PostUserInfo = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 20px;

  & > div:first-child {
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  & > div:first-child > span {
    border-radius: 15px;
  }

  span:last-child {
    position: absolute;
    right: 0;
  }
`;

export const PostTitle = styled.h3`
  font-weight: 400;
`;

export const PostBody = styled.article`
  line-height: 24px;
  margin-top: 20px;
  & > div:first-child {
    white-space: pre-wrap;
  }
  img {
    width: 100%;
  }
`;

export const ViewsCommentsLiked = styled.div`
  font-size: 14px;
  margin: 15px 0;
  color: rgb(160, 160, 160);
  & > span:not(:last-child) {
    margin-right: 10px;
  }
`;
