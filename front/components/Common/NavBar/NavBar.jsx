import React from 'react';
import Link from 'next/link';
import { Nav } from './styles';

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link href="/">
            {/* <a>자유</a> */}
            자유
          </Link>
        </li>
        <li>
          <Link href="/news">
            {/* <a>뉴스</a> */}
            뉴스
          </Link>
        </li>
        <li>
          <Link href="/blog">
            {/* <a>블로그</a> */}
            블로그
          </Link>
        </li>
        <li>
          <Link href="/hotdeal">핫딜</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
