import React from 'react';
import { usePosts } from './hooks/usePosts';

const PostList = () => {
  const pageSize = 10;
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePosts({ pageSize });

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul className='list-group'>
        {posts?.pages.map((page, index) => (
          <React.Fragment key={page[index].id}>
            {page.map((post) => (
              <li
                key={post.id}
                className='list-group-item'
              >
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        type='button'
        className='btn btn-primary my-3'
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
      <div>
        {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
      </div>
    </>
  );
};

export { PostList };
