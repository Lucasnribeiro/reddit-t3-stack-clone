import React, { useState } from 'react';
import PopularPostsFilter from '~/components/PopularPostsFilter';
import PostItem from '~/components/PostItem';
import QuickNewPost from '~/components/QuickNewPost';
import { api } from '~/utils/api';
import PostItemSkeleton from './PostItemSkeleton';
import ScrollTriggerComponent from './ScrollTriggerComponent';

interface PopularPostsProps {
  subredditId?: string | undefined
}

const PopularPosts: React.FC<PopularPostsProps> = ({subredditId}) => {
  const [page, setPage] = useState(0);  
  const { data: posts, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = api.post.getBatch.useInfiniteQuery(
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

  return (
    <div className="flex flex-col space-y-4">
      <QuickNewPost />
      <PopularPostsFilter />
      {isLoading ? 
        <PostItemSkeleton />
        :
        <>

          {
            posts?.pages?.map((currentPage) => 
              currentPage.items.map((post, index, array) => (
                <PostItem key={index} {...post} />
            )))
          } 
          
          <ScrollTriggerComponent callFunction={handleFetchNextPage} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage}/>

          {
            isFetchingNextPage && <PostItemSkeleton/>
          }
        </>
      }

    </div>
  );
};

export default PopularPosts;
