import { faCake, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvatarFallback } from "@radix-ui/react-avatar";
import DOMPurify from "dompurify";
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import Link from "next/link";
import CommentItem from "~/components/CommentItem";
import PostDetail from "~/components/PostDetail";
import PostItemSkeleton from "~/components/PostItemSkeleton";
import RichTextEditor from "~/components/RichTextEditor";
import RichTextEditorComment from "~/components/RichTextEditorComment";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";


const Post: NextPage<InferGetServerSidePropsType <typeof getServerSideProps>> =({postId}) => {

    const { data: post, isLoading, isFetching } = api.post.get.useQuery({postId: postId})

    return ( 
        <div className="flex flex-col pt-7 pb7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
            <div className="flex gap-8">
                <div className="flex w-full flex-col">
                    {
                        isLoading ?
                            <PostItemSkeleton/>
                        :
                            post ?
                            <div key={post?.id} className="border border-solid border-gray-400 bg-white rounded shadow flex flex-col"> 
                                <PostDetail key={post?.id} {...post }/>
                                <div className="px-10">
                                    <RichTextEditorComment subreddit={post?.subreddit.id} postId={post?.id}/>
                                    <div>
                                        {
                                            post?.comments.map( (comment) => 
                                                <CommentItem {...comment}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                                null
                    }
                </div>
                <div className="hidden w-5/12 h-full md:block border border-solid border-gray-400 bg-white rounded shadow">
                    <div className="font-semibold text-white flex justify-between bg-blue-500 py-4 px-5 rounded-t shadow">
                        <span >About Community</span>
                        <button><FontAwesomeIcon icon={faEllipsis}/></button>
                    </div>
                    <div className="px-4 py-3">
                        <div className="flex items-center">
                            <Avatar style={{width: 80, height: 80}}>
                                <AvatarImage src={post?.user.image ?? '/images/placeholder-avatar.png'}/>
                                <AvatarFallback />
                            </Avatar>
                            <span className="ml-5 text-xl font-semibold">r/{post?.subreddit.title}</span>
                        </div> 
                        <div className="mt-3">
                            <span>description</span>   
                        </div> 
                        <div className="mt-2">
                            <FontAwesomeIcon icon={faCake} />
                            <span className="ml-2">Created</span>
                        </div>
                        <div className="border-t border-gray-300 my-4"/>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>50.4k</span>
                                <span>Posts</span>
                            </div>
                            <div className="flex flex-col">
                                <span>50.4k</span>
                                <span>Posts</span>
                            </div>
                            <div className="flex flex-col">
                                <span>50.4k</span>
                                <span>Posts</span>
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
            </div>
        </div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext<{postId: string}>){
    const postId = context.params?.postId;

    return { 
        props: {
            postId: postId
        }
    }

}

export default Post