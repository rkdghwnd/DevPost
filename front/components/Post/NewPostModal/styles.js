import { Spin } from 'antd';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 996;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  @media (min-width: 765px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const WritePostForm = styled.section`
  display: flex;
  background-color: white;
  height: 90%;
  flex-direction: column;
  padding: 20px;

  @keyframes newPostModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes newPostModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${({ newPostModalSlideUp }) =>
    newPostModalSlideUp ? 'newPostModalSlideUp' : 'newPostModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  @media (min-width: 765px) {
    width: 500px;
    height: 60%;
  }
`;
export const WritePostHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  & > :first-child {
    position: absolute;
    left: 10px;
    font-size: 23px;
    cursor: pointer;
  }
  span {
    font-size: 17px;
  }
  & > :last-child {
    position: absolute;
    right: 10px;
    font-size: 23px;
    cursor: pointer;
  }
`;
export const WritePostTitle = styled.div`
  margin-top: 10px;
  padding: 20px;

  input {
    all: unset;
    width: 100%;
    height: 100%;
  }
  border-bottom: 1px solid rgb(235, 235, 235);
`;
export const WritePostBody = styled.div`
  padding: 20px;
  flex: 1 1 auto;
  textarea {
    all: unset;
    width: 100%;
    height: 100%;
  }
`;

export const Spinner = styled(Spin)`
  font-size: 20px;
`;
