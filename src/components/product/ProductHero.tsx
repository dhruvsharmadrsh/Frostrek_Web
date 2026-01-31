
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const ProductHero = ({
    description,
    tagline,
    demoImage
}: {
    title: string,
    description: string,
    tagline: string,
    demoImage?: string
}) => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-transparent">

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green-100/50 border border-brand-green-200 backdrop-blur-md text-sm font-medium text-brand-green-800 mb-8 shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-brand-green-600 animate-pulse" />
                    {tagline}
                    <ChevronRight className="w-3 h-3 text-brand-green-600/50 ml-1" />
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-brand-green-900 mb-8 tracking-tight max-w-5xl mx-auto leading-[1.1]"
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
                    className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
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
                        className="bg-brand-green-600 text-white hover:bg-brand-green-700 font-semibold rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="text-brand-green-800 hover:bg-brand-green-50 rounded-full px-8 h-14 text-lg border border-brand-green-200/50 backdrop-blur-sm"
                    >
                        14-days Free Trial
                    </Button>
                </motion.div>
            </div>

            {/* Soft fade at the bottom to transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-green-50 to-transparent pointer-events-none" />
        </section>
    );
};

export default ProductHero;
