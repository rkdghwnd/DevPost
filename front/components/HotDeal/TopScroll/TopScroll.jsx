import React, { useCallback, useEffect, useRef } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import _ from 'underscore';
import { gsap } from 'gsap';
import { TopButton } from './styles';

const TopScroll = () => {
  const topButton = useRef();

  useEffect(() => {
    const onButtonVisible = () => {
      gsap.to(topButton.current, {
        duration: 0.3,
        y: window.scrollY > 500 ? 0 : 100,
        display: '',
      });
    };

    window.addEventListener('scroll', _.throttle(onButtonVisible, 500));
    return () => {
      window.removeEventListener('scroll', _.throttle(onButtonVisible, 500));
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
