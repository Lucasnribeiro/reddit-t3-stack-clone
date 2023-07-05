import { faCake, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function AboutCommunityCard({subredditId} : {subredditId: string | undefined}){


    const {data: subreddit, isLoading } = api.subreddit.get.useQuery({subredditId: subredditId})

    return (
        <div className="hidden w-5/12 h-full md:block border border-solid border-gray-400 bg-white rounded shadow">
                    <div className="font-semibold text-white flex justify-between bg-blue-500 py-4 px-5 rounded-t shadow">
                        <span >About Community</span>
                        <button><FontAwesomeIcon icon={faEllipsis}/></button>
                    </div>
                    <div className="px-4 py-3">
                        <div className="flex items-center">
                            <Avatar style={{width: 80, height: 80}}>
                                {subreddit &&  <AvatarImage src={subreddit.image ? `https://react-clone-bucket.s3.us-east-1.amazonaws.com/subreddit/${subreddit.id}/${subreddit.image}` : '/images/placeholder-avatar.png'}/>}
                                <AvatarFallback />
                            </Avatar>
                            <span className="ml-5 text-xl font-semibold">r/{subreddit?.title}</span>
                        </div> 
                        <div className="mt-3">
                            <span></span>   
                        </div> 
                        <div className="mt-2">
                            <FontAwesomeIcon icon={faCake} />
                            <span className="ml-2">Created { subreddit?.createdAt.toDateString()}</span>
                        </div>
                        <div className="border-t border-gray-300 my-4"/>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>{subreddit?._count?.posts}</span>
                                <span>Posts</span>
                            </div>
                            <div className="flex flex-col">
                                <span>{subreddit?._count?.members}</span>
                                <span>Members</span>
                            </div>
                            <div className="flex flex-col">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 my-4"/>
                        <div className="flex flex-col">
                            <Link
                                className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded-xl focus:outline-none hover:bg-blue-600"
                                href="/submit"
                            >
                                Create Post
                            </Link>
                        </div>
                    </div>
                </div>
    )
}