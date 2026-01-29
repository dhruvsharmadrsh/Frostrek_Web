"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

const TextReveal = ({ children, className = "", delay = 0 }: TextRevealProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".char");

        gsap.fromTo(chars,
            {
                y: "100%",
                opacity: 0,
                filter: "blur(10px)",
                rotateX: 45
            },
            {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                rotateX: 0,
                duration: 1,
                stagger: 0.03,
                ease: "power4.out",
                delay: delay
            }
        );
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-block leading-tight ${className}`}>
            <span className="sr-only">{children}</span>
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className="char inline-block will-change-transform origin-bottom"
                    style={{ whiteSpace: "pre" }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default TextReveal;
