import React, {ReactNode} from 'react'
import Navbar from './ui/navbar'

interface Props {
    children?: ReactNode
}

function Layout({children}: Props){

    return (
        <>
            <div className="bg-gray-200 text-black relative">
                <Navbar />
                <div
                className="flex flex-col pt-7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl"
                >
                    {children}
                </div>
                <div className='mt-2'>

                </div>
            </div>
        </>
    )
}

export default Layout 