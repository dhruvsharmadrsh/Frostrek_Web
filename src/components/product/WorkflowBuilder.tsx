
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import {
    Brain,
    Workflow,
    Zap,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    MoreHorizontal,
    Play,
    GitBranch,
    Search
} from 'lucide-react';
import type { ProductProcessStep } from '../../utils/productData';


// Draggable Node Component
const CanvasNode = ({
    step,
    index,
    x,
    y,
    icon: Icon
}: {
    step: ProductProcessStep,
    index: number,
    x: MotionValue<number>,
    y: MotionValue<number>,
    icon: any
}) => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{ x, y }}
            whileHover={{ scale: 1.02, cursor: 'grab' }}
            whileTap={{ scale: 0.98, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="absolute top-0 left-0 p-4 w-60 bg-white rounded-2xl border border-gray-200 shadow-xl group hover:border-brand-green-300 hover:shadow-2xl transition-all duration-300 z-20"
        >
            {/* Input Port */}
            {index > 0 && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full border-2 border-white" />
            )}

            {/* Output Port */}
            {index < 2 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-green-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
            )}

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green-50 flex items-center justify-center shrink-0 border border-brand-green-100 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300 text-brand-green-600">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-brand-green-600 uppercase tracking-wider">{step.step}</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-300" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{step.description}</p>
                </div>
            </div>

            {/* Drag Handle hint */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Drag to move
            </div>
        </motion.div>
    );
};

// Dynamic Connection Line
const DynamicConnection = ({
    startX, startY, endX, endY, delay,
    startOffset = { x: 240, y: 36 }, // Center-ish of the ports
    endOffset = { x: 0, y: 36 }
}: {
    startX: MotionValue<number>, startY: MotionValue<number>,
    endX: MotionValue<number>, endY: MotionValue<number>,
    delay: number,
    startOffset?: { x: number, y: number },
    endOffset?: { x: number, y: number }
}) => {

    // Create a transformed motion value string for the path d attribute
    const pathD = useTransform([startX, startY, endX, endY], ([sx, sy, ex, ey]) => {
        const sX = (sx as number) + startOffset.x;
        const sY = (sy as number) + startOffset.y;
        const eX = (ex as number) + endOffset.x;
        const eY = (ey as number) + endOffset.y;

        const midX = (sX + eX) / 2;
        return `M ${sX} ${sY} C ${midX} ${sY}, ${midX} ${eY}, ${eX} ${eY}`;
    });

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
            <motion.path
                d={pathD}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
            />
            <motion.path
                d={pathD}
                fill="none"
                stroke="#B07552"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="10 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay }}
            />
        </svg>
    );
};

export const WorkflowBuilder = ({ steps }: { steps: ProductProcessStep[] }) => {
    // Initial positions - Tighter layout to fit container
    const x1 = useMotionValue(20);
    const y1 = useMotionValue(130);

    const x2 = useMotionValue(320); // 20 + 240(width) + 60(gap)
    const y2 = useMotionValue(60);  // Offset y for variety

    const x3 = useMotionValue(620); // 320 + 240 + 60
    const y3 = useMotionValue(130);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]"
            >
                {/* 1. Sidebar Palette (Static for visual) */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-6 relative z-30">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-brand-green-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
                        <span className="font-bold text-gray-900">Workflow</span>
                    </div>

                    <div className="space-y-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Process Blocks</div>
                        {[
                            { icon: Brain, label: "AI Analysis" },
                            { icon: GitBranch, label: "Logic Branch" },
                            { icon: MousePointer2, label: "Manual Input" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5 }}
                                className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm cursor-grab flex items-center gap-3 hover:border-brand-green-300 transition-colors"
                            >
                                <item.icon className="w-4 h-4 text-brand-green-600" />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto bg-brand-green-50 p-4 rounded-xl border border-brand-green-100">
                        <div className="flex items-center gap-2 mb-2 text-brand-green-700 font-bold text-sm">
                            <Play className="w-4 h-4 fill-current" />
                            Ready to automate?
                        </div>
                        <p className="text-xs text-brand-green-600 mb-3">Drag workflow nodes to reorganize the process.</p>
                    </div>
                </div>

                {/* 2. Main Canvas */}
                <div className="flex-1 bg-[#F9FAFB] relative overflow-hidden group cursor-default">
                    {/* Dot Grid Background */}
                    <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Editor Toolbar (Floating) */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-4 z-30">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors"><MousePointer2 className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-gray-200" />
                        <button className="text-gray-400 hover:text-gray-900 transition-colors"><ZoomOut className="w-4 h-4" /></button>
                        <span className="text-xs font-mono text-gray-500">100%</span>
                        <button className="text-gray-400 hover:text-gray-900 transition-colors"><ZoomIn className="w-4 h-4" /></button>
                    </div>

                    {/* Nodes and Connections Container */}
                    <div className="relative w-full h-full">
                        {/* Dynamic Lines */}
                        <DynamicConnection startX={x1} startY={y1} endX={x2} endY={y2} delay={0.5} />
                        <DynamicConnection startX={x2} startY={y2} endX={x3} endY={y3} delay={1.0} />

                        {/* Draggable Nodes */}
                        <CanvasNode step={steps[0]} index={0} x={x1} y={y1} icon={Search} />
                        <CanvasNode step={steps[1]} index={1} x={x2} y={y2} icon={Workflow} />
                        <CanvasNode step={steps[2]} index={2} x={x3} y={y3} icon={Zap} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
