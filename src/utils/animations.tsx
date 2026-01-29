import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Split text into individual characters or words wrapped in spans.
 * This enables per-character animations like text reveals.
 * 
 * @param text - The text string to split
 * @param type - 'chars' for character split, 'words' for word split
 * @returns Array of JSX spans containing split text
 */
export const splitText = (text: string, type: 'chars' | 'words' = 'chars') => {
    if (type === 'words') {
        return text.split(' ').map((word, i) => (
            <span
                key={i}
                className="inline-block overflow-hidden"
                style={{ display: 'inline-block' }}
            >
                <span className="split-word inline-block">{word}</span>
                {i < text.split(' ').length - 1 && <span>&nbsp;</span>}
            </span>
        ));
    }

    return text.split('').map((char, i) => (
        <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ display: 'inline-block' }}
        >
            <span className="split-char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        </span>
    ));
};

/**
 * Create a staggered text reveal animation.
 * Elements slide up and de-blur from hidden state.
 * 
 * @param selector - CSS selector for target elements
 * @param options - Animation options
 */
export const createTextReveal = (
    selector: string | Element[],
    options: {
        duration?: number;
        stagger?: number;
        delay?: number;
        ease?: string;
        y?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    } = {}
) => {
    const {
        duration = 0.8,
        stagger = 0.03,
        delay = 0,
        ease = 'power3.out',
        y = 50,
        scrollTrigger
    } = options;

    return gsap.from(selector, {
        y,
        opacity: 0,
        filter: 'blur(10px)',
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: scrollTrigger ? {
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...scrollTrigger
        } : undefined
    });
};

/**
 * Create a parallax scroll effect on an element.
 * 
 * @param element - Target element
 * @param speed - Parallax speed multiplier (negative = opposite direction)
 */
export const createParallax = (
    element: Element,
    speed: number = 0.5
) => {
    return gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
};

/**
 * Create a magnetic hover effect (element follows cursor).
 * 
 * @param element - Target element
 * @param strength - Effect strength (0-1)
 */
export const createMagneticEffect = (
    element: HTMLElement,
    strength: number = 0.3
) => {
    const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        gsap.to(element, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Return cleanup function
    return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
    };
};

/**
 * GSAP default settings for consistent animations across the site.
 */
export const defaultEase = 'power3.out';
export const defaultDuration = 0.8;

export { gsap, ScrollTrigger };
