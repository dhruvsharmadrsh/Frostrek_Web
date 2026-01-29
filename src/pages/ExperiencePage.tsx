import { motion } from 'framer-motion';
import { Phone, MessageSquare, Sparkles, Zap, ArrowRight } from 'lucide-react';
import VoiceCallWidget from '../components/experience/VoiceCallWidget';
import ChatbotDemo from '../components/experience/ChatbotDemo';
import CuteBackground from '../components/ui/CuteBackground';

const ExperiencePage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <CuteBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green-50 border border-brand-green-100 mb-6">
                            <Sparkles className="w-4 h-4 text-brand-green-600" />
                            <span className="text-sm font-medium text-brand-green-700">Interactive Demo</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-heading">
                            Experience{' '}
                            <span className="bg-gradient-to-r from-brand-green-500 to-cyan-500 bg-clip-text text-transparent">
                                AI in Action
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Don't just read about our AI solutions — try them yourself.
                            Test our voice AI and chatbot live, right here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Demo Cards Section */}
            <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Voice AI Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-green-400 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-heading">Voice AI Agent</h2>
                                    <p className="text-sm text-gray-500">Real-time voice conversation</p>
                                </div>
                            </div>

                            <VoiceCallWidget />

                            <div className="bg-gradient-to-r from-brand-green-50 to-cyan-50 rounded-2xl p-4 border border-brand-green-100">
                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-brand-green-600" />
                                    What to try:
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Ask about Frostrek's services</li>
                                    <li>• Request a demo or quote</li>
                                    <li>• Inquire about AI solutions</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Chatbot Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-heading">AI Chatbot</h2>
                                    <p className="text-sm text-gray-500">Text & voice messaging</p>
                                </div>
                            </div>

                            <ChatbotDemo />

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    Features:
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Natural language understanding</li>
                                    <li>• Voice message support</li>
                                    <li>• Context-aware responses</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
                    >
                        {/* Glow effects */}
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-green-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-heading">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                                Get a personalized demo and see how our AI solutions can
                                automate your workflows and delight your customers.
                            </p>
                            <motion.a
                                href="/schedule-demo"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-brand-green-600 hover:to-brand-green-700 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Schedule a Demo
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ExperiencePage;
