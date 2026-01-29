"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
    Bot,
    MessageSquare,
    Phone,
    Settings,
    Database,
    Headphones,
    Zap,
    ShoppingCart,
    type LucideIcon,
} from "lucide-react";

interface WorkflowNode {
    id: string;
    label: string;
    icon: LucideIcon;
    x: number;
    y: number;
    color: string;
}

const NODES: WorkflowNode[] = [
    { id: "ai-agent", label: "Frosty AI Agent", icon: Bot, x: -40, y: -10, color: "#14b8a6" },
    { id: "linkedin", label: "LinkedIn Automation", icon: MessageSquare, x: -25, y: -35, color: "#0ea5e9" },
    { id: "whatsapp", label: "WhatsApp Agents", icon: Phone, x: 25, y: -35, color: "#22c55e" },
    { id: "voice", label: "Voice AI Agent", icon: Headphones, x: 40, y: -10, color: "#8b5cf6" },
    { id: "erpnext", label: "ERPNext Modules", icon: Database, x: -25, y: 25, color: "#f59e0b" },
    { id: "support", label: "Support Automation", icon: Settings, x: 25, y: 25, color: "#ec4899" },
];

const WorkflowDiagram = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [floatingNodes, setFloatingNodes] = useState<Set<string>>(new Set());
    const [isAnimated, setIsAnimated] = useState(false);
    const dragStartRef = useRef<{ x: number; y: number; nodeX: number; nodeY: number } | null>(null);

    // Calculate target positions based on screen size
    const getTargetPositions = useCallback(() => {
        const isMobile = window.innerWidth < 768; // Mobile breakpoint
        const formation: Record<string, { x: number; y: number }> = {};

        // Custom mobile tree layout coordinates (Spread out & Larger Gap)
        const MOBILE_LAYOUT: Record<string, { x: number, y: number }> = {
            "whatsapp": { x: 0, y: -45 },     // Top
            "linkedin": { x: -40, y: -25 },   // Top Left
            "ai-agent": { x: 40, y: -25 },    // Top Right
            "erpnext": { x: -40, y: 20 },     // Bottom Left
            "voice": { x: 40, y: 20 },        // Bottom Right
            "support": { x: 0, y: 40 },       // Bottom
        };

        NODES.forEach((node) => {
            if (isMobile && MOBILE_LAYOUT[node.id]) {
                formation[node.id] = MOBILE_LAYOUT[node.id];
            } else {
                formation[node.id] = { x: node.x, y: node.y };
            }
        });
        return formation;
    }, []);

    // Initialize with scattered positions, then animate to formation
    useEffect(() => {
        const scattered: Record<string, { x: number; y: number }> = {};
        NODES.forEach((node) => {
            scattered[node.id] = {
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
            };
        });
        setNodePositions(scattered);

        const timer = setTimeout(() => {
            setNodePositions(getTargetPositions());
            setIsAnimated(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [getTargetPositions]); // Run once on mount (dependency stable)

    // Handle resize
    useEffect(() => {
        if (!isAnimated) return;

        const handleResize = () => {
            setNodePositions(getTargetPositions());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isAnimated, getTargetPositions]);


    // Get node position
    const getNodePos = useCallback((nodeId: string) => {
        return nodePositions[nodeId] || { x: 0, y: 0 };
    }, [nodePositions]);

    // Note: Auto-reassembly removed - nodes stay where dropped until page refresh

    // Handle pointer down (start drag)
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

    // Handle pointer up (end drag - node stays where dropped until refresh)
    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);

        if (draggedNode) {
            // Add this node to floating set (it stays where dropped permanently)
            setFloatingNodes((prev) => new Set([...prev, draggedNode]));
            // No auto-reassemble - nodes stay until page refresh
        }

        setDraggedNode(null);
        dragStartRef.current = null;
    }, [draggedNode]);

    // Calculate SVG path from center to node
    const getConnectionPath = useCallback((nodeId: string) => {
        const pos = getNodePos(nodeId);
        const centerX = 50;
        const centerY = 50;
        const nodeX = 50 + pos.x * 0.5;
        const nodeY = 50 + pos.y * 0.5;

        const midX = (centerX + nodeX) / 2;
        const midY = (centerY + nodeY) / 2;
        const controlX = midX + (nodeY - centerY) * 0.2;
        const controlY = midY - (nodeX - centerX) * 0.2;

        return `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${nodeX} ${nodeY}`;
    }, [getNodePos]);

    // Check if node is floating (not in its home position)
    const isNodeFloating = (nodeId: string) => floatingNodes.has(nodeId);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[500px]"
            onPointerMove={handlePointerMove}
        >
            {/* SVG Connection Lines */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Dashed line pattern for floating nodes */}
                    <linearGradient id="floating-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Connection lines */}
                {NODES.map((node) => {
                    const isActive = hoveredNode === node.id || draggedNode === node.id;
                    const isFloating = isNodeFloating(node.id);

                    return (
                        <path
                            key={`line-${node.id}`}
                            d={getConnectionPath(node.id)}
                            fill="none"
                            stroke={isActive ? node.color : isFloating ? "url(#floating-gradient)" : "url(#line-gradient)"}
                            strokeWidth={isActive ? 0.5 : 0.25}
                            strokeLinecap="round"
                            strokeDasharray={isFloating && !isActive ? "2 2" : "none"}
                            className="transition-all duration-700"
                            style={{
                                opacity: isActive ? 1 : isFloating ? 0.7 : 0.5,
                                filter: isActive ? `drop-shadow(0 0 4px ${node.color})` : "none",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Center Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-brand-green-200 px-8 py-5 text-center">
                    <div className="text-xl font-bold text-primary">Frostrek</div>
                    <div className="text-sm text-brand-green-500 font-bold uppercase tracking-wide">AI Engine</div>
                </div>
            </div>

            {/* Nodes */}
            {NODES.map((node, index) => {
                const pos = getNodePos(node.id);
                const Icon = node.icon;
                const isDragging = draggedNode === node.id;
                const isHovered = hoveredNode === node.id;
                const isFloating = isNodeFloating(node.id);
                const isActive = isDragging || isHovered;

                return (
                    <div
                        key={node.id}
                        className="absolute z-10 cursor-grab active:cursor-grabbing select-none touch-none"
                        style={{
                            left: `calc(50% + ${pos.x}%)`,
                            top: `calc(50% + ${pos.y}%)`,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : isFloating ? 1.05 : 1})`,
                            transition: isDragging ? "none" : "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: !isDragging && isAnimated ? `${index * 30}ms` : "0ms",
                            zIndex: isDragging ? 30 : isHovered ? 25 : isFloating ? 15 : 10,
                        }}
                        onPointerDown={(e) => handlePointerDown(e, node.id)}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div
                            className={`bg-white rounded-xl shadow-lg border px-4 py-3 flex items-center gap-3 whitespace-nowrap
                                transition-all duration-300
                                ${isActive ? "shadow-2xl border-transparent" : isFloating ? "shadow-xl border-orange-200" : "border-gray-100"}
                            `}
                            style={{
                                boxShadow: isActive
                                    ? `0 10px 40px ${node.color}50`
                                    : isFloating
                                        ? `0 6px 25px rgba(249, 115, 22, 0.25)`
                                        : undefined,
                            }}
                        >
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                                style={{
                                    backgroundColor: isActive ? node.color : isFloating ? "#fed7aa" : `${node.color}20`,
                                }}
                            >
                                <Icon
                                    size={20}
                                    style={{ color: isActive ? "#ffffff" : isFloating ? "#ea580c" : node.color }}
                                    className="transition-colors duration-300"
                                />
                            </div>
                            <span className="text-sm font-bold text-gray-800">{node.label}</span>
                        </div>
                    </div>
                );
            })}


        </div>
    );
};

export default WorkflowDiagram;
