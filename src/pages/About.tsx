import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Target, Award, Zap, Shield, Globe, ArrowRight, Code, Brain, Cpu, Database, Layers, Sparkles, CheckCircle2, Trophy, Star, BadgeCheck, Lock, ShieldCheck, Linkedin, Twitter, Github, Cloud, ChevronDown, type LucideIcon } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useRef, useState, useEffect, useMemo, memo, useCallback } from 'react';
import { TIMELINE_DATA } from '../utils/aboutData';
import InnovationProcess from '../components/about/InnovationProcess';
import { useTheme } from '../context/ThemeContext';
// Extracted constant for optimization
const HEADLINE_WORDS = ['Accelerate', 'growth', 'at', 'the', 'new', 'speed', 'of', 'business'];
import CTASection from '../components/home/CTASection';
import { useNavigate } from 'react-router-dom';


// ============ TEAM DATA ============
const TEAM_DATA = [
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
const CERTIFICATIONS_DATA = [
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
const AWARDS_DATA = [
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
        color: 'from-brand-green-400 to-brand-green-600',
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
const TECH_CATEGORIES = [
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
        color: 'from-brand-green-500 to-brand-green-600',
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

// ============ STUNNING TYPEWRITER ============
const TypewriterText = memo(({ texts }: { texts: string[] }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(texts[0]);
    const [phase, setPhase] = useState<'show' | 'delete' | 'type'>('show');
    const isVisibleRef = useRef(true);

    // Track visibility to pause animations when tab is hidden
    useEffect(() => {
        const handleVisibility = () => {
            isVisibleRef.current = !document.hidden;
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        // Skip animations when tab is hidden
        if (!isVisibleRef.current) {
            const checkVisibility = setInterval(() => {
                if (isVisibleRef.current) {
                    clearInterval(checkVisibility);
                    setPhase('show'); // Resume from show phase
                }
            }, 500);
            return () => clearInterval(checkVisibility);
        }

        if (phase === 'show') {
            const t = setTimeout(() => setPhase('delete'), 2500);
            return () => clearTimeout(t);
        }
        if (phase === 'delete') {
            if (text.length > 0) {
                const t = setTimeout(() => setText(text.slice(0, -1)), 80);
                return () => clearTimeout(t);
            }
            setIndex(i => (i + 1) % texts.length);
            setPhase('type');
        }
        if (phase === 'type') {
            const target = texts[index];
            if (text.length < target.length) {
                const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 120);
                return () => clearTimeout(t);
            }
            setPhase('show');
        }
    }, [text, phase, index, texts]);

    return (
        <span className="relative">
            {text}
            <span className="inline-block w-[3px] h-[0.85em] bg-brand-green-400 ml-1 align-middle rounded-full animate-pulse" />
        </span>
    );
});

// ============ INTERACTIVE BUTTON (NO MAGNETIC EFFECT) ============
const MagneticButton = memo(({ children, className, onClick, variant = 'primary' }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cta'
}) => {
    const { theme } = useTheme();
    const [hover, setHover] = useState(false);
    const [press, setPress] = useState(false);

    // Dark mode uses #bf8440 (dark-accent), light mode uses brand-green gradient
    const baseStyles = theme === 'dark'
        ? variant === 'primary'
            ? 'bg-[#bf8440] text-dark-bg shadow-lg shadow-[#bf8440]/25'
            : variant === 'cta'
                ? 'bg-[#bf8440] text-dark-bg shadow-xl'
                : 'bg-dark-card border-2 border-[#bf8440]/40 text-[#bf8440]'
        : variant === 'primary'
            ? 'bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white shadow-lg shadow-brand-green-500/25'
            : variant === 'cta'
                ? 'bg-white text-brand-green-600 shadow-xl'
                : 'bg-white/90 border-2 border-brand-green-500/40 text-brand-green-600';

    return (
        <motion.button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setPress(true)}
            onMouseUp={() => setPress(false)}
            onClick={onClick}
            className={`relative overflow-hidden rounded-xl font-semibold transition-all ${baseStyles} ${className}`}
            animate={{ scale: press ? 0.97 : hover ? 1.03 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={hover ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
});

// ============ 3D TILT CARD ============
const TiltCard = memo(({ children, className, color = 'brand-green' }: {
    children: React.ReactNode;
    className?: string;
    color?: 'brand-green' | 'brand-yellow'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const rafId = useRef<number | null>(null);

    // Throttled mouse handler using rAF to prevent layout thrashing
    const handleMouse = useCallback((e: React.MouseEvent) => {
        if (rafId.current) return; // Skip if already pending

        rafId.current = requestAnimationFrame(() => {
            if (!ref.current) {
                rafId.current = null;
                return;
            }
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            rotateX.set((e.clientY - centerY) / 15);
            rotateY.set((centerX - e.clientX) / 15);
            rafId.current = null;
        });
    }, [rotateX, rotateY]);

    const reset = useCallback(() => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
        rotateX.set(0);
        rotateY.set(0);
        setHover(false);
    }, [rotateX, rotateY]);

    // Cleanup rAF on unmount
    useEffect(() => {
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={`relative ${className}`}
            animate={{
                y: hover ? -8 : 0,
                boxShadow: hover ? `0 20px 40px -15px ${color === 'brand-green' ? 'rgba(176,117,82,0.3)' : 'rgba(212,187,117,0.3)'}` : '0 4px 20px -5px rgba(0,0,0,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Gradient border on hover */}
            <motion.div
                className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r ${color === 'brand-green' ? 'from-brand-green-400 via-brand-yellow-400 to-brand-green-400' : 'from-brand-yellow-400 via-brand-green-400 to-brand-yellow-400'}`}
                animate={{ opacity: hover ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
            <div className="relative bg-white rounded-2xl h-full" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
});

// ============ ANIMATED COUNTER ============


// ============ FLOATING ICON ============
const FloatingIcon = memo(({ icon: Icon, delay, x, y }: { icon: LucideIcon; delay: number; x: string; y: string }) => (
    <div
        className="absolute w-10 h-10 bg-white/80 backdrop-blur rounded-xl shadow-lg flex items-center justify-center border border-brand-green-500/20 animate-bounce-slow"
        style={{ left: x, top: y, animationDelay: `${delay}s` }}
    >
        <Icon className="w-5 h-5 text-brand-green-600" />
    </div>
));

// ============ INTERACTIVE GLOBE ============
const InteractiveGlobe = memo(() => {
    const [hoveredCity, setHoveredCity] = useState<number | null>(null);
    const [isGlobeHovered, setIsGlobeHovered] = useState(false);

    const cities = useMemo(() => [
        { x: '18%', y: '28%', name: 'San Francisco', flag: '🇺🇸' },
        { x: '70%', y: '22%', name: 'London', flag: '🇬🇧' },
        { x: '82%', y: '55%', name: 'Singapore', flag: '🇸🇬' },
        { x: '15%', y: '62%', name: 'Dubai', flag: '🇦🇪' },
        { x: '52%', y: '12%', name: 'Berlin', flag: '🇩🇪' },
        { x: '75%', y: '42%', name: 'Bangalore', flag: '🇮🇳' },
    ], []);

    return (
        <div className="relative w-full h-80 flex items-center justify-center">
            {/* Animated rings - Using CSS instead of Framer Motion for performance */}
            <div className="absolute w-56 h-56 border-2 border-dashed border-brand-green-500/20 rounded-full animate-spin-slow" />
            <div className="absolute w-44 h-44 border-2 border-dashed border-brand-yellow-500/20 rounded-full animate-spin-slow-reverse" />

            {/* Globe center */}
            <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-brand-green-400 via-brand-green-500 to-brand-green-600 rounded-full flex items-center justify-center shadow-2xl z-10"
                onMouseEnter={() => setIsGlobeHovered(true)}
                onMouseLeave={() => setIsGlobeHovered(false)}
                animate={{
                    scale: isGlobeHovered ? 1.1 : 1,
                    boxShadow: isGlobeHovered
                        ? '0 0 60px 10px rgba(176,117,82,0.4)'
                        : '0 20px 50px -10px rgba(176,117,82,0.4)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Globe className="w-12 h-12 text-white" />
                {/* Pulse rings - Using CSS for performance */}
                <div className="absolute inset-0 rounded-full border-2 border-brand-green-300 animate-ping" />
            </motion.div>

            {/* City dots with tooltips */}
            {cities.map((city, i) => (
                <motion.div
                    key={i}
                    className="absolute z-20"
                    style={{ left: city.x, top: city.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    onMouseEnter={() => setHoveredCity(i)}
                    onMouseLeave={() => setHoveredCity(null)}
                >
                    <motion.div
                        className="relative cursor-pointer"
                        animate={{ scale: hoveredCity === i ? 1.5 : 1 }}
                    >
                        <div className="w-4 h-4 bg-brand-green-500 rounded-full shadow-lg" />
                        <div className="absolute inset-0 rounded-full bg-brand-green-400 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                    </motion.div>
                    <AnimatePresence>
                        {hoveredCity === i && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur rounded-xl text-white text-xs whitespace-nowrap shadow-xl z-30"
                            >
                                <span className="text-base mr-1">{city.flag}</span>
                                <span className="font-medium">{city.name}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
});

// ============ CHECK ITEM WITH ANIMATION ============
const CheckItem = memo(({ text, delay }: { text: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="flex items-center gap-3 group"
    >
        <motion.div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-green-500 to-brand-green-600 flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 10 }}
        >
            <CheckCircle2 className="w-4 h-4 text-white" />
        </motion.div>
        <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{text}</span>
    </motion.div>
));

// ============ TECH STACK ICON ============
const TechIcon = memo(({ icon: Icon, label, delay }: { icon: LucideIcon; label: string; delay: number }) => {
    const [hover, setHover] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div
                className="w-16 h-16 bg-white rounded-2xl border-2 border-brand-green-500/20 flex items-center justify-center shadow-lg"
                animate={{
                    y: hover ? -8 : 0,
                    borderColor: hover ? 'rgb(176 117 82)' : 'rgba(176 117 82 / 0.2)',
                    boxShadow: hover ? '0 15px 30px -10px rgba(176,117,82,0.3)' : '0 4px 15px -5px rgba(0,0,0,0.1)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Icon className="w-8 h-8 text-brand-green-600" />
            </motion.div>
            <AnimatePresence>
                {hover && (
                    <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute -bottom-6 text-xs font-medium text-brand-green-600 whitespace-nowrap"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

// ============ SCROLL INDICATOR ============
// const ScrollIndicator = memo(() => (
//     <div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer animate-bounce-slow"
//         onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
//     >
//         <MousePointer2 className="w-5 h-5 text-brand-green-500" />
//     </div>
// ));

// ============ TEAM FLIP CARD ============
const TeamFlipCard = memo(({ member, delay }: { member: typeof TEAM_DATA[0]; delay: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="perspective-1000 w-full max-w-[380px] mx-auto h-[380px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative w-full h-full">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {/* Overlay - Optimized: Removed backdrop-blur for performance */}
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-brand-yellow-300 font-medium">{member.role}</p>
                            </div>
                        </div>
                        {/* Hover Hint */}
                        <div
                            className="absolute top-4 right-4 bg-black/40 rounded-full px-3 py-1.5 text-xs text-white border border-white/20 animate-pulse"
                        >
                            Hover for bio
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {/* Optimized: Solid background instead of backdrop-blur-xl */}
                    <div className="w-full h-full bg-slate-900 border border-slate-700 p-6 flex flex-col">
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-xl object-cover border-2 border-brand-green-500/50"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                    <p className="text-brand-yellow-400 text-sm font-medium">{member.role}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed flex-1">{member.bio}</p>

                            {/* Social Links */}
                            <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                                {member.linkedin && (
                                    <motion.a
                                        href={member.linkedin}
                                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-brand-green-500/50 transition-colors"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </motion.a>
                                )}
                                {member.twitter && (
                                    <motion.a
                                        href={member.twitter}
                                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-brand-green-500/50 transition-colors"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </motion.a>
                                )}
                                {member.github && (
                                    <motion.a
                                        href={member.github}
                                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-brand-green-500/50 transition-colors"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

// ============ CERTIFICATION BADGE ============
const CertificationBadge = memo(({ cert, delay }: { cert: typeof CERTIFICATIONS_DATA[0]; delay: number }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, type: 'spring', stiffness: 200 }}
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <motion.div
                className={`relative px-6 py-4 rounded-2xl bg-gradient-to-br ${cert.color} overflow-hidden`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 bg-white/20 animate-pulse"
                />

                <div className="relative flex items-center gap-3">
                    <cert.icon className="w-6 h-6 text-white" />
                    <span className="text-white font-bold text-sm">{cert.name}</span>
                </div>
            </motion.div>

            {/* Tooltip - positioned ABOVE the badge */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-50 w-56 text-center"
                    >
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45" />
                        <p className="relative z-10">{cert.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

// ============ AWARD CARD ============
const AwardCard = memo(({ award, delay }: { award: typeof AWARDS_DATA[0]; delay: number }) => {
    const [hover, setHover] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div
                className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg overflow-hidden cursor-pointer h-full min-h-[200px]"
                animate={{
                    y: hover ? -8 : 0,
                    borderColor: hover ? 'rgba(176, 117, 82, 0.5)' : 'rgb(243, 244, 246)',
                    boxShadow: hover ? '0 20px 40px -15px rgba(176,117,82,0.3)' : '0 4px 20px -5px rgba(0,0,0,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {/* Background Glow */}
                <motion.div
                    className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${award.color} opacity-20 blur-2xl`}
                    animate={{ scale: hover ? 1.5 : 1 }}
                />

                <div className="relative">
                    {/* Icon */}
                    <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${award.color} flex items-center justify-center mb-4 shadow-lg`}
                        animate={{ rotate: hover ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <award.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{award.title}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">{award.issuer}</p>
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                        {award.year}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
});

// ============ EXPANDABLE TECH CATEGORY ============
const ExpandableTechCategory = memo(({ category, delay }: { category: typeof TECH_CATEGORIES[0]; delay: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative"
        >
            <motion.div
                className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden cursor-pointer"
                animate={{
                    borderColor: isExpanded ? 'rgba(176, 117, 82, 0.5)' : 'rgb(243, 244, 246)',
                }}
            >
                {/* Header */}
                <motion.div
                    className="p-6 flex items-center justify-between"
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ backgroundColor: 'rgba(176, 117, 82, 0.05)' }}
                >
                    <div className="flex items-center gap-4">
                        <motion.div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                            animate={{ rotate: isExpanded ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <category.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.technologies.length} technologies</p>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                </motion.div>

                {/* Expandable Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6 space-y-3">
                                {category.technologies.map((tech, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${category.color} mt-2 flex-shrink-0`} />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{tech.name}</h4>
                                            <p className="text-gray-500 text-xs">{tech.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
});

// ============ TECH ECOSYSTEM DIAGRAM ============
const TechEcosystemDiagram = memo(() => {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    const categories = [
        { icon: Brain, label: 'AI/ML', angle: 0, color: '#8B5CF6' },
        { icon: Cloud, label: 'Cloud', angle: 90, color: '#B07552' },
        { icon: ShieldCheck, label: 'Security', angle: 180, color: '#D4BB75' },
        { icon: Code, label: 'Dev', angle: 270, color: '#F97316' },
    ];

    return (
        <div className="relative w-full max-w-[320px] aspect-square mx-auto">
            {/* Orbiting Rings */}
            <div
                className="absolute inset-8 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow"
            />
            <div
                className="absolute inset-16 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow-reverse"
            />

            {/* Center Logo */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-brand-green-500 to-brand-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl z-10 animate-pulse"
            >
                <span className="text-white font-bold text-lg">F</span>
            </div>

            {/* Orbiting Icons */}
            {categories.map((cat, i) => {
                const radius = 110;
                const x = Math.cos((cat.angle * Math.PI) / 180) * radius;
                const y = Math.sin((cat.angle * Math.PI) / 180) * radius;

                return (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 z-20"
                        style={{
                            x: x - 24,
                            y: y - 24,
                        }}
                        onMouseEnter={() => setHoveredCategory(i)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
                            style={{ backgroundColor: cat.color }}
                            animate={{
                                scale: hoveredCategory === i ? 1.2 : 1,
                                boxShadow: hoveredCategory === i ? `0 10px 30px ${cat.color}50` : '0 4px 15px rgba(0,0,0,0.1)',
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <cat.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <AnimatePresence>
                            {hoveredCategory === i && (
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute top-14 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap"
                                >
                                    {cat.label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Connection Line */}
                        <svg
                            className="absolute left-6 top-6 pointer-events-none"
                            width="100"
                            height="100"
                            style={{ overflow: 'visible' }}
                        >
                            <motion.line
                                x1="0"
                                y1="0"
                                x2={-x + 24}
                                y2={-y + 24}
                                stroke={cat.color}
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        </svg>
                    </motion.div>
                );
            })}
        </div>
    );
});

// ============ STAGGER ANIMATIONS ============
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// ============ MAIN COMPONENT ============
const About = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    // const [activeOffice, setActiveOffice] = useState<number>(0);
    const [flippedCard, setFlippedCard] = useState<number | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         dotsRef.current.forEach((dot, index) => {
    //             if (!dot) return;

    //             const rect = dot.getBoundingClientRect();
    //             const windowCenter = window.innerHeight / 2;

    //             if (rect.top <= windowCenter && rect.bottom >= windowCenter) {
    //                 setActiveImageIndex(index);
    //             }
    //         });
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        dotsRef.current.forEach((dot, index) => {
            if (!dot) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveImageIndex(index);
                    }
                },
                {
                    root: null,
                    rootMargin: "-45% 0px -45% 0px",
                    threshold: 0
                }
            );

            observer.observe(dot);
            observers.push(observer);
        });

        return () => {
            observers.forEach(obs => obs.disconnect());
        };
    }, []);


    const texts = useMemo(() => ['Intelligent Systems', 'Agentic AI', 'Machine Learning', 'Neural Networks'], []);

    const values = useMemo(() => [
        { icon: Zap, title: 'Innovation', desc: 'Cutting-edge AI solutions', color: 'brand-green' as const },
        { icon: Award, title: 'Excellence', desc: 'ISO certified quality', color: 'brand-yellow' as const },
        { icon: Shield, title: 'Trust', desc: 'Enterprise security', color: 'brand-green' as const },
        { icon: Target, title: 'Collaboration', desc: 'Partnership focused', color: 'brand-yellow' as const },
    ], []);

    const features = useMemo(() => [
        {
            num: '01',
            title: 'Trusted Expertise',
            desc: 'World-class AI research team with proven track record in enterprise AI deployments. Our experts bring decades of experience ensuring robust solutions.',
            stat: '5000+ Sessions',
            details: 'Former researchers from Google, Meta, and DeepMind with 15+ years in AI/ML. Successfully deployed solutions serving millions worldwide.',
            highlights: ['PhD-level researchers', '200+ published papers', 'Enterprise solutions']
        },
        {
            num: '02',
            title: 'Innovation-Driven',
            desc: 'Pushing technology boundaries with cutting-edge research in LLMs and autonomous agents. We invest heavily in R&D to deliver next-gen AI capabilities.',
            stat: 'Cutting-Edge',
            details: 'We invest 30% of resources in R&D, staying ahead with latest advancements in LLMs, autonomous agents, and neural networks.',
            highlights: ['Latest LLM technology', 'Real-time processing', 'Custom model training']
        },
        {
            num: '03',
            title: 'Client-Centered',
            desc: 'Your success is our priority with dedicated support and customized solutions. We deliver tailored AI systems that integrate seamlessly with workflows.',
            stat: 'Tailored',
            details: 'Every solution customized to your unique needs. Dedicated support ensures 99.9% uptime with 24/7 monitoring and assistance.',
            highlights: ['24/7 dedicated support', '99.9% uptime SLA', 'Custom integrations']
        },
        {
            num: '04',
            title: 'Production-Ready',
            desc: 'Scale without limits on cloud-native infrastructure handling billions of requests. Battle-tested architecture ensures zero downtime and automatic scaling.',
            stat: 'Enterprise',
            details: 'Cloud-native architecture handling billions of requests. Infrastructure scales automatically to meet growing demands with zero downtime.',
            highlights: ['Auto-scaling infrastructure', 'Billions of requests', 'Zero-downtime deploys']
        },
    ], []);

    const offices = useMemo(() => [
        {
            name: 'India',
            city: 'Gurugram',
            country: 'India',
            flagImg: 'https://flagcdn.com/w40/in.png',
            image: '/Suncity-Success-Tower.jpg',
            companyName: 'India Office',
            address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurgaon (Beyond Just Work)',
            phone: '+91 124 123 4567',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=JMD Empire Sector 62 Gurgaon'
        },
        {
            name: 'USA',
            city: 'Austin',
            country: 'United States',
            flagImg: 'https://flagcdn.com/w40/us.png',
            image: '/701 Tillery St 12 3227, Austin, TX 78702, USA.jpg',
            companyName: 'USA Office',
            address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
            phone: '+1 512 123 4567',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=701+Tillery+Street+Unit+12-3227+Austin+Texas+78702'
        },
        {
            name: 'UK',
            city: 'London',
            country: 'United Kingdom',
            flagImg: 'https://flagcdn.com/w40/gb.png',
            image: '/24-26-Arcadia-Ave-London-Primary-Photo-1-LargeHighDefinition.jpg',
            companyName: 'UK Office',
            address: '24-26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
            phone: '+44 208 057 5675',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=24-26+Arcadia+Avenue+London+N3+2JU'
        },
    ], []);

    const tech = useMemo(() => [
        { icon: Brain, label: 'AI/ML' },
        { icon: Code, label: 'Development' },
        { icon: Cpu, label: 'Processing' },
        { icon: Database, label: 'Big Data' },
        { icon: Layers, label: 'Architecture' },
        { icon: Sparkles, label: 'Innovation' },
    ], []);

    return (
        <div ref={ref} className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {theme !== 'dark' && <CuteBackground />}

            {/* ===== HERO ===== */}
            <motion.section style={{ y: bgY, opacity }} className="relative min-h-[50vh] md:min-h-[85vh] flex items-center py-10 md:py-20 pt-20 md:pt-32">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.h1
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}
                        >
                            Revolutionizing AI Solutions with{' '}
                            <span className={`relative inline-block ${theme === 'dark' ? 'text-[#bf8441]' : 'text-brand-green-500'}`}>
                                <TypewriterText texts={texts} />
                                <motion.span
                                    className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-brand-green-400 to-brand-yellow-400 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                        >
                            We specialize in AI model training, agentic AI systems, and end-to-end software development that transforms businesses.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <MagneticButton
                                variant="primary"
                                className="px-8 py-4"
                                onClick={() => navigate('/contact')}
                            >
                                <span className="flex items-center gap-2">
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </span>
                            </MagneticButton>
                            <MagneticButton variant="secondary" className="px-8 py-4" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
                                Learn More
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
                {/* <ScrollIndicator /> */}
            </motion.section>

            {/* ===== TECH STACK ===== */}
            <section className="">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8">
                        {tech.map((t, i) => <TechIcon key={i} icon={t.icon} label={t.label} delay={i * 0.1} />)}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section id="stats" className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
                        <motion.p variants={fadeUp} className={`text-center mb-12 text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                            Building AI systems that transform how organizations operate.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                            {[
                                { value: '5000+', label: 'Training Sessions' },
                                { value: '200+', label: 'AI Specialists' },
                                { value: '99%', label: 'Accuracy Rate' },
                                { value: '50+', label: 'Enterprise Clients' },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className={`p-6 text-center rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-brand-green-600 mb-1">
                                        {s.value}
                                    </div>
                                    <div className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== PURPOSE / GROWTH SECTION ===== */}
            <section className="py-16 md:py-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            <h2 className={`text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-8 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                {HEADLINE_WORDS.map((word, i) => (
                                    <span key={i} className="inline-block whitespace-pre">
                                        <motion.span
                                            className="inline-block"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                        {' '}
                                    </span>
                                ))}
                            </h2>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className={`text-xl mb-8 leading-relaxed font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-slate-700'}`}
                            >
                                We work with enterprises to reimagine business with our AI Agent Platform, AI Solutions for Work, Service and Process, and Agent Marketplace.
                            </motion.p>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className={`text-lg mb-12 leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}
                            >
                                With Frostrek, customers get a standardized approach to developing, deploying, and orchestrating AI agents across the enterprise with speed, control, and flexibility. We help you keep up with the rapid pace of the AI industry.
                            </motion.p>

                            <motion.div
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className="relative pl-8 border-l border-dotted border-gray-300"
                            >
                                <div className="absolute top-0 left-[-1px] w-[1px] h-8 bg-black"></div>
                                <div className="absolute bottom-0 left-[-1px] w-[1px] h-8 bg-black"></div>

                                <div className="flex flex-wrap gap-4">
                                    <MagneticButton variant="primary" onClick={() => navigate("/experience")} className={`px-8 py-4 !rounded-none !shadow-none font-bold text-xs tracking-widest uppercase ${theme === 'dark' ? '!bg-[#bf8441] !text-dark-bg hover:!bg-[#bf8441]/90' : '!bg-gray-950 !text-white hover:!bg-brand-green-600'}`}>
                                        <span className="flex items-center gap-2">VIEW OUR AGENT PLATFORM <span className={theme === 'dark' ? 'text-dark-bg' : 'text-brand-green-400'}>•</span></span>
                                    </MagneticButton>

                                    <MagneticButton variant="secondary" onClick={() => navigate("/contact")} className="px-8 py-4 font-bold text-xs tracking-widest uppercase">
                                        CONTACT US
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/3]">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                                    alt="Frostrek Team"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                {/* Floating Logo Overlay */}
                                <motion.div
                                    className="absolute bottom-8 right-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
                                        <div className="text-2xl font-bold tracking-tight text-gray-900">
                                            Frostrek
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Subtle Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-green-50/30 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE SECTION ===== */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}
                        >
                            Our Journey
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                        >
                            From a bold idea to a global leader in Agentic AI.
                        </motion.p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green-500/0 via-brand-green-500/50 to-brand-green-500/0 md:-translate-x-1/2"></div>

                        {TIMELINE_DATA.map((item, i) => {
                            const isActive = activeImageIndex === i;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`relative flex items-center gap-8 mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline Dot with Ref */}
                                    <div
                                        ref={(el) => {
                                            if (el) dotsRef.current[i] = el;
                                        }}
                                        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-green-500 shadow-[0_0_0_4px_rgba(176,117,82,0.2)] z-10 md:-translate-x-1/2 translate-x-[-7px] md:translate-x-[-8px]"
                                    >
                                        {/* Pulsing effect when active */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-brand-green-400 rounded-full"
                                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                                    >
                                        <motion.div
                                            className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
                                            whileHover={{
                                                y: -4,
                                                borderColor: item.color.border,
                                                boxShadow: `0 10px 30px -10px ${item.color.shadow}`
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className={`flex flex-col gap-3 ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`px-3 py-1 ${item.color.bg} ${item.color.text} rounded-full text-sm font-bold shadow-sm`}>
                                                        {item.year}
                                                    </span>
                                                    <item.icon className={`w-5 h-5 ${item.color.iconColor} ${i % 2 === 0 ? 'md:order-first' : ''}`} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                                <p className="text-gray-600 leading-relaxed font-medium">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* IMAGE DISPLAY - ONLY WHEN DOT IS AT CENTER */}
                                    <div className={`hidden md:flex md:w-1/2 items-center ${i % 2 === 0 ? 'md:pl-16 justify-start' : 'md:pr-16 justify-end'}`}>
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                    className="relative overflow-hidden rounded-2xl shadow-2xl w-[300px] h-[200px]"
                                                    style={{
                                                        boxShadow: `0 25px 50px -12px ${item.color.shadow}`
                                                    }}
                                                >
                                                    <motion.img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                        initial={{ scale: 1.05 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.6 }}
                                                    />
                                                    {/* Gradient overlay */}
                                                    <div
                                                        className="absolute inset-0 pointer-events-none"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${item.color.border}15 0%, transparent 50%)`
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== INNOVATION ENGINE ===== */}
            <section className={`py-16 md:py-24 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gradient-to-b from-slate-50/50 to-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-gradient-to-r from-brand-green-100 to-brand-green-200 text-brand-green-700'}`}
                        >
                            How We Work
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}
                        >
                            Our Innovation Engine
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                        >
                            A proven methodology that transforms ideas into enterprise-grade AI solutions.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <InnovationProcess />
                    </motion.div>
                </div>
            </section>

            {/* ===== TEAM / LEADERSHIP ===== */}
            <section className={`py-16 md:py-24 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-b from-white via-slate-50/50 to-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-brand-green-100 text-brand-green-700'}`}
                        >
                            Meet the Team
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}
                        >
                            Leadership That Drives Innovation
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                        >
                            World-class experts united by a mission to make AI accessible and impactful.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {TEAM_DATA.map((member, i) => (
                            <TeamFlipCard key={i} member={member} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CORE VALUES ===== */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Core Values</h2>
                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>The principles that guide us</p>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                        {values.map((v, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <TiltCard color={v.color}>
                                    <div className="p-6 text-center">
                                        <motion.div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${v.color === 'brand-green' ? 'bg-gradient-to-br from-brand-green-400 to-brand-green-600' : 'bg-gradient-to-br from-brand-yellow-400 to-brand-yellow-600'}`}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        >
                                            <v.icon className="w-7 h-7 text-white" />
                                        </motion.div>
                                        <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                                        <p className="text-gray-600 text-sm">{v.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== WHY CHOOSE ===== */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Why Frostrek?</h2>
                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Experience the difference</p>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {features.map((f, i) => (
                            <motion.div key={i} variants={fadeUp} className="perspective-1000" style={{ height: '280px' }}>
                                <div
                                    className="relative w-full h-full cursor-pointer"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                                >
                                    <motion.div
                                        className="w-full h-full"
                                        animate={{ rotateY: flippedCard === i ? 180 : 0 }}
                                        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* Front Side */}
                                        <div
                                            className={`absolute inset-0 w-full h-full rounded-lg shadow-lg border transition-shadow duration-300 hover:shadow-xl overflow-hidden ${theme === 'dark'
                                                ? i % 2 === 0
                                                    ? 'bg-dark-card border-brand-green-500/30'
                                                    : 'bg-dark-card border-brand-yellow-500/30'
                                                : i % 2 === 0
                                                    ? 'bg-white border-brand-green-100'
                                                    : 'bg-white border-brand-yellow-100'
                                                }`}
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden'
                                            }}
                                        >
                                            {/* Decorative gradient background */}
                                            <div className={`absolute inset-0 opacity-5 ${i % 2 === 0
                                                ? 'bg-gradient-to-br from-brand-green-500 via-transparent to-brand-green-500/30'
                                                : 'bg-gradient-to-br from-brand-yellow-500 via-transparent to-brand-yellow-500/30'
                                                }`} />

                                            {/* Decorative pattern */}
                                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                                <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-brand-green-500' : 'bg-brand-yellow-500'}`}
                                                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                                            </div>

                                            <div className="relative p-6 pb-8 flex flex-col h-full">
                                                {/* Number badge */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <motion.div
                                                        className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg ${i % 2 === 0
                                                            ? theme === 'dark'
                                                                ? 'bg-brand-green-500/20 text-brand-green-400 border border-brand-green-500/30'
                                                                : 'bg-gradient-to-br from-brand-green-400 to-brand-green-600 text-white'
                                                            : theme === 'dark'
                                                                ? 'bg-brand-yellow-500/20 text-brand-yellow-400 border border-brand-yellow-500/30'
                                                                : 'bg-gradient-to-br from-brand-yellow-400 to-brand-yellow-600 text-white'
                                                            }`}
                                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                                    >
                                                        {f.num}
                                                    </motion.div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{f.title}</h3>
                                                        <div className={`h-1 w-12 rounded-full ${i % 2 === 0 ? 'bg-brand-green-500' : 'bg-brand-yellow-500'}`} />
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className={`text-sm leading-relaxed flex-1 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                                    {f.desc}
                                                </p>

                                                {/* Footer with stat */}
                                                <div className={`flex items-center justify-between pt-5 mt-4 mb-1 border-t ${theme === 'dark'
                                                    ? i % 2 === 0 ? 'border-brand-green-500/20' : 'border-brand-yellow-500/20'
                                                    : i % 2 === 0 ? 'border-brand-green-100' : 'border-brand-yellow-100'
                                                    }`}>
                                                    <span className={`text-xs font-semibold ${i % 2 === 0 ? 'text-brand-green-600' : 'text-brand-yellow-600'}`}>
                                                        {f.stat}
                                                    </span>
                                                    <motion.div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${i % 2 === 0
                                                            ? 'bg-brand-green-100 text-brand-green-600'
                                                            : 'bg-brand-yellow-100 text-brand-yellow-600'
                                                            }`}
                                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                                    >
                                                        →
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back Side */}
                                        <div
                                            className={`absolute inset-0 w-full h-full rounded-lg shadow-lg border overflow-hidden ${theme === 'dark'
                                                ? i % 2 === 0
                                                    ? 'bg-dark-card border-brand-green-500/30'
                                                    : 'bg-dark-card border-brand-yellow-500/30'
                                                : i % 2 === 0
                                                    ? 'bg-white border-brand-green-100'
                                                    : 'bg-white border-brand-yellow-100'
                                                }`}
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <div className="p-5 h-full flex flex-col overflow-y-auto">
                                                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                                                    <h3 className={`font-bold text-base ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{f.title}</h3>
                                                    <span className={`text-xl font-bold flex-shrink-0 ${i % 2 === 0 ? 'text-brand-green-500' : 'text-brand-yellow-500'}`}>{f.num}</span>
                                                </div>
                                                <p className={`text-xs mb-3 leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>{f.details}</p>
                                                <div className="space-y-1.5 flex-1">
                                                    {f.highlights.map((highlight, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${i % 2 === 0 ? 'text-brand-green-500' : 'text-brand-yellow-500'}`} />
                                                            <span className={`text-xs leading-tight ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-700'}`}>{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-3 text-center flex-shrink-0">
                                                    <span className={`text-xs font-semibold ${i % 2 === 0 ? 'text-brand-green-600' : 'text-brand-yellow-600'}`}>Click to flip back ↻</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== GLOBAL PRESENCE ===== */}
            <section className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-b from-white via-slate-50/50 to-white'}`}>

                {/* Decorative background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-brand-green-500' : 'bg-brand-green-200'}`} />
                    <div className={`absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-brand-yellow-500' : 'bg-brand-yellow-200'}`} />
                </div>

                <div className="container mx-auto px-4 relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-gradient-to-r from-brand-green-100 to-brand-yellow-100 text-brand-green-700'}`}
                        >
                            <Globe className="inline w-4 h-4 mr-2" />
                            Our Locations
                        </motion.span>

                        <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-dark-text to-dark-text-muted' : 'from-gray-900 to-gray-700'} bg-clip-text text-transparent`}>
                            Global Presence
                        </h2>

                        <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                            Serving enterprises across three continents
                        </p>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offices.map((o, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[470px] w-[92%] mx-auto ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                                        }`}
                                // onClick={() => setActiveOffice(i)}
                                >
                                    {/* Image with Hover Overlay ONLY on Image */}
                                    <motion.div className="h-[70%] overflow-hidden relative group">

                                        <motion.img
                                            src={o.image}
                                            alt={o.city}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.4 }}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                        {/* Hover Overlay - NOW CENTERED ONLY ON IMAGE */}
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                        >
                                            <div
                                                className={`m-6 p-5 rounded-xl w-[88%] max-w-[320px] shadow-xl backdrop-blur-md ${theme === 'dark'
                                                    ? 'bg-dark-card/95 border border-white/10'
                                                    : 'bg-white/95 border border-gray-100'
                                                    }`}
                                            >
                                                <p className={`text-sm mb-3 text-center ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'
                                                    }`}>
                                                    {o.address}
                                                </p>

                                                <p className={`font-semibold mb-4 text-center ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                                                    }`}>
                                                    {o.phone}
                                                </p>

                                                <div className="flex justify-center">
                                                    <motion.a
                                                        href={o.mapUrl}
                                                        target="_blank"
                                                        className="px-5 py-2 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white rounded-lg font-semibold text-sm"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Get Directions
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </motion.div>

                                    </motion.div>

                                    {/* Info Section - Unaffected */}
                                    <div className="h-[26%] p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <img src={o.flagImg} alt="flag" className="w-6 h-4 rounded" />
                                                <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-brand-green-400' : 'text-brand-green-600'
                                                    }`}>
                                                    {o.name}
                                                </span>
                                            </div>

                                            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                                                }`}>
                                                {o.city}
                                            </h3>

                                            <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'
                                                }`}>
                                                {o.country}
                                            </p>
                                        </div>
                                        {/* MOBILE ONLY BUTTON */}
                                        <div className="lg:hidden mt-2">
                                            <a
                                                href={o.mapUrl}
                                                target="_blank"
                                                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white rounded-lg font-semibold text-sm"
                                            >
                                                Get Directions
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ===== CTA ===== */}
            {/* ===== CTA ===== */}
            <CTASection />
        </div>
    );
};

export default About;

// Export unused components for potential future use
export { FloatingIcon, InteractiveGlobe, CheckItem, CertificationBadge, AwardCard, ExpandableTechCategory, TechEcosystemDiagram };
