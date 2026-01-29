import { cn } from '../../utils/cn';
import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) => {
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-gradient-to-r from-brand-green-600 to-brand-green-500 hover:from-brand-green-700 hover:to-brand-green-600 text-white shadow-lg shadow-brand-green-500/30",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300",
        outline: "bg-transparent hover:bg-green-50 text-brand-green-700 border-2 border-brand-green-600",
        ghost: "bg-transparent hover:bg-green-50 text-brand-green-700"
    };

    const sizes: Record<ButtonSize, string> = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            className={cn(
                "rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                "hover:scale-105 active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
