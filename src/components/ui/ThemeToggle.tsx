import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`relative h-10 w-32 rounded-full cursor-pointer transition-colors duration-500 border-2 overflow-hidden ${isDark
                    ? 'bg-black border-black'
                    : 'bg-gray-100 border-gray-200'
                }`}
            aria-label="Toggle theme"
        >
            {/* Thumb */}
            <motion.div
                className="absolute top-1 bottom-1 h-7 w-7 rounded-full bg-white shadow-md z-20 flex items-center justify-center overflow-hidden"
                layout
                initial={false}
                animate={{
                    x: isDark ? 6 : 94 // w-32 (128px) - thumb(28) - padding(6) approx
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isDark ? 1 : 0,
                            opacity: isDark ? 1 : 0
                        }}
                        className="absolute"
                    >
                        <Moon size={14} className="text-black fill-current" />
                    </motion.div>
                    <motion.div
                        initial={false}
                        animate={{
                            scale: !isDark ? 1 : 0,
                            opacity: !isDark ? 1 : 0
                        }}
                        className="absolute"
                    >
                        <Sun size={14} className="text-black" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Labels */}
            <div className="absolute inset-0 flex items-center justify-between px-3 z-10 w-full h-full text-[10px] font-bold tracking-wider select-none font-sans whitespace-nowrap">
                <span className={`transition-opacity duration-300 flex items-center gap-1 ${!isDark ? 'opacity-100 text-gray-800 ml-1' : 'opacity-0'}`}>
                    DAY
                </span>
                <span className={`transition-opacity duration-300 flex items-center gap-1 ${isDark ? 'opacity-100 text-white translate-x-1 mr-1' : 'opacity-0'}`}>
                    NIGHT
                </span>
            </div>

            {/* Background Decorations (Stars for night) */}
            {isDark && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-2 right-10 w-1 h-1 bg-white rounded-full opacity-60"></div>
                    <div className="absolute bottom-3 right-16 w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
                    <div className="absolute top-4 right-20 w-1 h-1 bg-white rounded-full opacity-30"></div>
                </div>
            )}
        </button>
    );
};

export default ThemeToggle;
