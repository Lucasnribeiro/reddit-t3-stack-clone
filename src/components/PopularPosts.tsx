import React, { useState } from 'react';
import PopularPostsFilter from '~/components/PopularPostsFilter';
import PostItem from '~/components/PostItem';
import QuickNewPost from '~/components/QuickNewPost';
import { api } from '~/utils/api';
import PostItemSkeleton from './PostItemSkeleton';
import ScrollTriggerComponent from './ScrollTriggerComponent';
import { sortPostsByBest, sortPostsByHot, sortPostsByTop, sortPostsByNew } from '~/utils/sortingPosts';
import { PopularPostsProps } from '~/types';



const PopularPosts: React.FC<PopularPostsProps> = ({subredditId}) => {
  const [page, setPage] = useState(0);  
  const [currentFilter, setCurrentFilter] = useState<string>('New');
  
  const sortingFunction = () => {
    switch (currentFilter) {
      case 'Best':
        return sortPostsByBest;
      case 'Hot':
        return sortPostsByHot;
      case 'New':
        return sortPostsByNew;
      case 'Top':
        return sortPostsByTop;
      default:
        return sortPostsByNew;
    }
  };

  const { data: posts, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isFetching } = api.post.getBatch.useInfiniteQuery(
    {
      limit: 5,
      subredditId: subredditId
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const handleFetchNextPage = async () => {
      await fetchNextPage();
      setPage((prev) => prev + 1);
  };

  const handleFilterChange = async (filter: string) => {
    await refetch();
    setPage(0);
    setCurrentFilter(filter);
  };

  return (
    <div className="flex flex-col space-y-4">
      <QuickNewPost />
      <PopularPostsFilter onFilterChange={handleFilterChange}/>
      {isLoading || isFetching ? 
        <PostItemSkeleton />
        :
        <>

          {
            posts?.pages?.map((currentPage) => 
              sortingFunction()(currentPage.items).map((post, index, array) => (
                <PostItem key={index} {...post} />
              )
            ))
          } 
          
          <ScrollTriggerComponent 
            callFunction={handleFetchNextPage} 
            isFetchingNextPage={isFetchingNextPage} 
            hasNextPage={hasNextPage}
          />

          {
            isFetchingNextPage && <PostItemSkeleton/>
          }

        </>
      }

    </div>
  );
};

export default PopularPosts;
