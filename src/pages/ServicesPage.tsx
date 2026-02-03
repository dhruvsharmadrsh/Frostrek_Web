import { motion } from 'framer-motion';
import { Users, Brain, Code, CheckCircle, ArrowRight } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import InteractiveValues from '../components/services/InteractiveValues';
import InteractiveServices from '../components/services/InteractiveServices';

const ServicesPage = () => {
    const { theme } = useTheme();

    const customSolutions = [
        "Data Annotation",
        "Data Labeling",
        "Model Evals",
        "Code Gen Models",
        "Vision Modeling",
        "LLM Assess"
    ];



    return (
        <div className={`min-h-screen relative transition-colors ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {theme !== 'dark' && <CuteBackground />}

            {/* Hero Section */}
            <section className={`relative pt-32 pb-20 overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-br from-background via-background-alt to-background'}`}>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <div className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-white/70 border-brand-green-200/50'}`}>
                                <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`}></span>
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-accent' : 'text-primary'}`}>AI SOLUTIONS</span>
                            </div>
                        </motion.div>

                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>
                            Our AI Business <span className={theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-500'}>Solutions</span>
                        </h1>
                        <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-secondary'}`}>
                            At Frostrek AI, we believe that every organization has unique needs when it comes to building, deploying, and scaling intelligent systems. That's why we specialize in delivering customized AI and software solutions designed to align seamlessly with your business goals. Whether you are at the beginning of your AI journey or looking to enhance and operationalize existing systems, we partner with you end to end. Our services span AI model training, data workflows, agentic AI systems, and full-stack application development.
                        </p>
                        <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted/80' : 'text-muted'}`}>
                            From sourcing top AI talent and conducting 5,000+ training and evaluation sessions to building production-ready platforms, AI agents, and workflow automation, we ensure your solutions are not only innovative but also practical and scalable. With deep expertise in Reinforcement Learning from Human Feedback (RLHF) and strong engineering capabilities, we bring human insight and robust development together. This enables organizations to deploy reliable AI systems, integrate them into real-world operations, and adapt confidently in a rapidly evolving landscape.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values Section */}
            <InteractiveValues />

            {/* Main Services Grid - Interactive Component */}
            <InteractiveServices />

            {/* Custom and Bespoke AI Solutions */}
            <section className={`py-20 relative ${theme === 'dark' ? 'bg-dark-card' : ''}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>
                            Custom and Bespoke AI Solutions
                        </h2>
                        <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-secondary'}`}>
                            Frostrek AI offers tailored AI services designed to meet your specific business needs. From model creation to optimization, we ensure your AI solutions align with your goals.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {customSolutions.map((solution, index) => (
                            <motion.div
                                key={solution}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`border rounded-lg p-4 text-center transition-all duration-300 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 hover:border-dark-accent' : 'bg-gradient-to-br from-brand-green-100/40 to-brand-yellow-100/30 border-brand-green-300/50 hover:border-brand-green-400/70 hover:shadow-lg hover:shadow-brand-green-500/10'}`}
                            >
                                <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>{solution}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Service Sections */}
            {/* AI Talent Sourcing */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                AI Talent Sourcing and Deployment
                            </h2>
                            <p className="text-secondary leading-relaxed mb-6">
                                Finding the right talent is critical to the success of your AI initiatives. At Frostrek AI, we specialize in sourcing top-tier AI experts, including engineers, data scientists, and RLHF specialists, who are ready to integrate seamlessly into your team. Whether you need short-term support or long-term partnerships, we ensure that every professional we provide aligns with your project's needs and culture.
                            </p>
                            <div className="flex gap-4">
                                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-primary font-semibold mb-2">AI Talent Sourcing</h4>
                                    <p className="text-secondary text-sm">Access to top-tier AI professionals ready to integrate into your team</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center"
                        >
                            <div className="w-full h-80 bg-gradient-to-br from-brand-green-100/50 to-brand-yellow-100/30 rounded-xl border border-brand-green-300/50 flex items-center justify-center">
                                <Users className="w-32 h-32 text-brand-green-600/70" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* AI Model Training */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1 flex items-center justify-center"
                        >
                            <div className="w-full h-80 bg-gradient-to-br from-brand-green-100/50 to-brand-yellow-100/30 rounded-xl border border-brand-green-300/50 flex items-center justify-center">
                                <Brain className="w-32 h-32 text-brand-green-600/70" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                AI Model Training and Optimization
                            </h2>
                            <p className="text-secondary leading-relaxed mb-6">
                                With over 5000+ training sessions conducted, our expertise in Reinforcement Learning from Human Feedback (RLHF) ensures your AI models are more accurate, efficient, and responsive. From training models to understand nuanced user behavior to optimizing existing systems for peak performance, we ensure your AI evolves effectively and stays ahead in a competitive market.
                            </p>
                            <div className="bg-brand-green-500/10 border border-brand-green-400/50 rounded-lg p-4">
                                <p className="text-brand-green-700 font-semibold text-lg">5000+ Training Sessions Conducted</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Customized AI Development */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                Customized AI Development Solutions
                            </h2>
                            <p className="text-secondary leading-relaxed mb-6">
                                Every business has unique requirements, and we understand the importance of personalized solutions. Our team collaborates with you to design and develop AI systems tailored specifically to your objectives. From ideation to implementation, we focus on delivering solutions that are scalable, reliable, and capable of solving your most complex challenges.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center"
                        >
                            <div className="w-full h-80 bg-gradient-to-br from-brand-green-100/50 to-brand-yellow-100/30 rounded-xl border border-brand-green-300/50 flex items-center justify-center">
                                <Code className="w-32 h-32 text-brand-green-600/70" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-20 relative ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`border-2 rounded-2xl p-12 text-center ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-gradient-to-br from-brand-green-500/20 to-brand-yellow-500/10 border-brand-green-400/50'}`}
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>
                            Ready to Transform Your Business?
                        </h2>
                        <p className={`mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-secondary'}`}>
                            Let's discuss how Frostrek AI can help you build intelligent, scalable solutions tailored to your needs.
                        </p>
                        <motion.button
                            className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 shadow-lg inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90 shadow-dark-accent/30' : 'bg-gradient-to-r from-brand-green-500 to-brand-green-600 hover:from-brand-green-600 hover:to-brand-green-700 text-white shadow-brand-green-500/30 hover:shadow-brand-green-600/40'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Schedule a Consultation
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;