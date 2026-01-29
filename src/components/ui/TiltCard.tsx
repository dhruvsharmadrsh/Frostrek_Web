import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number; // Maximum tilt angle in degrees
    perspective?: number; // Perspective distance
    scale?: number; // Scale on hover
    speed?: number; // Animation speed (lower = slower)
    glare?: boolean; // Show glare effect
    spotlight?: boolean; // Show spotlight following cursor
}

const TiltCard = ({
    children,
    className = '',
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 0.5,
    glare = false,
    spotlight = true,
}: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const spotlightEl = spotlightRef.current;
        const glareEl = glareRef.current;
        if (!card) return;

        // Skip on touch devices
        if ('ontouchstart' in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate position relative to center (-1 to 1)
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            // Calculate tilt angles
            const rotateX = -y * maxTilt;
            const rotateY = x * maxTilt;

            // Apply 3D transform
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: scale,
                duration: speed,
                ease: 'power2.out',
                transformPerspective: perspective,
                transformOrigin: 'center center'
            });

            // Move spotlight to cursor position
            if (spotlight && spotlightEl) {
                const relativeX = e.clientX - rect.left;
                const relativeY = e.clientY - rect.top;
                gsap.to(spotlightEl, {
                    '--x': `${relativeX}px`,
                    '--y': `${relativeY}px`,
                    opacity: 1,
                    duration: 0.2
                });
            }

            // Move glare
            if (glare && glareEl) {
                gsap.to(glareEl, {
                    background: `linear-gradient(${Math.atan2(y, x) * (180 / Math.PI) + 90}deg, 
                        rgba(255,255,255,0.3) 0%, 
                        transparent 80%)`,
                    opacity: 0.3,
                    duration: 0.3
                });
            }
        };

        const handleMouseEnter = () => {
            gsap.to(card, {
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            // Reset all transforms
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                duration: 0.6,
                ease: 'power2.out'
            });

            if (spotlightEl) {
                gsap.to(spotlightEl, {
                    opacity: 0,
                    duration: 0.3
                });
            }

            if (glareEl) {
                gsap.to(glareEl, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt, perspective, scale, speed, glare, spotlight]);

    return (
        <div
            ref={cardRef}
            className={`tilt-card relative overflow-hidden ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
            }}
        >
            {/* Spotlight overlay */}
            {spotlight && (
                <div
                    ref={spotlightRef}
                    className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity"
                    style={{
                        background: 'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(34, 197, 94, 0.15), transparent 60%)',
                    }}
                />
            )}

            {/* Glare overlay */}
            {glare && (
                <div
                    ref={glareRef}
                    className="pointer-events-none absolute inset-0 z-20 opacity-0"
                />
            )}

            {/* Content with slight transform for depth */}
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </div>
    );
};

export default TiltCard;
