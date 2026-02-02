import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScrollProvider from './components/providers/SmoothScrollProvider';

// Lazy load pages to split code chunks and reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ScheduleDemo = lazy(() => import('./pages/ScheduleDemo'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const SolutionPage = lazy(() => import('./pages/SolutionPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));

// Lazy load Chatbot to improve LCP - defers 705KB GIF and JS bundle
const Chatbot = lazy(() => import('./components/chat/Chatbot'));

// Placeholder for internal pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen pt-32 pb-20 px-4 container mx-auto text-center">
    <h1 className="text-4xl font-bold mb-6 text-white">{title}</h1>
    <p className="text-gray-400 max-w-2xl mx-auto">This page is under construction. Content coming soon.</p>
  </div>
);

// Loading component for page transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin text-brand-green-500" />
  </div>
);

function App() {
  return (
    <Router>
      <SmoothScrollProvider>
        <div className="min-h-screen text-primary flex flex-col font-body">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule-demo" element={<ScheduleDemo />} />
                <Route path="/products/*" element={<ProductPage />} />
                <Route path="/solutions/*" element={<SolutionPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
                <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
                <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}

export default App;