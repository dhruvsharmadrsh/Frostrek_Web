"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";


const StackedCards = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Logic
    // We pin the section for 300vh, moving the track horizontally
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-transparent">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-[10vw] pr-[10vw]">

                    {/* CARD 1: AI AGENT */}
                    <div className="group relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/10 p-8 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-brand-green-400/50 hover:bg-neutral-900/60 shadow-[0_0_50px_-12px_rgba(45,212,191,0.2)] hover:shadow-[0_0_80px_-20px_rgba(45,212,191,0.5)]">
                        {/* Holographic Inner Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-20">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">
                                Frosty AI Agent
                            </h3>
                            <p className="text-neutral-300 text-xl leading-relaxed max-w-xl font-light">
                                Our autonomous AI agents handle complex customer inquiries 24/7, reducing support costs by up to 60% while maintaining a human-like touch.
                            </p>
                            <ul className="mt-10 space-y-4">
                                {["Natural Language Processing", "24/7 Availability", "Sentiment Analysis"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white/90 text-lg">
                                        <div className="w-8 h-8 rounded-full bg-brand-green-400/20 border border-brand-green-400/30 flex items-center justify-center text-brand-green-400 shadow-[0_0_10px_rgba(45,212,191,0.3)]">
                                            <Check size={16} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Image Container - Fixed Visibility */}
                        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 z-10 translate-x-1/4 translate-y-1/4 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-700 ease-out">
                            <img
                                src="/optimized/chatbot-rafiki.webp"
                                alt="AI Agent"
                                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]"
                            />
                        </div>
                    </div>

                    {/* CARD 2: AI DEVELOPER */}
                    <div className="group relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/10 p-8 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:bg-neutral-900/60 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.5)]">
                        {/* Holographic Inner Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-20">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                                Expert AI Developers
                            </h3>
                            <p className="text-neutral-300 text-xl leading-relaxed max-w-xl font-light">
                                Hire top-tier AI engineers to build custom solutions. From LLM fine-tuning to vision systems, we have the expertise you need.
                            </p>
                            <ul className="mt-10 space-y-4">
                                {["Custom LLM Fine-tuning", "Computer Vision Systems", "Predictive Analytics"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white/90 text-lg">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                            <Check size={16} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Image Container - Fixed Visibility */}
                        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 z-10 translate-x-1/4 translate-y-1/4 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-700 ease-out">
                            <img
                                src="/optimized/developer-workspace.webp"
                                alt="AI Developer"
                                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StackedCards;
