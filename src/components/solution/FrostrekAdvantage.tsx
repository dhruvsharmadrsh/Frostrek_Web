import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Database, Shield, Globe,
    Check, BarChart3, Layers, Zap, Activity,
    RotateCcw, Workflow,
    PartyPopper, Rocket, Star
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FrostrekAdvantageProps {
    features?: any[];
}

const WORKFLOW_STEPS = [
    {
        id: 'input-1',
        title: 'Unstructured Data',
        subtitle: 'Raw inputs & documents',
        icon: Database,
        color: '#6366F1',
        outcome: { title: 'Smart Data Lake', desc: 'Auto-categorized & searchable.', stat: '99.2%', statLabel: 'Accuracy' }
    },
    {
        id: 'input-2',
        title: 'Security Threats',
        subtitle: 'Anomalies & vulnerabilities',
        icon: Shield,
        color: '#EC4899',
        outcome: { title: 'Threat Shield', desc: 'Real-time neutralization.', stat: '<500ms', statLabel: 'Response' }
    },
    {
        id: 'input-3',
        title: 'Global Traffic',
        subtitle: 'Network load & routing',
        icon: Globe,
        color: '#10B981',
        outcome: { title: 'Edge Optimization', desc: 'Intelligent load balancing.', stat: '40%', statLabel: 'Faster' }
    }
];

// Floating Particle Component - Memoized random values for performance
const FloatingParticle = ({ delay, size, duration }: { 
    delay: number; size: number; duration: number;
}) => (
    <div
        className="absolute rounded-full bg-[#B07552]/30 animate-ping"
        style={{ 
            width: size, 
            height: size,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
        }}
    />
);



// Confetti Component - Reduced to 10 elements, memoized random values
const CONFETTI_DATA = Array.from({ length: 10 }, (_, i) => ({
    left: Math.random() * 100,
    x: (Math.random() - 0.5) * 100,
    rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
    duration: 2 + Math.random(),
    color: ['#B07552', '#10B981', '#6366F1', '#EC4899', '#F59E0B'][i % 5],
}));

const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CONFETTI_DATA.map((data, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                    left: `${data.left}%`,
                    top: '-10px',
                    backgroundColor: data.color,
                }}
                animate={{
                    y: ['0%', '500%'],
                    x: [0, data.x],
                    rotate: [0, data.rotate],
                    opacity: [1, 0],
                }}
                transition={{ duration: data.duration, delay: i * 0.05, ease: 'easeOut' }}
            />
        ))}
    </div>
);

