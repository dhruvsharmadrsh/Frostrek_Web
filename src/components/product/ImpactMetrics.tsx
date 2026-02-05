import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProductStatistic } from '../../utils/productData';
import { LayoutDashboard, BarChart3, PieChart, ArrowUpRight, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Reusable Circular Progress for Percentages
const CircularProgress = ({ value, label, delay, theme }: { value: string, label: string, delay: number, theme: string }) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isPercentage = value.includes('%');
    const displayValue = isPercentage ? numValue : 100;

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 relative group">
            <div className="relative w-28 h-28 mb-3">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke={theme === 'dark' ? '#3a3025' : '#F2E8DF'} strokeWidth="8" fill="transparent" />
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
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{value}</span>
                </div>
            </div>
            <p className={`font-medium text-sm text-center ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
};

const BarChart = ({ value, label, delay, theme }: { value: string, label: string, delay: number, theme: string }) => {
    // Determine height based on value if possible, else default
    let heightPercent = 80;
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
        // Simple normalization: if > 100 assume 100, if < 0 assume 0
        // If it's a multiplier (e.g. 3x), map 1x->20%, 5x->100%
        if (value.toLowerCase().includes('x')) {
            heightPercent = Math.min(Math.max(numValue * 20, 20), 100);
        } else if (value.includes('%')) {
            heightPercent = Math.min(Math.max(numValue, 10), 100);
        }
    }

    return (
        <div className="flex flex-col justify-end h-full p-4 relative group">
            <div className="flex items-end justify-center gap-3 h-28 mb-3 w-full px-2">
                <motion.div
                    className={`w-8 rounded-t-lg ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: '30%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay }}
                />
                <motion.div
                    className="w-8 bg-gradient-to-t from-brand-yellow-500 to-brand-yellow-400 rounded-t-lg relative"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 1 }}
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 text-lg font-bold text-brand-yellow-600 px-2 rounded-md shadow-sm whitespace-nowrap ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/80 backdrop-blur'}`}
                    >
                        {value}
                    </motion.div>
                </motion.div>
            </div>
            <p className={`font-medium text-sm text-center ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
};

// Trend Line
const TrendChart = ({ value, label, delay, theme }: { value: string, label: string, delay: number, theme: string }) => {
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
                    <span className={`text-xl font-bold px-1.5 rounded-md ${theme === 'dark' ? 'text-dark-text bg-dark-card' : 'text-gray-900 bg-white/80 backdrop-blur'}`}>{value}</span>
                </div>
            </div>
            <p className={`font-medium text-sm text-center ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
};

const DashboardWidget = ({ stat, index, theme, activeView }: { stat: ProductStatistic, index: number, theme: string, activeView: 'grid' | 'bar' | 'pie' }) => {
    const isPercentage = stat.value.includes('%');
    const isMultiplier = stat.value.toLowerCase().includes('x');
    const isHighPercentage = isPercentage && parseFloat(stat.value) > 90;

    let Content;

    if (activeView === 'bar') {
        Content = BarChart;
    } else if (activeView === 'pie') {
        Content = CircularProgress;
    } else {
        // Grid / Default logic
        Content = TrendChart;
        if (isHighPercentage) Content = CircularProgress;
        else if (isMultiplier) Content = BarChart;
    }

    return (
        <div className={`rounded-2xl border shadow-sm p-2 hover:shadow-md transition-shadow duration-300 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-100'}`}>
            {/* Widget Header */}
            <div className={`flex items-center justify-between px-3 py-2 border-b mb-1 ${theme === 'dark' ? 'border-dark-accent/10' : 'border-gray-50'}`}>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>{stat.label.split(' ')[0]} METRIC</span>
                <ArrowUpRight className={`w-3 h-3 ${theme === 'dark' ? 'text-dark-accent/50' : 'text-gray-300'}`} />
            </div>
            <div className="h-40">
                <Content value={stat.value} label={stat.label} delay={index * 0.15} theme={theme} />
            </div>
        </div>
    );
};

