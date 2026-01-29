import {
    Shield, ShieldCheck, Lock, BadgeCheck, Trophy, Star, Award, Brain, Cloud, Code,
    Sparkles, Building2, Globe, Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ============ TYPE DEFINITIONS ============
export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
}

export interface Certification {
    name: string;
    icon: LucideIcon;
    description: string;
    color: string;
}

export interface AwardItem {
    title: string;
    issuer: string;
    year: string;
    icon: LucideIcon;
    color: string;
}

export interface TechCategory {
    name: string;
    icon: LucideIcon;
    color: string;
    technologies: { name: string; desc: string }[];
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string; // Hover image URL
    color: {
        border: string;
        shadow: string;
        bg: string;
        text: string;
        iconColor: string;
    };
}

// ============ CONSTANTS ============
export const HEADLINE_WORDS = ['Accelerate', 'growth', 'at', 'the', 'new', 'speed', 'of', 'business'];

// ============ TEAM DATA ============
export const TEAM_DATA: TeamMember[] = [
    {
        name: 'Dr. Sarah Chen',
        role: 'CEO & Co-Founder',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        bio: 'Former Google AI researcher with 15+ years in machine learning. PhD from Stanford in Computer Science. Passionate about making AI accessible to enterprises worldwide.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'Marcus Rodriguez',
        role: 'CTO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        bio: 'Ex-Meta engineering lead. Built distributed systems serving billions of users. Expert in scalable AI infrastructure and real-time processing systems.',
        linkedin: '#',
        twitter: '#',
        github: '#',
    },
    {
        name: 'Emily Watson',
        role: 'VP of Product',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        bio: 'Product visionary with experience at Salesforce and Microsoft. Specializes in enterprise SaaS products and AI-driven solutions that users love.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'David Kim',
        role: 'Head of AI Research',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        bio: 'Published 50+ papers in top AI conferences. Former DeepMind researcher. Leading our efforts in autonomous agent development and LLM optimization.',
        linkedin: '#',
        github: '#',
    },
    {
        name: 'Priya Sharma',
        role: 'VP of Engineering',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
        bio: 'Engineering leader with 12+ years at Amazon and Netflix. Expert in building high-performance, fault-tolerant systems at scale.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'James Mitchell',
        role: 'Chief Security Officer',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
        bio: 'Former NSA cybersecurity expert. Led security at Fortune 100 companies. Ensures Frostrek meets the highest security standards globally.',
        linkedin: '#',
    },
];

// ============ CERTIFICATIONS DATA ============
export const CERTIFICATIONS_DATA: Certification[] = [
    {
        name: 'ISO 27001',
        icon: ShieldCheck,
        description: 'International standard for information security management systems (ISMS)',
        color: 'from-blue-500 to-blue-600',
    },
    {
        name: 'SOC 2 Type II',
        icon: Lock,
        description: 'Audited security, availability, and confidentiality controls',
        color: 'from-purple-500 to-purple-600',
    },
    {
        name: 'GDPR Compliant',
        icon: Shield,
        description: 'Full compliance with EU General Data Protection Regulation',
        color: 'from-green-500 to-green-600',
    },
    {
        name: 'HIPAA Ready',
        icon: BadgeCheck,
        description: 'Healthcare data protection and privacy standards',
        color: 'from-red-500 to-red-600',
    },
];

// ============ AWARDS DATA ============
export const AWARDS_DATA: AwardItem[] = [
    {
        title: 'Best AI Platform',
        issuer: 'TechCrunch Disrupt',
        year: '2024',
        icon: Trophy,
        color: 'from-amber-400 to-amber-600',
    },
    {
        title: 'Innovation Leader',
        issuer: 'Gartner Magic Quadrant',
        year: '2024',
        icon: Star,
        color: 'from-teal-400 to-teal-600',
    },
    {
        title: 'Top 50 AI Startups',
        issuer: 'Forbes',
        year: '2023',
        icon: Award,
        color: 'from-rose-400 to-rose-600',
    },
    {
        title: 'Enterprise Excellence',
        issuer: 'Enterprise Tech Awards',
        year: '2023',
        icon: Trophy,
        color: 'from-indigo-400 to-indigo-600',
    },
];

