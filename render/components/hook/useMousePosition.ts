import { useEffect, useState } from 'react';

type Position = {
    x: number,
    y: number
}

const useMousePosition = (): Position => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const updateMousePosition = (e: any): void => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window
            .addEventListener('mousemove', updateMousePosition);
        return () => window
            .removeEventListener('mousemove', updateMousePosition);
    }, []);
    return mousePosition;
};
export default useMousePosition