export const ImpactMetrics = ({ statistics }: { statistics: ProductStatistic[] }) => {
    const { theme } = useTheme();
    const [activeView, setActiveView] = useState<'grid' | 'bar' | 'pie'>('grid');

    return (
        <div className="max-w-5xl mx-auto">
            {/* Dashboard Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`rounded-3xl border shadow-2xl overflow-hidden flex ${theme === 'dark' ? 'bg-dark-navbar/80 backdrop-blur-xl border-dark-accent/20' : 'bg-white/80 backdrop-blur-xl border-white/50'}`}
            >
                <div className={`w-16 md:w-20 border-r flex flex-col items-center py-6 gap-6 hidden sm:flex ${theme === 'dark' ? 'bg-dark-bg/50 border-dark-accent/20' : 'bg-gray-50/50 border-gray-100'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${theme === 'dark' ? 'bg-dark-accent text-dark-bg' : 'bg-gray-900 text-white'}`}>F</div>
                    <div className="flex flex-col gap-4 mt-4 w-full px-4">
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`p-2 rounded-lg shadow-sm transition-all ${activeView === 'grid' ? (theme === 'dark' ? 'bg-dark-card text-dark-accent' : 'bg-white text-brand-green-600 shadow-md') : (theme === 'dark' ? 'text-dark-text-muted hover:bg-dark-card' : 'text-gray-400 hover:bg-white/50')}`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveView('bar')}
                            className={`p-2 rounded-lg transition-all ${activeView === 'bar' ? (theme === 'dark' ? 'bg-dark-card text-dark-accent' : 'bg-white text-brand-green-600 shadow-md') : (theme === 'dark' ? 'text-dark-text-muted hover:bg-dark-card' : 'text-gray-400 hover:bg-white/50')}`}
                        >
                            <BarChart3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveView('pie')}
                            className={`p-2 rounded-lg transition-all ${activeView === 'pie' ? (theme === 'dark' ? 'bg-dark-card text-dark-accent' : 'bg-white text-brand-green-600 shadow-md') : (theme === 'dark' ? 'text-dark-text-muted hover:bg-dark-card' : 'text-gray-400 hover:bg-white/50')}`}
                        >
                            <PieChart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 2. Main Dashboard Area */}
                <div className={`flex-1 p-6 md:p-8 ${theme === 'dark' ? 'bg-gradient-to-br from-dark-navbar via-dark-bg/30 to-dark-navbar' : 'bg-gradient-to-br from-white via-gray-50/30 to-white'}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                Performance Overview
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Live data from enterprise deployments</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 text-dark-text-muted' : 'bg-white border-gray-200 text-gray-600'}`}>Last 30 Days</div>
                            <div className={`px-3 py-1 rounded-full border text-xs font-semibold shadow-sm flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-accent/10 border-dark-accent/30 text-dark-accent' : 'bg-brand-green-50 border-brand-green-100 text-brand-green-700'}`}>
                                <Activity className="w-3 h-3" />
                                +24% YoY
                            </div>

                        </div>
                    </div>

                    {/* Mobile Controls (Visible only on small screens) */}
                    <div className="flex sm:hidden gap-2 mb-6 p-1 rounded-lg bg-gray-100/50 border border-gray-200 w-fit mx-auto dark:bg-dark-card dark:border-dark-accent/10">
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`p-1.5 rounded-md transition-all ${activeView === 'grid' ? 'bg-white shadow text-brand-green-600 dark:bg-dark-bg dark:text-dark-accent' : 'text-gray-400 dark:text-gray-500'}`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveView('bar')}
                            className={`p-1.5 rounded-md transition-all ${activeView === 'bar' ? 'bg-white shadow text-brand-green-600 dark:bg-dark-bg dark:text-dark-accent' : 'text-gray-400 dark:text-gray-500'}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveView('pie')}
                            className={`p-1.5 rounded-md transition-all ${activeView === 'pie' ? 'bg-white shadow text-brand-green-600 dark:bg-dark-bg dark:text-dark-accent' : 'text-gray-400 dark:text-gray-500'}`}
                        >
                            <PieChart className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {statistics.map((stat, idx) => (
                            <DashboardWidget key={idx} stat={stat} index={idx} theme={theme} activeView={activeView} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