const FrostrekAdvantage = ({ features: _features }: FrostrekAdvantageProps) => {
    const { theme } = useTheme();
    const [processedIds, setProcessedIds] = useState<string[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [pulseCore, setPulseCore] = useState(false);

    const processItem = useCallback((id: string) => {
        if (processedIds.includes(id) || processingId) return;

        setProcessingId(id);
        setPulseCore(true);

        setTimeout(() => {
            setProcessedIds(prev => {
                const newIds = [...prev, id];
                if (newIds.length === WORKFLOW_STEPS.length) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                }
                return newIds;
            });
            setProcessingId(null);
            setPulseCore(false);
        }, 1500);
    }, [processedIds, processingId]);

    const resetAll = () => {
        setProcessedIds([]);
        setProcessingId(null);
        setShowConfetti(false);
    };

    const allProcessed = processedIds.length === WORKFLOW_STEPS.length;
    const isActive = processedIds.length > 0 || processingId;

    return (
        <section className={`py-16 md:py-24 overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-b from-[#FDFBF7] via-[#FAF6F3] to-[#FDFBF7]'}`}>
            <div className="container mx-auto px-4 md:px-6">

                {/* Header with Animated Badge */}
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#B07552]/10 to-[#8A5A35]/10 border border-[#B07552]/20 text-[#B07552] font-bold text-[11px] uppercase tracking-wider mb-4 cursor-default"
                    >
                        <div className="animate-wiggle">
                            <Workflow size={14} />
                        </div>
                        <span>Interactive Demo</span>
                        <div className="w-2 h-2 rounded-full bg-[#B07552] animate-pulse" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-2xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}
                    >
                        The Frostrek <span className="bg-gradient-to-r from-[#B07552] to-[#8A5A35] bg-clip-text text-transparent">Advantage</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`text-sm md:text-base ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#5D5046]'}`}
                    >
                        Click any challenge card to watch our AI transform it into a solution ✨
                    </motion.p>
                </div>

                {/* Main Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-7xl mx-auto"
                >
                    {showConfetti && <Confetti />}

                    <div className={`rounded-2xl shadow-2xl shadow-[#B07552]/10 overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-accent/30' : 'bg-white border border-[#E6D0C6]'}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr]">

                            {/* LEFT: Input Challenges */}
                            <div className={`p-5 md:p-6 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gradient-to-br from-[#FAF6F3] to-[#F5EDE6]'}`}>
                                <div className="flex items-center gap-2 mb-5">
                                    <motion.div
                                        className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#B07552] to-[#8A5A35] flex items-center justify-center shadow-lg"
                                        whileHover={{ rotate: 10 }}
                                    >
                                        <Layers size={16} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>Challenges</h3>
                                        <p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Click to process</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {WORKFLOW_STEPS.map((step, idx) => {
                                        const isProcessed = processedIds.includes(step.id);
                                        const isProcessing = processingId === step.id;

                                        return (
                                            <motion.button
                                                key={step.id}
                                                onClick={() => processItem(step.id)}
                                                disabled={isProcessed || !!processingId}
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                                                whileHover={!isProcessed && !processingId ? {
                                                    scale: 1.03,
                                                    x: 8,
                                                    boxShadow: '0 10px 40px -10px rgba(176, 117, 82, 0.3)'
                                                } : {}}
                                                whileTap={!isProcessed && !processingId ? { scale: 0.97 } : {}}
                                                className={`
                                                    relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden group
                                                    ${isProcessed
                                                        ? theme === 'dark' ? 'bg-green-900/30 border-green-500' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                                                        : isProcessing
                                                            ? theme === 'dark' ? 'bg-dark-accent/20 border-dark-accent shadow-lg' : 'bg-gradient-to-r from-[#B07552]/5 to-[#B07552]/10 border-[#B07552] shadow-lg'
                                                            : theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 hover:border-dark-accent cursor-pointer' : 'bg-white border-[#E6D0C6] hover:border-[#B07552] cursor-pointer'}
                                                `}
                                            >
                                                {/* Shimmer Effect on Hover */}
                                                {!isProcessed && !isProcessing && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                                                        initial={{ x: '-100%' }}
                                                        whileHover={{ x: '100%' }}
                                                        transition={{ duration: 0.6 }}
                                                    />
                                                )}

                                                <div className="relative flex items-center gap-3">
                                                    <motion.div
                                                        className={`
                                                            w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md
                                                            ${isProcessed
                                                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                                                                : isProcessing
                                                                    ? 'bg-gradient-to-br from-[#B07552] to-[#8A5A35] text-white'
                                                                    : 'bg-gradient-to-br from-[#B07552]/10 to-[#B07552]/20 text-[#B07552] group-hover:from-[#B07552] group-hover:to-[#8A5A35] group-hover:text-white'}
                                                        `}
                                                        animate={isProcessing ? { rotate: [0, 5, -5, 0] } : {}}
                                                        transition={{ duration: 0.3, repeat: isProcessing ? Infinity : 0 }}
                                                    >
                                                        {isProcessing ? (
                                                            <div className="animate-spin">
                                                                <Activity size={20} />
                                                            </div>
                                                        ) : isProcessed ? (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                                                                <Check size={20} />
                                                            </motion.div>
                                                        ) : (
                                                            <step.icon size={20} />
                                                        )}
                                                    </motion.div>

                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{step.title}</h4>
                                                        <p className={`text-[11px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>{step.subtitle}</p>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-5 pt-4 border-t border-[#E6D0C6]/50">
                                    <div className="flex items-center justify-between text-[11px] mb-2">
                                        <span className="text-[#5D5046] font-medium">{processedIds.length}/{WORKFLOW_STEPS.length} Complete</span>
                                        {processedIds.length > 0 && (
                                            <motion.button
                                                onClick={resetAll}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-1 text-[#B07552] font-medium hover:underline"
                                            >
                                                <RotateCcw size={12} /> Reset
                                            </motion.button>
                                        )}
                                    </div>
                                    <div className="relative w-full h-2 bg-[#E6D0C6]/40 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B07552] to-[#8A5A35] rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(processedIds.length / WORKFLOW_STEPS.length) * 100}%` }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        />
                                        {/* Shimmer on progress bar */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CENTER: AI Core */}
                            <div className={`relative flex items-center justify-center py-10 lg:py-0 border-y lg:border-y-0 lg:border-x ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-white border-[#E6D0C6]/30'}`}>
                                {/* Floating Particles */}
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[...Array(6)].map((_, i) => (
                                            <FloatingParticle 
                                                key={i} 
                                                delay={i * 0.3} 
                                                size={4 + (i % 3) * 2} 
                                                duration={2 + (i % 3) * 0.5}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Core */}
                                <motion.div
                                    animate={{
                                        scale: pulseCore ? [1, 1.08, 1] : 1,
                                        boxShadow: processingId
                                            ? ['0 0 0px 0px rgba(176,117,82,0)', '0 0 60px 20px rgba(176,117,82,0.3)', '0 0 0px 0px rgba(176,117,82,0)']
                                            : allProcessed
                                                ? '0 0 50px 15px rgba(16,185,129,0.2)'
                                                : '0 15px 50px -15px rgba(0,0,0,0.15)'
                                    }}
                                    transition={{ duration: 0.8, repeat: pulseCore ? Infinity : 0 }}
                                    className={`
                                        relative w-36 h-36 lg:w-40 lg:h-40 rounded-full flex items-center justify-center
                                        ${allProcessed
                                            ? theme === 'dark' ? 'bg-gradient-to-br from-green-800/50 to-emerald-900/30 border-2 border-green-500' : 'bg-gradient-to-br from-green-100 to-emerald-50 border-2 border-green-300'
                                            : theme === 'dark' ? 'bg-gradient-to-br from-dark-card to-dark-bg border-2 border-dark-accent/50' : 'bg-gradient-to-br from-[#FAF6F3] to-white border-2 border-[#E6D0C6]'}
                                    `}
                                >
                                    {/* Spinner */}
                                    <AnimatePresence>
                                        {processingId && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-1"
                                            >
                                                <div
                                                    className="w-full h-full rounded-full border-[3px] border-transparent border-t-[#B07552] border-r-[#B07552]/30 animate-spin"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="text-center z-10">
                                        <motion.div
                                            animate={{
                                                scale: processingId ? [1, 1.15, 1] : allProcessed ? [1, 1.05, 1] : 1,
                                                rotate: processingId ? [0, 5, -5, 0] : 0
                                            }}
                                            transition={{ duration: 0.5, repeat: (processingId || allProcessed) ? Infinity : 0 }}
                                            className={`
                                                w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-xl mb-2
                                                ${allProcessed
                                                    ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                                                    : 'bg-gradient-to-br from-[#B07552] to-[#8A5A35]'}
                                            `}
                                        >
                                            {allProcessed ? (
                                                <PartyPopper className="text-white w-7 h-7" />
                                            ) : processingId ? (
                                                <Zap className="text-white w-7 h-7" />
                                            ) : (
                                                <Sparkles className="text-white w-7 h-7" />
                                            )}
                                        </motion.div>

                                        <h4 className={`font-bold text-xs ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>
                                            {allProcessed ? 'Complete!' : processingId ? 'Processing' : 'AI Core'}
                                        </h4>

                                        <motion.div
                                            className={`
                                                mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold border
                                                ${processingId
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                    : allProcessed
                                                        ? 'bg-green-50 text-green-700 border-green-200'
                                                        : 'bg-[#FAF6F3] text-[#8C7E72] border-[#E6D0C6]'}
                                            `}
                                        >
                                            <motion.span
                                                className={`w-1.5 h-1.5 rounded-full ${processingId ? 'bg-amber-500' : allProcessed ? 'bg-green-500' : 'bg-[#B07552]'}`}
                                                animate={processingId ? { scale: [1, 1.5, 1] } : {}}
                                                transition={{ duration: 0.5, repeat: processingId ? Infinity : 0 }}
                                            />
                                            {processingId ? 'Working...' : allProcessed ? 'All Done!' : 'Ready'}
                                        </motion.div>
                                    </div>

                                    {/* Counter Badge */}
                                    <motion.div
                                        className={`
                                            absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg
                                            ${allProcessed ? 'bg-green-500 text-white' : 'bg-[#B07552] text-white'}
                                        `}
                                        animate={{ scale: processedIds.length > 0 ? [1, 1.2, 1] : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {processedIds.length}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* RIGHT: Outcomes */}
                            <div className={`p-5 md:p-6 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gradient-to-bl from-[#FAF6F3] to-[#F5EDE6]'}`}>
                                <div className="flex items-center gap-2 mb-5">
                                    <motion.div
                                        className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                                        whileHover={{ rotate: -10 }}
                                    >
                                        <BarChart3 size={16} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>AI Outcomes</h3>
                                        <p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>{processedIds.length} solutions generated</p>
                                    </div>
                                </div>

                                <div className="space-y-3 min-h-[220px]">
                                    <AnimatePresence mode="popLayout">
                                        {processedIds.map((id, idx) => {
                                            const item = WORKFLOW_STEPS.find(s => s.id === id);
                                            if (!item) return null;

                                            return (
                                                <motion.div
                                                    key={id}
                                                    initial={{ opacity: 0, x: 40, scale: 0.9, rotateY: -20 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.05 }}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    className={`p-4 rounded-xl border-2 shadow-md hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-dark-bg border-green-500/50' : 'bg-white border-green-200'}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <motion.div
                                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-sm"
                                                            initial={{ rotate: -180, scale: 0 }}
                                                            animate={{ rotate: 0, scale: 1 }}
                                                            transition={{ type: 'spring', delay: 0.2 }}
                                                        >
                                                            <Zap size={18} className="text-green-600" />
                                                        </motion.div>
                                                        <div className="flex-1">
                                                            <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{item.outcome.title}</h4>
                                                            <p className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#5D5046]'}`}>{item.outcome.desc}</p>
                                                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-[#B07552]/10 to-[#B07552]/5 border border-[#B07552]/20">
                                                                <span className="text-sm font-bold text-[#B07552]">{item.outcome.stat}</span>
                                                                <span className="text-[10px] text-[#8C7E72]">{item.outcome.statLabel}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {/* Empty State */}
                                    {processedIds.length === 0 && !processingId && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`h-[220px] flex items-center justify-center rounded-xl border-2 border-dashed ${theme === 'dark' ? 'border-dark-accent/50 bg-dark-bg/50' : 'border-[#E6D0C6] bg-white/30'}`}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className="w-12 h-12 bg-gradient-to-br from-[#E6D0C6]/50 to-[#E6D0C6]/30 rounded-full mx-auto mb-3 flex items-center justify-center animate-bounce-slow"
                                                >
                                                    <Rocket className="text-[#B07552]/50" size={20} />
                                                </div>
                                                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Ready to launch</p>
                                                <p className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-dark-text-muted/70' : 'text-[#A89A8E]'}`}>Click a challenge to begin</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Loading State */}
                                    {processingId && processedIds.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`h-[220px] flex items-center justify-center rounded-xl border-2 ${theme === 'dark' ? 'border-dark-accent/50 bg-dark-accent/10' : 'border-[#B07552]/30 bg-gradient-to-br from-[#B07552]/5 to-transparent'}`}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className="w-12 h-12 bg-[#B07552]/10 rounded-full mx-auto mb-3 flex items-center justify-center animate-spin"
                                                >
                                                    <Activity className="text-[#B07552]" size={20} />
                                                </div>
                                                <p className="text-xs text-[#B07552] font-medium">Generating solution...</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-10 flex flex-wrap justify-center gap-6 md:gap-12"
                    >
                        {[
                            { icon: Zap, label: 'Processing', value: '<50ms' },
                            { icon: Star, label: 'Accuracy', value: '99.7%' },
                            { icon: Rocket, label: 'Uptime', value: '99.99%' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center flex items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-[#B07552]/10'}`}>
                                    <stat.icon size={18} className="text-[#B07552]" />
                                </div>
                                <div className="text-left">
                                    <p className={`text-lg md:text-xl font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{stat.value}</p>
                                    <p className={`text-[10px] uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FrostrekAdvantage;
