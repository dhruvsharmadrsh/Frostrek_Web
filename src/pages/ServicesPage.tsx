import { motion } from 'framer-motion';
import { Users, Brain, Code, Bot, Smartphone, Workflow, CheckCircle, ArrowRight } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';

const ServicesPage = () => {
    const services = [
        {
            number: "01",
            icon: Users,
            title: "AI Talent Sourcing and Deployment",
            description: "Source and deploy skilled AI professionals aligned with your project's specific requirements, objectives, and delivery timelines."
        },
        {
            number: "02",
            icon: Brain,
            title: "AI Model Training and Optimization",
            description: "Enhance AI model performance through expert training, optimization, and real-world evaluation to ensure accuracy, reliability, and measurable impact."
        },
        {
            number: "03",
            icon: Code,
            title: "Customized AI Development Solutions",
            description: "Design and build tailored AI systems that address complex business challenges with scalable, reliable, and efficient architectures."
        },
        {
            number: "04",
            icon: Bot,
            title: "AI Agents & Agentic AI Systems",
            description: "Develop intelligent AI agents capable of reasoning, decision-making, and autonomous task execution across business and operational workflows."
        },
        {
            number: "05",
            icon: Smartphone,
            title: "AI-Powered Application & Platform Development",
            description: "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that embed AI into everyday business use."
        },
        {
            number: "06",
            icon: Workflow,
            title: "Organizational Workflow Automation & Integration",
            description: "Integrate AI into organizational processes to automate workflows, improve efficiency, and enable seamless coordination across systems and teams."
        }
    ];

    const customSolutions = [
        "Data Annotation",
        "Data Labeling",
        "Model Evals",
        "Code Gen Models",
        "Vision Modeling",
        "LLM Assess"
    ];

    const coreValues = [
        "Trust",
        "Innovation",
        "Collaboration"
    ];

    return (
        <div className="min-h-screen relative">
            <CuteBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-background-alt to-background">
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
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-brand-green-200/50 rounded-full">
                                <span className="w-2 h-2 bg-brand-green-600 rounded-full"></span>
                                <span className="text-sm font-medium text-primary">AI SOLUTIONS</span>
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            Our AI Business <span className="text-brand-green-500">Solutions</span>
                        </h1>
                        <p className="text-lg text-secondary leading-relaxed mb-8">
                            At Frostrek AI, we believe that every organization has unique needs when it comes to building, deploying, and scaling intelligent systems. That's why we specialize in delivering customized AI and software solutions designed to align seamlessly with your business goals. Whether you are at the beginning of your AI journey or looking to enhance and operationalize existing systems, we partner with you end to end. Our services span AI model training, data workflows, agentic AI systems, and full-stack application development.
                        </p>
                        <p className="text-base text-muted leading-relaxed">
                            From sourcing top AI talent and conducting 5,000+ training and evaluation sessions to building production-ready platforms, AI agents, and workflow automation, we ensure your solutions are not only innovative but also practical and scalable. With deep expertise in Reinforcement Learning from Human Feedback (RLHF) and strong engineering capabilities, we bring human insight and robust development together. This enables organizations to deploy reliable AI systems, integrate them into real-world operations, and adapt confidently in a rapidly evolving landscape.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            We work as a family and you are part of it
                        </h2>
                        <p className="text-xl text-secondary">We are committed to:</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={value}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white/70 backdrop-blur-md border-2 border-brand-green-200/50 rounded-xl p-8 text-center hover:border-brand-green-400/70 hover:shadow-lg hover:shadow-brand-green-500/10 transition-all duration-300"
                            >
                                <h3 className="text-2xl font-bold text-brand-green-600">{value}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Services Grid */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Our Services
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.number}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative bg-white/70 backdrop-blur-md border-2 border-brand-green-200/50 rounded-xl p-6 hover:border-brand-green-400/70 hover:shadow-xl hover:shadow-brand-green-500/10 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                    <div className="relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-5xl font-bold text-brand-green-500/30">{service.number}</span>
                                            <Icon className="w-8 h-8 text-brand-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                                        <p className="text-secondary text-sm leading-relaxed">{service.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Custom and Bespoke AI Solutions */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Custom and Bespoke AI Solutions
                        </h2>
                        <p className="text-lg text-secondary max-w-3xl mx-auto">
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
                                className="bg-gradient-to-br from-brand-green-100/40 to-brand-yellow-100/30 border border-brand-green-300/50 rounded-lg p-4 text-center hover:border-brand-green-400/70 hover:shadow-lg hover:shadow-brand-green-500/10 transition-all duration-300"
                            >
                                <p className="text-primary font-semibold text-sm">{solution}</p>
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
            <section className="py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-brand-green-500/20 to-brand-yellow-500/10 border-2 border-brand-green-400/50 rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-secondary mb-8 max-w-2xl mx-auto">
                            Let's discuss how Frostrek AI can help you build intelligent, scalable solutions tailored to your needs.
                        </p>
                        <motion.button 
                            className="px-8 py-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 hover:from-brand-green-600 hover:to-brand-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-brand-green-500/30 hover:shadow-brand-green-600/40 inline-flex items-center gap-2"
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