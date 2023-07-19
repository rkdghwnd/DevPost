import React from 'react';
import Link from 'next/link';
import { Nav } from './styles';

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link href="/">
            <a>자유</a>
          </Link>
        </li>
        <li>
          <Link href="/news/1">
            <a>뉴스</a>
          </Link>
        </li>
        <li>
          <Link href="/blog/1">
            <a>블로그</a>
          </Link>
        </li>
        <li>
          <Link href="/hotdeal">
            <a>핫딜</a>
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
