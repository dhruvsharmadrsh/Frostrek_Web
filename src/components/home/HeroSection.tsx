"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid,
    Users,
    Settings,
    MessageSquare,
    BarChart3,
    Search,
    Bell
} from "lucide-react";

import InteractiveHoverText from "../ui/InteractiveHoverText";
import WorkflowDiagram from "./WorkflowDiagram";
import { AnalyticsView, MessagesView, TeamView, SettingsView } from "./DashboardViews";

const ROTATING_TEXTS = [
    { part1: "Employee Experiences", part2: "AI Copilots" },
    { part1: "Support Workflows", part2: "AI Agents" },
    { part1: "Operations", part2: "Automation" },
];

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("operations");


    // Text Rotation Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center overflow-hidden pt-32 pb-16 bg-[#106e66]"
        >
            {/* Background Texture (Ultra-Premium Mesh & Dots) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {/* 1. Base Gradient (Vignette) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

                {/* 2. Dot Matrix Pattern with Fade Mask */}
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)"
                    }}
                />

                {/* 3. Aurora Mesh Gradients (The "Better" Texture) */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]" />
                <div className="absolute bottom-[0%] right-[-5%] w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[130px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-white/10 blur-[80px] mix-blend-overlay" />

                {/* 4. Noise Grain (Texture Depth) */}
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">

                <div className="text-center mb-20 max-w-5xl mx-auto flex flex-col items-center z-20 font-sans">
                    {/* Transforming */}
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white tracking-tighter mb-4">
                        <InteractiveHoverText
                            text="Transforming"
                            className="justify-center"
                            textClassName="hover:text-emerald-300 transition-colors cursor-default"
                        />
                    </div>

                    {/* Rotating Text */}
                    <div className="h-[1.2em] sm:h-[1.3em] overflow-visible flex items-center justify-center min-h-[50px] sm:min-h-[70px] w-full mb-4">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={index}
                                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="text-emerald-300 block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold"
                            >
                                {ROTATING_TEXTS[index].part1}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Subheading */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-200 font-medium">
                        <span>with Conversational</span>
                        <div className="relative inline-flex h-[1.2em] overflow-hidden items-center min-w-[200px] justify-center md:justify-start">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={index}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="font-bold"
                                >
                                    {index === 0 && <span className="text-emerald-300">AI Copilots</span>}
                                    {index === 1 && <span className="text-cyan-300">AI Agents</span>}
                                    {index === 2 && <span className="text-purple-300">Automation</span>}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>


                {/* --- FULL SCREEN DASHBOARD (100%) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="w-full max-w-[1100px] relative z-20"
                >
                    {/* Enhanced Mac/Dashboard Window - Terminal Grey Theme */}
                    <div className="bg-[#2d2d30] rounded-xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[550px] md:h-[550px] relative group/window ring-1 ring-white/5">

                        {/* 1. Header with Search */}
                        <div className="h-14 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center px-4 md:px-5 justify-between shrink-0 relative z-20">
                            {/* Controls & Brand */}
                            <div className="flex items-center gap-3 md:gap-6">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-sm" />
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-sm" />
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-sm" />
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-300">
                                    <LayoutGrid size={14} className="text-brand-green-500" />
                                    <span>Operations</span>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="flex-1 max-w-md mx-3 md:mx-6">
                                <div className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg px-2 py-1.5 md:px-3 transition-all focus-within:bg-black/40 focus-within:shadow-sm focus-within:ring-2 focus-within:ring-brand-green-500/20">
                                    <Search size={14} className="text-slate-500 group-hover:text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent border-none outline-none text-xs w-full text-slate-300 placeholder:text-slate-600"
                                    />
                                    <div className="flex gap-1">
                                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 transition-colors cursor-pointer text-slate-500 hover:text-slate-300">
                                    <Bell size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row">
                            {/* 2. Sidebar (Bottom Bar on Mobile) */}
                            <div className="w-full h-14 md:w-20 md:h-full bg-black/20 backdrop-blur-sm border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-around md:justify-start md:py-6 gap-0 md:gap-6 z-20 order-last md:order-first shrink-0">
                                {/* Nav Items */}
                                {[
                                    { id: "operations", icon: LayoutGrid },
                                    { id: "messages", icon: MessageSquare },
                                    { id: "team", icon: Users },
                                    { id: "analytics", icon: BarChart3 },
                                    { id: "settings", icon: Settings },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveTab(item.id)}
                                        className="relative group cursor-pointer p-2 md:p-0"
                                    >
                                        {activeTab === item.id && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 bg-white/10 rounded-xl shadow-sm border border-white/5"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl relative z-10 transition-colors ${activeTab === item.id ? "text-brand-green-500" : "text-slate-500 group-hover:text-slate-300"}`}>
                                            <item.icon size={18} className="md:w-5 md:h-5" />
                                        </div>
                                    </div>
                                ))}

                                {/* User Profile - Hidden on mobile to save space */}
                                <div className="mt-auto hidden md:block">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green-500 to-emerald-700 p-0.5 shadow-md cursor-pointer hover:scale-105 transition-transform">
                                        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Main Stage - Textured (Dark Terminal) */}
                            <div className="flex-1 relative bg-[#18181b] flex flex-col min-h-0">
                                {/* Mesh Gradient Overlay - Subtle on Dark */}
                                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

                                {/* Detailed Dot Pattern - Light Dots on Dark (Operations Only) */}
                                {activeTab === "operations" && (
                                    <div className="absolute inset-0 opacity-[0.3]"
                                        style={{
                                            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                                            backgroundSize: "24px 24px"
                                        }}
                                    />
                                )}

                                {/* Content - Conditional Rendering */}
                                <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full h-full flex flex-col"
                                        >
                                            {activeTab === "operations" && (
                                                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                                    <div className="w-full h-full scale-[0.6] sm:scale-[0.8] md:scale-95 transition-transform duration-500 origin-center flex items-center justify-center">
                                                        <WorkflowDiagram />
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === "analytics" && <AnalyticsView />}
                                            {activeTab === "messages" && <MessagesView />}
                                            {activeTab === "team" && <TeamView />}
                                            {activeTab === "settings" && <SettingsView />}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* 4. Status Bar (Footer) - Hidden on mobile */}
                                <div className="absolute bottom-0 left-0 w-full h-8 bg-black/20 backdrop-blur-md border-t border-white/5 hidden md:flex items-center justify-between px-6 text-[10px] font-mono text-slate-500 uppercase tracking-wider z-20">
                                    <div className="flex items-center gap-6">
                                        <span className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                                            System Operational
                                        </span>
                                        <span className="hidden sm:inline">v2.4.0-stable</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span>Latency: 12ms</span>
                                        <span className="hidden sm:inline">Region: US-East-1</span>
                                        <span className="text-emerald-500/80">Connected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
