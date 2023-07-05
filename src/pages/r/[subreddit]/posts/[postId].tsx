import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import AboutCommunityCard from "~/components/AboutCommunityCard";
import CommentItem from "~/components/CommentItem";
import PostDetail from "~/components/PostDetail";
import PostItemSkeleton from "~/components/PostItemSkeleton";
import RichTextEditorComment from "~/components/RichTextEditorComment";
import { api } from "~/utils/api";


const Post: NextPage<InferGetServerSidePropsType <typeof getServerSideProps>> =({postId}) => {

    const { data: post, isLoading } = api.post.get.useQuery({postId: postId, onlyRootComments: true})

    return ( 
        <div className="flex flex-col pt-7 pb-7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
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
                                            post?.comments?.map((comment) =>
                                                <CommentItem key={comment.id} {...comment}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                                null
                    }
                </div>
                <AboutCommunityCard subredditId ={post?.subreddit.id} />
            </div>
        </div>
    )
}


export function getServerSideProps(context: GetServerSidePropsContext<{postId: string}>){
    const postId = context.params?.postId;

    return { 
        props: {
            postId: postId
        }
    }

}

export default Post