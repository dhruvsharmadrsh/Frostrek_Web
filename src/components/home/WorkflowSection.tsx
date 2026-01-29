import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorkflowSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Header animation with blur
            if (headerRef.current) {
                gsap.fromTo(headerRef.current.children,
                    { y: 50, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Dashboard reveal with scale and shadow animation
            if (dashboardRef.current) {
                gsap.fromTo(dashboardRef.current,
                    {
                        y: 80,
                        opacity: 0,
                        scale: 0.95,
                        boxShadow: '0 0 0 rgba(0,0,0,0)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: dashboardRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Stats counter animation with counting effect
            const statItems = statsRef.current?.querySelectorAll('.stat-item');
            if (statItems) {
                // First animate in the items
                gsap.fromTo(statItems,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            onEnter: () => {
                                // Animate the counter numbers
                                const counters = statsRef.current?.querySelectorAll('.stat-number');
                                counters?.forEach((counter) => {
                                    const target = counter.getAttribute('data-target');
                                    if (target && !isNaN(Number(target))) {
                                        gsap.fromTo(counter,
                                            { innerHTML: '0' },
                                            {
                                                innerHTML: target,
                                                duration: 2,
                                                ease: 'power2.out',
                                                snap: { innerHTML: 1 },
                                                onUpdate: function () {
                                                    const val = Math.round(Number(gsap.getProperty(counter, 'innerHTML')));
                                                    counter.innerHTML = val + (target.includes('+') ? '+' : '');
                                                }
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-brand-green-50/20 to-gray-50" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Visual/Dashboard Mockup */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div ref={headerRef} className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-brand-green-300 mb-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-brand-green-700 uppercase tracking-wider">
                                Our AI Ecosystem
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Comprehensive AI Engine Architecture
                        </h2>
                        <p className="text-base text-gray-600 max-w-3xl mx-auto">
                            Our integrated platform connects all your business processes through intelligent automation, from customer engagement to backend operations.
                        </p>
                    </div>

                    <div ref={dashboardRef} className="relative rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
                        {/* Window Controls with glow effect */}
                        <div className="relative bg-gray-100 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer shadow-lg shadow-red-500/30" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer shadow-lg shadow-yellow-500/30" />
                            <div className="w-3 h-3 rounded-full bg-brand-green-500 hover:bg-brand-green-600 transition-colors cursor-pointer shadow-lg shadow-brand-green-500/30" />
                            <div className="ml-4 text-xs text-gray-500 font-medium">Frostrek AI Dashboard</div>
                        </div>

                        {/* Content Mockup */}
                        <div className="relative bg-gradient-to-br from-gray-50 to-white p-8">
                            <div className="relative rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200">
                                <img
                                    src="/optimized/workflow-dashboard.webp"
                                    alt="Frostrek AI Architecture Dashboard"
                                    className="w-full h-auto object-contain max-h-[500px] relative z-10"
                                />
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Feature Highlights Below Image */}
                        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
                            <div className="stat-item text-center group cursor-default">
                                <div className="stat-number text-3xl font-bold text-brand-green-600 group-hover:scale-110 transition-transform" data-target="15">15</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">Connected Services</div>
                            </div>
                            <div className="stat-item text-center group cursor-default">
                                <div className="stat-number text-3xl font-bold text-brand-green-600 group-hover:scale-110 transition-transform" data-target="100">100</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">% Automated</div>
                            </div>
                            <div className="stat-item text-center group cursor-default">
                                <div className="text-3xl font-bold text-brand-green-600 group-hover:scale-110 transition-transform">24/7</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">AI Operations</div>
                            </div>
                            <div className="stat-item text-center group cursor-default">
                                <div className="text-3xl font-bold text-brand-green-600 group-hover:scale-110 transition-transform">Real-time</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">Synchronization</div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced glow effect */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-brand-green-400/30 to-transparent blur-3xl rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
