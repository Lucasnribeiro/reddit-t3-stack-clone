import React, {useRef, useEffect } from 'react' 
import { useIsVisible } from '~/hooks/useVisible';

interface ScrollTriggerComponentProps {
    callFunction: () => any,
    isFetchingNextPage:  boolean,
    hasNextPage: boolean | undefined
}


const ScrollTriggerComponent : React.FC<ScrollTriggerComponentProps> = ({callFunction, isFetchingNextPage, hasNextPage}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIsVisible(ref);

    useEffect( () => {
        if(isVisible){
            callFunction()
        }
    })

    return (
        
        !isFetchingNextPage && hasNextPage ? 
            <div ref={ref} className='scroll-trigger'></div> 
            : 
            null 
        )
}

export default ScrollTriggerComponent