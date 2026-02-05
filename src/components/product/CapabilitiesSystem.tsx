
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Server, Brain, Activity, Lock, Zap, Database } from 'lucide-react';
import type { ProductFeature } from '../../utils/productData';
import { useTheme } from '../../context/ThemeContext';

const FeatureNode = ({
    feature,
    isActive,
    index,
    onHover,
    theme
}: {
    feature: ProductFeature,
    isActive: boolean,
    index: number,
    onHover: (idx: number) => void,
    theme: string
}) => {
    return (
        <motion.div
            onHoverStart={() => onHover(index)}
            onClick={() => onHover(index)}
            className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group w-full ${isActive
                ? theme === 'dark' ? 'bg-dark-card border-dark-accent shadow-lg shadow-dark-accent/20 z-10' : 'bg-white border-brand-green-200 shadow-lg shadow-brand-green-100 z-10'
                : theme === 'dark' ? 'bg-dark-bg/50 border-dark-accent/30 hover:bg-dark-card hover:border-dark-accent/50' : 'bg-white/50 border-gray-100 hover:bg-white hover:border-brand-green-100'
                }`}
            whileHover={{ x: 5 }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive
                    ? 'bg-brand-green-600 text-white'
                    : theme === 'dark' ? 'bg-dark-accent/30 text-dark-accent' : 'bg-brand-green-50 text-brand-green-600'
                    }`}>
                    {feature.icon && <feature.icon className="w-5 h-5" />}
                </div>
                <div>
                    <h4 className={`text-base font-bold transition-colors ${isActive
                        ? theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                        : theme === 'dark' ? 'text-dark-text/80' : 'text-gray-600'
                        }`}>
                        {feature.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const CoreEngine = ({ activeIndex, theme, isAllActive, onToggleAll }: { activeIndex: number, theme: string, isAllActive: boolean, onToggleAll: () => void }) => {
    // Satellite positions
    const satellites = [
        { x: -120, y: -80, icon: Database, bg: 'bg-blue-100', text: 'text-blue-600' },
        { x: 120, y: -80, icon: Shield, bg: 'bg-emerald-100', text: 'text-emerald-600' },
        { x: -120, y: 80, icon: Server, bg: 'bg-purple-100', text: 'text-purple-600' },
        { x: 120, y: 80, icon: Zap, bg: 'bg-amber-100', text: 'text-amber-600' },
        { x: 0, y: -130, icon: Activity, bg: 'bg-rose-100', text: 'text-rose-600' },
        { x: 0, y: 130, icon: Lock, bg: 'bg-cyan-100', text: 'text-cyan-600' }
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.3]"
                style={{
                    backgroundImage: theme === 'dark' ? 'radial-gradient(#bf8440 1px, transparent 1px)' : 'radial-gradient(#B07552 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Connecting Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {satellites.map((sat, i) => (
                    <motion.line
                        key={i}
                        x1="50%" y1="50%"
                        x2={`calc(50% + ${sat.x}px)`} y2={`calc(50% + ${sat.y}px)`}
                        stroke={(isAllActive || activeIndex % satellites.length === i) ? "#B07552" : "#E5E7EB"}
                        strokeWidth={(isAllActive || activeIndex % satellites.length === i) ? 3 : 1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                ))}
            </svg>

            {/* Central Core - Using CSS animation for pulse glow instead of Framer Motion infinite */}
            <motion.div
                onClick={onToggleAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-20 w-32 h-32 rounded-full border-4 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 ${isAllActive ? 'ring-4 ring-brand-green-400/50 scale-105' : ''} ${theme === 'dark' ? 'bg-dark-card border-dark-accent/50' : 'bg-white border-brand-green-100'}`}
            >
                <div className={`absolute inset-2 bg-gradient-to-br from-brand-green-500 to-brand-green-700 rounded-full flex items-center justify-center text-white text-center p-2 shadow-inner transition-all duration-300 ${isAllActive ? 'animate-pulse' : ''}`}>
                    <Brain className={`w-12 h-12 text-white/90 transition-all duration-300 ${isAllActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`} />
                </div>

                {/* Orbiting Rings - Using CSS animation instead of Framer Motion infinite */}
                <div
                    className={`absolute -inset-4 border border-brand-green-200 rounded-full border-dashed ${isAllActive ? 'animate-spin-fast border-brand-green-400' : 'animate-spin-slow'}`}
                />
                <div
                    className="absolute -inset-8 border border-brand-green-100/50 rounded-full animate-spin-slow-reverse"
                />
            </motion.div>

            {/* Satellites */}
            {satellites.map((sat, i) => (
                <motion.div
                    key={i}
                    className={`absolute z-20 w-12 h-12 rounded-xl ${sat.bg} flex items-center justify-center shadow-sm border ${theme === 'dark' ? 'border-dark-accent/30' : 'border-white'}`}
                    style={{ x: sat.x, y: sat.y }}
                    animate={{
                        scale: (isAllActive || activeIndex % satellites.length === i) ? 1.2 : 1,
                        filter: (isAllActive || activeIndex % satellites.length === i) ? 'grayscale(0%)' : 'grayscale(100%) opacity(0.5)'
                    }}
                >
                    <sat.icon className={`w-6 h-6 ${sat.text}`} />
                </motion.div>
            ))}

            {/* Status Pill */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 backdrop-blur px-4 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-2 shadow-sm ${theme === 'dark' ? 'bg-dark-card/80 border-dark-accent/30 text-dark-text-muted' : 'bg-white/80 border-gray-200 text-gray-500'}`}>
                <span className={`w-2 h-2 rounded-full ${isAllActive ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                {isAllActive ? 'FULL SYSTEM ACTIVE' : 'SYSTEM OPERATIONAL'}
            </div>
        </div>
    );
};

export const CapabilitiesSystem = ({ features }: { features: ProductFeature[] }) => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAllActive, setIsAllActive] = useState(false);

    const handleToggleAll = () => {
        setIsAllActive(prev => !prev);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Left Column - Controls */}
            <div className="w-full lg:w-5/12 space-y-2">
                {features.map((feature, idx) => (
                    <FeatureNode
                        key={idx}
                        index={idx}
                        feature={feature}
                        isActive={isAllActive || activeIndex === idx}
                        onHover={(idx) => {
                            if (!isAllActive) setActiveIndex(idx);
                        }}
                        theme={theme}
                    />
                ))}
            </div>

            {/* Right Column - Visualizer */}
            <div className="w-full lg:w-7/12 relative">
                {/* Visualizer Container */}
                <div className={`relative rounded-[3rem] border shadow-2xl backdrop-blur-xl overflow-hidden ${theme === 'dark' ? 'bg-dark-card/50 border-dark-accent/30' : 'bg-white/50 border-white'}`}>
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-dark-accent/10 to-transparent' : 'bg-gradient-to-br from-brand-green-50/50 to-transparent'}`} />
                    <CoreEngine activeIndex={activeIndex} theme={theme} isAllActive={isAllActive} onToggleAll={handleToggleAll} />
                </div>

                {/* Decorative Elements */}
                <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full transition-colors duration-500 ${isAllActive ? 'bg-amber-500/10' : 'bg-brand-green-500/5'}`} />
            </div>
        </div>
    );
};
