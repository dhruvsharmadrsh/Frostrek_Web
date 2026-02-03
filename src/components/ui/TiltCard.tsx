import { useState } from 'react';
import type { ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

const TiltCard = ({
    children,
    className = '',
}: TiltCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-xl' : 'shadow-md'} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};

export default TiltCard;
