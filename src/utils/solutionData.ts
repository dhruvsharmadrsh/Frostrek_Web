import { TrendingUp, Users, ShoppingBag, Server, AlertCircle, Zap, Shield, Globe, Clock, Layout } from 'lucide-react';

export interface Challenge {
    title: string;
    description: string;
    solvedBy?: string;
}

export interface SolutionFeature {
    title: string;
    description: string;
    icon: any;
}

export interface SolutionData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage?: string;
    challenges: Challenge[];
    features: SolutionFeature[];
}

export const SOLUTION_DATA: Record<string, SolutionData> = {
    '/solutions/sales': {
        id: 'sales',
        title: 'AI for Sales',
        subtitle: 'Close More Deals, Faster',
        description: 'Supercharge your sales team with AI-driven insights, automated outreach, and intelligent lead scoring. Focus on selling, not administrative work.',
        challenges: [
            {
                title: 'Low Conversion Rates',
                description: 'Leads falling through the cracks due to slow follow-ups.',
                solvedBy: 'AI agents engage leads instantly, 24/7, increasing conversion by up to 40%.'
            },
            {
                title: 'Manual Data Entry',
                description: 'Hours wasted updating CRM instead of talking to prospects.',
                solvedBy: 'Sync emails, calls, and notes to your CRM automatically. Zero manual entry.'
            },
            {
                title: 'Gut-Feel Forecasting',
                description: 'Inaccurate revenue predictions based on intuition rather than data.',
                solvedBy: 'Predictive models analyze interactions to forecast revenue with 95% accuracy.'
            },
        ],
        features: [
            { title: 'Automated Outreach', description: 'Personalized email and social sequences at scale.', icon: TrendingUp },
            { title: 'Predictive Lead Scoring', description: 'Prioritize leads most likely to convert using historical data.', icon: Zap },
            { title: 'Sales Coaching', description: 'Real-time analysis of sales calls to improve pitch and objection handling.', icon: Users },
        ]
    },
    '/solutions/support': {
        id: 'support',
        title: 'AI for Support',
        subtitle: '24/7 World-Class Service',
        description: 'Provide instant, accurate support to your customers around the clock. Reduce ticket volume and improve CSAT scores with intelligent automation.',
        challenges: [
            {
                title: 'High Wait Times',
                description: 'Customers frustrated by long queues and delayed responses.',
                solvedBy: 'Instantly resolve 80% of queries with AI that understands intent and context.'
            },
            {
                title: 'Agent Burnout',
                description: 'Support teams overwhelmed by repetitive, low-value queries.',
                solvedBy: 'Deflect repetitive tickets so agents can focus on complex, high-value issues.'
            },
            {
                title: 'Inconsistent Answers',
                description: 'Different agents providing conflicting information.',
                solvedBy: 'A unified Knowledge Base ensures every answer is accurate and on-brand.'
            },
        ],
        features: [
            { title: 'Instant Triage', description: 'Automatically categorize and route tickets to the right agent.', icon: Clock },
            { title: 'Knowledge Base Bots', description: 'Answer common questions instantly using your existing documentation.', icon: Globe },
            { title: 'Sentiment Analysis', description: 'Detect frustrated customers and escalate priority automatically.', icon: AlertCircle },
        ]
    },
    '/solutions/ecommerce': {
        id: 'ecommerce',
        title: 'AI for eCommerce',
        subtitle: 'Personalize Every Shopping Journey',
        description: 'Turn visitors into loyal customers with hyper-personalized recommendations, visual search, and intelligent inventory management.',
        challenges: [
            {
                title: 'Cart Abandonment',
                description: 'High traffic but low checkout completion rates.',
                solvedBy: 'Trigger personalized WhatsApp recovery messages at the perfect moment.'
            },
            {
                title: 'Generic Experience',
                description: 'Treating all customers the same reduces engagement.',
                solvedBy: 'Hyper-personalize store layouts and recommendations for every visitor.'
            },
            {
                title: 'Stockouts & Overstock',
                description: 'Poor inventory planning leading to lost sales or wasted capital.',
                solvedBy: 'Demand forecasting AI predicts stock needs with precision.'
            },
        ],
        features: [
            { title: 'Smart Recommendations', description: 'Suggest products based on browsing history and purchase patterns.', icon: ShoppingBag },
            { title: 'Visual Search', description: 'Allow customers to search for products using images.', icon: Layout },
            { title: 'Dynamic Pricing', description: 'Adjust prices in real-time based on demand and competition.', icon: TrendingUp },
        ]
    },
    '/solutions/erp': {
        id: 'erp',
        title: 'AI for ERP',
        subtitle: 'Intelligent Enterprise Operations',
        description: 'Modernize your legacy ERP with AI. Automate complex workflows, reconcile finances instantly, and predict supply chain disruptions.',
        challenges: [
            {
                title: 'Data Silos',
                description: 'Information trapped in disconnected systems slowing decision making.',
                solvedBy: 'Unified data layer connects all your apps into a single source of truth.'
            },
            {
                title: 'Manual Reconciliation',
                description: 'Finance teams spending days matching transactions.',
                solvedBy: 'AI matches thousands of transactions in seconds with audit-ready logs.'
            },
            {
                title: 'Reactive Management',
                description: 'Fixing problems after they happen instead of preventing them.',
                solvedBy: 'Anomaly detection alerts you to issues before they impact the bottom line.'
            },
        ],
        features: [
            { title: 'Supply Chain Prediction', description: 'Forecast demand and potential disruptions weeks in advance.', icon: Server },
            { title: 'Automated Compliance', description: 'Ensure regulatory compliance with continuous monitoring.', icon: Shield },
            { title: 'Process Mining', description: 'Identify bottlenecks and inefficiencies in your workflows.', icon: Zap },
        ]
    },
    // Fallback
    'generic': {
        id: 'generic',
        title: 'Enterprise AI Solutions',
        subtitle: 'Transform Your Business',
        description: 'Leverage the power of artificial intelligence to solve your most critical business challenges. Scalable, secure, and custom-tailored to your needs.',
        challenges: [
            {
                title: 'Operational Efficiency',
                description: 'Rising costs and manual processes slowing growth.',
                solvedBy: 'End-to-end automation reduces operational costs by up to 60%.'
            },
            {
                title: 'Competitive Edge',
                description: 'Falling behind competitors who are adopting AI.',
                solvedBy: 'Stay ahead with cutting-edge agents that evolve with your business.'
            },
        ],
        features: [
            { title: 'Custom AI Models', description: 'Train models on your proprietary data for unique insights.', icon: TrendingUp },
            { title: 'Secure Integration', description: 'Enterprise-grade security and compliance built-in.', icon: Shield },
            { title: 'Scalable Architecture', description: 'Grow from pilot to enterprise-wide deployment effortlessly.', icon: Server },
        ]
    }
};
