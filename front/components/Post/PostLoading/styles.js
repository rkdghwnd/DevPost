import styled from 'styled-components';

export const PostForm = styled.section`
  padding: 0 20px;
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  @media (min-width: 765px) {
    transform: translateY(80px);
  }
`;

export const PostMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  font-size: 20px;
  & > span {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  & > :first-child {
    position: absolute;
    left: 0;
    animation: pulse 2s infinite ease-in-out;
  }
  & > :nth-child(2) {
    margin-right: 10px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > :last-child {
    animation: pulse 2s infinite ease-in-out;
  }
  border-bottom: 1px solid rgb(250, 250, 250);
  padding: 15px 5px;
  margin-bottom: 10px;
`;

export const MainTextForm = styled.section``;
export const PostUserInfo = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 20px;

  & > div:first-child {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    margin-right: 10px;
    animation: pulse 2s infinite ease-in-out;
  }
  & > span:nth-child(2) {
    display: block;
    width: 50px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
  span:last-child {
    display: block;
    width: 150px;
    height: 20px;
    position: absolute;
    right: 0;
    animation: pulse 2s infinite ease-in-out;
  }
`;

export const PostTitle = styled.h3`
  font-weight: 400;
  width: 300px;
  height: 20px;
  animation: pulse 2s infinite ease-in-out;
`;

export const PostBody = styled.p`
  width: 600px;
  height: 20px;
  line-height: 24px;
  margin-top: 20px;
  animation: pulse 2s infinite ease-in-out;
`;

export const ViewsCommentsLiked = styled.div`
  font-size: 14px;
  margin: 15px 0;
  color: rgb(160, 160, 160);
  & > span:not(:last-child) {
    margin-right: 10px;
  }
  & > span {
    display: inline-block;
    width: 60px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
`;

export const PostFooterButtonForm = styled.div`
  margin-top: 1px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #f5f6f7;
  border-bottom: 1px solid #f5f6f7;
  color: rgb(160, 160, 160);
  & > div {
    margin-right: 10px;
    width: 70px;
    height: 20px;
    animation: pulse 2s infinite ease-in-out;
  }
`;
