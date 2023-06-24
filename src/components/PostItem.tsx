import { faAward, faBookmark, faChevronDown, faChevronUp, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import type { Post } from '@/src/types'
import DOMPurify from 'dompurify';
import Link from 'next/link';


const PostItem = (props : Post) => {

  const interactions = [
    {id: '1', icon: faMessage, name: 'Comments' },
    {id: '2', icon: faAward, name: 'Award' },
    {id: '3', icon: faShare, name: 'Share' },
    {id: '4', icon: faBookmark, name: 'Save' },
    {id: '5', icon: faEllipsis, name: '' },
  ];

  return (
    <div className="border border-solid border-gray-400 bg-white rounded shadow flex">
      <div className="flex flex-col place-items-center text-2xl p-2 bg-gray-100 justify-top">
        <div>
          <FontAwesomeIcon icon={faChevronUp} className="hover:text-red-500" />
        </div>
        <div className=" font-bold text-sm">
          {Object.keys(props.upvotes).length}
        </div>
        <div>
        <FontAwesomeIcon icon={faChevronDown} className="hover:text-red-500" />
        </div>
      </div>
      <div className="flex flex-col pl-4 pt-2">
        <div className="flex place-items-center space-x-2">
          <Avatar style={{width: 25, height: 25}}>
              <AvatarImage src={props.user.image ?? '/images/placeholder-avatar.png'}/>
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link href={`/r/${props.subreddit.title}`}><div className="font-bold">r/{props.subreddit.title}</div></Link> 
          <div className="font-thin text-gray-600">
            Posted by {props.user.name} {new Date(props.createdAt).toString()}
          </div>
        </div>
        <div className="text-2xl font-bold py-4">
          {props.title}
        </div>
        <div 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content.substring(0, 500)) }} 
          style={{WebkitMaskImage: 'linear-gradient(180deg, #000 20%, transparent)', maxHeight: '120px'}} 
          className='pb-2 pr-8'
        >
        
        </div>
        <div className="flex text-gray-500 space-x-4">
          {interactions.map((interaction) => (
            <div key={interaction.id}  className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200">
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