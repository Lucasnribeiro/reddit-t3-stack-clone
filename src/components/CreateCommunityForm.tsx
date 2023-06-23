import React, { useState } from "react"
import { useFormContext } from "react-hook-form"


const CreateCommunityForm: React.FC = () => {
    const { register } = useFormContext() 

    const [count, setCount] = useState(21)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value.length > 0){
            setCount(21 - e.target.value.length)
        }else{
            setCount(21)
        }

    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="pb-3">
                <h1 className="text-lg font-semibold">Name</h1>
                <h1 className="text-xs text-gray-400">Community names including capitalization cannot be changed.</h1>
            </div>

            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md">
                    r/
                </span>
                <input maxLength={21} {...register('title', { onChange: (e) => handleChange(e)})} type="text" id="website-admin" className="rounded-none rounded-r-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-r-0 outline-none" placeholder=""/>
            </div>

            <p className="text-xs text-gray-400">{count} Characters remaining</p>

        </div>
    )
}

export default CreateCommunityForm;