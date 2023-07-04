import { useCallback, useRef } from 'react';

export default function useThrottle(callBack, limit = 100) {
    const throttleInPRogress = useRef();

    return (e) => {
        if (throttleInPRogress.current) {
            return;
        }

        throttleInPRogress.current = true;
        setTimeout(() => {
            callBack(e);
            throttleInPRogress.current = false;
        }, limit);
    };

    // const lastRun = useRef(Date.now());

    // return function (e) {
    //     if (Date.now() - lastRun.current >= limit) {
    //         callBack(e);
    //         lastRun.current = Date.now();
    //     }
    // };
}
