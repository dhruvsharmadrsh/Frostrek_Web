import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Headset, ShoppingCart, Server, ArrowRight, Sparkles, Play, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Solution {
    id: string;
    name: string;
    description: string;
    shortDesc: string;
    icon: React.ElementType;
    href: string;
    features: string[];
}

const solutions: Solution[] = [
    {
        id: 'sales',
        name: 'AI for Sales',
        description: 'Boost conversion rates with AI sales assistants.',
        shortDesc: 'Automate lead qualification and follow-ups to close more deals.',
        icon: TrendingUp,
        href: '/solutions/sales',
        features: ['Lead Scoring', 'Auto Follow-up', 'Pipeline Analytics'],
    },
    {
        id: 'support',
        name: 'AI for Support',
        description: '24/7 customer support automation.',
        shortDesc: 'Reduce response times and improve customer satisfaction.',
        icon: Headset,
        href: '/solutions/support',
        features: ['24/7 Availability', 'Smart Routing', 'Sentiment Analysis'],
    },
    {
        id: 'ecommerce',
        name: 'AI for eCommerce',
        description: 'Personalized shopping experiences.',
        shortDesc: 'Increase conversions with intelligent product recommendations.',
        icon: ShoppingCart,
        href: '/solutions/ecommerce',
        features: ['Product Recs', 'Cart Recovery', 'Personal Offers'],
    },
    {
        id: 'erp',
        name: 'AI for ERP',
        description: 'Streamline operations with intelligent ERP.',
        shortDesc: 'Automate data entry and reduce operational overhead by 60%.',
        icon: Server,
        href: '/solutions/erp',
        features: ['Auto Processing', 'Data Sync', 'Smart Reports'],
    }
];

