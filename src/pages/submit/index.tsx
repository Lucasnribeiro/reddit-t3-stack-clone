import React, {useState} from 'react'
import RichTextEditor from "~/components/RichTextEditor";
import SelectSubreddit from '~/components/SelectSubreddit';

export default function Submit(){
    const [subreddit, setSubreddit] = useState('');

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
                    <RichTextEditor subreddit={subreddit}/>
                </div>
                <div className="hidden w-1/2 md:block">

                </div>
            </div>
        </div>
    )
}