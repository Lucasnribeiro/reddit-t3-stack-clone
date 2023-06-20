import TextSkeleton from "./ui/TextSkeleton";




export default function PostItemSkeleton(){

    return (
        <div className="border border-solid border-gray-400 bg-white rounded shadow flex">
        <div className="flex flex-col place-items-center text-2xl p-2 bg-gray-100 justify-top">
          <div>
            
          </div>
          <div className=" font-bold text-sm">
            
          </div>
          <div>
          
          </div>
        </div>
        <div className="flex flex-col pl-4 pt-2">
          <div className="flex place-items-center space-x-2">

            <div className="font-bold"></div>
            <div className="font-thin text-gray-600">
              Posted by 
            </div>
          </div>
            <TextSkeleton />
          <div className="flex text-gray-500 space-x-4">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
        </div>
      </div>
    )
    
}