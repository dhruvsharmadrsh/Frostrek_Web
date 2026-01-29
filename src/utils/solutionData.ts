import { TrendingUp, Users, ShoppingBag, Server, AlertCircle, Zap, Shield, Globe, Clock, Layout } from 'lucide-react';

export interface Challenge {
    title: string;
    description: string;
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
            { title: 'Low Conversion Rates', description: 'Leads falling through the cracks due to slow follow-ups.' },
            { title: 'Manual Data Entry', description: 'Hours wasted updating CRM instead of talking to prospects.' },
            { title: 'Gut-Feel Forecasting', description: 'Inaccurate revenue predictions based on intuition rather than data.' },
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
            { title: 'High Wait Times', description: 'Customers frustrated by long queues and delayed responses.' },
            { title: 'Agent Burnout', description: 'Support teams overwhelmed by repetitive, low-value queries.' },
            { title: 'Inconsistent Answers', description: 'Different agents providing conflicting information.' },
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
            { title: 'Cart Abandonment', description: 'High traffic but low checkout completion rates.' },
            { title: 'Generic Experience', description: 'Treating all customers the same reduces engagement.' },
            { title: 'Stockouts & Overstock', description: 'Poor inventory planning leading to lost sales or wasted capital.' },
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
            { title: 'Data Silos', description: 'Information trapped in disconnected systems slowing decision making.' },
            { title: 'Manual Reconciliation', description: 'Finance teams spending days matching transactions.' },
            { title: 'Reactive Management', description: 'Fixing problems after they happen instead of preventing them.' },
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
            { title: 'Operational Efficiency', description: 'Rising costs and manual processes slowing growth.' },
            { title: 'Competitive Edge', description: 'Falling behind competitors who are adopting AI.' },
        ],
        features: [
            { title: 'Custom AI Models', description: 'Train models on your proprietary data for unique insights.', icon: TrendingUp },
            { title: 'Secure Integration', description: 'Enterprise-grade security and compliance built-in.', icon: Shield },
            { title: 'Scalable Architecture', description: 'Grow from pilot to enterprise-wide deployment effortlessly.', icon: Server },
        ]
    }
};
