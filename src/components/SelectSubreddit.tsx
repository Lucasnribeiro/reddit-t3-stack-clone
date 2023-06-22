import React, {useState} from 'react'
import { useSession } from 'next-auth/react';
import Select from 'react-select';
import { api } from '~/utils/api';

interface SelectSubredditProps {
    setSubreddit: (subreddit: string) => string | void,
    optionValue: string,
}

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
            onChange={(selectedOption) => setSubreddit(selectedOption ? selectedOption.id : '')}
            isSearchable
            onMenuScrollToBottom={handleFetchNextPage}
            getOptionLabel={(option) => 'r/' + option.title}
            getOptionValue={(option) => optionValue == 'id' ? option.id : option.title}
            placeholder="Select a community"
        />
    )
}

export default SelectSubreddit