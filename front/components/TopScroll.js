import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowUp } from 'react-icons/ai';
import _ from 'underscore';
import { gsap } from 'gsap';

const TopButton = styled.button`
  all: unset;
  position: fixed;
  width: 40px;
  height: 40px;
  left: 25px;
  bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  cursor: pointer;
  font-size: 20px;
  color: rgb(200, 200, 200);
  @media (min-width: 765px) {
    bottom: 50px;
  }
`;
const TopScroll = () => {
  const topButton = useRef();

  useEffect(() => {
    const onButtonVisible = () => {
      if (window.scrollY > 500) {
        gsap.to(topButton.current, {
          duration: 0.3,
          y: 0,
          opacity: 1,
          display: '',
        });
      } else {
        gsap.to(topButton.current, {
          duration: 0.3,
          y: 100,
          opacity: 0,
          display: 'none',
        });
      }
    };

    window.addEventListener('scroll', _.throttle(onButtonVisible, 300));
    return () => {
      window.removeEventListener('scroll', _.throttle(onButtonVisible, 300));
    };
  }, [topButton]);

  useEffect(() => {
    topButton.current.style.display = 'none';
  }, []);

  const onScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <TopButton onClick={onScrollTop} ref={topButton}>
      <AiOutlineArrowUp />
    </TopButton>
  );
};

export default TopScroll;
