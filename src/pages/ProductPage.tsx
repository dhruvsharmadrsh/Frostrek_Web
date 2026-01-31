import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { PRODUCT_DATA } from '../utils/productData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CuteBackground from '../components/ui/CuteBackground';
import { ImpactMetrics } from '../components/product/ImpactMetrics';
import { WorkflowBuilder } from '../components/product/WorkflowBuilder';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductHero from '../components/product/ProductHero';

const ProductPage = () => {
    const location = useLocation();
    const product = PRODUCT_DATA[location.pathname] || PRODUCT_DATA['generic'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!product) return null;

    return (
        <div className="relative min-h-screen">
            {/* CuteBackground - placed at root level with proper z-indexing */}
            <CuteBackground />

            {/* 1. Hero Section - Premium Dark */}
            <ProductHero
                title={product.title}
                description={product.description}
                tagline={product.tagline}
            />

            {/* 2. Stats Section - "Turn Efficiency into Profit" */}
            <section className="py-24 bg-brand-green-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Impact</span>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6">Turn Efficiency into Profit</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Real results from companies that switched to {product.title}.</p>
                    </div>

                    <div className="mt-12">
                        <ImpactMetrics statistics={product.statistics || []} />
                    </div>
                </div>
            </section>

            {/* 3. Workflow / Process Section - SIMPLIFY YOUR WORKFLOW */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Workflow</span>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6">Simplify Your Workflow</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">From concept to execution, we streamline every step.</p>
                    </div>

                    <WorkflowBuilder steps={product.process || []} />
                </div>
            </section>

            {/* 4. Experience Zone / Capabilities */}
            <section className="py-24 bg-brand-green-50/30 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16">
                        <span className="text-brand-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Capabilities</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                            Everything you need to <br className="hidden md:block" />
                            <span className="text-brand-green-600 italic">scale effortlessly.</span>
                        </h2>
                    </div>

                    <CapabilitiesSystem features={product.features || []} />
                </div>
            </section>

            {/* 5. Use Cases Section */}
            {
                product.useCases && product.useCases.length > 0 && (
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-4">Built for Your Industry</h2>
                                <p className="text-gray-600 text-lg">See how {product.title} adapts to your specific needs.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {product.useCases.map((useCase, idx) => (
                                    <Card key={idx} className="p-8 border border-gray-100 hover:border-gray-300 transition-all hover:-translate-y-1">
                                        <div className="mb-6">
                                            {useCase.icon && <useCase.icon className="w-10 h-10 text-gray-900" />}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                                        <p className="text-gray-600">{useCase.description}</p>
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
                    <section className="py-24 bg-gray-50">
                        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {product.faq.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-lg font-bold text-gray-900">{item.question}</span>
                                            {openFaqIndex === idx ? (
                                                <Minus className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-gray-400" />
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
                                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
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
            <section className="py-32 bg-brand-green-600 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green-500/40 via-brand-green-600 to-brand-green-700" />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-8">Ready to transform your business?</h2>
                    <p className="text-xl text-brand-green-50 mb-12 max-w-2xl mx-auto">
                        Join 500+ companies using Frostrek to automate operations and drive growth.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact">
                            <Button size="lg" className="bg-brand-green-500 hover:bg-brand-green-400 text-white rounded-full px-12 h-16 text-xl font-bold">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
