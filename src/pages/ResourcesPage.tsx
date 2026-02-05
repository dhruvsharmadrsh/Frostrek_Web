import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CASE_STUDIES, BLOG_POSTS } from '../data/resources';
import type { CaseStudy, BlogPost } from '../data/resources';
import { useTheme } from '../context/ThemeContext';

const ResourcesHero = () => {
    const { theme } = useTheme();
    return (
        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md text-sm font-medium mb-8 shadow-sm ${theme === 'dark'
                        ? 'bg-dark-accent/20 border border-dark-accent/30 text-dark-accent'
                        : 'bg-brand-green-100/50 border border-brand-green-200 text-brand-green-800'
                        }`}
                >
                    <span className={`flex h-2 w-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`} />
                    Knowledge Hub
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight ${theme === 'dark' ? 'text-dark-text' : 'text-brand-green-900'}`}
                >
                    Insights &amp; <br />
                    <span className={`text-transparent bg-clip-text ${theme === 'dark'
                        ? 'bg-gradient-to-r from-dark-accent via-amber-500 to-dark-accent'
                        : 'bg-gradient-to-r from-brand-yellow-600 via-brand-green-600 to-brand-green-800'
                        }`}>
                        Success Stories
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                >
                    Deep dives into how we help enterprises build production-ready AI systems through high-quality data operations.
                </motion.p>
            </div>

            {/* Gradient Fade */}
            <div className={`absolute bottom-0 left-0 right-0 h-24 pointer-events-none ${theme === 'dark'
                ? 'bg-gradient-to-t from-dark-bg/50 to-transparent'
                : 'bg-gradient-to-t from-brand-green-50/50 to-transparent'
                }`} />
        </section>
    );
};

const CaseStudyCard = ({ study, onClick }: { study: CaseStudy; onClick: () => void }) => {
    const { theme } = useTheme();
    return (
        <motion.div
            layoutId={`card-${study.id}`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <Card className={`h-full p-8 border backdrop-blur-md transition-all duration-300 relative overflow-hidden flex flex-col ${theme === 'dark'
                ? 'border-dark-accent/20 bg-dark-card/60 hover:bg-dark-card/80 hover:shadow-xl hover:border-dark-accent/40'
                : 'border-white/40 bg-white/60 hover:bg-white/80 hover:shadow-xl hover:border-brand-green-200'
                }`}>
                <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark'
                    ? 'bg-gradient-to-r from-dark-accent to-amber-500'
                    : 'bg-gradient-to-r from-brand-green-400 to-brand-yellow-400'
                    }`} />

                <div className="mb-6 flex justify-between items-start">
                    <div className={`p-3 rounded-xl transition-colors ${theme === 'dark'
                        ? 'bg-dark-accent/20 group-hover:bg-dark-accent/30'
                        : 'bg-brand-green-50 group-hover:bg-brand-green-100'
                        }`}>
                        <study.icon className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border ${theme === 'dark'
                        ? 'text-dark-accent bg-dark-accent/10 border-dark-accent/30'
                        : 'text-brand-green-700 bg-brand-green-50 border-brand-green-100'
                        }`}>
                        {study.category}
                    </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 transition-colors ${theme === 'dark'
                    ? 'text-dark-text group-hover:text-dark-accent'
                    : 'text-gray-900 group-hover:text-brand-green-800'
                    }`}>
                    {study.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 flex-grow ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                    {study.description}
                </p>

                <div className={`flex items-center font-semibold text-sm group/btn ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
            </Card>
        </motion.div>
    );
};

