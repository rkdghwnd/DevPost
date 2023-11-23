import React, { useCallback, useEffect, useRef } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import _ from 'underscore';
import { TopButton } from './styles';

const TopScroll = () => {
  const topButton = useRef();

  useEffect(() => {
    const onButtonVisible = () => {
      if (topButton.current) {
        topButton.current.style.display =
          window.scrollY < 500 ? 'none' : 'flex';
      }
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
      topButton.current.style.display = 'flex';
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
