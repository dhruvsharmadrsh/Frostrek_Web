"use client";



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING_TEXTS = [
    { part1: "Employee Experiences", part2: "AI Copilots" },
    { part1: "Support Workflows", part2: "AI Agents" },
    { part1: "Operations", part2: "Automation" },
];

const HeroSection = () => {
    const [index, setIndex] = useState(0);

    // Text Rotation Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 lg:pt-44 pb-16 bg-[#FDFBF7]">
            {/* Background Texture (Subtle shapes) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#E6D0C6]/20 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#F3E9CD]/30 blur-[120px]" />
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
                            <button className="px-8 py-4 bg-[#B07552] hover:bg-[#8A5A35] text-white rounded-xl font-semibold shadow-lg shadow-[#B07552]/20 transition-all transform hover:scale-105 w-full sm:w-auto">
                                Schedule a Demo
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-[#B07552] text-[#B07552] hover:bg-[#B07552]/5 rounded-xl font-semibold transition-all w-full sm:w-auto">
                                Contact Sales
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Robot Image (Clean) */}
                    <div className="flex justify-center lg:justify-end relative mt-8 lg:mt-0">
                        <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square flex items-center justify-center">
                            {/* Subtle glow behind robot */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#E6D0C6] to-transparent opacity-30 rounded-full blur-3xl transform scale-90" />

                            <motion.img
                                src="/robo2.gif"
                                alt="AI Robot Assistant"
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
