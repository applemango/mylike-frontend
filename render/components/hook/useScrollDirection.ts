import { useState, useEffect } from 'react';

const useScrollDirection = (): Boolean => {
    const [direction, setDirection] = useState<Boolean>(false);
    useEffect(() => {
        let position = 0
        const updateScrollDirection = (e: any): void => {
            setDirection(window.pageYOffset < position)
            position = window.pageYOffset
        };
        window.addEventListener("scroll", updateScrollDirection);
        return () => window.removeEventListener("scroll", updateScrollDirection);
    }, []);
    return direction;
};
export default useScrollDirection