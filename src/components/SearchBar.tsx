import React, { useState } from 'react' 
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Select, { ActionMeta, StylesConfig } from 'react-select';
import { api } from '~/utils/api';
import { OptionType, Post } from '~/types';
import { useRouter } from 'next/router';
import { Url } from 'url';

const customStyles: StylesConfig<OptionType, true> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      width: '100%',
      outline: state.isFocused ? '2px solid #4f46e5' : 'gray',
    }),
    container: (provided) => ({
        ...provided,
        width: '100%'
    }),
    input: (provided) => ({
      ...provided,
      marginLeft: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0.25rem',
      color: '#4f46e5',
    }),
  };

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter()


    const { data: postsQuery, isFetching: isFetchingPosts } = api.post.all.useQuery<Post[]>({postTitle: query}, { enabled: query.length > 0});
    const { data: usersQuery, isFetching: isFetchingUsers } = api.user.all.useQuery({username: query}, { enabled: query.length > 0});
    const { data: subredditQuery, isFetching: isFetchingSubreddits } = api.subreddit.all.useQuery({subredditTitle: query}, { enabled: query.length > 0});

    const postResults = postsQuery
    ? postsQuery.map((result) => ({
        value: result.id,
        label: result.title,
        link: result.subreddit.title && result.id ? `/r/${result.subreddit.title}/posts/${result.id}` : '',
        }))
    : [];

    const userResults = usersQuery
    ? usersQuery.map((result) => ({
        value: result.id,
        label: result.name || '',
        link: result.name ?  `/u/${result.name}` : ''
        }))
    : [];

    const subredditResults = subredditQuery
    ? subredditQuery.map((result) => ({
        value: result.id,
        label: result.title,
        link:  result.title ? `/r/${result.title}` : '',
        }))
    : [];

    const options: readonly OptionType[] = [
        {
            label: 'Posts', 
            options: postResults
        },

        {
            label: 'Users', 
            options: userResults
        },

        {
            label: 'Subreddits', 
            options: subredditResults
        },

    ];

    const handleInputChange = (newValue: string) => {
        setQuery(newValue);
    };

    const handleOptionChange = (option: readonly OptionType[], actionMeta: ActionMeta<OptionType>) => {
        if (option) {
            
            //im doing this because types are really messy and im 100% sure that option.link is a property
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument
            // @ts-ignore
            router.push(option.link as Url).catch((error) => 
              console.log(error)
            )
        }
    }

    return (
        <>
            <Select
                options={options}
                onInputChange={handleInputChange}
                onChange={handleOptionChange}
                placeholder="Search"
                styles={customStyles}
                noOptionsMessage={() => query.length >= 0 ?  'Search for posts, users or Subreddits' : 'No results found'}
                isLoading={ (query.length > 0 && (isFetchingPosts || isFetchingUsers || isFetchingSubreddits)) ? true : false }
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: () => (
                    <div className="px-1">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  ),
                }}
            />
        </>
    )
}

export default SearchBar