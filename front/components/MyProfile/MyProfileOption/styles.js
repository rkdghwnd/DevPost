import styled from 'styled-components';

export const MyProfileOptionForm = styled.div`
  @keyframes myProfileOptionslideDown {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: ${props =>
    props.myProfileOptionVisible ? 'myProfileOptionslideDown' : ''};
  animation-duration: 0.3s;
  animation-delay: 0s;

  width: 150px;
  height: 100px;
  box-shadow: -2px 2px 8px hsl(0deg 0% 0% / 0.38);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 5px;
  background-color: white;
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
  & > div > a {
    text-decoration: none;
    color: black;
  }
`;
