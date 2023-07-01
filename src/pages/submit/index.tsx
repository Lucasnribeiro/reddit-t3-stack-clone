import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {useState} from 'react'
import CreateImagePost from '~/components/CreateImagePost';
import RichTextEditor from "~/components/RichTextEditor";
import SelectSubreddit from '~/components/SelectSubreddit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function Submit(){
    const [subreddit, setSubreddit] = useState('');
    const router = useRouter()
    const { data: session, status } = useSession();

    if( status === "unauthenticated"){
        signIn().catch(console.log);
        return null
    }

    return (
        <div className="flex flex-col pt-7 pb7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
            <div className="flex gap-8">
                <div className="w-full flex flex-col space-y-4">
                    <div className="flex">
                        <h1 className="font-semibold text-lg font">Create a Post</h1>
                    </div>
                    <div className="border-t border-white my-4"/>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <SelectSubreddit setSubreddit={setSubreddit} optionValue='id'/>
                        </div>
                    </div>
                    <Tabs defaultValue={router.query.type == 'image' ? 'image' : 'post'} className="">
                        <TabsList className="">
                            <TabsTrigger value="post">POST</TabsTrigger>
                            <TabsTrigger value="image">IMAGE</TabsTrigger>
                        </TabsList>
                        <div className="bg-gray-200">
                            <TabsContent value="post">
                                <RichTextEditor subreddit={subreddit}/>
                            </TabsContent>
                            <TabsContent value="image">
                                <CreateImagePost subreddit={subreddit} />
                            </TabsContent>
                        </div>
                    </Tabs>

                </div>
                <div className="hidden w-1/2 md:block mt-6">
                    <div className="flex flex-col border border-solid border-gray-400 bg-white py-4 px-5 rounded shadow">
                        <div className="flex space-x-5">
                            <FontAwesomeIcon icon={faPerson}/>
                            <span className="font-semibold text-lg">Posting to Reddit</span>
                        </div>
                        <div className="flex flex-col font-semibold">
                            <div className="border-t border-gray-300 my-4"/>
                            <span>1. Remember the human</span>
                            <div className="border-t border-gray-300 my-4"/>
                            <span>2. Behave like you would in real life</span>
                            <div className="border-t border-gray-300 my-4"/>
                            <span>3. Look for the original source of content</span>
                            <div className="border-t border-gray-300 my-4"/>
                            <span>4. Search for duplicates before posting</span>
                            <div className="border-t border-gray-300 my-4"/>
                            <span>5. Read the community’s rules</span>
                            <div className="border-t border-gray-300 mt-4 mb-1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}