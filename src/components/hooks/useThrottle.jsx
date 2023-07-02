import { useRef } from 'react';

export default function useThrottle(callBack, limit = 100) {
    const lastRun = useRef(Date.now());

    return function (e) {
        if (Date.now() - lastRun.current >= limit) {
            callBack(e);
            lastRun.current = Date.now();
        }
    };
}
