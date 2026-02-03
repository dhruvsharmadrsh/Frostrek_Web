"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Brain,
    Code,
    Bot,
    Smartphone,
    Workflow,
    Sparkles,
    ArrowRight,
    X,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface ServiceNode {
    id: string;
    number: string;
    label: string;
    shortLabel: string;
    icon: LucideIcon;
    x: number;
    y: number;
    color: string;
    gradient: string;
    description: string;
    features: string[];
    stat: string;
    statLabel: string;
}

const SERVICE_NODES: ServiceNode[] = [
    {
        id: "talent",
        number: "01",
        label: "AI Talent Sourcing",
        shortLabel: "Talent",
        icon: Users,
        x: -38,
        y: -30,
        color: "#B07552",
        gradient: "from-[#B07552] to-[#8B5A3C]",
        description: "Source and deploy skilled AI professionals aligned with your project's specific requirements and delivery timelines.",
        features: ["RLHF Specialists", "ML Engineers", "Data Scientists"],
        stat: "200+",
        statLabel: "Experts"
    },
    {
        id: "training",
        number: "02",
        label: "Model Training",
        shortLabel: "Training",
        icon: Brain,
        x: 0,
        y: -38,
        color: "#9A6B47",
        gradient: "from-[#9A6B47] to-[#7A5A3C]",
        description: "Enhance AI model performance through expert training, optimization, and real-world evaluation.",
        features: ["5000+ Sessions", "Fine-tuning", "RLHF Training"],
        stat: "5000+",
        statLabel: "Sessions"
    },
    {
        id: "development",
        number: "03",
        label: "Custom AI Solutions",
        shortLabel: "Solutions",
        icon: Code,
        x: 38,
        y: -30,
        color: "#A67C52",
        gradient: "from-[#A67C52] to-[#8B6B4F]",
        description: "Design and build tailored AI systems that address complex business challenges.",
        features: ["Architecture", "Scalable Systems", "Integration"],
        stat: "50+",
        statLabel: "Projects"
    },
    {
        id: "agents",
        number: "04",
        label: "Agentic AI Systems",
        shortLabel: "Agents",
        icon: Bot,
        x: -38,
        y: 30,
        color: "#8B6B4F",
        gradient: "from-[#8B6B4F] to-[#6B4F38]",
        description: "Develop intelligent AI agents capable of reasoning and autonomous task execution.",
        features: ["Multi-Agent", "Reasoning", "Autonomous"],
        stat: "24/7",
        statLabel: "Active"
    },
    {
        id: "apps",
        number: "05",
        label: "AI Applications",
        shortLabel: "Apps",
        icon: Smartphone,
        x: 0,
        y: 38,
        color: "#7A5A3C",
        gradient: "from-[#7A5A3C] to-[#5A4030]",
        description: "Build production-ready web and mobile applications with embedded AI capabilities.",
        features: ["Web & Mobile", "Dashboards", "APIs"],
        stat: "100%",
        statLabel: "Scalable"
    },
    {
        id: "automation",
        number: "06",
        label: "Workflow Automation",
        shortLabel: "Automation",
        icon: Workflow,
        x: 38,
        y: 30,
        color: "#6B4F38",
        gradient: "from-[#6B4F38] to-[#4A3628]",
        description: "Integrate AI into processes to automate workflows and improve efficiency.",
        features: ["Process AI", "Integration", "Orchestration"],
        stat: "80%",
        statLabel: "Efficiency"
    },
];

