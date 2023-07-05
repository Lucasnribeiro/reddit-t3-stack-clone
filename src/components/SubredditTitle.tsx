import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import { Subreddit } from '~/types';
import { api } from '~/utils/api';



export default function SubredditTitle(subreddit: Subreddit){
    const { data: session } = useSession();
    const [ edit, setEdit ] = useState(false)
    const [editedTitle, setEditedTitle] = useState(subreddit.title)

    const { mutate } = api.subreddit.update.useMutation({
        onMutate: () => {
            setEdit(false)
        }
          
    })

    if(subreddit.ownerId === session?.user.id || subreddit.admins?.some( admin => admin.id === session?.user.id)){
        return (<>
                    {
                        edit ? 
                            <div className='flex'>
                                <input className='border-2 p-1 text-xl' type='text' onChange={(e) => setEditedTitle(e.target.value)} value={editedTitle}></input>
                                <button className="flex ml-4 items-center justify-center px-4 py-2 font-bold text-blue-500 border border-blue-500 rounded-xl focus:outline-none hover:bg-blue-100" onClick={() => mutate({subredditId: subreddit.id, title: editedTitle})}>Save</button>
                            </div>
                        :
                            <h1 className="font-bold text-3xl">
                                {editedTitle} 
                                <span onClick={() => setEdit(true)} className="cursor-pointer text-xs"> <FontAwesomeIcon icon={faPen}/></span>
                            </h1>
                    }
                </>
            )
    }

    return (
        <h1 className="font-bold text-3xl">
            {subreddit.title} 
        </h1>
    )


}