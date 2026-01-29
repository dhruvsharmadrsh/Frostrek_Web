"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveHoverTextProps {
    text: string;
    className?: string;
    textClassName?: string;
}

const InteractiveHoverText = ({ text, className = "", textClassName = "" }: InteractiveHoverTextProps) => {
    // Split text into words, then characters to preserve spacing
    const words = text.split(" ");

    return (
        <div className={`flex flex-wrap justify-center gap-[0.3em] ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="flex whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <Letter key={`${wordIndex}-${charIndex}`} char={char} className={textClassName} />
                    ))}
                </span>
            ))}
        </div>
    );
};

const Letter = ({ char, className }: { char: string; className: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -10 : 0,
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? Math.random() * 20 - 10 : 0,
                color: isHovered ? "#14B8A6" : "#1A1A1A", // Brand teal on hover, dark text default
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
            }}
            className={`inline-block cursor-pointer select-none transition-colors duration-200 ${className}`}
        >
            {char}
        </motion.span>
    );
};

export default InteractiveHoverText;
