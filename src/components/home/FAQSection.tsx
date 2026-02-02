import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const FAQS = [
    {
        question: "How does the AI Project Review process work?",
        answer: "We start with a comprehensive audit of your current infrastructure and goals. Our team then designs a tailored roadmap, selecting the right models and architecture to ensure scalability and ROI."
    },
    {
        question: "Is my data secure with your AI models?",
        answer: "Absolutely. Security is our top priority. We implement enterprise-grade encryption, on-premise deployment options, and strict compliance with global data protection standards (GDPR, ISO)."
    },
    {
        question: "Can you integrate with our existing software?",
        answer: "Yes, our solutions are designed to be agnostic. We build custom APIs and middleware to seamlessly integrate with your CRM, ERP, or legacy systems without disrupting operations."
    },
    {
        question: "What is the typical timeline for an MVP?",
        answer: "Most MVPs are delivered within 4-8 weeks, depending on complexity. We use agile methodologies to ensure rapid iteration and quick time-to-market."
    },
    {
        question: "Do you offer post-deployment support?",
        answer: "We provide 24/7 monitoring and maintenance packages to ensure your AI systems remain efficient, secure, and up-to-date with the latest advancements."
    }
];

const FAQSection = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute top-20 right-[10%] w-64 h-64 rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-[#B07552]' : 'bg-[#E6D0C6]'}`} />
                <div className={`absolute bottom-20 left-[10%] w-72 h-72 rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-dark-accent' : 'bg-blue-200'}`} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-white/10 text-[#B07552]' : 'bg-[#F3E9CD] text-[#8A5A35]'}`}>
                            Common Queries
                        </span>
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-6 font-display ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B07552] to-[#E6D0C6]">Questions</span>
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Everything you need to know about our process, security, and delivery.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQS.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`rounded-2xl border transition-all duration-300 ${theme === 'dark'
                                    ? `bg-white/5 border-white/10 hover:border-[#B07552]/50 ${activeIndex === index ? 'border-[#B07552]' : ''}`
                                    : `bg-white border-gray-200 hover:border-[#B07552]/50 ${activeIndex === index ? 'border-[#B07552] shadow-lg' : 'shadow-sm'}`
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${theme === 'dark' ? 'bg-white/10 text-[#B07552]' : 'bg-[#F3E9CD] text-[#8A5A35]'
                                        }`}>
                                        {index + 1}
                                    </span>
                                    <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    {activeIndex === index ?
                                        <Minus className={`w-5 h-5 ${theme === 'dark' ? 'text-[#B07552]' : 'text-[#8A5A35]'}`} /> :
                                        <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    }
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className={`px-6 pb-6 pl-[4.5rem] leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div className="mt-12 text-center">
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Still have questions? We're here to help.</p>
                    <a href="/contact" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                        <HelpCircle size={18} /> Contact Support
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
