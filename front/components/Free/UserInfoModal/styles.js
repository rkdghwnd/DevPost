import { Spin } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoForm = styled.div`
  width: 400px;
  height: 650px;
  text-align: left;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 15px;
  overflow: auto;

  @keyframes userInfoModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes userInfoModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.userInfoModalSlideUp
      ? 'userInfoModalSlideUp'
      : 'userInfoModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;

export const UserProfile = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 250px;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  & > h4 {
    margin: 20px 0;
  }

  & > p {
    font-weight: 400;
    font-size: 14px;
    padding: 0 10px;
    line-height: 20px;
  }
`;

export const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  cursor: pointer;
`;

export const PostCommentButton = styled.div`
  display: flex;

  & > button {
    flex: 1 1 auto;
    background-color: white;
    border: none;

    cursor: pointer;
    padding: 10px;
  }

  & > button:first-child {
    border-bottom: ${props =>
      props.postsVisible ? '1px solid black' : 'none'};
  }
  & > button:last-child {
    border-bottom: ${props =>
      props.commentsVisible ? '1px solid black' : 'none'};
  }
`;
export const Spinner = styled(Spin)`
  text-align: center;
  color: #46a6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45%;
`;
