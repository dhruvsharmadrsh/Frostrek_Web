import { useState } from 'react';
import { Mail, MapPin, Send, Check, Loader2, ArrowRight, MessageCircle, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CuteBackground from '../components/ui/CuteBackground';

import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        workEmail: '',
        // country: '',
        reachType: '',
        projectDetails: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError("First name is required");
            return false;
        }

        if (!formData.lastName.trim()) {
            setError("Last name is required");
            return false;
        }

        if (!formData.company.trim()) {
            setError("Company name is required");
            return false;
        }

        if (!formData.workEmail.trim()) {
            setError("Work email is required");
            return false;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.workEmail)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (!formData.projectDetails.trim()) {
            setError("Project description is required");
            return false;
        }

        const wordCount = formData.projectDetails.trim().split(/\s+/).length;

        if (wordCount < 20) {
            setError("Project description must contain at least 20 words");
            return false;
        }

        return true;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await emailjs.send(
                'service_jia14ic',
                'template_hygc11p',
                {
                    to_email: 'dhruv.sharma@frostrek.com',
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    company: formData.company,
                    job_title: formData.jobTitle,
                    work_email: formData.workEmail,
                    // country: formData.country,
                    reach_type: formData.reachType,
                    project_details: formData.projectDetails
                },
                'BiiX__h7V1vLoyEQb'
            );

            setIsSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                company: '',
                jobTitle: '',
                workEmail: '',
                // country: '',
                reachType: '',
                projectDetails: ''
            });
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 min-h-[calc(100vh-180px)]">
                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 pt-8 md:pt-12"
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

                        <div className="space-y-8">
                            {/* Contact Methods Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ContactItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Us"
                                    value="info@frostrek.com"
                                    href="mailto:info@frostrek.com"
                                    theme={theme}
                                />
                                <ContactItem
                                    icon={<MessageCircle className="w-5 h-5" />}
                                    label="WhatsApp Us"
                                    value="+1 17574722491"
                                    href="https://wa.me/17574722491"
                                    theme={theme}
                                />
                            </div>

                            {/* Offices Section */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-[#B07552]" /> Our Offices
                                </h3>
                                <div className="space-y-4">
                                    <OfficeCard
                                        title="India Office"
                                        address="422, Suncity Success Tower, Golf Course Ext. Road, Sector - 65, Gurugram, Haryana, 122002"
                                        theme={theme}
                                    />
                                    <OfficeCard
                                        title="USA Office"
                                        address="701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States"
                                        theme={theme}
                                    />
                                    <OfficeCard
                                        title="UK Office"
                                        address="24-26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU"
                                        theme={theme}
                                    />
                                </div>
                            </div>
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
                        <div className={`p-5 md:p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${theme === 'dark'
                            ? 'bg-white/5 border-white/10 shadow-black/20'
                            : 'bg-[#FDFBF7]/90 border-[#E6D0C6]/50 shadow-xl'
                            }`}>
                            <h3 className="text-xl font-bold mb-3">Send us a message</h3>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-2">

                                    {/* Row 1 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <InputGroup
                                            label="First name*"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            theme={theme}
                                        />

                                        <InputGroup
                                            label="Last name*"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            theme={theme}
                                        />
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup
                                            label="Company name"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Company name"
                                            theme={theme}
                                            required={false}
                                        />

                                        <InputGroup
                                            label="Job title"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Job title"
                                            theme={theme}
                                            required={false}
                                        />
                                    </div>

                                    {/* Work Email */}
                                    <InputGroup
                                        label="Work email*"
                                        name="workEmail"
                                        type="email"
                                        value={formData.workEmail}
                                        onChange={handleChange}
                                        placeholder="Work email"
                                        theme={theme}
                                    />

                                    {/* Country */}
                                    {/* <InputGroup
    label="Country*"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Country"
    theme={theme}
  /> */}

                                    {/* Radio Options */}
                                    <div className="">
                                        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Who are you trying to reach?<span className="text-red-500">*</span>
                                        </label>

                                        {["Sales Enquiry", "Project Enquiry", "Partnerships", "Support", "Careers", "General Enquiry", "Other"].map((option) => (
                                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="reachType"
                                                    value={option}
                                                    checked={formData.reachType === option}
                                                    onChange={handleChange}
                                                    required
                                                    className="accent-[#B07552]"
                                                />
                                                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Project Details */}
                                    <div className="space-y-2">
                                        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Please provide details regarding your enquiry.<span className="text-red-500">*</span>
                                        </label>

                                        <textarea
                                            name="projectDetails"
                                            value={formData.projectDetails}
                                            onChange={handleChange}
                                            rows={3}
                                            required
                                            placeholder="Tell us a bit more about what you're looking for..."
                                            className={`w-full px-3 py-2 rounded-lg outline-none border transition-all duration-300 resize-none ${theme === 'dark'
                                                ? 'bg-black/20 border-white/10 focus:border-[#B07552] text-white placeholder-gray-500'
                                                : 'bg-white/50 border-gray-200 focus:border-[#B07552] text-gray-900 placeholder-gray-400'
                                                }`}
                                        />
                                    </div>

                                    {/* Privacy Text */}
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                        By submitting this form, your information will be processed in accordance with our Privacy Policy.
                                    </p>

                                    {/* Error */}
                                    {error && (
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:shadow-xl'
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

const OfficeCard = ({ title, address, theme }: any) => (
    <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-current group w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-[#B07552]/50 hover:bg-white/10' : 'bg-white/60 border-white/40 hover:border-[#B07552]/50 hover:bg-white/80 shadow-sm hover:shadow-md'
            }`}
    >
        <div className={`p-3 rounded-xl flex-shrink-0 ${theme === 'dark' ? 'bg-white/10 text-[#B07552]' : 'bg-[#F3E9CD] text-[#8A5A35]'}`}>
            <Building className="w-5 h-5" />
        </div>
        <div>
            <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>
                {address}
            </p>
        </div>
    </a>
);

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

const InputGroup = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    theme
}: any) => (
    <div className="space-y-2">
        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {typeof label === 'string' && label.endsWith('*') ? (
                <>
                    {label.slice(0, -1)}<span className="text-red-500">*</span>
                </>
            ) : (
                label
            )}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-xl outline-none border transition-all duration-300 ${theme === 'dark'
                ? 'bg-black/20 border-white/10 focus:border-[#B07552] text-white placeholder-gray-500'
                : 'bg-white/50 border-gray-200 focus:border-[#B07552] text-gray-900 placeholder-gray-400'
                }`}
        />
    </div>
);

export default ContactPage;