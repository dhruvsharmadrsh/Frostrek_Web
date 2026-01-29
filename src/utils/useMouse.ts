import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMouse() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { damping: 20, stiffness: 300 });
    const smoothY = useSpring(y, { damping: 20, stiffness: 300 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // Normalize to -1...1
            x.set((clientX / innerWidth) * 2 - 1);
            y.set((clientY / innerHeight) * 2 - 1);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return { x: smoothX, y: smoothY };
}
