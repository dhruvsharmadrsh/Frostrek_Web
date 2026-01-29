import { useEffect } from 'react';

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

/**
 * Lightweight SmoothScrollProvider using native CSS scroll-behavior.
 * Removed Lenis + GSAP ticker integration for better performance.
 */
const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {

    useEffect(() => {
        // Enable smooth scrolling via CSS
        document.documentElement.style.scrollBehavior = 'smooth';

        // Handle route changes - scroll to top
        const handleRouteChange = () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            document.documentElement.style.scrollBehavior = '';
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScrollProvider;

// Export a hook for compatibility
export const useLenis = () => {
    return null;
};
