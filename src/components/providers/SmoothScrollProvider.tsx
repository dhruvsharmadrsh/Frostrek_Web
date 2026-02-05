import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

// Create context to share Lenis instance
const LenisContext = createContext<Lenis | null>(null);

/**
 * SmoothScrollProvider with Lenis for premium smooth scrolling.
 * Integrates with GSAP ScrollTrigger for synchronized animations.
 */
const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Store handler reference for proper cleanup
        const rafHandler = (time: number) => {
            lenis.raf(time * 1000);
        };

        // Use GSAP ticker for smooth animation loop
        gsap.ticker.add(rafHandler);

        gsap.ticker.lagSmoothing(0);

        // Handle route changes - scroll to top instantly
        const handleRouteChange = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            gsap.ticker.remove(rafHandler); // Now removes correct reference
            window.removeEventListener('popstate', handleRouteChange);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
};

export default SmoothScrollProvider;

// Export hook to access Lenis instance
export const useLenis = () => {
    return useContext(LenisContext);
};
