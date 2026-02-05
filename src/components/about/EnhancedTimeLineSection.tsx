import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import  { type LucideIcon }  from 'lucide-react';

// Type definitions
interface TimelineItemColor {
    bg: string;
    text: string;
    border: string;
    shadow: string;
    iconColor: string;
}

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image: string;
    icon: LucideIcon;
    color: TimelineItemColor;
    detail?: string;
}

interface EnhancedTimelineSectionProps {
    timelineData: TimelineItem[];
    theme?: 'light' | 'dark';
}

// Enhanced Timeline Section with Scroll-Triggered Image Display
export const EnhancedTimelineSection: React.FC<EnhancedTimelineSectionProps> = ({ 
    timelineData, 
    theme = 'light' 
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers = timelineRefs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    // Trigger when item is in the center of viewport (50% threshold)
                    if (entry.isIntersecting) {
                        const rect = entry.boundingClientRect;
                        const viewportCenter = window.innerHeight / 2;
                        
                        // Check if element is approximately at center
                        if (Math.abs(rect.top + rect.height / 2 - viewportCenter) < 200) {
                            setActiveIndex(index);
                        }
                    }
                },
                { 
                    threshold: 0.3,
                    rootMargin: '0px 0px 0px 0px'
                }
            );

            if (ref) {
                observer.observe(ref);
            }
            return observer;
        });

        return () => {
            observers.forEach((obs, index) => {
                if (timelineRefs.current[index]) {
                    obs.unobserve(timelineRefs.current[index]);
                }
            });
        };
    }, [timelineData.length]);

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}
                    >
                        Our Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                    >
                        From a bold idea to a global leader in Agentic AI.
                    </motion.p>
                </div>

                {/* Timeline Container with Left Timeline Line and Right Image Display */}
                <div className="relative max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-stretch">
                        {/* Left: Timeline Points */}
                        <div className="lg:col-span-2 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green-500/0 via-brand-green-500/50 to-brand-green-500/0 md:-translate-x-1/2"></div>

                            <div className="space-y-12 md:space-y-16">
                                {timelineData.map((item, i) => {
                                    const isActive = activeIndex === i;
                                    const Icon = item.icon;

                                    return (
                                        <motion.div
                                            key={i}
                                            ref={(el) => {
                                                if (el) timelineRefs.current[i] = el;
                                            }}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                            className="relative flex items-start gap-8 md:gap-12"
                                        >
                                            {/* Timeline Dot (Center) */}
                                            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-green-500 shadow-[0_0_0_4px_rgba(176,117,82,0.2)] z-10 md:-translate-x-1/2 translate-x-[-7px] md:translate-x-[-8px] transition-all duration-500">
                                                {isActive && (
                                                    <motion.div
                                                        layoutId={`activeDot-${i}`}
                                                        className="absolute inset-0 bg-brand-green-400 animate-pulse rounded-full"
                                                    />
                                                )}
                                            </div>

                                            {/* Content Card */}
                                            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                                                <motion.div
                                                    className={`bg-white rounded-2xl border-2 shadow-sm p-6 cursor-pointer transition-all duration-300 ${
                                                        isActive
                                                            ? `border-brand-green-500 shadow-lg shadow-brand-green-500/20 ring-2 ring-brand-green-500/10`
                                                            : 'border-gray-100 hover:border-brand-green-200'
                                                    }`}
                                                    whileHover={{
                                                        y: -4,
                                                        borderColor: isActive ? 'rgb(176, 117, 82)' : item.color.border,
                                                        boxShadow: isActive 
                                                            ? '0 20px 40px -10px rgba(176,117,82,0.3)' 
                                                            : `0 10px 30px -10px ${item.color.shadow}`
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="flex flex-col gap-3">
                                                        {/* Year Badge and Icon */}
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className={`px-3 py-1 ${item.color.bg} ${item.color.text} rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                                                                isActive ? 'scale-105' : ''
                                                            }`}>
                                                                {item.year}
                                                            </span>
                                                            <motion.div
                                                                animate={{ scale: isActive ? 1.2 : 1, rotate: isActive ? 10 : 0 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            >
                                                                <Icon className={`w-5 h-5 ${item.color.iconColor} transition-all duration-300`} />
                                                            </motion.div>
                                                        </div>
                                                        
                                                        {/* Title */}
                                                        <motion.h3 
                                                            className={`text-2xl font-bold transition-all duration-300 ${
                                                                isActive ? 'text-brand-green-600' : 'text-gray-900'
                                                            }`}
                                                            animate={{ 
                                                                scale: isActive ? 1.05 : 1,
                                                                y: isActive ? -2 : 0
                                                            }}
                                                        >
                                                            {item.title}
                                                        </motion.h3>

                                                        {/* Description */}
                                                        <motion.p 
                                                            className={`transition-all duration-300 leading-relaxed font-medium ${
                                                                isActive ? 'text-gray-900' : 'text-gray-600'
                                                            }`}
                                                            animate={{ 
                                                                opacity: isActive ? 1 : 0.8 
                                                            }}
                                                        >
                                                            {item.description}
                                                        </motion.p>

                                                        {/* Additional detail shown on active */}
                                                        <AnimatePresence>
                                                            {isActive && item.detail && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="mt-3 pt-3 border-t border-brand-green-100"
                                                                >
                                                                    <p className="text-sm text-brand-green-700 font-medium">
                                                                        {item.detail}
                                                                    </p>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Image Display Area (Sticky) */}
                        <div className="lg:col-span-3 sticky top-1/4 h-fit">
                            <AnimatePresence mode="wait">
                                {activeIndex !== null && timelineData[activeIndex] && (
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        className="relative"
                                    >
                                        {/* Image Container */}
                                        <motion.div
                                            className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video md:aspect-square lg:aspect-[4/3]"
                                            style={{
                                                boxShadow: `0 25px 50px -12px ${timelineData[activeIndex].color.shadow}`
                                            }}
                                        >
                                            {/* Image with smooth transition */}
                                            <motion.img
                                                src={timelineData[activeIndex].image}
                                                alt={timelineData[activeIndex].title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                initial={{ scale: 1.1, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                            />

                                            {/* Gradient Overlay */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background: `linear-gradient(135deg, ${timelineData[activeIndex].color.border}15 0%, transparent 50%)`
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            />

                                            {/* Info Badge at Bottom */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <div className="text-white">
                                                    <p className="text-sm font-semibold opacity-80">{timelineData[activeIndex].year}</p>
                                                    <h3 className="text-xl font-bold">{timelineData[activeIndex].title}</h3>
                                                </div>
                                            </motion.div>
                                        </motion.div>

                                        {/* Decorative Glow Effect */}
                                        <motion.div
                                            className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none -z-10"
                                            style={{
                                                background: timelineData[activeIndex].color.border
                                            }}
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Placeholder when no image is active */}
                            {activeIndex === null && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-[400px]"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-500 font-medium">Scroll to timeline items to see images</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedTimelineSection;