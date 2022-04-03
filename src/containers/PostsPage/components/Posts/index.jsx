import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import { Post } from '../Post';

export const Posts = (props) => {
  const { posts } = props;
  if (!posts?.length) {
    return (
      <span data-testid="Posts__empty" className="Posts__empty">
        Posts has not been found
      </span>
    );
  }

  return (
    <div data-testid="Posts" className="Posts">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array
};
