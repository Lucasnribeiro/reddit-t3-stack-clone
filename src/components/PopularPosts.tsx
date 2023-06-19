import React from 'react';
import PopularPostsFilter from '@/components/ui/PopularPostsFilter';
import PostItem from '@/components//ui/PostItem';
import QuickNewPost from '@/components/ui/QuickNewPost';


const PopularPosts = () => {
const posts = [
    {
        title: 'Post 1',
        user: 'Lucasnribeiro',
        upvotes: 10,
        subreddit: 'r/subreddit',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna a nunc hendrerit hendrerit id ac lectus. 
                  Curabitur malesuada nulla sem, at venenatis nulla pulvinar ac. Sed pulvinar turpis nec condimentum convallis. 
                  Duis auctor, dolor in commodo dignissim, tortor nisl placerat nunc, vitae interdum turpis dolor ut quam.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna a nunc hendrerit hendrerit id ac lectus. 
                  Curabitur malesuada nulla sem, at venenatis nulla pulvinar ac. Sed pulvinar turpis nec condimentum convallis. 
                  Duis auctor, dolor in commodo dignissim, tortor nisl placerat nunc, vitae interdum turpis dolor ut quam.`,
        date: 'June 1, 2023',
        image: 'https://example.com/image1.jpg'
    },
    {
        title: 'Post 2',
        user: 'Lucasnribeiro',
        upvotes: 20,
        subreddit: 'Subreddit 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna a nunc hendrerit hendrerit id ac lectus. 
                  Curabitur malesuada nulla sem, at venenatis nulla pulvinar ac. Sed pulvinar turpis nec condimentum convallis. 
                  Duis auctor, dolor in commodo dignissim, tortor nisl placerat nunc, vitae interdum turpis dolor ut quam.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna a nunc hendrerit hendrerit id ac lectus. 
                  Curabitur malesuada nulla sem, at venenatis nulla pulvinar ac. Sed pulvinar turpis nec condimentum convallis. 
                  Duis auctor, dolor in commodo dignissim, tortor nisl placerat nunc, vitae interdum turpis dolor ut quam.`,
        date: 'June 2, 2023',
        image: 'https://example.com/image2.jpg'
    },
    // Add more posts as needed
    ]   

  const popularItems = [
    { name: 'Item 1', isBlue: true, icon: 'icon1', caretDown: true },
    { name: 'Item 2', isBlue: false, icon: 'icon2', caretDown: false },
    { name: 'Item 3', isBlue: true, icon: 'icon3', caretDown: true },
    // Add more items as needed
  ];

  return (
    <div className="flex flex-col space-y-2">
      <QuickNewPost />
      <PopularPostsFilter />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
};

const Icon = ({ icon, className }) => {
  // Implement your own icon component or use a library
  return <i className={`fa fa-${icon} ${className}`} />;
};

export default PopularPosts;
