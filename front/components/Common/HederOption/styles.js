import styled from 'styled-components';

export const MyProfileOptionForm = styled.div`
  @keyframes slideDown {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
    }
  }

  animation-name: ${props => (props.headerOptionVisible ? 'slideDown' : '')};
  animation-duration: 0.3s;
  animation-delay: 0s;

  display: ${props => (props.headerOptionVisible ? 'block' : 'none')};
  width: 150px;
  height: 100px;
  box-shadow: -2px 2px 8px hsl(0deg 0% 0% / 0.38);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 63px;
  right: 5px;
  background-color: white;

  & > a {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  & > a:hover {
    background-color: rgb(230, 230, 230);
  }
`;
