import React, {useState} from 'react'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from "next"
import { useSession } from "next-auth/react"
import CreatePostCreateCommunityCard from "~/components/CreatePostCreateCommunityCard"
import PopularPosts from "~/components/PopularPosts"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ssrHelper } from "~/server/api/ssrHelper"
import { api } from "~/utils/api"
import Head from 'next/head'

const Subreddit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>= ({ subreddit }) => {
    const { data: session, status } = useSession();
    const { data: subredditQuery } = api.subreddit.get.useQuery({ title: subreddit})
    const [memberStatus, setMemberStatus ] = useState(subredditQuery?.members.some((item) => item.userId === session?.user.id))

    const trpc = api.useContext()

    const { mutate: joinSubreddit }  = api.subreddit.joinSubreddit.useMutation({
        onSettled: async () => {
          await trpc.subreddit.get.invalidate()
        }
    })

    const { mutate: leaveSubreddit }  = api.subreddit.leaveSubreddit.useMutation({
        onSettled: async () => {
          await trpc.subreddit.get.invalidate()
        }
    })

    return (
        <>  
            <Head>
                <title>/r/{subredditQuery?.title}</title>
            </Head>

            <div className="bg-white">
                <div className="bg-slate-300 h-56 w-full">

                </div>
                <div className="flex pt-5 pb-7 bg-transparent mx-auto items-center max-w-6xl lg:max-w-7xl xl:max-w-8xl">
                    <Avatar style={{width: 100, height: 100}}>
                        <AvatarImage src={'/images/placeholder-avatar.png'}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="pl-8">
                        <h1 className="font-bold text-3xl">{subredditQuery?.title}</h1>
                        <p className="text-slate-500">r/{subredditQuery?.title}</p>
                    </div>
                    <div className="pl-10">
                        {subredditQuery ?
                            memberStatus ? 
                                                            
                                <button onClick={() => {
                                            leaveSubreddit({subredditId: subredditQuery?.id});
                                            setMemberStatus(false)
                                        }
                                    } className="h-2/5 px-8 py-2 font-bold text-blue-500 bg-transparent border border-blue-500 rounded-3xl focus:outline-none hover:bg-red-600 hover:text-white transition-colors duration-300 group">
                                    <span className="group-hover:hidden">
                                        Joined
                                    </span>
                                    <span className="hidden group-hover:inline-block">
                                        Leave
                                    </span>
                                </button>

                                :
                                <button 
                                    className="h-2/5 px-8 py-2 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600"
                                    onClick={() => {
                                            joinSubreddit({subredditId: subredditQuery?.id});
                                            setMemberStatus(true);
                                        }
                                    }
                                >
                                    Join
                                </button>

                            :

                            null

                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col pt-5 pb7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
                <div className="flex gap-8">
                    <div className="w-full">
                        <PopularPosts subredditId={subredditQuery?.id}/>
                    </div>

                    <div className="hidden w-1/2 md:block">
                        <CreatePostCreateCommunityCard/>
                    </div>
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
        }
    };
}


export default Subreddit