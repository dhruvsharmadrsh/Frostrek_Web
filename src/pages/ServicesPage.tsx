import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Users, Brain, Code, Bot, Smartphone, Workflow, CheckCircle, ArrowRight, Sparkles, Zap, Target, Globe, Lock, TrendingUp, Award, Rocket, Star, Layers, MessageCircle, Shield } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import { useRef, useState } from 'react';

const ServicesPage = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Brand colors - brown/tan palette only
    const brandColors = {
        primary: '#A67C5C',
        secondary: '#8B6F47',
        light: '#C49A6C',
        lighter: '#D4B896',
        lightest: '#F5E6D3',
        accent: '#B8957A',
        dark: '#2C2416',
        darkBg: '#1A1410',
    };

    const services = [
        {
            number: "01",
            icon: Users,
            title: "AI Talent Sourcing and Deployment",
            description: "Source and deploy skilled AI professionals aligned with your project's specific requirements, objectives, and delivery timelines.",
            features: ["Expert Matching", "Fast Deployment", "Quality Assurance"],
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        },
        {
            number: "02",
            icon: Brain,
            title: "AI Model Training and Optimization",
            description: "Enhance AI model performance through expert training, optimization, and real-world evaluation to ensure accuracy, reliability, and measurable impact.",
            features: ["Performance Tuning", "Real-world Testing", "Continuous Improvement"],
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
        },
        {
            number: "03",
            icon: Code,
            title: "Customized AI Development Solutions",
            description: "Design and build tailored AI systems that address complex business challenges with scalable, reliable, and efficient architectures.",
            features: ["Custom Architecture", "Scalable Solutions", "Enterprise Ready"],
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop"
        },
        {
            number: "04",
            icon: Bot,
            title: "AI Agents & Agentic AI Systems",
            description: "Develop intelligent AI agents capable of reasoning, decision-making, and autonomous task execution across business and operational workflows.",
            features: ["Autonomous Systems", "Smart Reasoning", "Task Automation"],
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
        },
        {
            number: "05",
            icon: Smartphone,
            title: "AI-Powered Application & Platform Development",
            description: "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that embed AI into everyday business use.",
            features: ["Web & Mobile", "Custom Dashboards", "Production Ready"],
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
        },
        {
            number: "06",
            icon: Workflow,
            title: "Organizational Workflow Automation & Integration",
            description: "Integrate AI into organizational processes to automate workflows, improve efficiency, and enable seamless coordination across systems and teams.",
            features: ["Process Automation", "System Integration", "Efficiency Boost"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        }
    ];

    const customSolutions = [
        { name: "Data Annotation", icon: Target, color: brandColors.primary, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop" },
        { name: "Data Labeling", icon: Zap, color: brandColors.light, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop" },
        { name: "Model Evals", icon: CheckCircle, color: brandColors.accent, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop" },
        { name: "Code Gen Models", icon: Code, color: brandColors.secondary, image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=400&fit=crop" },
        { name: "Vision Modeling", icon: Sparkles, color: brandColors.lighter, image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=400&fit=crop" },
        { name: "LLM Assess", icon: Brain, color: brandColors.primary, image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop" }
    ];

    const coreValues = [
        {
            title: "Trust",
            description: "Building lasting relationships through transparency and reliability",
            icon: Lock,
        },
        {
            title: "Innovation",
            description: "Pushing boundaries with cutting-edge AI solutions",
            icon: Rocket,
        },
        {
            title: "Collaboration",
            description: "Working together as partners in your success",
            icon: Globe,
        }
    ];

    // Enhanced parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 0]);

    // Floating particles animation
    const FloatingParticle = ({ delay = 0, duration = 20, size = 2 }: { delay?: number; duration?: number; size?: number }) => (
        <motion.div
            className="absolute rounded-full"
            style={{
                backgroundColor: brandColors.primary,
                opacity: 0.3,
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        />
    );

    // Service Card - BENTO GRID STYLE
    const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
        const ref = useRef<HTMLDivElement>(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });
        const Icon = service.icon;
        const [isHovered, setIsHovered] = useState(false);

        // Bento grid layout - alternating sizes
        const isLarge = index === 0; // First card spans 2 columns
        const gridClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative ${gridClass}`}
            >
                <div
                    className="relative h-full backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500"
                    style={{
                        backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                        borderColor: theme === 'dark' ? 'rgba(166, 124, 92, 0.3)' : 'rgba(166, 124, 92, 0.4)',
                        minHeight: '420px'
                    }}
                >
                    {/* Image Section with Better Overlay for Light Theme */}
                    <div className="relative h-52 overflow-hidden">
                        <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            style={{
                                filter: theme === 'dark' ? 'none' : 'brightness(1.15) contrast(1.15)'
                            }}
                            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.6 }}
                        />
                        {/* FIXED: Minimal overlay for better image visibility in light theme */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: theme === 'dark'
                                    ? `linear-gradient(to bottom, rgba(26, 20, 16, 0.3) 0%, rgba(26, 20, 16, 0.95) 100%)`
                                    : `linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.75) 100%)`
                            }}
                        />

                        {/* Premium badge */}
                        <motion.div
                            className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md shadow-lg"
                            style={{
                                backgroundColor: theme === 'dark' ? `${brandColors.primary}90` : `${brandColors.primary}`,
                                color: 'white'
                            }}
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Premium
                        </motion.div>

                        {/* Service number badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                            <div
                                className="p-3 rounded-2xl shadow-xl backdrop-blur-sm"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.light})`
                                }}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span
                                className="text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-md"
                                style={{
                                    color: 'white',
                                    backgroundColor: theme === 'dark' ? `${brandColors.primary}80` : brandColors.primary
                                }}
                            >
                                SERVICE {service.number}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                        <div className="relative z-10 flex flex-col">
                            {/* Title */}
                            <h3
                                className="font-black text-2xl mb-3"
                                style={{
                                    color: theme === 'dark' ? brandColors.lightest : brandColors.dark,
                                }}
                            >
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="leading-relaxed mb-5 text-base"
                                style={{
                                    color: theme === 'dark' ? 'rgba(245, 230, 211, 0.85)' : 'rgba(44, 36, 22, 0.75)'
                                }}
                            >
                                {service.description}
                            </p>

                            {/* Feature Pills */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {service.features.map((feature, idx) => (
                                    <motion.div
                                        key={feature}
                                        className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                                        style={{
                                            backgroundColor: theme === 'dark' ? 'rgba(166, 124, 92, 0.15)' : 'rgba(166, 124, 92, 0.1)',
                                            borderColor: `${brandColors.primary}50`,
                                            color: brandColors.primary
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <CheckCircle className="w-3 h-3 inline mr-1" />
                                        {feature}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="div">

                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen relative transition-colors overflow-hidden"
            style={{
                backgroundColor: theme === 'dark' ? brandColors.darkBg : '#FAFAF8'
            }}
        >
            {theme !== 'dark' && <CuteBackground />}

            {/* Floating particles throughout */}
            {[...Array(8)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 2} duration={15 + i * 2} size={2 + Math.random() * 3} />
            ))}

            {/* Hero Section */}
            <section
                className="relative pt-32 pb-24 overflow-hidden"
                style={{
                    background: theme === 'dark'
                        ? brandColors.darkBg
                        : `linear-gradient(to bottom, #FAFAF8, ${brandColors.lightest})`
                }}
            >
                {/* Large decorative orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                    style={{
                        backgroundColor: brandColors.primary,
                        y: y1,
                        opacity: opacity1
                    }}
                />
                <motion.div
                    className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
                    style={{
                        backgroundColor: brandColors.light,
                        opacity: 0.15
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Animated badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex justify-center mb-8"
                        >
                            <motion.div
                                className="flex items-center gap-3 px-6 py-3 backdrop-blur-xl border-2 rounded-full shadow-lg"
                                style={{
                                    backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                                    borderColor: `${brandColors.primary}60`
                                }}
                                animate={{
                                    boxShadow: [
                                        `0 0 0 0 ${brandColors.primary}40`,
                                        `0 0 0 8px ${brandColors.primary}00`,
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Star className="w-5 h-5" style={{ color: brandColors.primary, fill: brandColors.primary }} />
                                </motion.div>
                                <span
                                    className="text-sm font-bold tracking-wide"
                                    style={{ color: brandColors.primary }}
                                >
                                    AI SOLUTIONS & INNOVATION
                                </span>
                                <Sparkles className="w-5 h-5" style={{ color: brandColors.primary }} />
                            </motion.div>
                        </motion.div>

                        {/* Hero text - centered */}
                        <div className="text-center mb-12">
                            <motion.h1
                                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
                                style={{ color: theme === 'dark' ? brandColors.lightest : brandColors.dark }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Transform Your Business
                                <br />
                                <motion.span
                                    style={{
                                        backgroundImage: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.light}, ${brandColors.primary})`,
                                        backgroundSize: '200% auto',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                    animate={{
                                        backgroundPosition: ['0% center', '200% center'],
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    with AI Innovation
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed"
                                style={{ color: theme === 'dark' ? 'rgba(245, 230, 211, 0.85)' : 'rgba(44, 36, 22, 0.7)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                We deliver customized AI and software solutions designed to align seamlessly with your business goals.
                            </motion.p>
                        </div>

                        {/* Stats - Horizontal Layout */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-12"
                        >
                            {[
                                { number: "5000+", label: "Training Sessions", icon: Award },
                                { number: "100+", label: "AI Projects", icon: TrendingUp },
                                { number: "50+", label: "Expert Team", icon: Users }
                            ].map((stat, index) => {
                                const StatIcon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="group text-center"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <motion.div
                                                className="p-3 rounded-xl"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.light})`
                                                }}
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                            >
                                                <StatIcon className="w-6 h-6 text-white" />
                                            </motion.div>

                                            <div>
                                                <h3
                                                    className="text-4xl md:text-5xl font-black mb-1"
                                                    style={{
                                                        backgroundImage: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.light})`,
                                                        backgroundClip: 'text',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    }}
                                                >
                                                    {stat.number}
                                                </h3>
                                                <p
                                                    className="text-sm font-semibold"
                                                    style={{ color: theme === 'dark' ? 'rgba(245, 230, 211, 0.7)' : 'rgba(44, 36, 22, 0.6)' }}
                                                >
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section
                className="py-24 relative overflow-hidden"
                style={{
                    backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.3)' : 'rgba(255, 255, 255, 0.3)'
                }}
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2
                            className="text-4xl md:text-6xl font-black mb-4"
                            style={{ color: theme === 'dark' ? brandColors.lightest : brandColors.dark }}
                        >
                            Built on{' '}
                            <span
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.light})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Core Values
                            </span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
                        {coreValues.map((value, index) => {
                            const ValueIcon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="group flex-1"
                                >
                                    <motion.div
                                        className="relative backdrop-blur-xl border-2 rounded-3xl p-8 overflow-hidden h-full cursor-pointer"
                                        style={{
                                            backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                                            borderColor: `${brandColors.primary}40`
                                        }}
                                        whileHover={{
                                            y: -12,
                                            scale: 1.03,
                                            borderColor: brandColors.primary,
                                            boxShadow: `0 25px 50px -12px ${brandColors.primary}50`
                                        }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        {/* Beautiful gradient overlay on hover - semi-transparent */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl transition-opacity duration-500"
                                            style={{
                                                backgroundImage: theme === 'dark'
                                                    ? `linear-gradient(135deg, ${brandColors.primary}DD, ${brandColors.light}DD)`
                                                    : `linear-gradient(135deg, ${brandColors.lightest}, ${brandColors.lighter})`,
                                                opacity: 0
                                            }}
                                            whileHover={{ opacity: 1 }}
                                        />

                                        {/* Animated particles/dots on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '20%',
                                                    top: '10%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                            />
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '35%',
                                                    top: '22%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2.3,
                                                    repeat: Infinity,
                                                    delay: 0.2
                                                }}
                                            />
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '50%',
                                                    top: '34%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2.6,
                                                    repeat: Infinity,
                                                    delay: 0.4
                                                }}
                                            />
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '65%',
                                                    top: '46%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2.9,
                                                    repeat: Infinity,
                                                    delay: 0.6
                                                }}
                                            />
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '80%',
                                                    top: '58%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 3.2,
                                                    repeat: Infinity,
                                                    delay: 0.8
                                                }}
                                            />
                                            <motion.div
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: brandColors.primary,
                                                    left: '90%',
                                                    top: '70%'
                                                }}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 3.5,
                                                    repeat: Infinity,
                                                    delay: 1
                                                }}
                                            />
                                        </div>
                                        {/* Animated corner decoration */}
                                        <motion.div
                                            className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `radial-gradient(circle, ${brandColors.primary}40, transparent 70%)`,
                                            }}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                rotate: [0, 90, 180],
                                            }}
                                            transition={{ duration: 8, repeat: Infinity }}
                                        />

                                        <div className="relative z-10">
                                            <motion.div
                                                className="mb-6 inline-block p-4 rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.light})`,
                                                }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    rotate: [0, -5, 5, 0]
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <ValueIcon className="w-10 h-10 text-white" />
                                            </motion.div>

                                            <motion.h3
                                                className="text-3xl font-black mb-3 transition-all duration-500"
                                                style={{
                                                    color: theme === 'dark' ? brandColors.lightest : brandColors.dark
                                                }}
                                                whileHover={{ x: 5 }}
                                            >
                                                {value.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-base leading-relaxed transition-all duration-500"
                                                style={{
                                                    color: theme === 'dark' ? 'rgba(245, 230, 211, 0.85)' : 'rgba(44, 36, 22, 0.8)'
                                                }}
                                            >
                                                {value.description}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Services - BENTO GRID LAYOUT */}
            <section
                className="py-24 relative"
                style={{
                    background: theme === 'dark'
                        ? brandColors.darkBg
                        : `linear-gradient(to bottom, #FAFAF8, ${brandColors.lightest})`
                }}
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="inline-block mb-4"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Rocket className="w-12 h-12" style={{ color: brandColors.primary }} />
                        </motion.div>

                        <h2
                            className="text-4xl md:text-6xl font-black mb-4"
                            style={{ color: theme === 'dark' ? brandColors.lightest : brandColors.dark }}
                        >
                            Our Premium{' '}
                            <span
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.light})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                AI Services
                            </span>
                        </h2>
                        <p
                            className="text-lg max-w-2xl mx-auto"
                            style={{ color: theme === 'dark' ? 'rgba(245, 230, 211, 0.8)' : 'rgba(44, 36, 22, 0.7)' }}
                        >
                            Comprehensive solutions tailored to transform your business
                        </p>
                    </motion.div>

                    {/* Bento grid - 2 column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <ServiceCard key={service.number} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Solutions - BENTO GRID WITH IMAGES */}
            <section
                className="py-24 relative overflow-hidden"
                style={{
                    backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                }}
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2
                            className="text-4xl md:text-6xl font-black mb-4"
                            style={{ color: theme === 'dark' ? brandColors.lightest : brandColors.dark }}
                        >
                            Specialized{' '}
                            <span
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.light})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                AI Capabilities
                            </span>
                        </h2>
                    </motion.div>

                    {/* Bento Grid Layout for capabilities */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                        {customSolutions.map((solution, index) => {
                            const Icon = solution.icon;
                            const isLarge = index === 0 || index === 3;

                            return (
                                <motion.div
                                    key={solution.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        zIndex: 10
                                    }}
                                    className={`group relative ${isLarge ? 'md:col-span-2' : ''}`}
                                >
                                    <div
                                        className="relative h-full border-2 rounded-2xl overflow-hidden transition-all duration-300"
                                        style={{
                                            backgroundColor: theme === 'dark' ? 'rgba(26, 20, 16, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                            borderColor: `${solution.color}60`,
                                            minHeight: '220px'
                                        }}
                                    >
                                        {/* Background Image with FIXED Better Overlay for Light Theme */}
                                        <div className="absolute inset-0">
                                            <motion.img
                                                src={solution.image}
                                                alt={solution.name}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    filter: theme === 'dark' ? 'none' : 'brightness(1.1) contrast(1.1)'
                                                }}
                                                animate={{
                                                    scale: 1.1
                                                }}
                                                whileHover={{
                                                    scale: 1.15
                                                }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            {/* FIXED: Minimal overlay for maximum image visibility in light theme */}
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: theme === 'dark'
                                                        ? `linear-gradient(135deg, rgba(26, 20, 16, 0.85) 0%, rgba(26, 20, 16, 0.6) 100%)`
                                                        : `linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.35) 100%)`
                                                }}
                                            />
                                        </div>

                                        {/* Animated glow */}
                                        <motion.div
                                            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur-lg -z-10"
                                            style={{
                                                backgroundColor: solution.color
                                            }}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <motion.div
                                                    className="p-3 rounded-xl shadow-xl"
                                                    style={{
                                                        backgroundColor: solution.color,
                                                        boxShadow: `0 10px 30px ${solution.color}40`
                                                    }}
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <Icon className="w-6 h-6 text-white" />
                                                </motion.div>

                                                {/* Decorative corner element */}
                                                <motion.div
                                                    className="w-12 h-12 rounded-lg opacity-20"
                                                    style={{ backgroundColor: solution.color }}
                                                    animate={{
                                                        rotate: [0, 90, 0],
                                                    }}
                                                    transition={{ duration: 8, repeat: Infinity }}
                                                />
                                            </div>

                                            <div>
                                                <h3
                                                    className="font-black text-2xl mb-2"
                                                    style={{ color: solution.color }}
                                                >
                                                    {solution.name}
                                                </h3>
                                                <motion.div
                                                    className="h-1 rounded-full"
                                                    style={{ backgroundColor: solution.color }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '60px' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-32 relative overflow-hidden"
                style={{
                    background: theme === 'dark'
                        ? `linear-gradient(135deg, ${brandColors.darkBg}, ${brandColors.dark})`
                        : `linear-gradient(135deg, ${brandColors.lightest}, ${brandColors.lighter})`
                }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-full opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, ${brandColors.primary} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${brandColors.light} 0%, transparent 50%)`
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="flex justify-center mb-8"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Sparkles className="w-20 h-20" style={{ color: brandColors.primary }} />
                            </motion.div>

                            <h2
                                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
                                style={{ color: theme === 'dark' ? brandColors.lightest : brandColors.dark }}
                            >
                                Ready to Build the Future?
                            </h2>

                            <p
                                className="text-xl md:text-2xl mb-12"
                                style={{ color: theme === 'dark' ? 'rgba(245, 230, 211, 0.85)' : 'rgba(44, 36, 22, 0.7)' }}
                            >
                                Let's create intelligent, scalable AI solutions tailored to your vision.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.button
                                    className="px-10 py-5 text-lg font-bold rounded-2xl transition-all duration-300 shadow-lg inline-flex items-center gap-3 text-white"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.light})`
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: `0 25px 50px ${brandColors.primary}60`
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Start Your Project</span>
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </motion.button>

                                <motion.button
                                    className="px-10 py-5 text-lg font-bold rounded-2xl border-2 inline-flex items-center gap-3"
                                    style={{
                                        borderColor: brandColors.primary,
                                        color: brandColors.primary,
                                        backgroundColor: 'transparent'
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: `${brandColors.primary}10`
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Schedule a Call</span>
                                </motion.button>
                            </div>

                            {/* Trust badges */}
                            <motion.div
                                className="mt-16 flex justify-center gap-8 flex-wrap"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                {[
                                    { icon: Shield, text: "Enterprise Security" },
                                    { icon: Award, text: "Industry Leading" },
                                    { icon: Layers, text: "Scalable Solutions" }
                                ].map((badge, idx) => {
                                    const BadgeIcon = badge.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-2">
                                            <BadgeIcon className="w-5 h-5" style={{ color: brandColors.primary }} />
                                            <span
                                                className="text-sm font-semibold"
                                                style={{ color: theme === 'dark' ? 'rgba(245, 230, 211, 0.7)' : 'rgba(44, 36, 22, 0.6)' }}
                                            >
                                                {badge.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
