import { Bot, Mic, Share2, Database, ShoppingCart, Headset, BarChart, Server, Globe, Smartphone, Zap, Shield, Users, Clock, Phone, FileText, Activity, Podcast, Calendar, DollarSign, Filter, Eye, MousePointerClick, Send, CheckCircle, Truck, RefreshCw, Settings, Brain } from 'lucide-react';

export interface ProductStatistic {
    value: string;
    label: string;
    icon?: any;
    breakdown?: { value: number; label: string; color?: string; }[];
}

export interface ProductProcessStep {
    step: string;
    title: string;
    description: string;
}

export interface UseCase {
    title: string;
    description: string;
    icon?: any;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ProductFeature {
    title: string;
    description: string;
    icon: any;
}

export interface ProductBenefit {
    title: string;
    description: string;
    image?: string;
}

export interface ProductData {
    id: string;
    tagline: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    heroImage?: string;
    demoImage?: string; // For Experience Zone
    statistics: ProductStatistic[];
    features: ProductFeature[];
    process: ProductProcessStep[];
    benefits: ProductBenefit[];
    useCases: UseCase[];
    faq: FAQItem[];
}

export const PRODUCT_DATA: Record<string, ProductData> = {
    '/products/frosty-ai': {
        id: 'frosty-ai',
        tagline: 'AUTOMATE CUSTOMER SUPPORT',
        title: 'Frosty AI Agent',
        subtitle: 'Intelligent Conversations, Infinite Scale',
        description: 'Empower your support team with a next-gen AI agent that understands context, sentiment, and intent. Resolve up to 80% of inquiries instantly without human intervention.',
        badge: 'Top Rated Support AI',
        heroImage: '/agent1.png',
        demoImage: '/optimized/chatbot-rafiki.webp',
        statistics: [
            { value: '80%', label: 'Automated Resolutions', icon: Zap },
            { value: '24/7', label: 'Availability', icon: Clock },
            { value: '30s', label: 'Avg. Response Time', icon: BarChart },
            { value: '3x', label: 'ROI in Year 1', icon: Database },
        ],
        process: [
            { step: '01', title: 'Connect Data', description: 'Link your Knowledge Base, CRM, and past tickets.' },
            { step: '02', title: 'Train Agent', description: 'Our AI automatically learns your brand voice and policies.' },
            { step: '03', title: 'Go Live', description: 'Deploy instantly across Web, WhatsApp, and Social channels.' }
        ],
        features: [
            { title: 'Contextual Understanding', description: 'Goes beyond keywords to understand customer intent and urgency.', icon: Bot },
            { title: 'Sentiment Analysis', description: 'Detects frustration and intelligently routes to human agents.', icon: Headset },
            { title: 'Omnichannel Deployment', description: 'One agent, everywhere: Website, WhatsApp, Messenger, Instagram.', icon: Share2 },
            { title: 'Smart Handoff', description: 'Seamlessly transfers complex issues to humans with full chat history.', icon: Users },
        ],
        benefits: [
            { title: 'Scale Without Hiring', description: 'Handle peak season traffic without adding headcount.' },
            { title: 'Consistent Experience', description: 'Deliver on-brand responses 100% of the time.' },
        ],
        useCases: [
            { title: 'E-Commerce Support', description: 'Order tracking, returns, and product FAQs.', icon: ShoppingCart },
            { title: 'SaaS Helpdesk', description: 'Technical troubleshooting and account management.', icon: Server },
            { title: 'Banking Assistant', description: 'Balance checks, transaction history, and fraud alerts.', icon: Shield },
        ],
        faq: [
            { question: 'How long does it take to train?', answer: 'Most clients are live within 2 weeks. Our pre-trained models require minimal fine-tuning.' },
            { question: 'Does it integrate with Zendesk/Salesforce?', answer: 'Yes, we have native integrations with all major helpdesk and CRM platforms.' },
            { question: 'What happens if the AI makes a mistake?', answer: 'You can set confidence thresholds. Low-confidence queries are automatically routed to humans.' },
        ]
    },
    '/products/voice-ai': {
        id: 'voice-ai',
        tagline: 'REVOLUTIONIZE YOUR CALL CENTER',
        title: 'Voice AI Agent',
        subtitle: 'Human-like Voice Interactions at Scale',
        description: 'Create better customer experiences with less effort. Deploy low-latency voice AI agents that handle inbound support and outbound sales calls with natural, human-like fluidity.',
        badge: 'Low Latency Voice',
        heroImage: '/optimized/frostrek_VA.webp',
        demoImage: '/vn1.png',
        statistics: [
            { value: '50%', label: 'Reduction in Costs', icon: BarChart },
            { value: '90%', label: 'Call Automation', icon: Phone },
            { value: '1.2s', label: 'Ultra-Low Latency', icon: Zap },
            { value: '40+', label: 'Languages Supported', icon: Globe },
        ],
        process: [
            { step: '01', title: 'Design Flow', description: 'Use our drag-and-drop builder to create conversation paths.' },
            { step: '02', title: 'Select Voice', description: 'Choose from our library of premium neural voices or clone your own.' },
            { step: '03', title: 'Deploy', description: 'Integrate with your telephony provider (Twilio, Vonage, etc.) instantly.' }
        ],
        features: [
            { title: 'Real-time Transcription', description: 'Transcribes and analyzes calls as they happen for instant insights.', icon: FileText },
            { title: 'Natural Voice Synthesis', description: 'Indistinguishable from human agents with emotional modulation.', icon: Mic },
            { title: 'Interrupt Handling', description: 'Handles interruptions and "umms" naturally like a real person.', icon: Activity },
            { title: 'Inbound & Outbound', description: 'Perfect for support hotlines or proactive sales outreach.', icon: Podcast },
        ],
        benefits: [
            { title: 'Endless Capacity', description: 'Never put a customer on hold again.' },
            { title: 'Perfect Compliance', description: 'Every call adheres strictly to regulatory scripts.' },
        ],
        useCases: [
            { title: 'Appointment Scheduling', description: 'Clinics, Salons, and Service businesses.', icon: Calendar },
            { title: 'Debt Collection', description: 'Empathetic, compliant, and persistent payment reminders.', icon: DollarSign },
            { title: 'Lead Qualification', description: 'Filter inbound leads before routing to sales executives.', icon: Filter },
        ],
        faq: [
            { question: 'Does it sound robotic?', answer: 'Not at all. We use the latest neural TTS engines for hyper-realistic intonation and breathing.' },
            { question: 'Can it handle accents?', answer: 'Yes, our models are trained on diverse datasets to understand global accents.' },
            { question: 'Is it PCI compliant?', answer: 'Yes, we support secure DTMF masking for credit card payments.' },
        ]
    },
    '/products/whatsapp-agents': {
        id: 'whatsapp',
        tagline: 'ENGAGE WHERE IT MATTERS',
        title: 'WhatsApp Automation',
        subtitle: 'Turn Conversations into Revenue',
        description: 'Unlock the power of the world\'s most popular messaging app. Automate notifications, support, and sales directly in WhatsApp with official API integration.',
        badge: 'Meta Business Partner',
        heroImage: '/wp1.png', // Placeholder
        demoImage: '/wp2.png',
        statistics: [
            { value: '98%', label: 'Open Rate', icon: Eye },
            { value: '45%', label: 'Click-Through Rate', icon: MousePointerClick },
            { value: '5x', label: 'Higher Conversion', icon: BarChart },
            { value: '2B+', label: 'Active Users', icon: Users },
        ],
        process: [
            { step: '01', title: 'Get Verified', description: 'We help you apply for the official WhatsApp Business API.' },
            { step: '02', title: 'Build Templates', description: 'Create rich message templates for approval.' },
            { step: '03', title: 'Launch Campaigns', description: 'Send broadcasts and handle responses automatically.' }
        ],
        features: [
            { title: 'Automated Broadcasts', description: 'Send personalized offers and updates to thousands instantly.', icon: Send },
            { title: 'Interactive Buttons', description: 'Guide customers with Quick Replies and Call-to-Action buttons.', icon: Smartphone },
            { title: 'Catalog Integration', description: 'Showcase products and process orders without leaving the chat.', icon: ShoppingCart },
            { title: 'Green Tick Support', description: 'Assistance in getting the verified business badge.', icon: CheckCircle },
        ],
        benefits: [
            { title: 'Instant Reach', description: 'Reach customers instantly on their lock screens.' },
            { title: 'Media Rich', description: 'Send images, videos, and PDFs effortlessly.' },
        ],
        useCases: [
            { title: 'Order Updates', description: 'Shipping notifications and delivery tracking.', icon: Truck },
            { title: 'Abandoned Cart', description: 'Recover lost sales with timely reminders.', icon: RefreshCw },
            { title: 'Verification', description: 'Send OTPs securely via WhatsApp.', icon: Smartphone },
        ],
        faq: [
            { question: 'Is there a risk of getting banned?', answer: 'No, we use the official API which is fully compliant with WhatsApp policies.' },
            { question: 'Can I send promotional messages?', answer: 'Yes, using approved Marketing Templates.' },
        ]
    },
    // Fallback/Generic for other routes
    'generic': {
        id: 'generic',
        tagline: 'ENTERPRISE SOLUTIONS',
        title: 'Enterprise AI Suite',
        subtitle: 'Scalable Intelligence for Business',
        description: 'Leverage our full suite of AI tools to modernize your entire operation. From ERP automation to predictive analytics, we build the future of your business.',
        badge: 'Enterprise Grade',
        heroImage: '/enterprise_ai_suite.png',
        statistics: [
            {
                value: '100%',
                label: 'Efficiency Gains',
                icon: Settings,
                breakdown: [
                    { value: 65, label: 'Efficiency' },
                    { value: 25, label: 'Growth' },
                    { value: 10, label: 'Sustainability' }
                ]
            },
            {
                value: '99.9%',
                label: 'Uptime SLA',
                icon: Server,
                breakdown: [
                    { value: 90, label: 'Availability' },
                    { value: 8, label: 'Redundancy' },
                    { value: 2, label: 'Recovery' }
                ]
            },
            { value: '60%', label: 'Cost Reduction', icon: BarChart },
            {
                value: '3x',
                label: 'Faster Deployment',
                icon: Zap,
                breakdown: [
                    { value: 50, label: 'Automation' },
                    { value: 30, label: 'CI/CD Pipeline' },
                    { value: 20, label: 'Testing' }
                ]
            },
        ],
        process: [
            { step: '01', title: 'Consult', description: 'We analyze your current infrastructure.' },
            { step: '02', title: 'Architect', description: 'Design a custom AI solution.' },
            { step: '03', title: 'Execute', description: 'Agile implementation and training.' }
        ],
        features: [
            { title: 'Security First', description: 'ISO 27001 and GDPR compliant architecture.', icon: Shield },
            { title: 'Scalable', description: 'Built to handle enterprise-level loads.', icon: Database },
            { title: 'Custom LLMs', description: 'Fine-tune models on your proprietary data.', icon: Brain },
            { title: 'Real-time Analytics', description: 'Track performance with live dashboards and insights.', icon: BarChart },
            { title: 'Seamless Integration', description: 'Connect with your existing tools via REST APIs.', icon: Settings },
            { title: 'Global Reach', description: 'Multi-language support with 40+ locales.', icon: Globe },
        ],
        benefits: [
            { title: 'Future Proof', description: 'Stay ahead of the technology curve.' },
        ],
        useCases: [],
        faq: []
    }
};
