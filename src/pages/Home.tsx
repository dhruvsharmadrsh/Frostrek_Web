import HeroSection from '../components/home/HeroSection';
import AISolutionsShowcase from '../components/home/AISolutionsShowcase';
import TrustedBySection from '../components/home/TrustedBySection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

import CuteBackground from '../components/ui/CuteBackground';

const Home = () => {
    return (
        <div className="min-h-screen relative">
            <CuteBackground />
            <HeroSection />
            <AISolutionsShowcase />
            <TrustedBySection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default Home;
