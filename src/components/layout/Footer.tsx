import { useState, useEffect, useRef } from 'react';
import { MapPin, Mail, Linkedin, Twitter, Facebook, ChevronDown, Check, MessageSquare, X, ArrowUp, Sparkles, Copy, Globe } from 'lucide-react';

// Mock constants - replace with actual imports
const NAV_ITEMS = [
  {
    label: 'Products',
    megaMenu: [{
      items: [
        { name: 'AI Platform', href: '/products/ai-platform' },
        { name: 'Automation Suite', href: '/products/automation' },
        { name: 'Analytics Dashboard', href: '/products/analytics' },
        { name: 'Integration Tools', href: '/products/integration' },
        { name: 'Security Hub', href: '/products/security' }
      ]
    }]
  },
  {
    label: 'Solutions',
    megaMenu: [{
      items: [
        { name: 'Manufacturing', href: '/solutions/manufacturing' },
        { name: 'Healthcare', href: '/solutions/healthcare' },
        { name: 'Finance', href: '/solutions/finance' },
        { name: 'Retail', href: '/solutions/retail' }
      ]
    }]
  }
];

const COMPANY_INFO = {
  name: 'Frostrek Technologies',
  address: 'Gurgaon, Haryana, India',
  contact: 'info@frostrek.com',
  socials: {
    linkedin: 'https://linkedin.com/company/frostrek',
    twitter: 'https://twitter.com/frostrek',
    facebook: 'https://facebook.com/frostrek'
  }
};

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'ENG' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ type: 'Suggestion', message: '', email: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [locationWidgetOpen, setLocationWidgetOpen] = useState(false);
  const [pinPulsed, setPinPulsed] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('frostrek_lang');
    if (saved) setSelectedLang(saved);
  }, []);

  // Intersection Observer for footer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationWidgetOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll handler for back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowBackToTop(scrollPercent > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangSelect = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem('frostrek_lang', code);
    setLangOpen(false);
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackData.message.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackOpen(false);
      setFeedbackSubmitted(false);
      setFeedbackData({ type: 'Suggestion', message: '', email: '' });
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.contact);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleLocationHover = (isHovering: boolean) => {
    if (window.innerWidth >= 768) {
      setLocationWidgetOpen(isHovering);
      if (isHovering && !pinPulsed) {
        setPinPulsed(true);
      }
    }
  };

  const handleLocationClick = () => {
    if (window.innerWidth < 768) {
      setLocationWidgetOpen(!locationWidgetOpen);
      if (!pinPulsed) {
        setPinPulsed(true);
      }
    }
  };

  return (
    <>
      <style>{`
        @keyframes footerReveal {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes underlineExpand {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes linkFadeIn {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes emailShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes copyPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes networkPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes locationWidgetAppear {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pinPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        .footer-revealed {
          animation: footerReveal 300ms ease-out forwards;
        }

        .section-title {
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          background: rgba(176, 117, 82, 0.5);
          width: 0;
        }

        .footer-revealed .section-title::after {
          animation: underlineExpand 400ms ease-out 150ms forwards;
        }

        .footer-link {
          position: relative;
          display: inline-block;
          transition: color 150ms ease-out;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms ease-out;
        }

        .footer-link:hover::after {
          transform: scaleX(1);
        }

        .footer-revealed .footer-link {
          animation: linkFadeIn 300ms ease-out forwards;
        }

        .footer-revealed .footer-link:nth-child(1) { animation-delay: 200ms; opacity: 0; }
        .footer-revealed .footer-link:nth-child(2) { animation-delay: 230ms; opacity: 0; }
        .footer-revealed .footer-link:nth-child(3) { animation-delay: 260ms; opacity: 0; }
        .footer-revealed .footer-link:nth-child(4) { animation-delay: 290ms; opacity: 0; }
        .footer-revealed .footer-link:nth-child(5) { animation-delay: 320ms; opacity: 0; }

        .social-icon {
          position: relative;
          overflow: hidden;
          transition: all 150ms ease-out;
        }

        .social-icon:hover {
          transform: translateY(-2px);
        }

        .social-icon:active {
          transform: translateY(1px);
        }

        .social-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
        }

        .social-icon:active::before {
          animation: ripple 600ms ease-out;
        }

        .iso-badge {
          transition: all 200ms ease-out;
        }

        .iso-badge:hover {
          transform: scale(1.02);
          box-shadow: 0 0 12px rgba(176, 117, 82, 0.3);
        }

        .email-container {
          position: relative;
          overflow: hidden;
        }

        .email-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(176, 117, 82, 0.2), transparent);
          pointer-events: none;
        }

        .footer-revealed .email-shimmer::after {
          animation: emailShimmer 1.5s ease-out 800ms;
        }

        .lang-switcher {
          transition: border-color 150ms ease-out;
        }

        .lang-arrow {
          transition: transform 200ms ease-out;
        }

        .lang-switcher:hover .lang-arrow {
          transform: rotate(180deg);
        }

        .lang-dropdown {
          animation: fadeSlideUp 200ms ease-out;
        }

        .feedback-tab {
          transition: all 200ms ease-out;
        }

        .feedback-tab:hover {
          padding-right: 20px;
        }

        .feedback-panel {
          animation: slideIn 280ms ease-out;
        }

        .careers-card {
          transition: all 200ms ease-out;
        }

        .careers-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .careers-card:active {
          transform: translateY(2px);
        }

        .careers-icon {
          transition: opacity 200ms ease-out;
        }

        .careers-card:hover .careers-icon {
          opacity: 1;
        }

        .network-node {
          animation: networkPulse 3s ease-in-out infinite;
        }

        .network-node:nth-child(1) { animation-delay: 0s; }
        .network-node:nth-child(2) { animation-delay: 0.6s; }
        .network-node:nth-child(3) { animation-delay: 1.2s; }
        .network-node:nth-child(4) { animation-delay: 1.8s; }

        .back-to-top {
          animation: fadeSlideUp 250ms ease-out;
        }

        .back-to-top:hover .arrow-icon {
          transform: translateY(-2px);
        }

        .arrow-icon {
          transition: transform 150ms ease-out;
        }

        .copy-notification {
          animation: copyPulse 200ms ease-out;
        }

        .location-widget {
          animation: locationWidgetAppear 180ms ease-out;
        }

        .location-pin.pulse-once {
          animation: pinPulse 400ms ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Careers Card */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <a href="/careers" className="block max-w-4xl mx-auto">
            <div className="careers-card bg-white border-2 border-gray-200 rounded-2xl p-8 cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <svg className="careers-icon w-16 h-16 opacity-80" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" className="text-[#B07552]" />
                    <circle cx="32" cy="16" r="4" fill="currentColor" className="text-[#8A5A35] network-node" />
                    <circle cx="16" cy="32" r="4" fill="currentColor" className="text-[#8A5A35] network-node" />
                    <circle cx="48" cy="32" r="4" fill="currentColor" className="text-[#8A5A35] network-node" />
                    <circle cx="32" cy="48" r="4" fill="currentColor" className="text-[#8A5A35] network-node" />
                    <line x1="32" y1="20" x2="32" y2="28" stroke="currentColor" strokeWidth="2" className="text-[#B07552]" />
                    <line x1="20" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="2" className="text-[#B07552]" />
                    <line x1="36" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2" className="text-[#B07552]" />
                    <line x1="32" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="2" className="text-[#B07552]" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Build the Future of AI at Frostrek
                    <Sparkles className="w-5 h-5 text-[#B07552]" />
                  </h3>
                  <p className="text-gray-600">
                    Join our team of innovators solving real-world problems with cutting-edge technology.
                  </p>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-[#F3E9CD] flex items-center justify-center text-[#8A5A35]">
                    →
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-16 ${isVisible ? 'footer-revealed' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand & Info */}
            <div className="lg:col-span-2 space-y-6">
              <a href="/" className="flex items-center gap-3 group">
                <img
                  src="/logo.png"
                  alt="Frostrek Logo"
                  className="h-10 w-10 transition-transform group-hover:scale-110"
                />
                <span className="text-2xl font-bold font-sans tracking-tight text-gray-900">
                  Frostrek
                </span>
              </a>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
              </p>

              {/* ISO Certifications */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="iso-badge px-3 py-1.5 bg-[#FDFBF7] border border-[#E6D0C6] rounded-full text-xs font-semibold text-[#8A5A35] cursor-pointer">
                  ISO 27001:2022 Certified
                </div>
                <div className="iso-badge px-3 py-1.5 bg-[#FDFBF7] border border-[#E6D0C6] rounded-full text-xs font-semibold text-[#8A5A35] cursor-pointer">
                  ISO 9001:2015 Certified
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {/* Location with Widget */}
                <div
                  ref={locationRef}
                  className="relative"
                  onMouseEnter={() => handleLocationHover(true)}
                  onMouseLeave={() => handleLocationHover(false)}
                >
                  <div
                    className="flex items-center gap-3 text-gray-600 cursor-pointer"
                    onClick={handleLocationClick}
                  >
                    <MapPin size={18} className="text-[#B07552]" />
                    <div>
                      <div>{COMPANY_INFO.address}</div>
                      <div className="text-sm text-gray-500 mt-1">🌍 Serving clients globally</div>
                    </div>
                  </div>

                  {/* Location Widget */}
                  {locationWidgetOpen && (
                    <div className="location-widget absolute left-0 bottom-full mb-3 w-64 bg-gray-800 rounded-xl shadow-lg overflow-hidden z-30">
                      {/* Static Map Preview */}
                      <div className="relative h-32 bg-gradient-to-br from-[#8A5A35] to-[#B07552] overflow-hidden">
                        {/* Simplified India Map */}
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200" fill="none">
                          <path d="M100 40 L110 50 L120 45 L125 55 L130 50 L135 60 L130 70 L125 75 L120 85 L115 95 L110 105 L105 115 L100 125 L95 130 L90 135 L85 130 L80 125 L75 120 L70 110 L65 100 L60 90 L55 80 L60 70 L65 60 L70 55 L75 50 L80 45 L85 40 L90 42 L95 40 Z" fill="currentColor" className="text-white" />
                        </svg>

                        {/* Location Pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg className={`w-8 h-8 text-red-500 ${pinPulsed ? 'pulse-once' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="p-4 space-y-2">
                        <div className="text-white font-semibold text-base">India</div>
                        <div className="text-[#F3E9CD] text-sm">Serving clients globally</div>
                        <div className="text-gray-300 text-xs font-medium pt-1">
                          Frostrek HQ (Remote-First)
                        </div>
                        <div className="text-gray-500 text-xs pt-2 border-t border-gray-700">
                          Location shown for business reference only
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-600 email-container">
                  <Mail size={18} className="text-[#B07552]" />
                  <button
                    onClick={copyEmail}
                    className="email-shimmer hover:text-[#B07552] transition-colors flex items-center gap-2 group"
                  >
                    <span>{COMPANY_INFO.contact}</span>
                    {emailCopied ? (
                      <Check size={14} className="text-[#B07552] copy-notification" />
                    ) : (
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                {emailCopied && (
                  <div className="text-xs text-[#B07552] font-medium copy-notification">
                    ✓ Email copied to clipboard
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="relative pt-2" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="lang-switcher flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#B07552] text-sm font-medium"
                >
                  <Globe size={14} className="text-[#B07552]" />
                  <span>{LANGUAGES.find(l => l.code === selectedLang)?.flag}</span>
                  <span>{LANGUAGES.find(l => l.code === selectedLang)?.name}</span>
                  <ChevronDown size={16} className="lang-arrow" />
                </button>
                {langOpen && (
                  <div className="lang-dropdown absolute bottom-full mb-2 left-0 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangSelect(lang.code)}
                        className="w-full px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
                      >
                        <span>{lang.flag}</span>
                        <span className="flex-grow text-left">{lang.name}</span>
                        {selectedLang === lang.code && <Check size={16} className="text-[#B07552]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h4 className="section-title text-gray-900 font-semibold mb-4 text-lg">Products</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 5).map(item => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-link text-gray-600 hover:text-[#B07552] text-sm">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h4 className="section-title text-gray-900 font-semibold mb-4 text-lg">Solutions</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-link text-gray-600 hover:text-[#B07552] text-sm">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="section-title text-gray-900 font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="footer-link text-gray-600 hover:text-[#B07552] text-sm">About Us</a></li>
                <li><a href="/services" className="footer-link text-gray-600 hover:text-[#B07552] text-sm">Services</a></li>
                <li><a href="/resources" className="footer-link text-gray-600 hover:text-[#B07552] text-sm">Resources</a></li>
                <li><a href="/careers" className="footer-link text-gray-600 hover:text-[#B07552] text-sm">Careers</a></li>
                <li><a href="/contact" className="footer-link text-gray-600 hover:text-[#B07552] text-sm">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href={COMPANY_INFO.socials.linkedin} className="social-icon w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href={COMPANY_INFO.socials.twitter} className="social-icon w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white">
                <Twitter size={18} />
              </a>
              <a href={COMPANY_INFO.socials.facebook} className="social-icon w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Side Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setFeedbackOpen(true)}
          className="feedback-tab bg-[#B07552] text-white px-3 py-6 rounded-l-lg font-semibold text-sm shadow-lg hover:bg-[#8A5A35]"
          style={{ writingMode: 'vertical-rl' }}
        >
          <MessageSquare size={16} className="inline mr-2" />
          Feedback
        </button>
      </div>

      {/* Feedback Panel */}
      {feedbackOpen && (
        <div className="fixed right-0 top-0 h-full z-50">
          <div className="feedback-panel bg-white h-full w-80 md:w-96 shadow-2xl border-l-2 border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Send Feedback</h3>
              <button onClick={() => setFeedbackOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {!feedbackSubmitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={feedbackData.type}
                    onChange={(e) => setFeedbackData({ ...feedbackData, type: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#B07552] focus:outline-none transition-colors"
                  >
                    <option>Bug</option>
                    <option>Suggestion</option>
                    <option>UX</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#B07552] focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={feedbackData.email}
                    onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#B07552] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackData.message.trim()}
                  className="w-full bg-[#B07552] text-white py-3 rounded-lg font-semibold hover:bg-[#8A5A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#F3E9CD] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-[#8A5A35]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Thank you!</h4>
                <p className="text-gray-600">Your feedback has been received.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top fixed bottom-8 right-8 w-12 h-12 bg-[#B07552] text-white rounded-full shadow-lg hover:bg-[#8A5A35] flex items-center justify-center z-40 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="arrow-icon" />
        </button>
      )}
    </>
  );
};

export default Footer;