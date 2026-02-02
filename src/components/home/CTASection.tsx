import { useRef, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const patternRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Content reveal animation with blur
            if (contentRef.current) {
                gsap.fromTo(contentRef.current.querySelectorAll('h2, p'),
                    { y: 60, opacity: 0, filter: 'blur(8px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Buttons with bounce effect
            const buttons = buttonsRef.current?.querySelectorAll('.cta-button');
            if (buttons) {
                gsap.fromTo(buttons,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: buttonsRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Floating animation for pattern
            if (patternRef.current) {
                gsap.to(patternRef.current, {
                    backgroundPosition: '30px 30px',
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    // Pulsing glow effect on primary button
    useEffect(() => {
        const primaryBtn = buttonsRef.current?.querySelector('.primary-cta');
        if (!primaryBtn) return;

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(primaryBtn, {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(34, 197, 94, 0.15)',
            duration: 1.5,
            ease: 'sine.inOut'
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className={`py-16 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-dark-navbar via-dark-bg to-dark-navbar' : 'bg-gradient-to-br from-[#8A5A35] via-[#B07552] to-[#8A5A35]'}`}>
            {/* Animated dot pattern */}
            <div
                ref={patternRef}
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6D0C6]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F3E9CD]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <div ref={contentRef} className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        Ready to transform your business?
                    </h2>
                    <p className="text-xl text-[#F3E9CD] mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join forward-thinking enterprises using Frostrek to automate, scale, and innovate.
                    </p>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/schedule-demo" className="cta-button">
                            <button
                                className="primary-cta flex items-center px-10 py-4 bg-white text-[#B07552] font-bold text-lg rounded-xl hover:bg-[#FDFBF7] shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Calendar className="mr-2" size={20} />
                                Schedule a demo
                            </button>
                        </Link>
                        <button
                            className="cta-button flex items-center px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
                        >
                            Contact Sales
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom wave effect */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        </section>
    );
};

export default CTASection;
