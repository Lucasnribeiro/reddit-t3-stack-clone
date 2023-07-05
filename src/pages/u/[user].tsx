import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import PopularPosts from "~/components/PopularPosts";
import ProfileUserCard from "~/components/ProfileUserCard";
import { ssrHelper } from "~/server/api/ssrHelper";
import { api } from "~/utils/api";

const User: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
    const { data: session, status } = useSession();
    const { data: userQuery } = api.subreddit.get.useQuery({ title: user})

    return (
    <>
        <Head>
            <title>{userQuery?.title}</title>
        </Head>
        <div className=" border-t-2"> 
            <Tabs defaultValue="account" className=" pt-5 pb-7 mx-auto max-w-6xl lg:max-w-7xl xl:max-w-8xl">
                <TabsList className="">
                    <TabsTrigger value="account">OVERVIEW</TabsTrigger>
                    <TabsTrigger value="password">POSTS</TabsTrigger>
                    <TabsTrigger value="password">COMMENTS</TabsTrigger>
                    <TabsTrigger value="password">SAVED</TabsTrigger>
                    <TabsTrigger value="password">UPVOTED</TabsTrigger>
                    <TabsTrigger value="password">DOWNVOTED</TabsTrigger>
                </TabsList>
                <div className="bg-gray-200">
                    <TabsContent value="account">
                        <div className="flex flex-col pt-5 pb7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
                            <div className="flex gap-8">
                                <div className="w-full">
                                    <PopularPosts />
                                </div>
                                <div className="hidden w-1/2 md:block">
                                    <ProfileUserCard/>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </div>
            </Tabs>
        </div>
        <div className="flex flex-col pt-5 pb-7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl"></div>



    </>
    ) 

}

export async function getServerSideProps(context: GetServerSidePropsContext<{ user: string }>) {
    const user = context.params?.user;
    const ssr = ssrHelper();
    
    await ssr.user.get.prefetch({name: user})

    return {
        props: {
            trpcState: ssr.dehydrate(),
            user,
        }
    };
}

export default User