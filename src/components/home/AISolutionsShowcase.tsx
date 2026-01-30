import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Bot, Mic, Database, Workflow, BarChart3,
    ArrowRight, Sparkles, MessageCircle, Volume2,
    Search, GitBranch, TrendingUp, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    const messages = [
        { role: 'user', text: 'How can I track my order?' },
        { role: 'agent', text: 'I can help! Please share your order ID and I\'ll look that up.' },
        { role: 'user', text: 'ORD-2024-7823' },
    ];

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 h-[200px] overflow-hidden border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-[#B07552] animate-pulse" />
                <span className="text-xs text-gray-400">Frosty AI Agent</span>
            </div>
            <div className="space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        style={{ animationDelay: `${i * 0.5}s` }}
                    >
                        <div
                            className={`max-w-[80%] px-3 py-2 rounded-xl text-xs animate-fade-in ${msg.role === 'user'
                                ? 'bg-[#B07552] text-white rounded-br-sm'
                                : 'bg-gray-700 text-gray-200 rounded-bl-sm'
                                }`}
                            style={{ animationDelay: `${i * 0.4}s` }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div className="flex justify-start">
                    <div className="flex gap-1 px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VoiceDemo = () => {
    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 h-[200px] border border-gray-700/50 flex flex-col items-center justify-center">
            <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B07552] to-[#8A5A35] flex items-center justify-center animate-pulse">
                    <Volume2 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-[#B07552]/50 animate-ping" />
                <div className="absolute inset-[-8px] w-20 h-20 rounded-full border border-[#B07552]/30 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="flex items-center gap-1 mb-2">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-[#B07552] to-[#E6D0C6] rounded-full animate-voice-wave"
                        style={{
                            height: `${Math.random() * 24 + 8}px`,
                            animationDelay: `${i * 0.05}s`
                        }}
                    />
                ))}
            </div>
            <span className="text-xs text-gray-400">Voice AI responding...</span>
        </div>
    );
};

const SearchDemo = () => {
    const results = [
        { title: 'Q3 Financial Report', match: '94%' },
        { title: 'Employee Handbook', match: '87%' },
        { title: 'Product Roadmap 2024', match: '72%' },
    ];

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 h-[200px] border border-gray-700/50">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 mb-3">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">What were last quarter's revenue targets?</span>
            </div>
            <div className="space-y-2">
                {results.map((result, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2 animate-fade-in"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <div className="flex items-center gap-2">
                            <Database className="w-3 h-3 text-[#F3E9CD]" />
                            <span className="text-xs text-gray-300">{result.title}</span>
                        </div>
                        <span className="text-xs font-medium text-[#F3E9CD]">{result.match}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WorkflowDemo = () => {
    const steps = ['Trigger', 'Process', 'Validate', 'Output'];

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 h-[200px] border border-gray-700/50 flex items-center justify-center">
            <div className="flex items-center gap-2">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                        <div
                            className="relative flex flex-col items-center animate-fade-in"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-orange-500' :
                                i === 3 ? 'bg-[#B07552]' :
                                    'bg-gray-700'
                                }`}>
                                {i === 0 && <Sparkles className="w-5 h-5 text-white" />}
                                {i === 1 && <GitBranch className="w-5 h-5 text-white" />}
                                {i === 2 && <CheckCircle2 className="w-5 h-5 text-white" />}
                                {i === 3 && <ArrowRight className="w-5 h-5 text-white" />}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1">{step}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="w-4 h-0.5 bg-gradient-to-r from-gray-600 to-gray-500 mx-1 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AnalyticsDemo = () => {
    const bars = [35, 55, 45, 70, 60, 80, 75];

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 h-[200px] border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">Revenue Growth</span>
                <div className="flex items-center gap-1 text-[#B07552]">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-semibold">+24%</span>
                </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-[120px] pt-4">
                {bars.map((height, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#B07552] to-[#E6D0C6] rounded-t-sm animate-grow"
                        style={{
                            height: `${height}%`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span key={day} className="text-[9px] text-gray-500 flex-1 text-center">{day}</span>
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
        <section ref={sectionRef} className="relative py-16 overflow-hidden">
            {/* Decorative blur elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-[#E6D0C6]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#B07552]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdfbf7] border border-[#E6D0C6] mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B07552]/60 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B07552]" />
                        </span>
                        <span className="text-xs font-semibold text-[#8A5A35] uppercase tracking-wider">
                            AI Solutions
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                        Our AI Business <span className="text-[#B07552]">Solutions</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        AI Agents and agentic workflows that embed AI where the value is.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Panel - Tabs */}
                        <div ref={tabsRef} className="lg:w-1/3">
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
                                                : 'bg-white hover:bg-[#FDFBF7] text-gray-700 border border-gray-200 hover:border-[#E6D0C6]'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                                ? 'bg-white/10'
                                                : 'bg-gray-100 group-hover:bg-[#E6D0C6]/30'
                                                }`}>
                                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[#B07552]'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
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
                                className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:border-[#B07552] hover:text-[#B07552] transition-all group"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">View Full AI Ecosystem</span>
                                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right Panel - Content */}
                        <div ref={contentRef} className="lg:w-2/3">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                                {/* Content Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${activeSolution.gradient} flex items-center justify-center shadow-lg`}>
                                            <activeSolution.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                AI for <span className="text-[#B07552]">{activeSolution.title}</span>
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
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
                                                <span className="text-sm text-gray-600">{feature}</span>
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
                                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:border-[#B07552] text-gray-700 hover:text-[#B07552] rounded-lg font-medium text-sm transition-all"
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
