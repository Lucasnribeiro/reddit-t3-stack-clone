import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextSkeleton from "./ui/TextSkeleton";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";




export default function PostItemSkeleton(){

    return (
        <>
          <div className="border border-solid border-gray-400 bg-white rounded shadow flex">
          <div className="flex flex-col place-items-center text-2xl p-2 bg-gray-100 justify-top">
            <div>
              <FontAwesomeIcon
                  icon={faChevronUp} className="hover:text-red-500" 
                />
            </div>
            <div className="font-bold">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            </div>
            <div>
              <FontAwesomeIcon 
                icon={faChevronDown} className="hover:text-red-500" 
              />
            </div>
          </div>
          <div className="flex flex-col pl-4 pt-2 w-full">
            <div className="flex place-items-center space-x-2 w-full">

              <div className="font-bold">r/</div>
              <div className="font-thin text-gray-600">
                Posted by 
              </div>
            </div>
            <div className="pt-5 pr-10 ">
              <TextSkeleton />
            </div>

            <div className="flex text-gray-500 space-x-4 py-4">
              <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 animate-pulse">

              </div>
              <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 animate-pulse">

              </div>
              <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 animate-pulse">

              </div>
              </div>
          </div>
        </div>
        
        <div className="flex animate-pulse justify-center">
          <button 
              className="h-2/5 px-8 py-1 font-bold text-white bg-gray-300 rounded-3xl focus:outline-none hover:bg-gray-400"
          >
              Loading
          </button>
        </div>

      </>
    )
    
}