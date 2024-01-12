import { useState, useEffect } from 'react';
import { getSystemStyle } from '../theme';

const usePrefersColorScheme = (): string => {
    const [scheme, setScheme] = useState<string>(
        !process.browser ? "light" : getSystemStyle()
    );
    useEffect(() => {
        const updateScheme = (): void => {
            setScheme(
                getSystemStyle()
            );
        };
        window
            .matchMedia('(prefers-color-scheme: dark)') 
            .addEventListener('change', updateScheme);
        updateScheme()
        return () => window
            .matchMedia('(prefers-color-scheme: dark)') 
            .removeEventListener('change', updateScheme);
    }, []);
    return scheme;
};
export default usePrefersColorScheme