import React, {useState} from 'react'
import { useSession } from 'next-auth/react';
import Select from 'react-select';
import { api } from '~/utils/api';
import { SelectSubredditProps } from '~/types';

const SelectSubreddit: React.FC<SelectSubredditProps> = ({setSubreddit, optionValue, ...props}) => {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(0);  

    const { data: subreddits, isLoading, fetchNextPage } = api.subreddit.getBatch.useInfiniteQuery(
        {
            limit: 10,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const handleFetchNextPage = async () => {
        await fetchNextPage();
        setPage((prev) => prev + 1);
    };

    const options = subreddits?.pages.flatMap((page) => page.items) || [];

    return ( 
        <Select
            {...props}
            options={options}
            onChange={(selectedOption) => { if(selectedOption) setSubreddit(optionValue === 'id' ? selectedOption.id : selectedOption.subredditHandle)} }
            isSearchable
            onMenuScrollToBottom={handleFetchNextPage}
            getOptionLabel={(option) => 'r/' + option.subredditHandle}
            getOptionValue={(option) => optionValue == 'id' ? option.id : option.subredditHandle}
            placeholder="Select a community"
        />
    )
}

export default SelectSubreddit