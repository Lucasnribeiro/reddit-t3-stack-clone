import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Comment } from '@/src/types'
import DOMPurify from "dompurify";
import { api } from "~/utils/api";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faMessage } from "@fortawesome/free-solid-svg-icons";
import RichTextEditorReply from "./RichTextEditorReply";

export default function CommentItem(comment: Comment){
    const { data: session, status } = useSession();
    const [ upvote, setUpvote ] = useState(comment?.upvotes.some((item) => item.userId === session?.user.id ));
    const [ downvote, setDownvote ] = useState(comment?.downvotes.some((item) => item.userId === session?.user.id ));
    const [ currentInteractions, setCurrentInteractions ] = useState(Object.keys(comment.upvotes).length - Object.keys(comment.downvotes).length)
    const [ reply, setReply] = useState<boolean>(false)

    const { data: replies, isLoading, isFetching } = api.comment.all.useQuery({parentId: comment?.id})

    const trpc = api.useContext()
  
    const { mutate: upvoteComment }  = api.comment.upvoteComment.useMutation({
        onSettled: async () => {
          // await trpc.post.getBatch.invalidate()
        }
    })
  
    const { mutate: unUpovoteComment }  = api.comment.unUpovoteComment.useMutation({
        onSettled: async () => {
          // await trpc.post.getBatch.invalidate()
        }
    })
  
    const { mutate: downvoteComment }  = api.comment.downvoteComment.useMutation({
      onSettled: async () => {
        // await trpc.post.getBatch.invalidate()
      }
    })
  
    const { mutate: unDownvoteComment }  = api.comment.unDownvoteComment.useMutation({
      onSettled: async () => {
        // await trpc.post.getBatch.invalidate()
      }
    })



    return(
        <div className="flex space-x-1 my-2 w-full">
            <div className="flex flex-col w-12 items-center justify-center">
                    <Avatar>
                        <AvatarImage src={comment?.user.image ?? '/images/placeholder-avatar.png'}/>
                        <AvatarFallback />
                    </Avatar>
                    <div className="h-full border-l border-gray-400"/>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full">
                    <span className="font-semibold text-sm">{comment?.user.name} · <span className="text-gray-400 font-normal">{comment?.createdAt.toString()}</span></span>
                </div>
                <div className="w-full mt-3">
                    <div 
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.content.substring(0, 500)) }} 
                        style= {{
                            WebkitMaskImage: comment?.content.length >= 500  ? 'linear-gradient(180deg, #000 20%, transparent)' : '', 
                            maxHeight: '120px'
                        }} 
                        className='pb-2 pr-8'
                        >
                    </div>
                </div>
                <div className="flex">
                    <div className="flex place-items-center text-2xl p-2 space-x-3 justify-top">
                        {
                        upvote ?

                            <div>
                            <FontAwesomeIcon onClick={() => { 
                                    unUpovoteComment({commentId: comment.id});
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
                                    upvoteComment({commentId: comment.id});
                                    if (downvote) {
                                    unDownvoteComment({ commentId: comment.id });
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
                                    unDownvoteComment({commentId: comment.id});
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
                                    downvoteComment({commentId: comment.id});
                                    if (upvote) {
                                        unUpovoteComment({ commentId: comment.id });
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
                        <div className="flex flex-col w-full">
                            <div className="flex w-full text-gray-500 space-x-4">
                                <div onClick={() => setReply(true)} className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200">
                                    <FontAwesomeIcon icon={faMessage} />
                                    <div>
                                        Reply
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex w-full">
                    <div className="h-full border-l border-gray-400"/>
                    {reply && <RichTextEditorReply reply={reply} setReply={setReply} parentId={comment.id} postId={comment.post!.id}/>}
                </div>
                {
                    replies?.map( (reply) => <CommentItem key={reply.id} {...reply} />)
                }
            </div>

        </div>
    )
}