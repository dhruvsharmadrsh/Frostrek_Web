import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SOLUTION_DATA } from '../utils/solutionData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CommonChallenges from '../components/solution/CommonChallenges';

const SolutionPage = () => {
    const location = useLocation();
    const solution = SOLUTION_DATA[location.pathname] || SOLUTION_DATA['generic'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!solution) return null;

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-brand-green-900 text-white pt-24 pb-32">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: Content */}
                        <div className="text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-brand-green-800 border border-brand-green-700 text-brand-green-100 font-medium text-sm mb-6"
                            >
                                Industry Solutions
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                            >
                                {solution.title}: <br /><span className="text-brand-green-300">{solution.subtitle}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-brand-green-100 mb-10 leading-relaxed max-w-xl"
                            >
                                {solution.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button size="lg" className="bg-white text-brand-green-900 hover:bg-gray-100 shadow-xl border-none">
                                    Book a Demo
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        </div>

                        {/* Right Column: Abstract Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl">
                                {/* Fake Header */}
                                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="h-2 w-32 bg-white/20 rounded-full" />
                                </div>
                                {/* Fake Chart / Content */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-black/20 rounded-lg p-4">
                                            <div className="h-2 w-8 bg-white/30 rounded mb-2" />
                                            <div className="h-6 w-16 bg-brand-green-400/80 rounded" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 items-end h-32">
                                    <div className="w-full bg-brand-green-500/30 rounded-t-lg h-[40%]" />
                                    <div className="w-full bg-brand-green-500/50 rounded-t-lg h-[70%]" />
                                    <div className="w-full bg-brand-green-500/40 rounded-t-lg h-[50%]" />
                                    <div className="w-full bg-brand-green-500/60 rounded-t-lg h-[80%]" />
                                    <div className="w-full bg-brand-green-400 rounded-t-lg h-[65%]" />
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-semibold">Efficiency</div>
                                        <div className="text-lg font-bold text-gray-900">+127%</div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-green-400/20 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background with Geometric Patterns */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Base Gradient */}
                    <div className="absolute inset-0 bg-brand-green-900" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Radial Glows */}
                    <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-green-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[100px] mix-blend-screen" />

                    {/* Diagonal Light Streak */}
                    <div className="absolute top-0 right-0 w-[1000px] h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 blur-3xl opacity-30" />
                </div>
            </section>

            {/* Challenges vs Solutions */}
            <CommonChallenges challenges={solution.challenges} />

            {/* Features / Solution Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Frostrek Advantage</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">How our AI technology transforms your operations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {solution.features.map((feature, idx) => (
                            <Card
                                key={idx}
                                className="group p-8 border-brand-green-100 hover:bg-brand-green-600 hover:border-brand-green-600 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-brand-green-50 flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                                    <feature.icon className="w-7 h-7 text-brand-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-brand-green-50 transition-colors leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">See {solution.title} in Action</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Schedule a personalized walkthrough to see exactly how we can solve your specific challenges.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-brand-green-600 hover:bg-brand-green-700 text-white border-none shadow-lg shadow-brand-green-600/30">
                            Book Personalized Demo
                        </Button>
                        <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 hover:text-white">
                            View Case Studies
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolutionPage;
