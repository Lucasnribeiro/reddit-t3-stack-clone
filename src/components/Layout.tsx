import Navbar from './ui/navbar'
import { LayoutProps } from '~/types'

function Layout({children}: LayoutProps){

    return (
        <div className="bg-gray-200 text-black w-full ">
            <Navbar />
                
            {children}
        </div>
    )
}

export default Layout 