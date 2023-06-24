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
                    
                {children}
            </div>
        </>
    )
}

export default Layout 