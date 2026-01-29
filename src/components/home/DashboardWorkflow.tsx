"use client";

import { motion } from "framer-motion";
import {
    User,
    Bot,
    Settings,
    Database,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Zap
} from "lucide-react";

const STEPS = [
    {
        id: "user",
        label: "User Input",
        icon: User,
        color: "#ffffff",
        subLabel: "Request"
    },
    {
        id: "dashing-line-1",
        type: "arrow"
    },
    {
        id: "agent",
        label: "AI Agent",
        icon: Bot,
        color: "#14b8a6", // Brand green
        subLabel: "Processing"
    },
    {
        id: "dashing-line-2",
        type: "arrow"
    },
    {
        id: "automation",
        label: "Automation",
        icon: Settings,
        color: "#0ea5e9", // Blue
        subLabel: "Workflow"
    },
    {
        id: "dashing-line-3",
        type: "arrow"
    },
    {
        id: "systems",
        label: "Systems",
        icon: Database,
        color: "#8b5cf6", // Purple
        subLabel: "Integration"
    },
    {
        id: "dashing-line-4",
        type: "arrow"
    },
    {
        id: "results",
        label: "Insights",
        icon: BarChart3,
        color: "#f59e0b", // Amber
        subLabel: "Results"
    }
];

const DashboardWorkflow = () => {
    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">

            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Header simulating window/dashboard */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
                    Frostrek Operations OS
                </div>
                <div className="flex gap-2 text-xs text-white/40">
                    <Zap size={14} className="text-brand-green-400" />
                    <span>Live</span>
                </div>
            </div>

            {/* Linear Workflow */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative z-10">
                {STEPS.map((step, index) => {
                    if (step.type === "arrow") {
                        return (
                            <div key={step.id} className="hidden md:flex items-center justify-center w-8 text-white/20">
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                        x: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.2
                                    }}
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </div>
                        );
                    }

                    const Icon = step.icon!;

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex flex-col items-center gap-3 relative group/node"
                        >
                            {/* Card Node */}
                            <div className="relative">
                                {/* Glow effect behind */}
                                <div
                                    className="absolute inset-0 blur-xl opacity-20 group-hover/node:opacity-50 transition-opacity duration-500"
                                    style={{ backgroundColor: step.color }}
                                />

                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-900/90 border border-white/10 flex items-center justify-center shadow-xl backdrop-blur-sm relative z-10 group-hover/node:-translate-y-1 transition-transform duration-300">
                                    <Icon
                                        size={32}
                                        style={{ color: step.color }}
                                        className="drop-shadow-lg"
                                    />

                                    {/* Status dot */}
                                    <div className="absolute top-[-4px] right-[-4px]">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                        >
                                            <CheckCircle2 size={16} className="text-brand-green-500 bg-gray-900 rounded-full" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="text-center">
                                <div className="text-sm font-bold text-white tracking-wide">{step.label}</div>
                                <div className="text-xs text-white/50">{step.subLabel}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Metrics/Data Strip to add "Dashboard" realism */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                {[
                    { label: "Efficiency", value: "+450%", color: "text-brand-green-400" },
                    { label: "Processing Time", value: "-85%", color: "text-blue-400" },
                    { label: "Accuracy", value: "99.9%", color: "text-purple-400" }
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{stat.label}</div>
                        <div className={`text-lg font-mono font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardWorkflow;
