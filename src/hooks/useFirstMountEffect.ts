import { useEffect, useRef } from 'react';

const useFirstMountEffect = (func: () => void, deps: any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) return;
        else {
            func();
            didMount.current = true;
        }
    }, deps);
};

export default useFirstMountEffect;
