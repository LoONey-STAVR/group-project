import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function useScrollListener(cards, totalCount) {
    const [fetching, setFetching] = React.useState(false);
    const location = useLocation();
    const scrollHandler = React.useCallback(
        (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) ===
                    0 &&
                e.target.documentElement.scrollHeight > 2000 &&
                totalCount !== cards.length
            ) {
                setFetching(true);
            } else {
                setFetching(false);
            }
        },
        [totalCount, cards]
    );
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        if ((location.pathname === '/random' || totalCount, cards.length)) {
            window.removeEventListener('scoll', scrollHandler);
        }
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [fetching, location.pathname, scrollHandler]);

    return [fetching, setFetching, scrollHandler];
}
