import { LOADING } from '../reducers';
import { LOAD_MORE_HOTDEAL_POSTS_REQUEST } from '../reducers/posts';

export function useInfiniteScroll(
  viewport,
  hasMoreHotDealPosts,
  loadHotDealPostsStatus,
  hotDealPosts,
  scrollTarget,
  dispatch,
) {
  const options = {
    root: viewport.current,
    threshold: 0,
  };

  const handleIntersection = entries => {
    entries.forEach(entry => {
      if (
        entry.isIntersecting &&
        hasMoreHotDealPosts &&
        !(loadHotDealPostsStatus === LOADING)
      ) {
        const lastId = hotDealPosts[hotDealPosts.length - 1]?.id;
        dispatch({
          type: LOAD_MORE_HOTDEAL_POSTS_REQUEST,
          data: lastId,
        });
      }
    });
  };

  const io = new IntersectionObserver(handleIntersection, options);

  if (scrollTarget.current) {
    io.observe(scrollTarget.current); // 관찰 지정
  }

  return io;
}
