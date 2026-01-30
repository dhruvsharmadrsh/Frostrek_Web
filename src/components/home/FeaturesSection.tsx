import { useRef } from 'react';
import { Zap, Shield, Users, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
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
        <section ref={sectionRef} className="pt-8 pb-16 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        Built for <span className="text-gradient-green">Enterprise Scale</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Everything you need to build, deploy, and scale AI agents in your organization.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Hero Card - Enterprise Security (spans 2 rows on desktop) */}
                    <div className="bento-card lg:row-span-2 group relative overflow-hidden rounded-3xl border-2 border-dashed border-brand-green-300 bg-gradient-to-br from-brand-green-50 to-white p-8 transition-all duration-500 hover:border-brand-green-500 hover:shadow-2xl">
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green-200/30 rounded-full blur-3xl group-hover:bg-brand-green-300/40 transition-all duration-500" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green-100 border-2 border-brand-green-200 group-hover:bg-brand-green-600 group-hover:border-brand-green-600 transition-all duration-300">
                                <Shield className="text-brand-green-600 group-hover:text-white transition-colors" size={32} />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-brand-green-700 transition-colors">
                                Enterprise Security
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Role-based access control, end-to-end data encryption, comprehensive audit logs, and compliance-ready infrastructure built-in.
                            </p>

                            {/* Feature tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-green-200 rounded-full text-sm font-medium text-brand-green-700">
                                    <CheckCircle2 size={14} /> SOC 2 Compliant
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-green-200 rounded-full text-sm font-medium text-brand-green-700">
                                    <CheckCircle2 size={14} /> GDPR Ready
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-green-200 rounded-full text-sm font-medium text-brand-green-700">
                                    <CheckCircle2 size={14} /> ISO 27001
                                </span>
                            </div>

                            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-600 group-hover:text-brand-green-800 transition-colors">
                                Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Lightning Fast */}
                    <div className="bento-card group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 transition-all duration-300 hover:border-brand-green-400 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-green-100 border border-brand-green-200 flex items-center justify-center group-hover:bg-brand-green-500 group-hover:border-brand-green-500 transition-all duration-300">
                                <Zap className="text-brand-green-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-green-600 transition-colors">
                                    Lightning Fast
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Sub-second response times with optimized LLM routing and intelligent caching.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Analytics */}
                    <div className="bento-card group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 transition-all duration-300 hover:border-brand-green-400 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-green-100 border border-brand-green-200 flex items-center justify-center group-hover:bg-brand-green-500 group-hover:border-brand-green-500 transition-all duration-300">
                                <BarChart className="text-brand-green-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-green-600 transition-colors">
                                    Real-time Analytics
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Track KPIs, conversation quality, and user satisfaction metrics live.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Multi-agent Orchestration */}
                    <div className="bento-card group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 transition-all duration-300 hover:border-brand-green-400 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-green-100 border border-brand-green-200 flex items-center justify-center group-hover:bg-brand-green-500 group-hover:border-brand-green-500 transition-all duration-300">
                                <Users className="text-brand-green-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-green-600 transition-colors">
                                    Multi-agent Orchestration
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
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
