import { useRef } from 'react';
import { Zap, Shield, Users, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Animate heading
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Staggered card reveal
            const cards = gridRef.current?.querySelectorAll('.bento-card');
            if (cards) {
                gsap.fromTo(cards,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={`pt-8 pb-16 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-transparent'}`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
            }} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        Built for <span className="text-gradient-green">Enterprise Scale</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                        Everything you need to build, deploy, and scale AI agents in your organization.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Hero Card - Enterprise Security (spans 2 rows on desktop) */}
                    <div className={`bento-card lg:row-span-2 group relative overflow-hidden rounded-3xl border-2 border-dashed p-8 transition-all duration-500 hover:shadow-2xl ${theme === 'dark' ? 'border-dark-accent/30 bg-gradient-to-br from-dark-card to-dark-bg hover:border-dark-accent' : 'border-brand-green-300 bg-gradient-to-br from-brand-green-50 to-white hover:border-brand-green-500'}`}>
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green-200/30 rounded-full blur-3xl group-hover:bg-brand-green-300/40 transition-all duration-500" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-300 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 group-hover:bg-dark-accent group-hover:border-dark-accent' : 'bg-brand-green-100 border-brand-green-200 group-hover:bg-brand-green-600 group-hover:border-brand-green-600'}`}>
                                <Shield className={`transition-colors ${theme === 'dark' ? 'text-dark-accent group-hover:text-dark-text' : 'text-brand-green-600 group-hover:text-white'}`} size={32} />
                            </div>

                            <h3 className={`text-2xl font-bold mb-4 transition-colors ${theme === 'dark' ? 'text-dark-text group-hover:text-dark-accent' : 'text-gray-900 group-hover:text-brand-green-700'}`}>
                                Enterprise Security
                            </h3>
                            <p className={`mb-6 leading-relaxed transition-colors ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                Role-based access control, end-to-end data encryption, comprehensive audit logs, and compliance-ready infrastructure built-in.
                            </p>

                            {/* Feature tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 text-dark-accent' : 'bg-white border-brand-green-200 text-brand-green-700'}`}>
                                    <CheckCircle2 size={14} /> SOC 2 Compliant
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 text-dark-accent' : 'bg-white border-brand-green-200 text-brand-green-700'}`}>
                                    <CheckCircle2 size={14} /> GDPR Ready
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 text-dark-accent' : 'bg-white border-brand-green-200 text-brand-green-700'}`}>
                                    <CheckCircle2 size={14} /> ISO 27001
                                </span>
                            </div>

                            <Link to="/contact" className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-dark-accent group-hover:text-dark-text' : 'text-brand-green-600 group-hover:text-brand-green-800'}`}>
                                Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Lightning Fast */}
                    <div className={`bento-card group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 hover:border-dark-accent' : 'bg-white border-gray-200 hover:border-brand-green-400'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 group-hover:bg-dark-accent group-hover:border-dark-accent' : 'bg-brand-green-100 border-brand-green-200 group-hover:bg-brand-green-500 group-hover:border-brand-green-500'}`}>
                                <Zap className={`transition-colors ${theme === 'dark' ? 'text-dark-accent group-hover:text-dark-text' : 'text-brand-green-600 group-hover:text-white'}`} size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${theme === 'dark' ? 'text-dark-text group-hover:text-dark-accent' : 'text-gray-900 group-hover:text-brand-green-600'}`}>
                                    Lightning Fast
                                </h3>
                                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    Sub-second response times with optimized LLM routing and intelligent caching.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Analytics */}
                    <div className={`bento-card group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 hover:border-dark-accent' : 'bg-white border-gray-200 hover:border-brand-green-400'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 group-hover:bg-dark-accent group-hover:border-dark-accent' : 'bg-brand-green-100 border-brand-green-200 group-hover:bg-brand-green-500 group-hover:border-brand-green-500'}`}>
                                <BarChart className={`transition-colors ${theme === 'dark' ? 'text-dark-accent group-hover:text-dark-text' : 'text-brand-green-600 group-hover:text-white'}`} size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${theme === 'dark' ? 'text-dark-text group-hover:text-dark-accent' : 'text-gray-900 group-hover:text-brand-green-600'}`}>
                                    Real-time Analytics
                                </h3>
                                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    Track KPIs, conversation quality, and user satisfaction metrics live.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Multi-agent Orchestration */}
                    <div className={`bento-card group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 hover:border-dark-accent' : 'bg-white border-gray-200 hover:border-brand-green-400'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/40 group-hover:bg-dark-accent group-hover:border-dark-accent' : 'bg-brand-green-100 border-brand-green-200 group-hover:bg-brand-green-500 group-hover:border-brand-green-500'}`}>
                                <Users className={`transition-colors ${theme === 'dark' ? 'text-dark-accent group-hover:text-dark-text' : 'text-brand-green-600 group-hover:text-white'}`} size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${theme === 'dark' ? 'text-dark-text group-hover:text-dark-accent' : 'text-gray-900 group-hover:text-brand-green-600'}`}>
                                    Multi-agent Orchestration
                                </h3>
                                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    Deploy multiple agents across channels with unified analytics dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
