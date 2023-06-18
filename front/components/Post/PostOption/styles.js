import styled from 'styled-components';

export const PostOptionForm = styled.div`
  @keyframes slideDown {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: ${props => (props.postOptionVisible ? 'slideDown' : '')};
  animation-duration: 0.3s;
  animation-delay: 0s;

  width: 150px;
  height: 100px;
  box-shadow: -2px 2px 8px hsl(0deg 0% 0% / 0.38);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45px;
  right: 5px;
  background-color: white;
  z-index: 5;

  & > div {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
  }
  & > div:hover {
    background-color: rgb(230, 230, 230);
  }
`;
