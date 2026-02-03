
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const VALUES_DATA = [
    {
        id: 'trust',
        title: "Trust",
        tagline: "Enterprise Security",
        description: "Built on transparency and secure infrastructure.",
        fullDescription: "Your data sovereignty is paramount. We maintain SOC2-compliant infrastructure and rigorous audit trails.",
        icon: Shield,
        stat: "99.9%",
        statLabel: "Uptime SLA",
        image: "/trust_card.png"
    },
    {
        id: 'innovation',
        title: "Innovation",
        tagline: "AI Research",
        description: "Implementing breakthroughs in LLM reasoning.",
        fullDescription: "From agentic workflows to advanced RAG systems, we bring tomorrow's capabilities to your business today.",
        icon: Lightbulb,
        stat: "50+",
        statLabel: "AI Models",
        image: "/innovation_card.png"
    },
    {
        id: 'collaboration',
        title: "Collaboration",
        tagline: "Partnership Growth",
        description: "Our engineers embed into your workflow.",
        fullDescription: "We align our engineering roadmap with your strategic objectives, ensuring solutions that evolve with your business.",
        icon: Users,
        stat: "100%",
        statLabel: "Client Retention",
        image: "/collaboration_card.png"
    }
];

const smoothSpring = { stiffness: 35, damping: 30, mass: 1.5 };

const ValueCard = ({
    value,
    isActive,
    onActivate,
    index,
    theme
}: {
    value: typeof VALUES_DATA[0],
    isActive: boolean,
    onActivate: () => void,
    index: number,
    theme: string
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isDark = theme === 'dark';
    const Icon = value.icon;

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [2, -2]), smoothSpring);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2, 2]), smoothSpring);

    const imageX = useSpring(useTransform(mouseX, [0, 1], ['-1.5%', '1.5%']), smoothSpring);
    const imageY = useSpring(useTransform(mouseY, [0, 1], ['-1.5%', '1.5%']), smoothSpring);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={onActivate}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 1000
            }}
            className={`group relative rounded-3xl cursor-pointer overflow-hidden isolate
                border-2 transition-all duration-500 ease-out
                [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform
                ${isDark
                    ? `border-dark-accent/20 ${isActive ? 'border-dark-accent/60' : 'hover:border-dark-accent/40'}`
                    : `border-[#D4C4BC]/60 ${isActive ? 'border-[#B07552]/60 shadow-2xl' : 'hover:border-[#B07552]/40 shadow-xl hover:shadow-2xl'}`
                }`}
        >
            {/* Background Image with Parallax */}
            <motion.div
                style={{ x: imageX, y: imageY, scale: 1.08 }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.08]"
                    loading="lazy"
                />
                {/* Darker overlay - focus on text readability */}
                <div className={`absolute inset-0 transition-all duration-1000 ease-out  
                    bg-gradient-to-t from-black/95 via-black/65 to-black/35
                    ${isActive ? 'opacity-90' : 'opacity-70 group-hover:opacity-80'}`}
                />
            </motion.div>

            {/* Content */ }
            <div className="relative flex flex-col p-7 md:p-8 text-white z-10 min-h-[420px]">

                {/* Top Row */}
                <div className="flex justify-between items-start mb-auto">
                    <motion.div
                        className="p-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 shadow-lg"
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    >
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </motion.div>

                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                        0{index + 1}
                    </span>
                </div>

                {/* Bottom Content */}
                <div className="mt-auto">
                    <p className="text-[#F5D9C8] text-[11px] font-bold tracking-[0.2em] uppercase mb-2.5">
                        {value.tagline}
                    </p>

                    <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-3 leading-[1.1] tracking-tight drop-shadow-lg">
                        {value.title}
                    </h3>

                    <p className="text-white/85 text-sm leading-relaxed mb-4 max-w-[280px] drop-shadow-md">
                        {value.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence initial={false}>
                        {isActive && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="h-px w-full bg-white/25 my-5" />
                                <p className="text-white/70 text-sm leading-relaxed mb-5">
                                    {value.fullDescription}
                                </p>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-white drop-shadow-lg">{value.stat}</p>
                                        <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">{value.statLabel}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 3 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="bg-white text-[#3D2E24] px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-[#FDF8F3] transition-colors"
                                    >
                                        Explore <ArrowRight size={14} strokeWidth={2.5} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Hint */}
                    {!isActive && (
                        <motion.div
                            className="mt-4 flex items-center gap-2 text-xs font-medium text-white/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span>Click to explore</span>
                            <span className="inline-block animate-bounce-slow">
                                →
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const InteractiveValues = () => {
    const { theme } = useTheme();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const isDark = theme === 'dark';

    return (
        <section className={`py-24 md:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-dark-bg' : 'bg-[#FDFBF7]'}`}>

            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[50%] rounded-full blur-[80px] opacity-25 ${isDark ? 'bg-dark-accent/15' : 'bg-[#E6D0C6]/60'}`} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14 md:mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`text-xs font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-dark-accent' : 'text-[#B07552]'}`}
                    >
                        Our Foundation
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className={`text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight ${isDark ? 'text-dark-text' : 'text-[#3D2E24]'}`}
                    >
                        The values we <span className="italic">live by.</span>
                    </motion.h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
                    {VALUES_DATA.map((value, index) => (
                        <ValueCard
                            key={value.id}
                            value={value}
                            isActive={expandedId === value.id}
                            onActivate={() => setExpandedId(expandedId === value.id ? null : value.id)}
                            index={index}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractiveValues;
