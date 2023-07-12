import styled from 'styled-components';

export const MessageBox = styled.div`
  width: 330px;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 35px;
  background-color: rgb(47, 52, 56);
  border-radius: 10px;
  right: calc(50% - 150px);

  & > span:first-child {
    color: white;
  }

  & > span:last-child {
    margin-left: 10px;
    color: skyblue;
    text-decoration: none;
    cursor: pointer;
  }

  @keyframes likeMessageSlideUp {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: likeMessageSlideUp;
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-out;
`;
