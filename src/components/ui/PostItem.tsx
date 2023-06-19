import { faAward, faBookmark, faChevronDown, faChevronUp, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react';
import { faMessage } from '@fortawesome/free-regular-svg-icons';


const PostItem = ({ post }) => {
  const interactions = [
    { icon: faMessage, name: 'Comments' },
    { icon: faAward, name: 'Award' },
    { icon: faShare, name: 'Share' },
    { icon: faBookmark, name: 'Save' },
    { icon: faEllipsis, name: '' },
  ];

  return (
    <div className="border border-solid border-gray-400 bg-white rounded shadow flex">
      <div className="flex flex-col place-items-center text-2xl p-2 bg-gray-100 justify-top">
        <div>
          <FontAwesomeIcon icon={faChevronUp} className="hover:text-red-500" />
        </div>
        <div className=" font-bold text-sm">
          {post.upvotes}
        </div>
        <div>
        <FontAwesomeIcon icon={faChevronDown} className="hover:text-red-500" />
        </div>
      </div>
      <div className="flex flex-col pl-4 pt-2">
        <div className="flex place-items-center space-x-2">
          <Avatar style={{width: 25, height: 25}}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-bold">{post.subreddit}</div>
          <div className="font-thin text-gray-600">
            Posted by {post.user} {post.date}
          </div>
        </div>
        <div className="text-2xl font-bold py-4">
          {post.title}
        </div>
        <div style={{WebkitMaskImage: 'linear-gradient(180deg, #000 60%, transparent)'}} className='pb-2'>
            {post.content}
        </div>
        <div className="flex text-gray-500 space-x-4">
          {interactions.map((interaction) => (
            <div key={interaction.icon} className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200">
              <FontAwesomeIcon icon={interaction.icon} />
              <div>
                {interaction.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostItem;