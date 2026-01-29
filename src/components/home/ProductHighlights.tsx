import { useRef, useEffect } from 'react';
import { Bot, MessageSquare, Mic, Database, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    {
        id: 'frosty-ai',
        title: 'Frosty AI Agent',
        description: 'Next-gen conversational AI that understands context and intent. Automate support with human-like accuracy.',
        icon: Bot,
        color: 'text-brand-green-600',
        bgColor: 'bg-brand-green-100',
        hoverBg: 'group-hover:bg-brand-green-500',
        link: '/products/frosty-ai'
    },
    {
        id: 'voice-ai',
        title: 'Voice AI Agent',
        description: 'Low-latency voice bots for customer support and sales calls. Natural sounding and highly responsive.',
        icon: Mic,
        color: 'text-accent-green',
        bgColor: 'bg-emerald-100',
        hoverBg: 'group-hover:bg-emerald-500',
        link: '/products/voice-ai'
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp Automation',
        description: 'Engage customers where they are. Automated notifications, support, and sales on WhatsApp.',
        icon: MessageSquare,
        color: 'text-brand-green-500',
        bgColor: 'bg-green-100',
        hoverBg: 'group-hover:bg-green-500',
        link: '/products/whatsapp-agents'
    },
    {
        id: 'linkedin',
        title: 'LinkedIn Automation',
        description: 'Scale your B2B outreach safely. Automated connection requests and follow-ups.',
        icon: Share2,
        color: 'text-brand-green-700',
        bgColor: 'bg-teal-100',
        hoverBg: 'group-hover:bg-teal-500',
        link: '/products/linkedin-automation'
    },
    {
        id: 'erp',
        title: 'ERPNext AI Modules',
        description: 'Inject intelligence into your ERP. Automated data entry, forecasting, and anomaly detection.',
        icon: Database,
        color: 'text-accent-green',
        bgColor: 'bg-cyan-100',
        hoverBg: 'group-hover:bg-cyan-500',
        link: '/products/erpnext-ai'
    },
];

const ProductHighlights = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Ensure cards are visible on mount
    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.product-card');
            cards.forEach((card) => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.visibility = 'visible';
            });
        }
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Animate heading with stagger
            const heading = headingRef.current;
            if (heading) {
                gsap.fromTo(heading.querySelectorAll('h2, p'),
                    { y: 50, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: heading,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Product cards with enhanced staggered reveal from different directions
            const cards = gridRef.current?.querySelectorAll('.product-card');
            if (cards) {
                gsap.fromTo(cards,
                    {
                        y: 80,
                        opacity: 0,
                        scale: 0.9,
                        rotateX: 15
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: {
                            each: 0.12,
                            from: 'start'
                        },
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
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-green-50/30 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                        Comprehensive <span className="text-gradient-green">AI Product Suite</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        From voice to text, sales to support—our suite of AI agents and tools covers every aspect of enterprise automation.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
                    {PRODUCTS.map((product) => (
                        <TiltCard
                            key={product.id}
                            className="product-card"
                            maxTilt={8}
                            scale={1.02}
                            spotlight={true}
                        >
                            <div
                                className="group relative h-full p-8 bg-white rounded-2xl border border-gray-200 transition-all duration-500 hover:border-brand-green-400 hover:shadow-2xl"
                                style={{ opacity: 1, visibility: 'visible' }}
                            >
                                {/* Animated icon container */}
                                <div
                                    className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl ${product.bgColor} border border-gray-200 transition-all duration-300 ${product.hoverBg} group-hover:scale-110 group-hover:rotate-3 group-hover:border-transparent`}
                                >
                                    <product.icon
                                        className={`${product.color} group-hover:text-white transition-all duration-300 group-hover:scale-110`}
                                        size={26}
                                    />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-green-600 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                    {product.description}
                                </p>

                                <Link
                                    to={product.link}
                                    className="inline-flex items-center text-sm font-semibold text-brand-green-600 group-hover:text-brand-green-700 transition-all"
                                >
                                    <span className="relative">
                                        Explore Product
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-green-600 group-hover:w-full transition-all duration-300" />
                                    </span>
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green-50/0 to-brand-green-100/0 group-hover:from-brand-green-50/50 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductHighlights;
