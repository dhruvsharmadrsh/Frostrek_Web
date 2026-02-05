import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Bot, Mic, Database, Workflow, BarChart3,
    ArrowRight, Sparkles, MessageCircle, Volume2,
    Search, GitBranch, TrendingUp, CheckCircle2
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface SolutionDemo {
    type: 'chat' | 'voice' | 'search' | 'workflow' | 'analytics';
}

interface Solution {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: any;
    demo: SolutionDemo;
    features: string[];
    link: string;
    gradient: string;
}

const SOLUTIONS: Solution[] = [
    {
        id: 'ai-agents',
        title: 'AI Agents',
        tagline: 'Intelligent Conversations',
        description: 'Deploy conversational AI agents that understand context, handle complex queries, and provide human-like support 24/7. From customer service to sales, our agents adapt to your business needs.',
        icon: Bot,
        demo: { type: 'chat' },
        features: [
            'Natural language understanding with 98% accuracy',
            'Multi-turn conversation memory',
            'Seamless handoff to human agents',
            'Custom personality & brand voice'
        ],
        link: '/products/frosty-ai',
        gradient: 'from-[#E6D0C6] to-[#B07552]'
    },
    {
        id: 'voice-ai',
        title: 'Voice AI',
        tagline: 'Natural Voice Interactions',
        description: 'Low-latency voice bots that sound natural and respond instantly. Perfect for customer support calls, appointment scheduling, and interactive voice responses.',
        icon: Mic,
        demo: { type: 'voice' },
        features: [
            'Sub-200ms response latency',
            'Natural text-to-speech voices',
            'Multi-language support',
            'Real-time transcription & analytics'
        ],
        link: '/products/voice-ai',
        gradient: 'from-[#F3E9CD] to-[#E6D0C6]'
    },
    {
        id: 'rag-solutions',
        title: 'RAG Solutions',
        tagline: 'Enterprise Knowledge Access',
        description: 'Transform your documents into an intelligent knowledge base. Our RAG (Retrieval Augmented Generation) solutions let your team and customers find answers instantly from any data source.',
        icon: Database,
        demo: { type: 'search' },
        features: [
            'Index PDFs, docs, databases & more',
            'Semantic search with context',
            'Citation & source tracking',
            'Secure enterprise deployment'
        ],
        link: '/solutions/erp',
        gradient: 'from-[#E6D0C6] to-amber-500'
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        tagline: 'End-to-End Process Intelligence',
        description: 'Automate complex business processes with AI-powered workflows. Connect your existing tools, eliminate manual tasks, and scale operations without scaling headcount.',
        icon: Workflow,
        demo: { type: 'workflow' },
        features: [
            '500+ native integrations',
            'Visual workflow builder',
            'AI decision branching',
            'Error handling & retry logic'
        ],
        link: '/solutions/sales',
        gradient: 'from-[#F3E9CD] to-orange-400'
    },
    {
        id: 'data-intelligence',
        title: 'Data Intelligence',
        tagline: 'Actionable Insights',
        description: 'Turn raw data into strategic decisions. Our AI analyzes patterns, predicts trends, and surfaces insights that drive business growth—all in real-time.',
        icon: BarChart3,
        demo: { type: 'analytics' },
        features: [
            'Real-time dashboard analytics',
            'Predictive modeling & forecasting',
            'Anomaly detection alerts',
            'Custom report generation'
        ],
        link: '/solutions/ecommerce',
        gradient: 'from-[#B07552] to-[#8A5A35]'
    }
];

