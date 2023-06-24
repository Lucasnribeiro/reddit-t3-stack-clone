

export default function TextSkeleton(){

    return (

        <div role="status" className="w-full animate-pulse">
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[300px] mb-2.5"></div>
        </div>
    )
}