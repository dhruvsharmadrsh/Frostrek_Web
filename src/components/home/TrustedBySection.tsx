import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
    { name: 'Clutch', src: '/clutch.webp', rating: '4.9', reviews: '50+ reviews' },
    { name: 'Top Developers', src: '/topDevelopers.webp', rating: '5.0', reviews: '30+ reviews' },
    { name: 'GoodFirms', src: '/goodfirms.webp', rating: '4.8', reviews: '45+ reviews' },
    { name: 'ISO Certified', src: '/iso.webp', rating: 'ISO', reviews: '9001 Certified' },
] as const;

const ACCENT_DARK = '#B07552';

const TrustedBySection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    // State and click handler removed

    // GSAP hover animation
    const handleMouseEnter = (card: HTMLDivElement) => {
        gsap.to(card, { scale: 1.15, duration: 0.4, ease: 'power2.out' });
        gsap.to(card.querySelector('.logo-img'), { filter: theme === 'dark' ? 'grayscale(0%) invert(1) brightness(1.2)' : 'grayscale(0%)', scale: 1.1, duration: 0.3 });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(card.querySelector('.logo-img'), { filter: theme === 'dark' ? 'grayscale(100%) invert(1) brightness(0.9)' : 'grayscale(100%)', scale: 1, duration: 0.3 });
    };

    useEffect(() => {
        const section = sectionRef.current;
        const marquee = marqueeRef.current;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!section || !marquee || cards.length === 0) return;

        const ctx = gsap.context(() => {
            // Title entrance
            gsap.fromTo('.trusted-title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%' } }
            );

            // Infinite marquee
            const totalWidth = marquee.scrollWidth / 2;
            gsap.to(marquee, {
                x: -totalWidth,
                duration: 35,
                ease: 'none',
                repeat: -1,
                modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) }
            });

            // Continuous wave animation removed

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`relative pt-10 pb-4 md:pt-12 md:pb-6 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-transparent'}`}
        >
            <div className="container mx-auto px-6 relative z-10">
                {/* Title */}
                <div className="trusted-title text-center mb-14">
                    <h3 className={`text-2xl md:text-4xl font-light mb-3 transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        Trusted by <span className="font-semibold" style={{ color: theme === 'dark' ? '#bf8440' : ACCENT_DARK }}>Industry Leaders</span>
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>Industry leaders trust us to deliver excellence</p>
                </div>

                {/* Marquee */}
                <div className="relative -mx-6 overflow-hidden">


                    <div ref={marqueeRef} className="flex gap-12 py-10" style={{ width: 'max-content' }}>
                        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => {
                            return (
                                <div
                                    key={`${logo.name}-${i}`}
                                    ref={el => { cardRefs.current[i] = el; }}
                                    className="marquee-item relative cursor-default select-none"
                                    onMouseEnter={e => handleMouseEnter(e.currentTarget)}
                                    onMouseLeave={e => handleMouseLeave(e.currentTarget)}
                                >
                                    <div
                                        className="relative p-6 md:p-8 rounded-2xl transition-all duration-300 min-w-[160px] flex flex-col items-center justify-center bg-transparent"
                                    >
                                        {/* Logo */}
                                        <div className="transition-all duration-300 relative">
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="logo-img h-12 md:h-16 w-auto object-contain transition-all duration-300"
                                                style={{ filter: theme === 'dark' ? 'grayscale(100%) invert(1) brightness(0.9)' : 'grayscale(100%)' }}
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;