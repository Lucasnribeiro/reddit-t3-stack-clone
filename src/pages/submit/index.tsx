import RichTextEditor from "~/components/RichTextEditor";






export default function submit(){
    


    return (
        <>
            <div className="flex gap-8">
                <div className="w-full flex flex-col space-y-4">
                    <div className="flex">
                        <h1 className="font-semibold text-lg font">Create a Post</h1>
                    </div>
                    <div className="border-t border-white my-4"/>
                    <select />
                    <RichTextEditor/>
                </div>
                <div className="hidden w-1/2 md:block">

                </div>
            </div>
        </>
    )
}