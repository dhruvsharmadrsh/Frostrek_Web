
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const ProductHero = ({
    description,
    tagline
}: {
    title: string,
    description: string,
    tagline: string
}) => {
    const { theme } = useTheme();
    
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-transparent">

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-sm font-medium mb-8 shadow-sm ${theme === 'dark' ? 'bg-dark-card/50 border-dark-accent/30 text-dark-accent' : 'bg-brand-green-100/50 border-brand-green-200 text-brand-green-800'}`}
                >
                    <span className={`flex h-2 w-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-600'}`} />
                    {tagline}
                    <ChevronRight className={`w-3 h-3 ml-1 ${theme === 'dark' ? 'text-dark-accent/50' : 'text-brand-green-600/50'}`} />
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`text-5xl md:text-7xl lg:text-8xl font-sans font-bold mb-8 tracking-tight max-w-5xl mx-auto leading-[1.1] ${theme === 'dark' ? 'text-dark-text' : 'text-brand-green-900'}`}
                >
                    AI-Powered Solutions for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-600 via-brand-green-600 to-brand-green-800">
                        Every Kind of Industry
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                >
                    {description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    <Button
                        size="lg"
                        className={`font-semibold rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-brand-green-600 text-white hover:bg-brand-green-700'}`}
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className={`rounded-full px-8 h-14 text-lg border backdrop-blur-sm ${theme === 'dark' ? 'text-dark-text border-dark-accent/30 hover:bg-dark-card' : 'text-brand-green-800 hover:bg-brand-green-50 border-brand-green-200/50'}`}
                    >
                        14-days Free Trial
                    </Button>
                </motion.div>
            </div>

            {/* Soft fade at the bottom to transition to next section */}
            <div className={`absolute bottom-0 left-0 right-0 h-24 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-t from-dark-card to-transparent' : 'bg-gradient-to-t from-brand-green-50 to-transparent'}`} />
        </section>
    );
};

export default ProductHero;
