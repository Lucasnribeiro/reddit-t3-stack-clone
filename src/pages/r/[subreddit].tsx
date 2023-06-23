import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from "next"
import CreatePostCreateCommunityCard from "~/components/CreatePostCreateCommunityCard"
import PopularPosts from "~/components/PopularPosts"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ssrHelper } from "~/server/api/ssrHelper"
import { api } from "~/utils/api"

const Subreddit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>= ({ subreddit }) => {

    const { data: subredditQuery } = api.subreddit.get.useQuery({ title: subreddit})

    return (
        <>
            <div className="flex items-center">
                <Avatar style={{width: 100, height: 100}}>
                    <AvatarImage src={'/images/placeholder-avatar.png'}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="pl-8">
                    <h1 className="font-bold text-3xl">{subredditQuery?.title}</h1>
                    <p className="text-slate-500">r/{subredditQuery?.title}</p>
                </div>
                <div className="pl-10">
                    <button className="h-2/5 px-8 py-1 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600">
                        Join
                    </button>
                </div>
            </div>

            <div className="flex gap-8 mt-10">
                <div className="w-full">
                    <PopularPosts subredditId={subredditQuery?.id}/>
                </div>

                <div className="hidden w-1/2 md:block">
                    <CreatePostCreateCommunityCard/>
                </div>
            </div>

        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ subreddit: string }>) {
    const subreddit = context.params?.subreddit;
    const ssr = ssrHelper();
    
    await ssr.subreddit.get.prefetch({title: subreddit})

    return {
        props: {
            trpcState: ssr.dehydrate(),
            subreddit,
            hey: 'hey'
        }
    };
}


export default Subreddit