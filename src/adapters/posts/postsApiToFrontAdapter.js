/* eslint-disable camelcase */
export const postsApiToFrontAdapter = ({ page, posts }) => {
  const names = {};

  posts.forEach(({ from_name }) => {
    names[from_name] = null;
  });

  Object.keys(names).forEach((name) => {
    names[name] = posts.filter(({ from_name }) => from_name === name);
  });

  return {
    page,
    posts: names
  };
};
