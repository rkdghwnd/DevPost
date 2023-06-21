import styled from 'styled-components';

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid rgb(240, 240, 240);
  ul {
    display: flex;
    padding: 0;
    margin: 0;
  }
  ul > li {
    list-style-type: none;
    padding: 15px;
    margin: 5px 0 5px 15px;
    font-size: 18px;
  }
  ul > li:hover {
    border-radius: 10px;
    background-color: var(--gray-light-color);
    transition: background-color 0.3s ease-out;
  }
  ul > li > a {
    color: #bfbfbf;
    text-decoration: none;
    font-weight: bold;
  }
  ul > li > a:hover {
    color: rgb(130, 130, 130);
    transition: color 0.3s ease-out;
  }
  @media (min-width: 765px) {
    position: static;
  }
`;
