import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ssrHelper } from "~/server/api/ssrHelper"
import { api } from "~/utils/api"

const Subreddit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>= ({ subreddit }) => {

    const { data: subredditQuery } = api.subreddit.get.useQuery({ title: subreddit})

    return (
        <>
            <div className="flex">
                <Avatar style={{width: 100, height: 100}}>
                    <AvatarImage src={'/images/placeholder-avatar.png'}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>{subredditQuery?.title}</h1>
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