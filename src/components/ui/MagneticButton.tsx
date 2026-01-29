import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a' | 'div';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const MagneticButton = ({
    children,
    className = '',
    strength = 0.4,
    as: Component = 'button',
    href,
    onClick,
    type = 'button',
    ...props
}: MagneticButtonProps & React.HTMLAttributes<HTMLElement>) => {
    const buttonRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const content = contentRef.current;
        if (!button || !content) return;

        // Skip magnetic effect on touch devices
        if ('ontouchstart' in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            // Move the whole button
            gsap.to(button, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Move content slightly more for depth effect
            gsap.to(content, {
                x: deltaX * 0.3,
                y: deltaY * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Update glow position
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        };

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });
            gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    const commonProps = {
        ref: buttonRef as any,
        className: `magnetic-btn relative inline-flex items-center justify-center overflow-hidden transition-colors group ${className}`,
        onClick,
        ...props
    };

    const innerContent = (
        <>
            {/* Glow Effect */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div
                    className="absolute w-[150px] h-[150px] bg-white/20 rounded-full blur-[30px] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: 'var(--x)', top: 'var(--y)' }}
                />
            </div>
            <span ref={contentRef} className="magnetic-btn-content relative z-10 flex items-center gap-2">
                {children}
            </span>
        </>
    );

    if (Component === 'a' && href) {
        return (
            <a href={href} {...commonProps}>
                {innerContent}
            </a>
        );
    }

    if (Component === 'button') {
        return (
            <button type={type} {...commonProps}>
                {innerContent}
            </button>
        );
    }

    return (
        <div {...commonProps}>
            {innerContent}
        </div>
    );
};

export default MagneticButton;
