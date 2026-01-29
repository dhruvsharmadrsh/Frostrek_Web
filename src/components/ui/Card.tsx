import { cn } from '../../utils/cn';
import type { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {
    hoverEffect?: boolean;
}

const Card = ({
    hoverEffect = true,
    className,
    children,
    ...props
}: CardProps) => {
    return (
        <div
            className={cn(
                "bg-white rounded-xl border-2 border-gray-200 p-6",
                "transition-all duration-300",
                hoverEffect && "hover:border-brand-green-400 hover:shadow-xl hover:shadow-brand-green-500/10 hover:-translate-y-1",
                "cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
