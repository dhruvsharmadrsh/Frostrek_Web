"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
    Lightbulb,
    Code2,
    TestTube2,
    Rocket,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";

interface ProcessNode {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    x: number;
    y: number;
    color: string;
}

const PROCESS_NODES: ProcessNode[] = [
    {
        id: "research",
        label: "Research",
        description: "Deep analysis",
        icon: Lightbulb,
        x: -30,
        y: -30,
        color: "#8B5CF6"
    },
    {
        id: "develop",
        label: "Development",
        description: "Build robust AI",
        icon: Code2,
        x: 30,
        y: -30,
        color: "#0EA5E9"
    },
    {
        id: "test",
        label: "Testing",
        description: "Review quality",
        icon: TestTube2,
        x: 30,
        y: 25,
        color: "#10B981"
    },
    {
        id: "deploy",
        label: "Deployment",
        description: "Integration",
        icon: Rocket,
        x: -30,
        y: 25,
        color: "#F59E0B"
    },
];

const InnovationProcess = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [floatingNodes, setFloatingNodes] = useState<Set<string>>(new Set());
    const [isAnimated, setIsAnimated] = useState(false);
    const dragStartRef = useRef<{ x: number; y: number; nodeX: number; nodeY: number } | null>(null);
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Calculate target positions
    const getTargetPositions = useCallback(() => {
        const formation: Record<string, { x: number; y: number }> = {};
        PROCESS_NODES.forEach((node) => {
            formation[node.id] = { x: node.x, y: node.y };
        });
        return formation;
    }, []);

    // Initialize with scattered positions, then animate to formation
    useEffect(() => {
        const scattered: Record<string, { x: number; y: number }> = {};
        PROCESS_NODES.forEach((node) => {
            scattered[node.id] = {
                x: (Math.random() - 0.5) * 120, // Reduced scatter range to keep visible
                y: (Math.random() - 0.5) * 120,
            };
        });
        setNodePositions(scattered);

        const timer = setTimeout(() => {
            setNodePositions(getTargetPositions());
            setIsAnimated(true);
        }, 500); // Slightly longer delay for "suffer" effect

        return () => clearTimeout(timer);
    }, [getTargetPositions]);

    // Auto-reshuffle (reset) after interaction
    const scheduleReset = useCallback(() => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
            setNodePositions(getTargetPositions());
            setFloatingNodes(new Set());
        }, 3000); // 3 seconds auto-reset
    }, [getTargetPositions]);

    // Get node position
    const getNodePos = useCallback((nodeId: string) => {
        return nodePositions[nodeId] || { x: 0, y: 0 };
    }, [nodePositions]);

    // Handle pointer down (start drag)
    const handlePointerDown = useCallback((e: React.PointerEvent, nodeId: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        const pos = getNodePos(nodeId);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            nodeX: pos.x,
            nodeY: pos.y,
        };
        setDraggedNode(nodeId);
    }, [getNodePos]);

    // Handle pointer move (dragging)
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
                x: dragStart.nodeX + deltaX,
                y: dragStart.nodeY + deltaY,
            },
        }));
    }, [draggedNode]);

    // Handle pointer up (end drag)
    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);

        if (draggedNode) {
            setFloatingNodes((prev) => new Set([...prev, draggedNode]));
            scheduleReset(); // Trigger auto-reset
        }

        setDraggedNode(null);
        dragStartRef.current = null;
    }, [draggedNode, scheduleReset]);

    // Calculate SVG path from center to node
    const getConnectionPath = useCallback((nodeId: string) => {
        const pos = getNodePos(nodeId);
        const centerX = 50;
        const centerY = 50;
        const nodeX = 50 + pos.x * 0.5;
        const nodeY = 50 + pos.y * 0.5;

        const midX = (centerX + nodeX) / 2;
        const midY = (centerY + nodeY) / 2;
        // Dynamic curvature based on distance
        const dist = Math.sqrt(Math.pow(nodeX - centerX, 2) + Math.pow(nodeY - centerY, 2));
        const curvature = Math.min(0.3, dist * 0.01);

        const controlX = midX + (nodeY - centerY) * curvature;
        const controlY = midY - (nodeX - centerX) * curvature;

        return `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${nodeX} ${nodeY}`;
    }, [getNodePos]);

    const isNodeFloating = (nodeId: string) => floatingNodes.has(nodeId);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[400px] md:min-h-[550px] select-none"
            onPointerMove={handlePointerMove}
        >
            {/* SVG Connection Lines */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="innovation-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="floating-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Connection lines */}
                {PROCESS_NODES.map((node) => {
                    const isActive = hoveredNode === node.id || draggedNode === node.id;
                    const isFloating = isNodeFloating(node.id);

                    return (
                        <path
                            key={`line-${node.id}`}
                            d={getConnectionPath(node.id)}
                            fill="none"
                            stroke={isActive ? node.color : isFloating ? "url(#floating-line-gradient)" : "url(#innovation-line-gradient)"}
                            strokeWidth={isActive ? 0.6 : 0.4}
                            strokeLinecap="round"
                            strokeDasharray={isFloating && !isActive ? "3 3" : "none"}
                            className="transition-all duration-700"
                            style={{
                                opacity: isActive ? 1 : isFloating ? 0.8 : 0.6,
                                filter: isActive ? `drop-shadow(0 0 4px ${node.color})` : "none",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Center Hub - Impact - PREMIUM DESIGN */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div
                    className="relative bg-white/90 backdrop-blur-xl rounded-full shadow-[0_0_50px_rgba(20,184,166,0.25)] p-6 md:p-8 text-center border-4 border-teal-50 group hover:scale-105 transition-transform duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full animate-pulse-slow"></div>
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-teal-600 mx-auto mb-2 relative z-10" />
                    <div className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 relative z-10">Impact</div>
                    <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 relative z-10">Business Growth</div>
                </div>
            </div>

            {/* Draggable Nodes - PREMIUM GLASSMORPHISM */}
            {PROCESS_NODES.map((node, index) => {
                const pos = getNodePos(node.id);
                const Icon = node.icon;
                const isDragging = draggedNode === node.id;
                const isHovered = hoveredNode === node.id;
                const isFloating = isNodeFloating(node.id);
                const isActive = isDragging || isHovered;

                return (
                    <div
                        key={node.id}
                        className="absolute z-10 cursor-grab active:cursor-grabbing touch-none"
                        style={{
                            left: `calc(50% + ${pos.x}%)`,
                            top: `calc(50% + ${pos.y}%)`,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : isFloating ? 1.05 : 1})`,
                            transition: isDragging ? "none" : "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: !isDragging && isAnimated ? `${index * 50}ms` : "0ms",
                            zIndex: isDragging ? 30 : isHovered ? 25 : isFloating ? 15 : 10,
                        }}
                        onPointerDown={(e) => handlePointerDown(e, node.id)}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div
                            className={`
                                relative overflow-hidden backdrop-blur-md rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 min-w-[110px] md:min-w-[140px]
                                transition-all duration-300
                                ${isActive
                                    ? "bg-white shadow-2xl ring-2 ring-offset-2 ring-transparent"
                                    : isFloating
                                        ? "bg-orange-50/90 shadow-xl border border-orange-200"
                                        : "bg-white/80 shadow-xl border border-white/60 hover:bg-white hover:shadow-2xl"
                                }
                            `}
                            style={{
                                boxShadow: isActive
                                    ? `0 20px 60px -10px ${node.color}40`
                                    : isFloating
                                        ? `0 10px 30px -5px rgba(249, 115, 22, 0.2)`
                                        : '0 10px 30px -5px rgba(0,0,0,0.05)',
                                borderColor: isActive ? node.color : undefined
                            }}
                        >
                            {/* Color highlight bar */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 opacity-80"
                                style={{ backgroundColor: node.color }}
                            />

                            <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                                style={{
                                    backgroundColor: isActive ? node.color : isFloating ? "#fed7aa" : `${node.color}10`,
                                }}
                            >
                                <Icon
                                    size={20}
                                    style={{ color: isActive ? "#ffffff" : isFloating ? "#ea580c" : node.color }}
                                    className="md:w-6 md:h-6 transition-colors duration-300"
                                />
                            </div>

                            <div className="text-center">
                                <span className="block text-sm md:text-base font-bold text-slate-800 mb-0.5">{node.label}</span>
                                <span className={`text-[10px] md:text-xs text-slate-500 font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {isActive ? node.description : 'Drag to explore'}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Refresh hint when nodes are floating */}
            {floatingNodes.size > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-lg flex items-center gap-2 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                    Auto-aligning in 3s...
                </div>
            )}
        </div>
    );
};

export default InnovationProcess;
