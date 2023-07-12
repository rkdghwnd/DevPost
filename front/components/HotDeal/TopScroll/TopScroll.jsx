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
        display: window.scrollY > 500 ? '' : 'none',
      });
    };

    window.addEventListener('scroll', _.throttle(onButtonVisible, 500));
    return () => {
      window.removeEventListener('scroll', _.throttle(onButtonVisible, 500));
    };
  }, [topButton]);

  useEffect(() => {
    if (window.scrollY < 500) {
      topButton.current.style.display = 'none';
    } else {
      topButton.current.style.display = '';
    }
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
