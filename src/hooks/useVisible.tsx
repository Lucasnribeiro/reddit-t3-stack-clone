import React, { useState, useEffect } from 'react'


export function useIsVisible<T extends Element>(ref: React.RefObject<T>) {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) =>{
            if (entry) {
                setIntersecting(entry.isIntersecting);
            }
        }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.disconnect();
      };
    }, [ref]);
  
    return isIntersecting;
  }