const InteractiveServicesWorkflow = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const dragStartRef = useRef<{ x: number; y: number; nodeX: number; nodeY: number } | null>(null);

    const getTargetPositions = useCallback(() => {
        const formation: Record<string, { x: number; y: number }> = {};
        SERVICE_NODES.forEach((node) => {
            formation[node.id] = { x: node.x, y: node.y };
        });
        return formation;
    }, []);

    useEffect(() => {
        const scattered: Record<string, { x: number; y: number }> = {};
        SERVICE_NODES.forEach((node) => {
            scattered[node.id] = {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 70,
            };
        });
        setNodePositions(scattered);

        const timer = setTimeout(() => {
            setNodePositions(getTargetPositions());
            setIsAnimated(true);
        }, 600);

        return () => clearTimeout(timer);
    }, [getTargetPositions]);

    const getNodePos = useCallback((nodeId: string) => {
        return nodePositions[nodeId] || { x: 0, y: 0 };
    }, [nodePositions]);

    const handlePointerDown = useCallback((e: React.PointerEvent, nodeId: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);

        const pos = getNodePos(nodeId);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            nodeX: pos.x,
            nodeY: pos.y,
        };
        setDraggedNode(nodeId);
    }, [getNodePos]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!draggedNode || !containerRef.current) return;

        const dragStart = dragStartRef.current;
        if (!dragStart) return;

        const rect = containerRef.current.getBoundingClientRect();
        const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
        const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

        setNodePositions((prev) => ({
            ...prev,
            [draggedNode]: {
                x: Math.max(-45, Math.min(45, dragStart.nodeX + deltaX)),
                y: Math.max(-42, Math.min(42, dragStart.nodeY + deltaY)),
            },
        }));
    }, [draggedNode]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDraggedNode(null);
        dragStartRef.current = null;
    }, []);

    const resetPositions = () => {
        setNodePositions(getTargetPositions());
        setSelectedNode(null);
    };

    const getConnectionPath = useCallback((nodeId: string) => {
        const pos = getNodePos(nodeId);
        const centerX = 50;
        const centerY = 50;
        const nodeX = 50 + pos.x * 0.5;
        const nodeY = 50 + pos.y * 0.5;

        const midX = (centerX + nodeX) / 2;
        const midY = (centerY + nodeY) / 2;
        const controlX = midX + (nodeY - centerY) * 0.12;
        const controlY = midY - (nodeX - centerX) * 0.12;

        return `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${nodeX} ${nodeY}`;
    }, [getNodePos]);

    const selectedService = SERVICE_NODES.find(n => n.id === selectedNode);

    return (
        <section className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-b from-[#FDFBF7] via-[#FDF8F3] to-[#FDFBF7]'}`}>
            {/* Premium Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 ${isDark ? 'bg-dark-accent/10' : 'bg-[#E6D0C6]/50'}`} />
                <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-dark-accent/10' : 'bg-[#B07552]/20'}`} />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(${isDark ? '#fff' : '#3D2E24'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#3D2E24'} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 mb-5"
                    >
                        <div className={`w-8 h-px ${isDark ? 'bg-dark-accent/50' : 'bg-[#B07552]/40'}`} />
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${isDark ? 'border-dark-accent/30 bg-dark-card' : 'border-[#E6D0C6] bg-white/80'}`}>
                            <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-dark-accent' : 'text-[#B07552]'}`}>
                                Interactive
                            </p>
                        </div>
                        <div className={`w-8 h-px ${isDark ? 'bg-dark-accent/50' : 'bg-[#B07552]/40'}`} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-4 ${isDark ? 'text-dark-text' : 'text-[#3D2E24]'}`}
                    >
                        Our <span className="italic">Services</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-sm max-w-md mx-auto ${isDark ? 'text-dark-text-muted' : 'text-[#8A7060]'}`}
                    >
                        Drag nodes to explore • Click for details
                    </motion.p>
                </div>

                {/* Workflow Diagram Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    ref={containerRef}
                    className={`relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden
                        ${isDark ? 'bg-dark-card' : 'bg-white'}
                        shadow-2xl shadow-[#3D2E24]/10`}
                    style={{
                        border: `2px solid ${isDark ? 'rgba(245, 217, 200, 0.15)' : 'rgba(176, 117, 82, 0.15)'}`,
                    }}
                    onPointerMove={handlePointerMove}
                    onDoubleClick={resetPositions}
                >
                    {/* Inner Glow */}
                    <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-accent/5 via-transparent to-dark-accent/5' : 'bg-gradient-to-br from-[#B07552]/5 via-transparent to-[#E6D0C6]/10'}`} />

                    {/* Dot Pattern */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(245,217,200,0.15)' : 'rgba(176,117,82,0.12)'} 1px, transparent 0)`,
                            backgroundSize: '28px 28px'
                        }}
                    />

                    {/* SVG Connection Lines */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="premium-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={isDark ? "#F5D9C8" : "#B07552"} stopOpacity="0.5" />
                                <stop offset="100%" stopColor={isDark ? "#F5D9C8" : "#8B6B4F"} stopOpacity="0.15" />
                            </linearGradient>
                            <filter id="premium-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="0.8" result="blur" />
                                <feFlood floodColor="#B07552" floodOpacity="0.4" />
                                <feComposite in2="blur" operator="in" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Outer ring pulses */}
                        <circle cx="50" cy="50" r="2" fill="none" stroke={isDark ? "#F5D9C8" : "#B07552"} strokeWidth="0.15" opacity="0.3">
                            <animate attributeName="r" values="2;22;2" dur="4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0;0.4" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="50" cy="50" r="2" fill="none" stroke={isDark ? "#F5D9C8" : "#B07552"} strokeWidth="0.1" opacity="0.2">
                            <animate attributeName="r" values="2;28;2" dur="5s" repeatCount="indefinite" begin="1s" />
                            <animate attributeName="opacity" values="0.3;0;0.3" dur="5s" repeatCount="indefinite" begin="1s" />
                        </circle>

                        {/* Connection lines */}
                        {SERVICE_NODES.map((node) => {
                            const isActive = hoveredNode === node.id || draggedNode === node.id || selectedNode === node.id;

                            return (
                                <g key={`line-${node.id}`}>
                                    <path
                                        d={getConnectionPath(node.id)}
                                        fill="none"
                                        stroke={isActive ? node.color : "url(#premium-line-gradient)"}
                                        strokeWidth={isActive ? 0.5 : 0.25}
                                        strokeLinecap="round"
                                        className="transition-all duration-700"
                                        style={{
                                            opacity: isActive ? 1 : 0.5,
                                            filter: isActive ? "url(#premium-glow)" : "none",
                                        }}
                                    />
                                    {isActive && (
                                        <circle r="0.6" fill={node.color}>
                                            <animateMotion dur="1.2s" repeatCount="indefinite" path={getConnectionPath(node.id)} />
                                        </circle>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Center Hub */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 15 }}
                    >
                        <div className={`relative rounded-2xl px-7 py-5 text-center
                            ${isDark ? 'bg-gradient-to-br from-dark-card to-dark-bg' : 'bg-gradient-to-br from-white to-[#FDF8F3]'}
                            shadow-xl`}
                            style={{
                                border: `2px solid ${isDark ? 'rgba(245, 217, 200, 0.25)' : 'rgba(176, 117, 82, 0.25)'}`,
                                boxShadow: `0 20px 60px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(176, 117, 82, 0.2)'}`
                            }}
                        >
                            {/* Decorative corner accents */}
                            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg ${isDark ? 'border-dark-accent/40' : 'border-[#B07552]/30'}`} />
                            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-lg ${isDark ? 'border-dark-accent/40' : 'border-[#B07552]/30'}`} />
                            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg ${isDark ? 'border-dark-accent/40' : 'border-[#B07552]/30'}`} />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg ${isDark ? 'border-dark-accent/40' : 'border-[#B07552]/30'}`} />

                            <div className={`text-xl font-bold tracking-tight ${isDark ? 'text-dark-text' : 'text-[#3D2E24]'}`}>Frostrek</div>
                            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 ${isDark ? 'text-dark-accent' : 'text-[#B07552]'}`}>AI Engine</div>
                        </div>
                    </motion.div>

                    {/* Service Nodes */}
                    {SERVICE_NODES.map((node, index) => {
                        const pos = getNodePos(node.id);
                        const Icon = node.icon;
                        const isDragging = draggedNode === node.id;
                        const isHovered = hoveredNode === node.id;
                        const isSelected = selectedNode === node.id;
                        const isActive = isDragging || isHovered || isSelected;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute z-10 cursor-grab active:cursor-grabbing select-none touch-none"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: isActive ? 1.08 : 1,
                                    left: `calc(50% + ${pos.x}%)`,
                                    top: `calc(50% + ${pos.y}%)`,
                                }}
                                transition={{
                                    delay: isAnimated ? 0 : 0.7 + index * 0.08,
                                    duration: isDragging ? 0 : 0.6,
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 20
                                }}
                                style={{
                                    x: "-50%",
                                    y: "-50%",
                                    zIndex: isDragging ? 30 : isHovered ? 25 : 10,
                                }}
                                onPointerDown={(e) => handlePointerDown(e, node.id)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                            >
                                <div
                                    className={`rounded-xl px-4 py-2.5 flex items-center gap-3 whitespace-nowrap
                                        transition-all duration-400
                                        ${isDark
                                            ? 'bg-dark-card'
                                            : 'bg-white'
                                        }`}
                                    style={{
                                        border: `2px solid ${isActive ? node.color : isDark ? 'rgba(245, 217, 200, 0.15)' : 'rgba(176, 117, 82, 0.12)'}`,
                                        boxShadow: isActive
                                            ? `0 12px 35px ${node.color}30, 0 4px 12px ${node.color}20`
                                            : `0 4px 16px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(61, 46, 36, 0.08)'}`,
                                    }}
                                >
                                    {/* Number */}
                                    <span
                                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors duration-300"
                                        style={{
                                            backgroundColor: isActive ? node.color : `${node.color}15`,
                                            color: isActive ? '#fff' : node.color
                                        }}
                                    >
                                        {node.number}
                                    </span>

                                    {/* Icon */}
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${node.gradient}`}
                                        style={{
                                            opacity: isActive ? 1 : 0.85,
                                        }}
                                    >
                                        <Icon size={16} className="text-white" />
                                    </div>

                                    {/* Label */}
                                    <span className={`text-sm font-semibold tracking-tight ${isDark ? 'text-dark-text' : 'text-[#3D2E24]'}`}>
                                        {node.shortLabel}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Selected Service Detail Panel */}
                <AnimatePresence>
                    {selectedService && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className={`max-w-xl mx-auto mt-10 rounded-2xl overflow-hidden
                                ${isDark ? 'bg-dark-card' : 'bg-white'}
                                shadow-2xl`}
                            style={{
                                border: `2px solid ${selectedService.color}30`,
                            }}
                        >
                            {/* Gradient Header */}
                            <div
                                className={`px-6 py-5 bg-gradient-to-r ${selectedService.gradient}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <selectedService.icon size={22} className="text-white" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-white/70 tracking-wider uppercase">
                                                Service {selectedService.number}
                                            </span>
                                            <h3 className="text-lg font-bold text-white">
                                                {selectedService.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedNode(null)}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className={`mb-5 leading-relaxed text-sm ${isDark ? 'text-dark-text-muted' : 'text-[#6B5246]'}`}>
                                    {selectedService.description}
                                </p>

                                {/* Stats & Features Row */}
                                <div className="flex items-center gap-6 mb-5">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold" style={{ color: selectedService.color }}>{selectedService.stat}</p>
                                        <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-dark-text-muted' : 'text-[#8A7060]'}`}>{selectedService.statLabel}</p>
                                    </div>
                                    <div className={`w-px h-10 ${isDark ? 'bg-dark-accent/20' : 'bg-[#E6D0C6]'}`} />
                                    <div className="flex flex-wrap gap-2">
                                        {selectedService.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className={`text-[11px] font-medium px-3 py-1.5 rounded-full
                                                    ${isDark ? 'bg-dark-bg text-dark-text-muted' : 'bg-[#FDF8F3] text-[#8A7060]'}`}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-lg bg-gradient-to-r ${selectedService.gradient} text-white shadow-lg`}
                                    style={{ boxShadow: `0 8px 20px ${selectedService.color}30` }}
                                >
                                    Explore {selectedService.shortLabel}
                                    <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default InteractiveServicesWorkflow;
