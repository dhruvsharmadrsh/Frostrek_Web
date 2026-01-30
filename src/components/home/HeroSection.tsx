"use client";



import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Lazy load 3D component to prevent blocking initial page load
import HeroRobot from './HeroRobot';

const ROTATING_TEXTS = [
    { part1: "Employee Experiences", part2: "AI Copilots" },
    { part1: "Support Workflows", part2: "AI Agents" },
    { part1: "Operations", part2: "Automation" },
];

const ROBOT_MESSAGES = [
    "Hi there! 👋",
    "I'm Frostry 🤖",
    "Ask me anything! 💡",
    "How can I help? 🚀"
];

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [showMessage, setShowMessage] = useState(true);

    // Text Rotation Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Robot Message Cycling
    useEffect(() => {
        const interval = setInterval(() => {
            setShowMessage(false);
            setTimeout(() => {
                setMessageIndex((prev) => (prev + 1) % ROBOT_MESSAGES.length);
                setShowMessage(true);
            }, 500);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-8 bg-[#FDFBF7]">
            {/* Decorative Elements - Bronze Theme (matching TestimonialsSection) */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#B07552]/20 opacity-60" />
            <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-[#E6D0C6] to-[#B07552] opacity-20" />
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#B07552]/20 opacity-50" />
            <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-[#B07552] to-amber-600 opacity-20" />
            <div className="absolute top-1/2 right-0 w-16 h-16 rounded-full bg-[#B07552] opacity-20 translate-x-1/2" />
            {/* Additional subtle background gradients */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#E6D0C6]/10 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#F3E9CD]/15 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-8 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full mx-auto lg:mx-0">
                        {/* Transforming */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-primary tracking-tight mb-8 w-full flex flex-col items-center lg:items-start">
                            <span className="block">Transforming</span>

                            {/* Line 2: Animated Part 1 */}
                            <div className="h-[1.4em] relative overflow-hidden flex items-center justify-center lg:justify-start w-fit min-w-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="block whitespace-nowrap text-[#B07552] pb-1"
                                    >
                                        {ROTATING_TEXTS[index].part1}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            <span className="block whitespace-nowrap">with Conversational</span>

                            {/* Line 4: Animated Part 2 */}
                            <div className="h-[1.4em] relative overflow-hidden flex items-center justify-center lg:justify-start w-fit min-w-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                        className="block whitespace-nowrap text-[#B07552] pb-1"
                                    >
                                        {ROTATING_TEXTS[index].part2}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted mb-10 max-w-[600px] lg:max-w-lg leading-relaxed">
                            Harness the power of AI to enhance productivity, streamline workflows, and foster a more engaged workforce across your enterprise.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/schedule-demo" className="px-8 py-4 bg-[#B07552] hover:bg-[#8A5A35] text-white rounded-xl font-semibold shadow-lg shadow-[#B07552]/20 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
                                Schedule a Demo
                            </Link>
                            <button className="px-8 py-4 bg-transparent border-2 border-[#B07552] text-[#B07552] hover:bg-[#B07552]/5 rounded-xl font-semibold transition-all w-full sm:w-auto">
                                Contact Sales
                            </button>
                        </div>
                    </div>

                    {/* Right Column: 3D Robot */}
                    <div className="flex justify-center lg:justify-end relative mt-8 lg:mt-0">
                        <div className="relative w-full max-w-[450px] lg:max-w-[550px] aspect-square flex items-center justify-center">
                            {/* Subtle glow behind robot */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#E6D0C6] to-transparent opacity-30 rounded-full blur-3xl transform scale-90" />

                            {/* Interactive Message Bubble - positioned above robot head */}
                            <AnimatePresence>
                                {showMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute top-[-5%] left-1/2 -translate-x-1/2 z-50"
                                        style={{ fontFamily: 'Quicksand, sans-serif' }}
                                    >
                                        <div className="relative bg-gradient-to-br from-white to-[#FDF8F3] backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(176,117,82,0.25)] border-2 border-[#B07552]/30">
                                            <span className="text-[#5c3d2e] font-semibold text-lg whitespace-nowrap">
                                                {ROBOT_MESSAGES[messageIndex]}
                                            </span>
                                            {/* Speech bubble arrow pointing down to robot */}
                                            <div
                                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-white to-[#FDF8F3] rotate-45 border-r-2 border-b-2 border-[#B07552]/30"
                                                style={{ boxShadow: '2px 2px 4px rgba(176,117,82,0.15)' }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 3D Robot with loading fallback */}
                            <motion.div
                                className="w-full h-full relative z-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Suspense
                                    fallback={
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full border-4 border-[#B07552]/20 border-t-[#B07552] animate-spin" />
                                        </div>
                                    }
                                >
                                    <HeroRobot />
                                </Suspense>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

