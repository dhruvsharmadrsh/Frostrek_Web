
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Server, Brain, Activity, Lock, Zap, Database } from 'lucide-react';
import type { ProductFeature } from '../../utils/productData';

const FeatureNode = ({
    feature,
    isActive,
    index,
    onHover
}: {
    feature: ProductFeature,
    isActive: boolean,
    index: number,
    onHover: (idx: number) => void
}) => {
    return (
        <motion.div
            onHoverStart={() => onHover(index)}
            className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group w-full ${isActive
                ? 'bg-white border-brand-green-200 shadow-xl shadow-brand-green-100 z-10'
                : 'bg-white/50 border-gray-100 hover:bg-white hover:border-brand-green-100'
                }`}
            whileHover={{ x: 10 }}
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-brand-green-600 text-white' : 'bg-brand-green-50 text-brand-green-600'
                    }`}>
                    {feature.icon && <feature.icon className="w-6 h-6" />}
                </div>
                <div>
                    <h4 className={`text-lg font-bold mb-1 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                        {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Active Indicator Beam Start */}
            {isActive && (
                <div className="absolute top-1/2 -right-3 w-3 h-3 bg-brand-green-500 rounded-full">
                    <div className="absolute inset-0 bg-brand-green-500 rounded-full animate-ping" />
                </div>
            )}
        </motion.div>
    );
};

const CoreEngine = ({ activeIndex }: { activeIndex: number }) => {
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
                    backgroundImage: 'radial-gradient(#B07552 1px, transparent 1px)',
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
                        stroke={activeIndex % satellites.length === i ? "#B07552" : "#E5E7EB"}
                        strokeWidth={activeIndex % satellites.length === i ? 3 : 1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                ))}
            </svg>

            {/* Central Core */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 20px rgba(176, 117, 82, 0.2)",
                        "0 0 40px rgba(176, 117, 82, 0.4)",
                        "0 0 20px rgba(176, 117, 82, 0.2)"
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-20 w-32 h-32 bg-white rounded-full border-4 border-brand-green-100 flex items-center justify-center shadow-2xl"
            >
                <div className="absolute inset-2 bg-gradient-to-br from-brand-green-500 to-brand-green-700 rounded-full flex items-center justify-center text-white text-center p-2 shadow-inner">
                    <Brain className="w-12 h-12 text-white/90" />
                </div>

                {/* Orbiting Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border border-brand-green-200 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border border-brand-green-100/50 rounded-full"
                />
            </motion.div>

            {/* Satellites */}
            {satellites.map((sat, i) => (
                <motion.div
                    key={i}
                    className={`absolute z-20 w-12 h-12 rounded-xl ${sat.bg} flex items-center justify-center shadow-sm border border-white`}
                    style={{ x: sat.x, y: sat.y }}
                    animate={{
                        scale: activeIndex % satellites.length === i ? 1.2 : 1,
                        filter: activeIndex % satellites.length === i ? 'grayscale(0%)' : 'grayscale(100%) opacity(0.5)'
                    }}
                >
                    <sat.icon className={`w-6 h-6 ${sat.text}`} />
                </motion.div>
            ))}

            {/* Status Pill */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                SYSTEM OPERATIONAL
            </div>
        </div>
    );
};

export const CapabilitiesSystem = ({ features }: { features: ProductFeature[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Left Column - Controls */}
            <div className="w-full lg:w-5/12 space-y-4">
                {features.map((feature, idx) => (
                    <FeatureNode
                        key={idx}
                        index={idx}
                        feature={feature}
                        isActive={activeIndex === idx}
                        onHover={setActiveIndex}
                    />
                ))}
            </div>

            {/* Right Column - Visualizer */}
            <div className="w-full lg:w-7/12 relative">
                {/* Visualizer Container */}
                <div className="relative bg-white/50 rounded-[3rem] border border-white shadow-2xl backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green-50/50 to-transparent" />
                    <CoreEngine activeIndex={activeIndex} />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-green-500/5 blur-3xl rounded-full" />
            </div>
        </div>
    );
};
