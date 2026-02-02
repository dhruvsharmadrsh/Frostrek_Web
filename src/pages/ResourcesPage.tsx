import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CASE_STUDIES, BLOG_POSTS } from '../data/resources';
import type { CaseStudy, BlogPost } from '../data/resources';

const ResourcesHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green-100/50 border border-brand-green-200 backdrop-blur-md text-sm font-medium text-brand-green-800 mb-8 shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-brand-green-600 animate-pulse" />
                    Knowledge Hub
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-sans font-bold text-brand-green-900 mb-6 tracking-tight"
                >
                    Insights & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-600 via-brand-green-600 to-brand-green-800">
                        Success Stories
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Deep dives into how we help enterprises build production-ready AI systems through high-quality data operations.
                </motion.p>
            </div>

            {/* Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-green-50/50 to-transparent pointer-events-none" />
        </section>
    );
};

const CaseStudyCard = ({ study, onClick }: { study: CaseStudy; onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`card-${study.id}`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <Card className="h-full p-8 border border-white/40 bg-white/60 backdrop-blur-md hover:bg-white/80 hover:shadow-xl hover:border-brand-green-200 transition-all duration-300 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green-400 to-brand-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-brand-green-50 rounded-xl group-hover:bg-brand-green-100 transition-colors">
                        <study.icon className="w-6 h-6 text-brand-green-600" />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-green-700 bg-brand-green-50 rounded-full border border-brand-green-100">
                        {study.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-green-800 transition-colors">
                    {study.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {study.description}
                </p>

                <div className="flex items-center text-brand-green-600 font-semibold text-sm group/btn">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
            </Card>
        </motion.div>
    );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
    return (
        <Card className="group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
            <div className="relative h-48 overflow-hidden">
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-green-800 uppercase tracking-wide">
                    {post.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-green-700 transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-green-100 flex items-center justify-center">
                            <User className="w-3 h-3 text-brand-green-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{post.author}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ResourcesPage = () => {
    const [activeTab, setActiveTab] = useState<'case-studies' | 'blogs'>('case-studies');
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen pb-20">
            <CuteBackground />

            <ResourcesHero />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-brand-green-100 shadow-sm inline-flex">
                        {(['case-studies', 'blogs'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative ${activeTab === tab
                                    ? 'text-white'
                                    : 'text-gray-600 hover:text-brand-green-700'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-brand-green-600 rounded-full shadow-md"
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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {CASE_STUDIES.map((study) => (
                                <CaseStudyCard
                                    key={study.id}
                                    study={study}
                                    onClick={() => setSelectedStudy(study)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="blogs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {BLOG_POSTS.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedStudy(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedStudy.id}`}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStudy(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-brand-green-50 rounded-xl">
                                        <selectedStudy.icon className="w-8 h-8 text-brand-green-600" />
                                    </div>
                                    <span className="px-3 py-1 text-sm font-semibold tracking-wider uppercase text-brand-green-700 bg-brand-green-50 rounded-full border border-brand-green-100">
                                        {selectedStudy.category}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {selectedStudy.title}
                                </h2>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <div className="text-xs text-brand-green-600 font-bold uppercase mb-1">Client Type</div>
                                        <div className="text-sm font-medium text-gray-800">{selectedStudy.client}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-brand-green-600 font-bold uppercase mb-1">Duration</div>
                                        <div className="text-sm font-medium text-gray-800">{selectedStudy.duration}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-xs text-brand-green-600 font-bold uppercase mb-1">Project Team</div>
                                        <div className="text-sm font-medium text-gray-800">{selectedStudy.team}</div>
                                    </div>
                                </div>

                                <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
                                    <section>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-brand-green-500 rounded-full" />
                                            The Challenge
                                        </h3>
                                        <p>{selectedStudy.challenge}</p>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-brand-green-500 rounded-full" />
                                            Our Solution
                                        </h3>
                                        <p>{selectedStudy.solution}</p>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-brand-green-500 rounded-full" />
                                            Key Results
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                            {selectedStudy.outcome.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 p-3 bg-brand-green-50/50 rounded-lg border border-brand-green-100">
                                                    <div className="w-5 h-5 rounded-full bg-brand-green-200 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Clock size={12} className="text-brand-green-800" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                                    <Button className="bg-brand-green-600 hover:bg-brand-green-700 text-white rounded-full px-8">
                                        Schedule Similar Project
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
