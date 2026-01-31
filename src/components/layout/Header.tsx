import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled
                    ? "bg-[#B07552] h-16 shadow-[0_1px_0_rgba(176,117,82,0.15)]"
                    : "bg-[#B07552] h-20"

        )}>
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* 1. Logo (Left) */}
                <Link to="/" className="flex items-center gap-2 group min-w-[140px]">
                    <img
                        src="/logo.png"
                        alt="Frostrek"
                        className="h-12 w-auto object-contain"
                    />
                    <span className="text-xl font-bold font-sans tracking-tight text-background">
                        Frostrek
                    </span>
                </Link>

                {/* 2. Desktop Nav (Center) */}
                <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-semibold transition-colors py-2 text-background hover:text-primary",
                                    location.pathname === item.href && "text-primary font-bold"
                                )}
                            >
                                {item.label}
                                {item.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {/* Mega Menu */}
                            {item.megaMenu && (
                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px]">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                        <MegaMenu sections={item.megaMenu} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* 3. CTAs (Right) */}
                <div className="hidden lg:flex items-center justify-end min-w-[140px]">
                    <Link to="/schedule-demo">
                        <Button size="sm" className="px-6 bg-background text-[#B07552] rounded-md font-semibold border-none shadow-md">
                            Request Demo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "lg:hidden p-2 transition-colors text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-gray-100 shadow-xl z-50"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-primary font-medium block py-2 border-b border-gray-100 last:border-0"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                            <div className="mt-4">
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center bg-[#B07552] text-white">
                                        Request Demo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

export default Header;
