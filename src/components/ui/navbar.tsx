import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faGithub, faReddit } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCaretDown, faCircleArrowUp, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import SelectSubreddit from '../SelectSubreddit';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdownMenu';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [subreddit, setSubreddit] = useState('');
  const router = useRouter();

  const commonOptions = [faCircleArrowUp, faReddit];

  const actions = [faMessage, faBell, faPlus];

  useEffect( () => {
    if(subreddit != ''){
      router.push(`/r/${subreddit}`).catch((error) =>
        console.log(error)
      )
    }
  }, [subreddit])

  return (
    <div className="bg-white w-full py-2 px-2 flex items-center justify-evenly shadow z-10">
      <Link href={'/'}>
        <div className="flex text-3xl space-x-2 items-center">
          <FontAwesomeIcon
            icon={faReddit}
            style={{ color: '#FF5700' }}
            className="bg-white text-4xl mr-1 md:mr-0"
          />
          <div className="font-medium hidden lg:block">reddit</div>
        </div>
      </Link>
      <div className="w-1/6 pt-1 hidden sm:block">
        <SelectSubreddit setSubreddit={setSubreddit} optionValue='title'/>
      </div>

      <div className="flex items-center bg-gray-100 rounded w-60 lg:w-80">
        <SearchBar />
      </div>

      <div className="flex divide-x divide-gray-200 xl:divide-x xl:divide-gray-200">
        <div className="hidden xl:block pr-2">
          <div className="flex space-x-2">
            {commonOptions.map((option) => (
              <div
                key={option.iconName}
                className="p-2 rounded hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={option} className="text-2xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex space-x-2 pl-2">
          {actions.map((action) => (
            <div
              key={action.iconName}
              className="p-2 rounded hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={action} className="text-2xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-1">
          
          <Link className="flex items-center rounded-full border border-solid ml-1 md:ml-0 md:px-4 md:py-2 space-x-2" href={'https://github.com/Lucasnribeiro/reddit-t3-stack-clone'}>
            <div className="rounded-full px-2 border-2 border-solid border-white font-black">
              <FontAwesomeIcon
                icon={faGithub}
                className="bg-white text-2xl"
              />
            </div>
            <div className="hidden sm:block">Project</div>
          </Link>

        <div className="flex space-x-2 items-center rounded px-2 hover:bg-gray-200">
          <div className="text-xs">
          {session ? (
              <div >
                <DropdownMenu>
                  <DropdownMenuTrigger>      
                    <div className="flex">     
                      <div className='flex space-x-1'>
                      <Avatar style={{width: 20, height: 20}}>
                          <AvatarImage src={session.user.image ?? '/images/placeholder-avatar.png'}/>
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block sm:text-md">@{session.user?.name}</div>
                      {/* 
                      <div className="flex items-center space-x-1">
                        <div>
                          <FontAwesomeIcon icon={faReddit} className="text-red-600" />
                        </div>
                        <div>1.8k karma</div>
                      </div> 
                      */}
                    </div>
                      <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
                    </div> 
                  </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel><div>My Account</div></DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div onClick={() => router.push(`/u/${session?.user?.name ?? ''}`)}><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></div>
                      <div onClick={() => signOut()}><DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem></div>
                    </DropdownMenuContent>

                  </DropdownMenu>

                </div>
            ) : (
              <button
                type="button"
                className="mx-auto"
                onClick={() => {
                  signIn().catch(console.log);
                }}
              >
                <Avatar>
                    <AvatarImage src="/images/placeholder-avatar.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
          )}
          </div>

        </div>
      </div>
    </div>
    
  );
};

export default Navbar;
