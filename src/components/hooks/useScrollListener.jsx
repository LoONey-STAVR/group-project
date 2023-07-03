import React from 'react';
import useThrottle from './useThrottle';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function useScrollListener(cards, totalCount) {
    const [fetching, setFetching] = React.useState(false);
    const location = useLocation();
    const scrollHandler = React.useCallback(
        (e) => {
            if (
                e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <
                    200 &&
                totalCount !== cards.length
            ) {
                setFetching(true);
            } else {
                setFetching(false);
            }
        },
        [totalCount, cards.length]
    );


    // useEffect(() => {
    //     if (location.pathname === '/random' || totalCount === cards.length || fetching) {
    //         window.removeEventListener('scoll', scrollHandler);
    //     }
    //     window.addEventListener('scroll', scrollHandler);
    //     return () => {
    //         window.removeEventListener('scroll', scrollHandler);
    //     };
    // }, [fetching, location.pathname, scrollHandler, cards.length, totalCount]);

    return [fetching, setFetching];
}
