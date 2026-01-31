import { motion } from 'framer-motion';
import type { ProductStatistic } from '../../utils/productData';
import { LayoutDashboard, BarChart3, PieChart, Settings, ArrowUpRight, Activity } from 'lucide-react';

// Reusable Circular Progress for Percentages
const CircularProgress = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isPercentage = value.includes('%');
    const displayValue = isPercentage ? numValue : 100;

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 relative group">
            <div className="relative w-28 h-28 mb-3">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke="#F2E8DF" strokeWidth="8" fill="transparent" />
                    <motion.circle
                        cx="56" cy="56" r="50"
                        stroke="#B07552"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: displayValue / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                </div>
            </div>
            <p className="text-gray-500 font-medium text-sm text-center">{label}</p>
        </div>
    );
};

// Bar Chart
const BarChart = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
    return (
        <div className="flex flex-col justify-end h-full p-4 relative group">
            <div className="flex items-end justify-center gap-3 h-28 mb-3 w-full px-2">
                <motion.div
                    className="w-8 bg-gray-100 rounded-t-lg"
                    initial={{ height: 0 }}
                    whileInView={{ height: '30%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay }}
                />
                <motion.div
                    className="w-8 bg-gradient-to-t from-brand-yellow-500 to-brand-yellow-400 rounded-t-lg relative"
                    initial={{ height: 0 }}
                    whileInView={{ height: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 1 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-lg font-bold text-brand-yellow-600 bg-white/80 backdrop-blur px-2 rounded-md shadow-sm whitespace-nowrap"
                    >
                        {value}
                    </motion.div>
                </motion.div>
            </div>
            <p className="text-gray-500 font-medium text-sm text-center">{label}</p>
        </div>
    );
};

// Trend Line
const TrendChart = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 relative group">
            <div className="relative w-full h-28 mb-3 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                    <motion.path
                        d="M0,45 C20,45 40,40 50,25 C60,10 80,10 100,5"
                        fill="none"
                        stroke="#B07552"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,45 C20,45 40,40 50,25 C60,10 80,10 100,5 L100,50 L0,50 Z"
                        fill="url(#trendGradientSmall)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: delay + 0.5 }}
                    />
                    <defs>
                        <linearGradient id="trendGradientSmall" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#B07552" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#B07552" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute top-0 right-0">
                    <span className="text-xl font-bold text-gray-900 bg-white/80 backdrop-blur px-1.5 rounded-md">{value}</span>
                </div>
            </div>
            <p className="text-gray-500 font-medium text-sm text-center">{label}</p>
        </div>
    );
};

const DashboardWidget = ({ stat, index }: { stat: ProductStatistic, index: number }) => {
    const isPercentage = stat.value.includes('%');
    const isMultiplier = stat.value.toLowerCase().includes('x');
    const isHighPercentage = isPercentage && parseFloat(stat.value) > 90;

    let Content = TrendChart;
    if (isHighPercentage) Content = CircularProgress;
    else if (isMultiplier) Content = BarChart;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 hover:shadow-md transition-shadow duration-300">
            {/* Widget Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50 mb-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label.split(' ')[0]} METRIC</span>
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
            </div>
            <div className="h-40">
                <Content value={stat.value} label={stat.label} delay={index * 0.15} />
            </div>
        </div>
    );
};

export const ImpactMetrics = ({ statistics }: { statistics: ProductStatistic[] }) => {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Dashboard Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden flex"
            >
                {/* 1. Fake Sidebar */}
                <div className="w-16 md:w-20 bg-gray-50/50 border-r border-gray-100 flex flex-col items-center py-6 gap-6 hidden sm:flex">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-xs">F</div>
                    <div className="flex flex-col gap-4 mt-4 w-full px-4">
                        <div className="p-2 rounded-lg bg-white shadow-sm text-brand-green-600"><LayoutDashboard className="w-5 h-5" /></div>
                        <div className="p-2 rounded-lg hover:bg-white/50 text-gray-400 transition-colors"><BarChart3 className="w-5 h-5" /></div>
                        <div className="p-2 rounded-lg hover:bg-white/50 text-gray-400 transition-colors"><PieChart className="w-5 h-5" /></div>
                    </div>
                    <div className="mt-auto p-2 rounded-lg hover:bg-white/50 text-gray-400 cursor-pointer"><Settings className="w-5 h-5" /></div>
                </div>

                {/* 2. Main Dashboard Area */}
                <div className="flex-1 p-6 md:p-8 bg-gradient-to-br from-white via-gray-50/30 to-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                Performance Overview
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </h3>
                            <p className="text-sm text-gray-500">Live data from enterprise deployments</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 shadow-sm">Last 30 Days</div>
                            <div className="px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-100 text-xs font-semibold text-brand-green-700 shadow-sm flex items-center gap-2">
                                <Activity className="w-3 h-3" />
                                +24% YoY
                            </div>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {statistics.map((stat, idx) => (
                            <DashboardWidget key={idx} stat={stat} index={idx} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
