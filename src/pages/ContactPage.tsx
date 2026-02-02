import { useState } from 'react';
import { Mail, MapPin, Send, Check, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CuteBackground from '../components/ui/CuteBackground';

import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await emailjs.send(
                'service_jia14ic',
                'template_hygc11p',
                {
                    to_email: 'dhruv.sharma@frostrek.com',
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                'BiiX__h7V1vLoyEQb'
            );

            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className={`min-h-screen pt-24 pb-12 relative ${theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-gray-50 text-gray-900'}`}>
            <CuteBackground />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[calc(100vh-140px)]">
                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display tracking-tight">
                                Let's Start a <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B07552] to-[#E6D0C6]">Conversation</span>
                            </h1>
                            <p className={`text-lg md:text-xl max-w-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Have a project in mind or want to explore how AI can transform your business? We're here to help.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactItem
                                icon={<Mail className="w-6 h-6" />}
                                label="Email Us"
                                value="info@frostrek.com"
                                href="mailto:info@frostrek.com"
                                theme={theme}
                            />
                            <ContactItem
                                icon={<MapPin className="w-6 h-6" />}
                                label="Visit Us"
                                value="Sector 65, Success Suncity Tower, Gurgaon"
                                href="https://maps.google.com"
                                theme={theme}
                            />
                            {/* Added Phone placeholder if needed, otherwise optional */}
                        </div>

                        <div className="pt-8">
                            <div className="flex items-center gap-4">
                                {/* Socials can go here if extra needed, but they are in footer too */}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={`p-8 md:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl ${theme === 'dark'
                            ? 'bg-white/5 border-white/10 shadow-black/20'
                            : 'bg-white/60 border-white/40 shadow-xl'
                            }`}>
                            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup
                                            label="Your Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            theme={theme}
                                        />
                                        <InputGroup
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            theme={theme}
                                        />
                                    </div>
                                    <InputGroup
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        theme={theme}
                                    />
                                    <div className="space-y-2">
                                        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            required
                                            placeholder="Tell us about your project..."
                                            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all duration-300 resize-none ${theme === 'dark'
                                                ? 'bg-black/20 border-white/10 focus:border-[#B07552] text-white placeholder-gray-500'
                                                : 'bg-white/50 border-gray-200 focus:border-[#B07552] text-gray-900 placeholder-gray-400'
                                                }`}
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:shadow-xl'
                                            }`}
                                        style={{ background: 'linear-gradient(135deg, #B07552 0%, #8A5A35 100%)' }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center text-center space-y-4"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                        <Check className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                                    <p className="text-gray-500 max-w-xs">
                                        Thanks for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-6 px-6 py-2 text-sm font-medium hover:text-[#B07552] transition-colors flex items-center gap-1"
                                    >
                                        Send another <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ContactItem = ({ icon, label, value, href, theme }: any) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-current group ${theme === 'dark' ? 'hover:bg-white/5 hover:border-white/10' : 'hover:bg-white/60 hover:border-gray-200'
            }`}
    >
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-white/10 text-[#B07552]' : 'bg-[#F3E9CD] text-[#8A5A35]'}`}>
            {icon}
        </div>
        <div>
            <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{label}</h4>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>{value}</p>
        </div>
    </a>
);

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder, theme }: any) => (
    <div className="space-y-2">
        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all duration-300 ${theme === 'dark'
                ? 'bg-black/20 border-white/10 focus:border-[#B07552] text-white placeholder-gray-500'
                : 'bg-white/50 border-gray-200 focus:border-[#B07552] text-gray-900 placeholder-gray-400'
                }`}
        />
    </div>
);

export default ContactPage;
