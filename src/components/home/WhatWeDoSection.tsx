import { Bot, MessageSquare, Headphones, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
    {
        id: 'voice-ai',
        title: 'AI Voice Agent',
        icon: Headphones,
        gradient: 'from-blue-500 to-cyan-500',
        link: '/products/voice-ai'
    },
    {
        id: 'chat-ai',
        title: 'Chat AI Agent',
        icon: MessageSquare,
        gradient: 'from-green-500 to-teal-500',
        link: '/products/frosty-ai'
    },
    {
        id: 'ai-assist',
        title: 'AI Agent Assist',
        icon: Bot,
        gradient: 'from-pink-500 to-rose-500',
        link: '/products/voice-ai'
    },
    {
        id: 'rag-search',
        title: 'RAG Cognitive Search',
        icon: Database,
        gradient: 'from-orange-500 to-red-500',
        link: '/solutions/support'
    },
    {
        id: 'automation',
        title: 'Workflow Automation',
        icon: Zap,
        gradient: 'from-purple-500 to-indigo-500',
        link: '/solutions/sales'
    }
];

const WhatWeDoSection = () => {
    return (
        <section className="py-16 bg-background relative">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" />
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                            AI Agent Platform for Enterprises and Contact Center Automation
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Accelerate LLM Adoption and Build{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            AI Agents
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto">
                        Integrate with Any Data Source, Service, or Channel to Transform Business-Critical Tasks
                    </p>
                </div>

                {/* Service Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
                    {SERVICES.map((service) => (
                        <Link
                            key={service.id}
                            to={service.link}
                            className={`
                group relative overflow-hidden
                px-6 py-3.5 rounded-full
                bg-gradient-to-r ${service.gradient}
                hover:shadow-lg hover:shadow-${service.gradient.split('-')[1]}-500/30
                transition-all duration-300
                hover:scale-105
                flex items-center gap-3
              `}
                        >
                            <service.icon className="w-5 h-5 text-white" />
                            <span className="font-semibold text-white text-sm md:text-base whitespace-nowrap">
                                {service.title}
                            </span>

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    ))}
                </div>

                {/* Optional: Stats or metrics below */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400">95%</div>
                        <div className="text-xs text-gray-500 mt-1">Query Resolution</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-purple-400">{'<'}2s</div>
                        <div className="text-xs text-gray-500 mt-1">Response Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-green-400">24/7</div>
                        <div className="text-xs text-gray-500 mt-1">Availability</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-orange-400">50+</div>
                        <div className="text-xs text-gray-500 mt-1">Languages</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeDoSection;
