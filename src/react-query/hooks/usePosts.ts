import {
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const MINUTE = 1000 * 60;

export const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    // URL will look like this */users/1/posts
    queryKey: ['posts', query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _start: ((pageParam as number) - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length >= 0 ? allPages.length + 1 : undefined;
    },
    /*
    return next page number, i.e. if on page 1 return page2 jsonPlaceholder last page will return [] if no more posts. in real world good API will return total number of pages in advance so code will look cleaner than this...
      */
    staleTime: 1 * MINUTE, // 1 min
    placeholderData: keepPreviousData,
  });
};