// Animated Solution Card with Hover Expansion
const SolutionCard = ({ solution, index, isActive, onClick }: {
    solution: Solution;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    const { theme } = useTheme();
    const IconComponent = solution.icon;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className={`
                relative cursor-pointer group
                ${isActive ? 'z-20' : 'z-10'}
            `}
        >
            {/* Card */}
            <motion.div
                layout
                className={`
                    relative overflow-hidden rounded-2xl border transition-all duration-500
                    ${theme === 'dark'
                        ? `bg-dark-card border-dark-accent/20 ${isActive ? 'border-dark-accent shadow-2xl shadow-dark-accent/20' : 'hover:border-dark-accent/50'}`
                        : `bg-white border-gray-200 ${isActive ? 'border-brand-green-600 shadow-2xl shadow-brand-green-600/15' : 'hover:border-brand-green-400/50 hover:shadow-xl'}`
                    }
                `}
            >
                {/* Animated Background Gradient */}
                <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${theme === 'dark'
                        ? 'bg-gradient-to-br from-dark-accent/5 to-transparent'
                        : 'bg-gradient-to-br from-brand-green-500/5 to-transparent'
                    }
                `} />

                {/* Active Indicator */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            className={`absolute top-0 left-0 w-full h-1 origin-left ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`}
                        />
                    )}
                </AnimatePresence>

                <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Icon with animated ring */}
                        <motion.div
                            className={`
                                relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                                transition-all duration-300
                                ${theme === 'dark'
                                    ? 'bg-gradient-to-br from-dark-accent/20 to-dark-accent/5'
                                    : 'bg-gradient-to-br from-brand-green-100 to-brand-green-50'
                                }
                            `}
                            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                        >
                            {/* Pulse ring when active */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className={`absolute inset-0 rounded-2xl ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`}
                                />
                            )}
                            <IconComponent className={`w-7 h-7 relative z-10 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`
                                text-lg font-bold mb-1 transition-colors duration-300
                                ${theme === 'dark'
                                    ? `text-dark-text ${isActive ? 'text-dark-accent' : 'group-hover:text-dark-accent'}`
                                    : `text-gray-900 ${isActive ? 'text-brand-green-700' : 'group-hover:text-brand-green-600'}`
                                }
                            `}>
                                {solution.name}
                            </h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                                {solution.description}
                            </p>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                            animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                            className={`
                                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}
                            `}
                        >
                            <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        </motion.div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className={`pt-4 border-t ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-100'}`}>
                                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                        {solution.shortDesc}
                                    </p>

                                    {/* Feature Pills */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {solution.features.map((feature, i) => (
                                            <motion.span
                                                key={feature}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className={`
                                                    px-3 py-1.5 rounded-full text-xs font-medium
                                                    ${theme === 'dark'
                                                        ? 'bg-dark-accent/10 text-dark-accent border border-dark-accent/20'
                                                        : 'bg-brand-green-100 text-brand-green-700 border border-brand-green-200'
                                                    }
                                                `}
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link to={solution.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`
                                                w-full py-3 px-6 rounded-xl font-semibold text-sm
                                                flex items-center justify-center gap-2 transition-all duration-300
                                                ${theme === 'dark'
                                                    ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90'
                                                    : 'bg-brand-green-600 text-white hover:bg-brand-green-700'
                                                }
                                            `}
                                        >
                                            <Play className="w-4 h-4" />
                                            Explore {solution.name.split(' ').slice(-1)[0]}
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Connection Line Between Cards
const ConnectionLine = ({ isVisible }: { isVisible: boolean }) => {
    const { theme } = useTheme();

    return (
        <motion.div
            className="hidden lg:flex items-center justify-center h-2 -my-1 relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
        >
            <motion.div
                className={`w-0.5 h-full ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-300/30'}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />
            {/* Animated dot */}
            {isVisible && (
                <motion.div
                    className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`}
                    initial={{ y: -20 }}
                    animate={{ y: 20 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
        </motion.div>
    );
};

const AllSolutionsSection = () => {
    const { theme } = useTheme();
    const [activeSolution, setActiveSolution] = useState<string | null>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className={`py-24 relative overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-b from-gray-50 to-white'}`}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Animated gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-dark-accent/5' : 'bg-brand-green-500/5'}`}
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className={`absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl ${theme === 'dark' ? 'bg-dark-accent/5' : 'bg-teal-400/10'}`}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className={`
                            inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                            ${theme === 'dark'
                                ? 'bg-dark-accent/10 border border-dark-accent/20'
                                : 'bg-brand-green-100 border border-brand-green-200'
                            }
                        `}
                    >
                        <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-700'}`}>
                            Industry Solutions
                        </span>
                    </motion.div>

                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-5 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        Explore Our{' '}
                        <span className={theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}>AI Solutions</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto text-base md:text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                        Click on any solution to explore how AI can transform your industry
                    </p>
                </motion.div>

                {/* Solutions Grid - Two Columns */}
                <div className="max-w-5xl mx-auto">
                    {/* Category Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className={`w-1.5 h-8 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`} />
                        <span className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-700'}`}>
                            By Industry
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {solutions.slice(0, 2).map((solution, idx) => (
                                <div key={solution.id}>
                                    <SolutionCard
                                        solution={solution}
                                        index={idx}
                                        isActive={activeSolution === solution.id}
                                        onClick={() => setActiveSolution(activeSolution === solution.id ? null : solution.id)}
                                    />
                                    {idx < 1 && (
                                        <ConnectionLine isVisible={activeSolution === solution.id} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {solutions.slice(2, 4).map((solution, idx) => (
                                <div key={solution.id}>
                                    <SolutionCard
                                        solution={solution}
                                        index={idx + 2}
                                        isActive={activeSolution === solution.id}
                                        onClick={() => setActiveSolution(activeSolution === solution.id ? null : solution.id)}
                                    />
                                    {idx < 1 && (
                                        <ConnectionLine isVisible={activeSolution === solution.id} />
                                    )}
                                </div>
                            ))}

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.8 }}
                                className={`
                                    mt-6 p-6 rounded-2xl border-2 border-dashed
                                    ${theme === 'dark'
                                        ? 'border-dark-accent/30 bg-dark-accent/5'
                                        : 'border-brand-green-300 bg-brand-green-50'
                                    }
                                `}
                            >
                                <div className="text-center">
                                    <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                        Don't See Your Industry?
                                    </h4>
                                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                        We build custom AI solutions for any business need.
                                    </p>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`
                                                px-6 py-3 rounded-xl font-semibold text-sm
                                                flex items-center justify-center gap-2 mx-auto
                                                transition-all duration-300
                                                ${theme === 'dark'
                                                    ? 'bg-dark-accent/20 text-dark-accent border border-dark-accent/30 hover:bg-dark-accent/30'
                                                    : 'bg-white text-brand-green-700 border border-brand-green-300 hover:bg-brand-green-100'
                                                }
                                            `}
                                        >
                                            Contact Us
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllSolutionsSection;
