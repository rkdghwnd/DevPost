export function useFilter(posts, filteredList, name) {
  const tags = [
    ...new Set(
      posts?.map(post => {
        return post[name];
      }),
    ),
  ];

  const visiblePosts =
    filteredList.length === 0
      ? posts
      : posts?.filter(post => {
          return filteredList.includes(post[name]);
        });

  return [tags, visiblePosts];
}
