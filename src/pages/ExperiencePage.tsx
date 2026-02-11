import { motion } from 'framer-motion';
import { Phone, MessageSquare, Sparkles, Zap, Linkedin } from 'lucide-react';
import VoiceCallWidget from '../components/experience/VoiceCallWidget';
import ChatbotDemo from '../components/experience/ChatbotDemo';
import LinkedinOutreachDemo from '../components/demos/LinkedinOutreachDemo';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';
import { useEffect } from 'react';

const ExperiencePage = () => {
    const { theme } = useTheme();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

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

                    {/* Bottom Row: LinkedIn Outreach & Future Products */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* LinkedIn Outreach Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-[#0077B5]">
                                    <Linkedin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] text-[10px] font-bold tracking-wide mb-1">
                                        NEW
                                    </span>
                                    <h2 className={`text-2xl font-bold font-heading ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>LinkedIn Outreach</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Automated lead generation</p>
                                </div>
                            </div>

                            <LinkedinOutreachDemo />

                            <div className={`rounded-2xl p-4 border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gradient-to-r from-blue-50 to-[#fdfbf7] border-blue-100'}`}>
                                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                    <Zap className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#0077B5]'}`} />
                                    Features:
                                </h4>
                                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                    <li>• Target industry & location filtering</li>
                                    <li>• Decision maker identification</li>
                                    <li>• Verified contact extraction</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Placeholder for Future Product */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 flex flex-col items-center justify-center"
                        >
                            <div className={`w-full h-full min-h-[400px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50/50'}`}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    <Sparkles className={`w-8 h-8 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-600'}`}>More Coming Soon</h3>
                                <p className={`text-center text-sm max-w-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                                    We're building more AI-powered tools. Stay tuned for exciting new demos!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};

export default ExperiencePage;

