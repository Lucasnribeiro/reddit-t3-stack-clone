import React from 'react';
import PopularPostsFilter from '@/components/ui/PopularPostsFilter';
import PostItem from '@/components//ui/PostItem';
import QuickNewPost from '@/components/ui/QuickNewPost';
import { api } from '~/utils/api';
import PostItemSkeleton from './PostItemSkeleton';

const PopularPosts = () => {
const { data: posts, isLoading, isError } = api.post.all.useQuery();


  const popularItems = [
    { name: 'Item 1', isBlue: true, icon: 'icon1', caretDown: true },
    { name: 'Item 2', isBlue: false, icon: 'icon2', caretDown: false },
    { name: 'Item 3', isBlue: true, icon: 'icon3', caretDown: true },
    // Add more items as needed
  ];

  return (
    <div className="flex flex-col space-y-4">
      <QuickNewPost />
      <PopularPostsFilter />
      {isLoading ? 
        <PostItemSkeleton />
        :
        posts?.map((post, index) => (
          <PostItem key={index} {...post} />
        ))
      }
    </div>
  );
};

export default PopularPosts;
