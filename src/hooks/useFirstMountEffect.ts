import { useEffect, useRef } from 'react';
//첫 렌더링시에만 실행시키는 훅
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
