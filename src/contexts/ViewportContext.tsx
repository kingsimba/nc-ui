import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Viewport context value providing responsive breakpoint information.
 */
export interface ViewportContextValue {
    /** True if viewport width < 768px */
    isMobile: boolean;
    /** True if viewport width >= 768px and < 1024px */
    isTablet: boolean;
    /** True if viewport width >= 1024px */
    isDesktop: boolean;
    /** Current viewport width in pixels */
    width: number;
    /** Current viewport height in pixels */
    height: number;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

const defaultValue: ViewportContextValue = {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
};

const ViewportContext = createContext<ViewportContextValue>(defaultValue);

/**
 * Provider component that tracks viewport size and provides responsive breakpoints.
 */
export function ViewportProvider({ children }: { children: ReactNode }) {
    const [viewport, setViewport] = useState<ViewportContextValue>(() => {
        if (typeof window === 'undefined') return defaultValue;

        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            isMobile: width < MOBILE_BREAKPOINT,
            isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
            isDesktop: width >= TABLET_BREAKPOINT,
            width,
            height,
        };
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setViewport({
                isMobile: width < MOBILE_BREAKPOINT,
                isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
                isDesktop: width >= TABLET_BREAKPOINT,
                width,
                height,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ViewportContext.Provider value={viewport}>
            {children}
        </ViewportContext.Provider>
    );
}

/**
 * Hook to access viewport information.
 */
export function useViewport(): ViewportContextValue {
    return useContext(ViewportContext);
}
