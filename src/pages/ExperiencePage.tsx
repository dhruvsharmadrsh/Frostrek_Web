import { motion } from 'framer-motion';
import { Phone, MessageSquare, Sparkles, Zap } from 'lucide-react';
import VoiceCallWidget from '../components/experience/VoiceCallWidget';
import ChatbotDemo from '../components/experience/ChatbotDemo';
import LinkedinOutreachDemo from '../components/demos/LinkedinOutreachDemo';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';

const ExperiencePage = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {/* Background */}
            {theme !== 'dark' && <CuteBackground />}

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-brand-green-50 border-brand-green-100'}`}>
                            <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-700'}`}>Interactive Demo</span>
                        </div>

                        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>
                            Experience{' '}
                            <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-dark-accent to-amber-400' : 'bg-gradient-to-r from-brand-green-500 to-brand-green-700'}`}>
                                AI in Action
                            </span>
                        </h1>

                        <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                            Don't just read about our AI solutions — try them yourself.
                            Test our voice AI and chatbot live, right here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Demo Cards Section */}
            <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Top Row: Voice & Chat */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Voice AI Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${theme === 'dark' ? 'bg-gradient-to-br from-dark-accent to-amber-600' : 'bg-gradient-to-br from-brand-green-400 to-brand-green-600'}`}>
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold font-heading ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>Voice AI Agent</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Real-time voice conversation</p>
                                </div>
                            </div>

                            <VoiceCallWidget />

                            <div className={`rounded-2xl p-4 border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gradient-to-r from-brand-green-50 to-[#fdfbf7] border-brand-green-100'}`}>
                                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                    <Zap className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    What to try:
                                </h4>
                                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${theme === 'dark' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-brand-yellow-400 to-brand-yellow-600'}`}>
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold font-heading ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>AI Chatbot</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Text & voice messaging</p>
                                </div>
                            </div>

                            <ChatbotDemo />

                            <div className={`rounded-2xl p-4 border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gradient-to-r from-brand-yellow-50 to-[#fdfbf7] border-brand-yellow-100'}`}>
                                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                    <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-yellow-600'}`} />
                                    Features:
                                </h4>
                                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    <li>• Natural language understanding</li>
                                    <li>• Voice message support</li>
                                    <li>• Context-aware responses</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* LinkedIn Outreach Demo (Full Width) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <div className="mb-8 text-center lg:text-left">
                            <span className="inline-block py-1 px-3 rounded-full bg-[#0077B5]/10 text-[#0077B5] text-xs font-bold tracking-wide mb-3">
                                NEW PLAYGROUND
                            </span>
                            <h2 className={`text-3xl font-bold font-heading mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>
                                LinkedIn Outreach Automation
                            </h2>
                            <p className={`max-w-2xl ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                See how our agents scrape, identify, and extract verified leads from LinkedIn in real-time.
                            </p>
                        </div>

                        <LinkedinOutreachDemo />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};

export default ExperiencePage;

