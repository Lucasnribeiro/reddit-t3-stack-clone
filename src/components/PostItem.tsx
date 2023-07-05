import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Post } from '@/src/types';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faAward, faBookmark, faChevronDown, faChevronUp, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '~/utils/api';


const PostItem = (props : Post) => {
  const { data: session} = useSession();
  const [ upvote, setUpvote ] = useState(props.upvotes.some((item) => item.userId === session?.user.id ));
  const [ downvote, setDownvote ] = useState(props.downvotes.some((item) => item.userId === session?.user.id ));
  const [ currentInteractions, setCurrentInteractions ] = useState(Object.keys(props.upvotes).length - Object.keys(props.downvotes).length)
  const router = useRouter();

  const { mutate: upvotePost }  = api.post.upvotePost.useMutation({
      onSettled: async () => {
        // await trpc.post.getBatch.invalidate()
      }
  })

  const { mutate: unUpovotePost }  = api.post.unUpovotePost.useMutation({
      onSettled: async () => {
        // await trpc.post.getBatch.invalidate()
      }
  })

  const { mutate: downvotePost }  = api.post.downvotePost.useMutation({
    onSettled: async () => {
      // await trpc.post.getBatch.invalidate()
    }
  })

  const { mutate: unDownvotePost }  = api.post.unDownvotePost.useMutation({
    onSettled: async () => {
      // await trpc.post.getBatch.invalidate()
    }
  })

  return (

    <div key={props.id} className="border border-solid border-gray-400 bg-white rounded shadow flex">
      <div className="flex flex-col place-items-center text-2xl p-2 bg-gray-100 justify-top">
        {
          upvote ?

            <div>
              <FontAwesomeIcon onClick={() => { 
                    unUpovotePost({postId: props.id});
                    setUpvote(false);
                    setCurrentInteractions((prevInteractions) => Math.max(prevInteractions - 1, 0));
                  }
                } 
                icon={faChevronUp} 
                className="text-red-500 hover:text-slate-200 cursor-pointer" 
              />
            </div>
          :

            <div>
              <FontAwesomeIcon onClick={() => {
                    upvotePost({postId: props.id});
                    if (downvote) {
                      unDownvotePost({ postId: props.id });
                      setDownvote(false);
                    }
                    setUpvote(true)
                    setCurrentInteractions((prevInteractions) => prevInteractions + 1);
                  }
                } 
                icon={faChevronUp} 
                className="hover:text-red-500 cursor-pointer" 
              />
            </div>
        }
        <div className=" font-bold text-sm">
          {currentInteractions}
        </div>
        {
          downvote ? 

              <div>
                <FontAwesomeIcon onClick={() => {
                      unDownvotePost({postId: props.id});
                      setDownvote(false);
                      setCurrentInteractions((prevInteractions) => Math.max(prevInteractions + 1, 0));
                    }
                  } 
                  icon={faChevronDown} 
                  className="text-red-500 hover:text-slate-200 cursor-pointer" 
                  />
              </div>

            :

              <div>
                <FontAwesomeIcon onClick={() => {
                      downvotePost({postId: props.id});
                      if (upvote) {
                        unUpovotePost({ postId: props.id });
                        setUpvote(false);
                      }
                      setDownvote(true)
                      setCurrentInteractions((prevInteractions) => prevInteractions - 1);
                    }
                  } 
                  icon={faChevronDown}
                   className="hover:text-red-500 cursor-pointer" 
                  />
              </div>
        }
      </div>

      <div className="flex flex-col pl-4 pt-2">
        <Link href={`/r/${props.subreddit.subredditHandle}/posts/${props.id}`}>
          <div className="flex place-items-center space-x-2">
            <Avatar style={{width: 25, height: 25}}>
                <AvatarImage src={props.user.image ?? '/images/placeholder-avatar.png'}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Link href={`/r/${props.subreddit.subredditHandle}`}><div className="font-bold">r/{props.subreddit.subredditHandle}</div></Link> 
            <div className="font-thin text-gray-600">
              Posted by <Link href={`/u/${props.user.name ?? 'user'}`}> {props.user.name} </Link> {new Date(props.createdAt).toString()}
            </div>
          </div>
          <div className="text-2xl font-bold py-4">
            {props.title}
          </div>
          {
            props.images.length > 0 ? 

              props.images.map( (image) => 
                <img key={image.id} className="h-auto max-w-full pb-2 pr-8" src={`https://react-clone-bucket.s3.amazonaws.com/images/${image.userId}/${image.id}`}></img>

              )

            :

            <div 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content.substring(0, 500)) }} 
              style= {{
                WebkitMaskImage: props.content.length >= 500  ? 'linear-gradient(180deg, #000 20%, transparent)' : '', 
                maxHeight: '120px'
              }} 
              className='pb-2 pr-8'
            >


          </div>
        }
        </Link>
        <div className="flex text-gray-500 space-x-4">

            <div onClick={() => router.push(`/r/${props.subreddit.title}/posts/${props.id}#comment-section`)} className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faMessage} />
              <div>
                {props._count?.comments > 0 ? `${props._count?.comments} Comments` : 'Comments' }
              </div>
            </div>

            <div  className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faAward} />
              <div>
                Award
              </div>
            </div>

            <div  className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faShare} />
              <div>
                Share
              </div>
            </div>

            <div  className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faBookmark} />
              <div>
                Save
              </div>
            </div>

        </div>
      </div>
    </div>

  );
};

export default PostItem;