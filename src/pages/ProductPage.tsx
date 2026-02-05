import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { PRODUCT_DATA } from '../utils/productData';
import Card from '../components/ui/Card';
import CuteBackground from '../components/ui/CuteBackground';
import { ImpactMetrics } from '../components/product/ImpactMetrics';
import { WorkflowBuilder } from '../components/product/WorkflowBuilder';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductHero from '../components/product/ProductHero';
import AllProductsSection from '../components/product/AllProductsSection';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';

const ProductPage = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const product = PRODUCT_DATA[location.pathname] || PRODUCT_DATA['generic'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!product) return null;

    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {/* CuteBackground - placed at root level with proper z-indexing */}
            {theme !== 'dark' && <CuteBackground />}

            {/* 1. Hero Section - Premium Dark */}
            <ProductHero
                title={product.title}
                description={product.description}
                tagline={product.tagline}
            />

            {/* 2. All Products Section - Showcases all available products */}
            {location.pathname === '/products' && <AllProductsSection />}

            {/* 2. Stats Section - "Turn Efficiency into Profit" */}
            <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Impact</span>
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Turn Efficiency into Profit</h2>
                        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Real results from companies that switched to {product.title}.</p>
                    </div>

                    <div className="mt-12">
                        <ImpactMetrics statistics={product.statistics || []} />
                    </div>
                </div>
            </section>

            {/* 3. Workflow / Process Section - SIMPLIFY YOUR WORKFLOW */}
            <section className={`py-24 relative overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Workflow</span>
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Simplify Your Workflow</h2>
                        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>From concept to execution, we streamline every step.</p>
                    </div>

                    <WorkflowBuilder steps={product.process || []} />
                </div>
            </section>

            {/* 4. Experience Zone / Capabilities */}
            <section className={`py-24 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50/30'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Capabilities</span>
                        <h2 className={`text-4xl md:text-5xl font-serif leading-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                            Everything you need to <br className="hidden md:block" />
                            <span className={`italic ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>scale effortlessly.</span>
                        </h2>
                    </div>

                    <CapabilitiesSystem features={product.features || []} />
                </div>
            </section>

            {/* 5. Use Cases Section */}
            {
                product.useCases && product.useCases.length > 0 && (
                    <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <h2 className={`text-3xl md:text-4xl font-sans font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Built for Your Industry</h2>
                                <p className={`text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>See how {product.title} adapts to your specific needs.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {product.useCases.map((useCase, idx) => (
                                    <Card key={idx} className={`p-8 border transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 hover:border-dark-accent' : 'border-gray-100 hover:border-gray-300'}`}>
                                        <div className="mb-6">
                                            {useCase.icon && <useCase.icon className={`w-10 h-10 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-900'}`} />}
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{useCase.title}</h3>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>{useCase.description}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 6. FAQ Section */}
            {
                product.faq && product.faq.length > 0 && (
                    <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-50'}`}>
                        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                            <h2 className={`text-3xl md:text-4xl font-sans font-bold mb-12 text-center ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {product.faq.map((item, idx) => (
                                    <div key={idx} className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                            className={`w-full text-left p-6 flex justify-between items-center transition-colors ${theme === 'dark' ? 'hover:bg-dark-card' : 'hover:bg-gray-50'}`}
                                        >
                                            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{item.question}</span>
                                            {openFaqIndex === idx ? (
                                                <Minus className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                            ) : (
                                                <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {openFaqIndex === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className={`p-6 pt-0 leading-relaxed border-t ${theme === 'dark' ? 'text-dark-text-muted border-dark-accent/10' : 'text-gray-600 border-gray-50'}`}>
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 7. Final Call to Action */}
            <CTASection />
        </div>
    );
};

export default ProductPage;

