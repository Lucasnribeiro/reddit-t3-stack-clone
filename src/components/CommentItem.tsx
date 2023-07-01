import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Comment } from '@/src/types'
import DOMPurify from "dompurify";






export default function CommentItem(comment: Comment){




    return(
        <div className="flex space-x-6 my-3">
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
                <div>

                </div>
            </div>
        </div>
    )
}