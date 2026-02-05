import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SOLUTION_DATA } from '../utils/solutionData';
import Button from '../components/ui/Button';
import CommonChallenges from '../components/solution/CommonChallenges';
import FrostrekAdvantage from '../components/solution/FrostrekAdvantage';
import AllSolutionsSection from '../components/solution/AllSolutionsSection';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';

const SolutionPage = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const solution = SOLUTION_DATA[location.pathname] || SOLUTION_DATA['generic'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!solution) return null;

    return (
        <div className={`pt-20 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {/* Hero Section */}
            <section className={`relative overflow-hidden text-white pt-24 pb-32 ${theme === 'dark' ? 'bg-dark-navbar' : 'bg-brand-green-900'}`}>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: Content */}
                        <div className="text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`inline-block px-4 py-1.5 rounded-full border font-medium text-sm mb-6 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 text-dark-accent' : 'bg-brand-green-800 border-brand-green-700 text-brand-green-100'}`}
                            >
                                Industry Solutions
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                            >
                                {solution.title}: <br /><span className={theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-300'}>{solution.subtitle}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-xl mb-10 leading-relaxed max-w-xl ${theme === 'dark' ? 'text-dark-text-muted' : 'text-brand-green-100'}`}
                            >
                                {solution.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link to="/schedule-demo">
                                    <Button size="lg" className={`shadow-xl border-none ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-white text-brand-green-900 hover:bg-gray-100'}`}>
                                        Book a Demo
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column: Abstract Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative hidden lg:block"
                        >
                            <div className={`relative z-10 rounded-2xl backdrop-blur-md border p-6 shadow-2xl ${theme === 'dark' ? 'bg-dark-card/50 border-dark-accent/20' : 'bg-white/10 border-white/20'}`}>
                                {/* Fake Header */}
                                <div className={`flex items-center gap-4 mb-6 border-b pb-4 ${theme === 'dark' ? 'border-dark-accent/20' : 'border-white/10'}`}>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className={`h-2 w-32 rounded-full ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-white/20'}`} />
                                </div>
                                {/* Fake Chart / Content */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-dark-bg/50' : 'bg-black/20'}`}>
                                            <div className={`h-2 w-8 rounded mb-2 ${theme === 'dark' ? 'bg-dark-text/30' : 'bg-white/30'}`} />
                                            <div className={`h-6 w-16 rounded ${theme === 'dark' ? 'bg-dark-accent/80' : 'bg-brand-green-400/80'}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 items-end h-32">
                                    <div className={`w-full rounded-t-lg h-[40%] ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-500/30'}`} />
                                    <div className={`w-full rounded-t-lg h-[70%] ${theme === 'dark' ? 'bg-dark-accent/50' : 'bg-brand-green-500/50'}`} />
                                    <div className={`w-full rounded-t-lg h-[50%] ${theme === 'dark' ? 'bg-dark-accent/40' : 'bg-brand-green-500/40'}`} />
                                    <div className={`w-full rounded-t-lg h-[80%] ${theme === 'dark' ? 'bg-dark-accent/60' : 'bg-brand-green-500/60'}`} />
                                    <div className={`w-full rounded-t-lg h-[65%] ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-400'}`} />
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div
                                className={`absolute -top-6 -right-6 rounded-xl p-4 shadow-xl z-20 animate-bounce-slow ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-green-100'}`}>
                                        <CheckCircle2 className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-green-600'}`} />
                                    </div>
                                    <div>
                                        <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Efficiency</div>
                                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>+127%</div>
                                    </div>
                                </div>
                            </div>

                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl -z-10 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-400/20'}`} />
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background with Geometric Patterns */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Base Gradient */}
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-dark-navbar' : 'bg-brand-green-900'}`} />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Radial Glows */}
                    <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen animate-pulse ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-brand-green-600/30'}`} style={{ animationDuration: '4s' }} />
                    <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen ${theme === 'dark' ? 'bg-amber-500/20' : 'bg-teal-500/20'}`} />

                    {/* Diagonal Light Streak */}
                    <div className="absolute top-0 right-0 w-[1000px] h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 blur-3xl opacity-30" />
                </div>
            </section>

            {/* All Solutions Section - Only on /solutions */}
            {location.pathname === '/solutions' && <AllSolutionsSection />}

            {/* Challenges vs Solutions */}
            <CommonChallenges key={location.pathname} challenges={solution.challenges} />

            {/* Features / Solution Grid */}
            <FrostrekAdvantage key={`features-${location.pathname}`} features={solution.features} />

            {/* Bottom CTA */}
            <CTASection />
        </div>
    );
};

export default SolutionPage;

