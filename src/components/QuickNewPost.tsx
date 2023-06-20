import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { faImage, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const QuickNewPost = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border border-solid border-gray-400 bg-white p-4 rounded shadow">
      <div className="flex items-center">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <input
        className="flex-1 ml-4 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Write something..."
        onClick={() => router.push('/submit')}
      ></input>
      <div className="flex items-center ml-4 space-x-2">
        <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none" onClick={() => router.push('/submit')}> <FontAwesomeIcon icon={faImage} /> </button>
        <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none" onClick={() => router.push('/submit')}> <FontAwesomeIcon icon={faLink} /> </button>
      </div>
    </div>
  );
};

export default QuickNewPost;