// Mini Demo Components
const ChatDemo = () => {
    const { theme } = useTheme();
    const messages = [
        { role: 'user', text: 'How can I track my order?' },
        { role: 'agent', text: 'I can help! Please share your order ID and I\'ll look that up.' },
        { role: 'user', text: 'ORD-2024-7823' },
    ];

    return (
        <div className={`rounded-xl p-4 h-[200px] overflow-hidden border transition-colors ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-[#f5ece4] border-gray-300'}`}>
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-300'}`}>
                <div className="w-2 h-2 rounded-full bg-[#B07552] animate-pulse" />
                <span className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Frosty AI Agent</span>
            </div>
            <div className="space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        style={{ animationDelay: `${i * 1}s` }}
                    >
                        <div
                            className={`max-w-[80%] px-3 py-2 rounded-xl text-xs animate-fade-in ${msg.role === 'user'
                                ? 'bg-[#B07552] text-white rounded-br-sm'
                                : `${theme === 'dark' ? 'bg-dark-card text-dark-text border-dark-accent/20' : 'bg-white text-gray-700 border-gray-200'} rounded-bl-sm border`
                                }`}
                            style={{ animationDelay: `${i * 0.8}s` }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div className="flex justify-start">
                    <div className="flex gap-1 px-3 py-2">
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'dark' ? 'bg-dark-accent' : 'bg-gray-500'}`} style={{ animationDelay: '0s' }} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'dark' ? 'bg-dark-accent' : 'bg-gray-500'}`} style={{ animationDelay: '0.1s' }} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'dark' ? 'bg-dark-accent' : 'bg-gray-500'}`} style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Memoized wave heights to prevent recalculation on every render
const WAVE_HEIGHTS = [20, 32, 16, 28, 12, 24, 30, 18, 26, 14, 22, 20];

const VoiceDemo = () => {
    const { theme } = useTheme();
    return (
        <div className={`rounded-xl p-4 h-[200px] border flex flex-col items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-[#f5ece4] border-gray-300'}`}>
            <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B07552] to-[#8A5A35] flex items-center justify-center animate-pulse">
                    <Volume2 className="w-8 h-8 text-white" />
                </div>
                {/* Single ping element instead of double for performance */}
                <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-[#B07552]/50 animate-ping" />
            </div>
            <div className="flex items-center gap-1 mb-2">
                {WAVE_HEIGHTS.map((height, i) => (
                    <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-[#B07552] to-[#E6D0C6] rounded-full animate-voice-wave"
                        style={{
                            height: `${height}px`,
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </div>
            <span className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Voice AI responding...</span>
        </div>
    );
};

const SearchDemo = () => {
    const { theme } = useTheme();
    const results = [
        { title: 'Q3 Financial Report', match: '94%' },
        { title: 'Employee Handbook', match: '87%' },
        { title: 'Product Roadmap 2024', match: '72%' },
    ];

    return (
        <div className={`rounded-xl p-2 h-[200px] border transition-colors ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-[#f5ece4] border-gray-300'}`}>
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-3 border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>What were last quarter's revenue targets?</span>
            </div>
            <div className="space-y-2 border">
                {results.map((result, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 animate-fade-in border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}
                        style={{ animationDelay: `${i * 0.5}s` }}
                    >
                        <div className="flex items-center gap-2">
                            <Database className="w-3 h-3 text-[#B07552]" />
                            <span className={`text-xs ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>{result.title}</span>
                        </div>
                        <span className="text-xs font-medium text-[#B07552]">{result.match}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WorkflowDemo = () => {
    const { theme } = useTheme();
    const steps = ['Trigger', 'Process', 'Validate', 'Output'];
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px", once: true });
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        if (isInView) {
            setAutoPlay(true);
            const timer = setTimeout(() => setAutoPlay(false), 2400);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const isActive = isHovered || autoPlay;

    return (
        <div
            ref={containerRef}
            className={`rounded-xl p-4 h-[200px] border flex items-center justify-center overflow-hidden relative transition-colors ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-[#f5ece4] border-gray-300'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-1">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                        <motion.div
                            className="relative flex flex-col items-center"
                            initial={{ opacity: 1 }}
                            animate={{
                                scale: isActive ? [1, 1.1, 1] : 1,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-orange-500' :
                                    i === 3 ? 'bg-[#B07552]' :
                                        theme === 'dark' ? 'bg-dark-card' : 'bg-gray-300'
                                    }`}
                                animate={{
                                    backgroundColor: isActive
                                        ? (i === 0 ? ['#f97316', theme === 'dark' ? '#373027' : '#d1d5db'] : i === 3 ? '#B07552' : theme === 'dark' ? '#373027' : '#d1d5db')
                                        : (i === 0 ? '#f97316' : i === 3 ? '#B07552' : theme === 'dark' ? '#373027' : '#d1d5db')
                                }}
                                transition={{
                                    duration: 0.6,
                                    times: i === 0 ? [0, 1] : undefined,
                                    delay: i * 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {i === 0 && <Sparkles className="w-5 h-5 text-white" />}
                                {i === 1 && <GitBranch className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-text' : 'text-white'}`} />}
                                {i === 2 && <CheckCircle2 className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-text' : 'text-white'}`} />}
                                {i === 3 && <ArrowRight className="w-5 h-5 text-white" />}
                            </motion.div>
                            <span className={`text-[10px] mt-1 font-medium ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>{step}</span>
                        </motion.div>

                        {i < steps.length - 1 && (
                            <div className={`hidden md:block relative w-5 mx-1 h-0.5 overflow-hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-300'}`}>
                                <motion.div
                                    className="absolute inset-0 bg-[#B07552]"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: isActive ? '0%' : '-100%' }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.3 + 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${theme === 'dark' ? 'bg-dark-card text-dark-text' : 'bg-white/90 text-gray-600'}`}>Hover to play</span>
                </div>
            )}
        </div>
    );
};

const AnalyticsDemo = () => {
    const { theme } = useTheme();
    const bars = [35, 55, 45, 70, 60, 80, 75];
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px", once: true });
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        if (isInView) {
            setAutoPlay(true);
            const timer = setTimeout(() => setAutoPlay(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const isActive = isHovered || autoPlay;

    return (
        <div
            ref={containerRef}
            className={`rounded-xl p-4 h-[200px] border overflow-hidden relative transition-colors ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-[#f5ece4] border-gray-300'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between mb-3">
                <span className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Revenue Growth</span>
                <motion.div
                    className="flex items-center gap-1 text-[#B07552]"
                    animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-semibold">+24%</span>
                </motion.div>
            </div>
            <div className="flex items-end justify-between gap-2 h-[120px] pt-4">
                {bars.map((height, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#B07552] to-[#E6D0C6] rounded-t-sm"
                        initial={{ height: '0%' }}
                        animate={{ height: isActive ? `${height}%` : '15%' }}
                        transition={{
                            duration: 1.2,
                            delay: i * 0.15,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span key={day} className={`text-[9px] flex-1 text-center ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>{day}</span>
                ))}
            </div>
        </div>
    );
};

const DemoComponent = ({ type }: { type: SolutionDemo['type'] }) => {
    switch (type) {
        case 'chat': return <ChatDemo />;
        case 'voice': return <VoiceDemo />;
        case 'search': return <SearchDemo />;
        case 'workflow': return <WorkflowDemo />;
        case 'analytics': return <AnalyticsDemo />;
    }
};

const AISolutionsShowcase = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    const activeSolution = SOLUTIONS[activeIndex];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Header animation
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

            // Tabs animation
            if (tabsRef.current) {
                gsap.fromTo(tabsRef.current,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: tabsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Content panel animation
            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { x: 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    // Animate content change
    const handleTabChange = (index: number) => {
        if (index === activeIndex) return;

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 0,
                x: 20,
                duration: 0.2,
                onComplete: () => {
                    setActiveIndex(index);
                    gsap.to(contentRef.current, {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section ref={sectionRef} className={`relative py-16 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-transparent'}`}>
            {/* Decorative blur elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-[#E6D0C6]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#B07552]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-[#fdfbf7] border-[#E6D0C6]'}`}>
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'dark' ? 'bg-dark-accent/60' : 'bg-[#B07552]/60'}`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`} />
                        </span>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-dark-accent' : 'text-[#8A5A35]'}`}>
                            AI Solutions
                        </span>
                    </div>
                    <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        Our AI Business <span className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}>Solutions</span>
                    </h2>
                    <p className={`text-base max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                        AI Agents and agentic workflows that embed AI where the value is.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* MOBILE VIEW - Horizontal Icons */}
                    <div className="lg:hidden mb-8">
                        {/* Horizontal Icon Navigation - FIXED */}
                        <div 
                            ref={tabsRef}
                            className="flex justify-center gap-4 mb-6 overflow-x-auto p-2"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <style>{`
                                div::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            {SOLUTIONS.map((solution, index) => {
                                const Icon = solution.icon;
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={solution.id}
                                        onClick={() => handleTabChange(index)}
                                        className={`flex-shrink-0 relative transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 active:scale-95'}`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isActive
                                                ? 'bg-gradient-to-br from-[#B07552] to-[#8A5A35] shadow-lg'
                                                : `${theme === 'dark' ? 'bg-dark-card border border-dark-accent/40' : 'bg-white border border-gray-300'}`
                                                }`}
                                        >
                                            <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : theme === 'dark' ? 'text-dark-text' : 'text-[#B07552]'}`} />
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2 border-[#B07552]"
                                                initial={{ scale: 1 }}
                                                animate={{ scale: 1.25 }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                                style={{ opacity: 0.4 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Solution Title */}
                        <div className="text-center mb-4">
                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                {activeSolution.title}
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                {activeSolution.tagline}
                            </p>
                        </div>

                        {/* Mobile Content Panel */}
                        <div ref={contentRef} className={`rounded-2xl border shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-card border-dark-accent/10' : 'bg-white border-gray-200'}`}>
                            {/* Content Header */}
                            <div className={`p-4 border-b ${theme === 'dark' ? 'border-dark-accent/10' : 'border-gray-100'}`}>
                                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    {activeSolution.description}
                                </p>
                            </div>

                            {/* Demo */}
                            <div className="p-4">
                                <DemoComponent type={activeSolution.demo.type} />
                            </div>

                            {/* Features */}
                            <div className="px-4 pb-4 space-y-2">
                                {activeSolution.features.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 animate-fade-in"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-[#B07552] mt-0.5 flex-shrink-0" />
                                        <span className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="px-4 pb-4 flex flex-col gap-2">
                                <Link
                                    to={activeSolution.link}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8A5A35] hover:bg-[#B07552] text-white rounded-lg font-medium text-sm transition-all hover:shadow-lg"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-lg font-medium text-sm transition-all ${theme === 'dark' ? 'border-dark-accent/50 text-dark-text hover:border-dark-accent hover:text-dark-accent' : 'border-gray-300 hover:border-[#B07552] text-gray-700 hover:text-[#B07552]'}`}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Book Demo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP VIEW - Original Layout */}
                    <div className="hidden lg:flex gap-8">

                        {/* Left Panel - Tabs */}
                        <div className="lg:w-1/3">
                            <div className="space-y-2">
                                {SOLUTIONS.map((solution, index) => {
                                    const Icon = solution.icon;
                                    const isActive = index === activeIndex;

                                    return (
                                        <button
                                            key={solution.id}
                                            onClick={() => handleTabChange(index)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${isActive
                                                ? 'bg-gradient-to-r from-[#B07552] to-[#8A5A35] text-white shadow-lg shadow-[#B07552]/30'
                                                : `${theme === 'dark' ? 'bg-dark-card border-none hover:bg-dark-card/80 text-dark-text' : 'bg-white hover:bg-[#FDFBF7] text-gray-700 border border-gray-200 hover:border-[#E6D0C6]'}`
                                                }`}
                                        >
                                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                                ? 'bg-white/10'
                                                : `${theme === 'dark' ? 'bg-dark-bg group-hover:bg-dark-accent/20' : 'bg-gray-100 group-hover:bg-[#E6D0C6]/30'}`
                                                }`}>
                                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[#B07552]'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-semibold text-sm ${isActive ? 'text-white' : theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                                    {solution.title}
                                                </div>
                                                <div className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {solution.tagline}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="w-1.5 h-8 bg-[#F3E9CD] rounded-full" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* View Ecosystem Link */}
                            <Link
                                to="/products"
                                className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed text-sm font-medium transition-all group ${theme === 'dark' ? 'border-dark-accent/30 text-dark-text-muted hover:border-dark-accent hover:text-dark-accent' : 'border-gray-300 text-gray-600 hover:border-[#B07552] hover:text-[#B07552]'}`}
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">View Full AI Ecosystem</span>
                                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right Panel - Content */}
                        <div ref={contentRef} className="lg:w-2/3">
                            <div className={`rounded-2xl border shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-dark-card border-dark-accent/10' : 'bg-white border-gray-200'}`}>
                                {/* Content Header */}
                                <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${activeSolution.gradient} flex items-center justify-center shadow-lg`}>
                                            <activeSolution.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                                AI for <span className="text-[#B07552]">{activeSolution.title}</span>
                                            </h3>
                                            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                                {activeSolution.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Demo + Features */}
                                <div className="p-6 grid md:grid-cols-2 gap-6">
                                    {/* Demo Preview */}
                                    <div>
                                        <DemoComponent type={activeSolution.demo.type} />
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {activeSolution.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-2 animate-fade-in"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-[#B07552] mt-0.5 flex-shrink-0" />
                                                <span className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="px-6 pb-6 flex flex-wrap gap-3">
                                    <Link
                                        to={activeSolution.link}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8A5A35] hover:bg-[#B07552] text-white rounded-lg font-medium text-sm transition-all hover:shadow-lg"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-lg font-medium text-sm transition-all ${theme === 'dark' ? 'border-dark-accent/50 text-dark-text hover:border-dark-accent hover:text-dark-accent' : 'border-gray-300 hover:border-[#B07552] text-gray-700 hover:text-[#B07552]'}`}
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Book Demo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISolutionsShowcase;