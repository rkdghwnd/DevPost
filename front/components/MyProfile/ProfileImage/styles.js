import styled from 'styled-components';

export const ProfileImageForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  & > span {
    border-radius: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: orange;
  }
  span {
    margin-bottom: 20px;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;
