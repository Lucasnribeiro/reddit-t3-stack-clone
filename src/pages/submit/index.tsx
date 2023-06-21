import React, {useState} from 'react'
import RichTextEditor from "~/components/RichTextEditor";
import { api } from '~/utils/api';

export default function submit(){
    const [subreddit, setSubreddit] = useState('');
    const { data: subreddits, isLoading } = api.subreddit.all.useQuery();

    return (
        <>
            <div className="flex gap-8">
                <div className="w-full flex flex-col space-y-4">
                    <div className="flex">
                        <h1 className="font-semibold text-lg font">Create a Post</h1>
                    </div>
                    <div className="border-t border-white my-4"/>
                    <select onChange={(e) => setSubreddit(e.target.value)} value={subreddit}>
                        <option>Select a community</option>
                        {subreddits?.map( subreddit =>
                            <option value={subreddit.id} key={subreddit.id}>{subreddit.title}</option>    
                        )}
                    </select>
                    <RichTextEditor subreddit={subreddit}/>
                </div>
                <div className="hidden w-1/2 md:block">

                </div>
            </div>
        </>
    )
}