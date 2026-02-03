import { useState } from 'react';
import type { ReactNode } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    as?: 'button' | 'a' | 'div';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const MagneticButton = ({
    children,
    className = '',
    as: Component = 'button',
    href,
    onClick,
    type = 'button',
    ...props
}: MagneticButtonProps & React.HTMLAttributes<HTMLElement>) => {
    const [isHovered, setIsHovered] = useState(false);

    const commonProps = {
        className: `relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 group ${isHovered ? 'scale-105' : 'scale-100'} ${className}`,
        onClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props
    };

    const innerContent = (
        <>
            {/* Shine Effect */}
            <div className={`absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
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