// ============ TECH STACK DATA ============
export const TECH_CATEGORIES: TechCategory[] = [
    {
        name: 'AI & Machine Learning',
        icon: Brain,
        color: 'from-purple-500 to-violet-600',
        technologies: [
            { name: 'PyTorch', desc: 'Deep learning framework for research and production' },
            { name: 'TensorFlow', desc: 'End-to-end ML platform for scalable deployments' },
            { name: 'LangChain', desc: 'LLM orchestration and agent development' },
            { name: 'Transformers', desc: 'State-of-the-art NLP models and fine-tuning' },
        ],
    },
    {
        name: 'Infrastructure',
        icon: Cloud,
        color: 'from-cyan-500 to-blue-600',
        technologies: [
            { name: 'Kubernetes', desc: 'Container orchestration at enterprise scale' },
            { name: 'AWS/GCP/Azure', desc: 'Multi-cloud deployment flexibility' },
            { name: 'Terraform', desc: 'Infrastructure as code automation' },
            { name: 'Redis', desc: 'High-performance caching and real-time data' },
        ],
    },
    {
        name: 'Security',
        icon: ShieldCheck,
        color: 'from-green-500 to-emerald-600',
        technologies: [
            { name: 'Zero Trust', desc: 'Never trust, always verify architecture' },
            { name: 'E2E Encryption', desc: 'AES-256 encryption for data at rest and transit' },
            { name: 'OAuth 2.0/OIDC', desc: 'Enterprise SSO and identity management' },
            { name: 'Vault', desc: 'Secrets management and data protection' },
        ],
    },
    {
        name: 'Development',
        icon: Code,
        color: 'from-orange-500 to-red-600',
        technologies: [
            { name: 'TypeScript', desc: 'Type-safe development for robust applications' },
            { name: 'Python', desc: 'Core language for AI/ML development' },
            { name: 'Go', desc: 'High-performance microservices' },
            { name: 'GraphQL', desc: 'Flexible API layer for data access' },
        ],
    },
];

// ============ TIMELINE DATA ============
// Images are Unsplash URLs representing each milestone visually
export const TIMELINE_DATA: TimelineItem[] = [
    {
        year: '2020',
        title: 'Inception',
        description: 'Frostrek founded with a vision to revolutionize enterprise AI adoption.',
        icon: Sparkles,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
        color: { border: 'rgb(20, 184, 166)', shadow: 'rgba(20, 184, 166, 0.2)', bg: 'bg-teal-100', text: 'text-teal-700', iconColor: 'text-teal-500' }
    },
    {
        year: '2021',
        title: 'First Deployment',
        description: 'Successfully deployed our first AI agent platform for a Fortune 500 partner.',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        color: { border: 'rgb(99, 102, 241)', shadow: 'rgba(99, 102, 241, 0.2)', bg: 'bg-indigo-100', text: 'text-indigo-700', iconColor: 'text-indigo-500' }
    },
    {
        year: '2022',
        title: 'Global Expansion',
        description: 'Opened offices in 3 new continents to serve our growing international client base.',
        icon: Globe,
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop',
        color: { border: 'rgb(6, 182, 212)', shadow: 'rgba(6, 182, 212, 0.2)', bg: 'bg-cyan-100', text: 'text-cyan-700', iconColor: 'text-cyan-500' }
    },
    {
        year: '2023',
        title: 'Platform Launch',
        description: 'Released Frostrek Agent V1, setting a new standard for autonomous enterprise agents.',
        icon: Zap,
        image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?w=600&h=400&fit=crop',
        color: { border: 'rgb(245, 158, 11)', shadow: 'rgba(245, 158, 11, 0.2)', bg: 'bg-amber-100', text: 'text-amber-700', iconColor: 'text-amber-500' }
    },
    {
        year: '2024',
        title: 'Market Leader',
        description: 'Recognized as a top AI innovator with over 1M+ active agents managed daily.',
        icon: Award,
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
        color: { border: 'rgb(244, 63, 94)', shadow: 'rgba(244, 63, 94, 0.2)', bg: 'bg-rose-100', text: 'text-rose-700', iconColor: 'text-rose-500' }
    },
];