const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => {
    const { theme } = useTheme();
    return (
        <Card
            onClick={onClick}
            className={`group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
        >
            <div className="relative h-48 overflow-hidden">
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${theme === 'dark'
                    ? 'bg-dark-bg/90 text-dark-accent'
                    : 'bg-white/90 text-brand-green-800'
                    }`}>
                    {post.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className={`flex items-center gap-4 text-xs mb-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>

                <h3 className={`text-lg font-bold mb-3 transition-colors line-clamp-2 ${theme === 'dark'
                    ? 'text-dark-text group-hover:text-dark-accent'
                    : 'text-gray-900 group-hover:text-brand-green-700'
                    }`}>
                    {post.title}
                </h3>

                <p className={`text-sm mb-6 line-clamp-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                    {post.excerpt}
                </p>

                <div className={`mt-auto flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                            <User className={`w-3 h-3 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        </div>
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>{post.author}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ResourcesPage = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<'case-studies' | 'blogs'>('case-studies');
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsExpanded(false);
    }, [activeTab]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedStudy || selectedBlog) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [selectedStudy, selectedBlog]);

    const navigate = useNavigate();

    return (
        <div className={`relative min-h-screen pb-20 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {theme !== 'dark' && <CuteBackground />}

            <ResourcesHero />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className={`backdrop-blur-md p-1.5 rounded-full shadow-sm inline-flex ${theme === 'dark'
                        ? 'bg-dark-card/50 border border-dark-accent/20'
                        : 'bg-white/50 border border-brand-green-100'
                        }`}>
                        {(['case-studies', 'blogs'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative ${activeTab === tab
                                    ? 'text-white'
                                    : theme === 'dark'
                                        ? 'text-dark-text-muted hover:text-dark-accent'
                                        : 'text-gray-600 hover:text-brand-green-700'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={`absolute inset-0 rounded-full shadow-md ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 capitalize">
                                    {tab.replace('-', ' ')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'case-studies' ? (
                        <motion.div
                            key="case-studies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(isExpanded ? CASE_STUDIES : CASE_STUDIES.slice(0, 6)).map((study) => (
                                    <div key={study.id}>
                                        <CaseStudyCard
                                            study={study}
                                            onClick={() => setSelectedStudy(study)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {!isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mt-16"
                                >
                                    {/* Innovative CTA Section */}
                                    <div className={`relative overflow-hidden rounded-[2rem] ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-dark-card via-dark-bg to-dark-card border border-dark-accent/20'
                                        : 'bg-gradient-to-br from-white via-brand-green-50/30 to-white border border-brand-green-100'
                                        }`}>
                                        {/* Animated background pattern */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-20 animate-pulse ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-400'}`} />
                                            <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-15 animate-pulse delay-1000 ${theme === 'dark' ? 'bg-amber-500' : 'bg-brand-yellow-400'}`} />
                                            {/* Grid pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                        </div>

                                        <div className="relative z-10 p-8 md:p-12">
                                            <div className="flex flex-col lg:flex-row items-center gap-10">

                                                {/* Left: Stacked Cards Preview */}
                                                <div className="relative w-full lg:w-auto flex-shrink-0">
                                                    <div className="relative h-48 w-full lg:w-80 flex items-center justify-center">
                                                        {/* Stacked card previews */}
                                                        {[2, 1, 0].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                                className={`absolute rounded-2xl shadow-xl backdrop-blur-sm border ${theme === 'dark'
                                                                    ? 'bg-dark-card/90 border-dark-accent/30'
                                                                    : 'bg-white/90 border-brand-green-100'
                                                                    }`}
                                                                style={{
                                                                    width: `${200 - i * 20}px`,
                                                                    height: `${140 - i * 15}px`,
                                                                    transform: `translateY(${i * 12}px) rotate(${(i - 1) * 3}deg)`,
                                                                    zIndex: 3 - i,
                                                                }}
                                                            >
                                                                <div className="p-4 h-full flex flex-col justify-between">
                                                                    <div className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`} />
                                                                    <div className="space-y-2">
                                                                        <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-200'}`} style={{ width: `${80 - i * 10}%` }} />
                                                                        <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`} style={{ width: `${60 - i * 10}%` }} />
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                        {/* Floating count badge */}
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.8, type: 'spring' }}
                                                            className={`absolute -top-2 -right-2 lg:right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${theme === 'dark'
                                                                ? 'bg-gradient-to-br from-dark-accent to-amber-500 text-dark-bg'
                                                                : 'bg-gradient-to-br from-brand-green-500 to-brand-green-600 text-white'
                                                                }`}
                                                        >
                                                            <span className="text-2xl font-black">+{CASE_STUDIES.length - 6}</span>
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                {/* Center: Content */}
                                                <div className="flex-1 text-center lg:text-left">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                    >
                                                        <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                                            Unlock All Case Studies
                                                        </h3>
                                                        <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                                            Dive into our complete library of AI transformation stories across every industry.
                                                        </p>

                                                        {/* Category Pills */}
                                                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                                                            {['Computer Vision', 'NLP', 'Data Ops', 'Automation'].map((cat, i) => (
                                                                <motion.span
                                                                    key={cat}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.6 + i * 0.1 }}
                                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${theme === 'dark'
                                                                        ? 'bg-dark-accent/10 text-dark-accent border border-dark-accent/20'
                                                                        : 'bg-brand-green-50 text-brand-green-700 border border-brand-green-200'
                                                                        }`}
                                                                >
                                                                    {cat}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Right: CTA Button */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.7 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <motion.button
                                                        onClick={() => setIsExpanded(true)}
                                                        whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`group relative px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${theme === 'dark'
                                                            ? 'bg-dark-accent text-dark-bg hover:bg-amber-400'
                                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700'
                                                            }`}
                                                    >
                                                        {/* Shimmer effect */}
                                                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                                        </div>
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            Explore All
                                                            <motion.div
                                                                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-dark-bg/30' : 'bg-white/20'}`}
                                                                whileHover={{ rotate: 45 }}
                                                            >
                                                                <ArrowUpRight className="w-5 h-5" />
                                                            </motion.div>
                                                        </span>
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="blogs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {(isExpanded ? BLOG_POSTS : BLOG_POSTS.slice(0, 6)).map((post) => (
                                    <div key={post.id}>
                                        <BlogCard
                                            post={post}
                                            onClick={() => setSelectedBlog(post)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {!isExpanded && BLOG_POSTS.length > 6 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mt-16"
                                >
                                    {/* Innovative CTA Section */}
                                    <div className={`relative overflow-hidden rounded-[2rem] ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-dark-card via-dark-bg to-dark-card border border-dark-accent/20'
                                        : 'bg-gradient-to-br from-white via-brand-green-50/30 to-white border border-brand-green-100'
                                        }`}>
                                        {/* Animated background pattern */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-20 animate-pulse ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-400'}`} />
                                            <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-15 animate-pulse delay-1000 ${theme === 'dark' ? 'bg-amber-500' : 'bg-brand-yellow-400'}`} />
                                            {/* Grid pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                        </div>

                                        <div className="relative z-10 p-8 md:p-12">
                                            <div className="flex flex-col lg:flex-row items-center gap-10">

                                                {/* Left: Stacked Cards Preview */}
                                                <div className="relative w-full lg:w-auto flex-shrink-0">
                                                    <div className="relative h-48 w-full lg:w-80 flex items-center justify-center">
                                                        {/* Stacked card previews */}
                                                        {[2, 1, 0].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                                className={`absolute rounded-2xl shadow-xl backdrop-blur-sm border ${theme === 'dark'
                                                                    ? 'bg-dark-card/90 border-dark-accent/30'
                                                                    : 'bg-white/90 border-brand-green-100'
                                                                    }`}
                                                                style={{
                                                                    width: `${200 - i * 20}px`,
                                                                    height: `${140 - i * 15}px`,
                                                                    transform: `translateY(${i * 12}px) rotate(${(i - 1) * 3}deg)`,
                                                                    zIndex: 3 - i,
                                                                }}
                                                            >
                                                                <div className="p-4 h-full flex flex-col justify-between">
                                                                    <div className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`} />
                                                                    <div className="space-y-2">
                                                                        <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-200'}`} style={{ width: `${80 - i * 10}%` }} />
                                                                        <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`} style={{ width: `${60 - i * 10}%` }} />
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                        {/* Floating count badge */}
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.8, type: 'spring' }}
                                                            className={`absolute -top-2 -right-2 lg:right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${theme === 'dark'
                                                                ? 'bg-gradient-to-br from-dark-accent to-amber-500 text-dark-bg'
                                                                : 'bg-gradient-to-br from-brand-green-500 to-brand-green-600 text-white'
                                                                }`}
                                                        >
                                                            <span className="text-2xl font-black">+{BLOG_POSTS.length - 6}</span>
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                {/* Center: Content */}
                                                <div className="flex-1 text-center lg:text-left">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                    >
                                                        <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                                            More Insights Await
                                                        </h3>
                                                        <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                                            Explore deep technical articles and industry perspectives from our team.
                                                        </p>

                                                        {/* Category Pills */}
                                                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                                                            {['Trends', 'Technical', 'Best Practices', 'Research'].map((cat, i) => (
                                                                <motion.span
                                                                    key={cat}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.6 + i * 0.1 }}
                                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${theme === 'dark'
                                                                        ? 'bg-dark-accent/10 text-dark-accent border border-dark-accent/20'
                                                                        : 'bg-brand-green-50 text-brand-green-700 border border-brand-green-200'
                                                                        }`}
                                                                >
                                                                    {cat}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Right: CTA Button */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.7 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <motion.button
                                                        onClick={() => setIsExpanded(true)}
                                                        whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`group relative px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${theme === 'dark'
                                                            ? 'bg-dark-accent text-dark-bg hover:bg-amber-400'
                                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700'
                                                            }`}
                                                    >
                                                        {/* Shimmer effect */}
                                                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                                        </div>
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            Explore All
                                                            <motion.div
                                                                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-dark-bg/30' : 'bg-white/20'}`}
                                                                whileHover={{ rotate: 45 }}
                                                            >
                                                                <ArrowUpRight className="w-5 h-5" />
                                                            </motion.div>
                                                        </span>
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Case Study Modal */}
            <AnimatePresence>
                {selectedStudy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-hidden touch-none"
                        onClick={() => setSelectedStudy(null)}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            layoutId={`card-${selectedStudy.id}`}
                            className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain touch-auto relative ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStudy(null)}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${theme === 'dark'
                                    ? 'bg-dark-bg hover:bg-dark-accent/20'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                <X size={20} className={theme === 'dark' ? 'text-dark-text' : 'text-gray-600'} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-50'}`}>
                                        <selectedStudy.icon className={`w-8 h-8 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-semibold tracking-wider uppercase rounded-full border ${theme === 'dark'
                                        ? 'text-dark-accent bg-dark-accent/10 border-dark-accent/30'
                                        : 'text-brand-green-700 bg-brand-green-50 border-brand-green-100'
                                        }`}>
                                        {selectedStudy.category}
                                    </span>
                                </div>

                                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                    {selectedStudy.title}
                                </h2>

                                {/* Metadata Grid */}
                                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 rounded-xl border ${theme === 'dark'
                                    ? 'bg-dark-bg border-dark-accent/20'
                                    : 'bg-gray-50 border-gray-100'
                                    }`}>
                                    <div>
                                        <div className={`text-xs font-bold uppercase mb-1 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Client Type</div>
                                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>{selectedStudy.client}</div>
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase mb-1 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Duration</div>
                                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>{selectedStudy.duration}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className={`text-xs font-bold uppercase mb-1 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Project Team</div>
                                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>{selectedStudy.team}</div>
                                    </div>
                                </div>

                                <div className={`space-y-8 leading-relaxed text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-700'}`}>
                                    <section>
                                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                            <span className={`w-1 h-6 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`} />
                                            The Challenge
                                        </h3>
                                        <p>{selectedStudy.challenge}</p>
                                    </section>

                                    <section>
                                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                            <span className={`w-1 h-6 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`} />
                                            Our Solution
                                        </h3>
                                        <p>{selectedStudy.solution}</p>
                                    </section>

                                    <section>
                                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                            <span className={`w-1 h-6 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`} />
                                            Key Results
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                            {selectedStudy.outcome.map((item, i) => (
                                                <li key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${theme === 'dark'
                                                    ? 'bg-dark-accent/10 border-dark-accent/20'
                                                    : 'bg-brand-green-50/50 border-brand-green-100'
                                                    }`}>
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-200'}`}>
                                                        <Clock size={12} className={theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-800'} />
                                                    </div>
                                                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                <div className={`mt-12 pt-8 border-t flex justify-end ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-100'}`}>
                                    <Button
                                        onClick={() => navigate('/schedule-demo')}
                                        className={`rounded-full px-8 ${theme === 'dark'
                                            ? 'bg-dark-accent hover:bg-dark-accent/90 text-dark-bg'
                                            : 'bg-brand-green-600 hover:bg-brand-green-700 text-white'
                                            }`}>
                                        Schedule Similar Project
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Blog Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-hidden touch-none"
                        onClick={() => setSelectedBlog(null)}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            layoutId={`blog-${selectedBlog.id}`}
                            className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain touch-auto relative ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${theme === 'dark'
                                    ? 'bg-dark-bg/80 hover:bg-dark-accent/20 text-dark-text'
                                    : 'bg-white/80 hover:bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <X size={20} />
                            </button>

                            <div className="relative h-64 md:h-80 w-full">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                                    <div className="flex items-center gap-4 text-sm font-medium mb-3 opacity-90">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {selectedBlog.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedBlog.readTime}</span>
                                    </div>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${selectedBlog.category === 'Industry Trends' ? 'bg-amber-100 text-amber-800' :
                                        selectedBlog.category === 'Technical Deep Dive' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {selectedBlog.category}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                    {selectedBlog.title}
                                </h2>

                                <div className={`flex items-center gap-3 mb-8 p-4 rounded-xl ${theme === 'dark' ? 'bg-dark-bg border border-dark-accent/20' : 'bg-gray-50 border border-gray-100'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <User className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-500'}`}>Written by</div>
                                        <div className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{selectedBlog.author}</div>
                                    </div>
                                </div>

                                <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert text-dark-text-muted' : 'text-gray-700'}`}>
                                    <p className="text-xl leading-relaxed font-medium mb-8 opacity-90">
                                        {selectedBlog.excerpt}
                                    </p>
                                    <div className="space-y-6 leading-relaxed">
                                        {/* Placeholder for actual content since resources.ts has '...' */}
                                        <p>
                                            In the rapidly evolving landscape of artificial intelligence, {selectedBlog.title} represents a pivotal shift.
                                            Enterprises are constantly seeking ways to leverage these advancements to stay ahead of the curve.
                                        </p>
                                        <p>
                                            This article explores the nuances of {selectedBlog.category}, diving deep into the methodologies and frameworks
                                            that drive success. From data infrastructure to model alignment, every component plays a critical role.
                                        </p>
                                        <h3 className="text-2xl font-bold mt-8 mb-4">The Strategic Imperative</h3>
                                        <p>
                                            Understanding the core mechanics is just the beginning. The real value lies in the strategic application of these
                                            technologies to solve real-world business problems. Whether it's through enhanced automation, improved decision-making,
                                            or novel customer experiences, the impact is profound.
                                        </p>
                                        <p>
                                            As we continue to push the boundaries of what's possible, keeping a pulse on these developments is not just beneficial—it's essential
                                            for long-term viability and growth.
                                        </p>
                                    </div>
                                </div>

                                <div className={`mt-12 pt-8 border-t flex justify-between items-center ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-100'}`}>
                                    <span className={`text-sm italic ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                                        Posted in <strong>{selectedBlog.category}</strong>
                                    </span>
                                    <Button
                                        onClick={() => window.open('https://medium.com/@frostrek', '_blank')}
                                        className={`rounded-full px-6 ${theme === 'dark'
                                            ? 'bg-dark-accent/10 hover:bg-dark-accent/20 text-dark-accent'
                                            : 'bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-700'
                                            }`}>
                                        Read on Medium <ArrowUpRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResourcesPage;
