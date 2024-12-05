import React from 'react';
import Link from 'next/link';
import { Nav } from './styles';

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link href="/">자유</Link>
        </li>
        <li>
          <Link href="/news/1">뉴스</Link>
        </li>
        <li>
          <Link href="/blog/1">블로그</Link>
        </li>
        <li>
          <Link href="/hotdeal">핫딜</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
