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
  address: 'Sector 65, Success Suncity Tower, Gurgaon',
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

  const footerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);


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
        className={`bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-8 ${isVisible ? 'footer-revealed' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
            {/* Brand & Info - Takes 4 columns (compact) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <a href="/" className="flex items-center gap-2.5 group">
                  <img
                    src="/logo.png"
                    alt="Frostrek Logo"
                    className="h-9 w-9 transition-transform group-hover:scale-110"
                  />
                  <span className="text-xl font-bold font-sans tracking-tight text-gray-900">
                    Frostrek
                  </span>
                </a>

                {/* ISO Certifications */}
                <div className="flex flex-wrap gap-2 pt-3">
                  <div className="iso-badge px-2.5 py-1 bg-[#FDFBF7] border border-[#E6D0C6] rounded-full text-[10px] font-semibold text-[#8A5A35] cursor-pointer">
                    ISO 27001:2022 Certified
                  </div>
                  <div className="iso-badge px-2.5 py-1 bg-[#FDFBF7] border border-[#E6D0C6] rounded-full text-[10px] font-semibold text-[#8A5A35] cursor-pointer">
                    ISO 9001:2015 Certified
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
              </p>

              <div className="space-y-4">
                {/* Large Embedded Map (Replaces Address Text) */}
                <div className="w-full h-40 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 relative group">
                  <iframe
                    title="Office Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.1%2C28.5&amp;layer=mapnik&amp;marker=28.4595%2C77.0266"
                    style={{ border: 0 }}
                    className="group-hover:opacity-80 transition-opacity duration-300"
                  ></iframe>

                  {/* Address Tooltip */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-gray-100">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-[#B07552] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-tight">
                            Frostrek HQ
                          </p>
                          <p className="text-[10px] text-gray-600 mt-0.5 font-medium leading-tight whitespace-nowrap">
                            {COMPANY_INFO.address.split(',')[0]},<br />
                            {COMPANY_INFO.address.split(',').slice(1).join(',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email & Language Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Email */}
                  <div className="flex items-center gap-2.5 text-gray-600 email-container">
                    <Mail size={16} className="text-[#B07552]" />
                    <button
                      onClick={copyEmail}
                      className="email-shimmer hover:text-[#B07552] transition-colors flex items-center gap-2 group text-sm"
                    >
                      <span>{COMPANY_INFO.contact}</span>
                      {emailCopied ? (
                        <Check size={12} className="text-[#B07552] copy-notification" />
                      ) : (
                        <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </div>

                  {/* Language Switcher */}
                  <div className="relative" ref={langRef}>
                    <button
                      onClick={() => setLangOpen(!langOpen)}
                      className="lang-switcher inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:border-[#B07552] text-xs font-medium bg-white"
                    >
                      <Globe size={12} className="text-[#B07552]" />
                      <span>{LANGUAGES.find(l => l.code === selectedLang)?.flag}</span>
                      <span>{LANGUAGES.find(l => l.code === selectedLang)?.name}</span>
                      <ChevronDown size={12} className="lang-arrow" />
                    </button>
                    {langOpen && (
                      <div className="lang-dropdown absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10 w-40">
                        {LANGUAGES.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => handleLangSelect(lang.code)}
                            className="w-full px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-xs transition-colors"
                          >
                            <span>{lang.flag}</span>
                            <span className="flex-grow text-left">{lang.name}</span>
                            {selectedLang === lang.code && <Check size={12} className="text-[#B07552]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer - Takes 2 columns to push content right */}
            <div className="hidden lg:block lg:col-span-2"></div>

            {/* Links Section - Shifted Right */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Products */}
              <div className="space-y-3">
                <h4 className="section-title text-gray-900 font-semibold mb-3 text-sm">Products</h4>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 5).map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="footer-link text-gray-600 hover:text-[#B07552] text-xs">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="space-y-3">
                <h4 className="section-title text-gray-900 font-semibold mb-3 text-sm">Solutions</h4>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="footer-link text-gray-600 hover:text-[#B07552] text-xs">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-3">
                <h4 className="section-title text-gray-900 font-semibold mb-3 text-sm">Company</h4>
                <ul className="space-y-1.5">
                  <li><a href="/about" className="footer-link text-gray-600 hover:text-[#B07552] text-xs">About Us</a></li>
                  <li><a href="/services" className="footer-link text-gray-600 hover:text-[#B07552] text-xs">Services</a></li>
                  <li><a href="/resources" className="footer-link text-gray-600 hover:text-[#B07552] text-xs">Resources</a></li>
                  <li><a href="/careers" className="footer-link text-gray-600 hover:text-[#B07552] text-xs">Careers</a></li>
                  <li><a href="/contact" className="footer-link text-gray-600 hover:text-[#B07552] text-xs">Contact</a></li>
                </ul>
              </div>

              {/* Copyright & Socials (Moved inside grid to reduce height) */}
              <div className="col-span-2 md:col-span-3 border-t border-gray-100 pt-4 mt-2 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-xs text-center md:text-left">
                  &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
                </p>

                <div className="flex items-center gap-3">
                  <a href={COMPANY_INFO.socials.linkedin} className="social-icon w-8 h-8 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white transition-colors">
                    <Linkedin size={14} />
                  </a>
                  <a href={COMPANY_INFO.socials.twitter} className="social-icon w-8 h-8 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white transition-colors">
                    <Twitter size={14} />
                  </a>
                  <a href={COMPANY_INFO.socials.facebook} className="social-icon w-8 h-8 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#B07552] hover:bg-[#B07552] hover:text-white transition-colors">
                    <Facebook size={14} />
                  </a>
                </div>
              </div>
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