import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    delay?: number;
    y?: number;
    blur?: boolean;
    once?: boolean; // If true, animation only plays once
    trigger?: 'scroll' | 'load' | 'none';
    threshold?: string; // ScrollTrigger start threshold
}

const SplitTextReveal = ({
    children,
    className = '',
    as: Component = 'div',
    type = 'chars',
    stagger = 0.02,
    duration = 0.6,
    delay = 0,
    y = 40,
    blur = true,
    once = true,
    trigger = 'scroll',
    threshold = 'top 85%',
}: SplitTextRevealProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    // Split text into elements
    const splitElements = useMemo(() => {
        if (type === 'words') {
            return children.split(' ').map((word, i, arr) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="split-item inline-block" style={{ opacity: 0 }}>
                        {word}
                    </span>
                    {i < arr.length - 1 && <span>&nbsp;</span>}
                </span>
            ));
        }

        if (type === 'lines') {
            return children.split('\n').map((line, i) => (
                <span key={i} className="block overflow-hidden">
                    <span className="split-item inline-block" style={{ opacity: 0 }}>
                        {line}
                    </span>
                </span>
            ));
        }

        // Characters (default)
        return children.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
                <span
                    className="split-item inline-block"
                    style={{
                        opacity: 0,
                        display: char === ' ' ? 'inline' : 'inline-block'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));
    }, [children, type]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll('.split-item');
        if (!items.length) return;

        // Set initial state
        gsap.set(items, {
            y: y,
            opacity: 0,
            filter: blur ? 'blur(8px)' : 'none',
        });

        const animateIn = () => {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            gsap.to(items, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: duration,
                stagger: stagger,
                delay: delay,
                ease: 'power3.out',
            });
        };

        if (trigger === 'load') {
            animateIn();
        } else if (trigger === 'scroll') {
            ScrollTrigger.create({
                trigger: container,
                start: threshold,
                onEnter: animateIn,
                once: once,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === container) st.kill();
            });
        };
    }, [y, blur, duration, stagger, delay, once, trigger, threshold]);

    return (
        <Component
            ref={containerRef as any}
            className={`split-text-reveal ${className}`}
        >
            {splitElements}
        </Component>
    );
};

export default SplitTextReveal;
