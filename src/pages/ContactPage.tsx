import { useState } from 'react';
import { Mail, Send, Check, Loader2, ArrowRight, MessageCircle, Phone, Globe } from 'lucide-react';
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
            // Prepare formatted message
            const fullName = `${formData.firstName} ${formData.lastName}`;
            const messageContent = `
Name: ${fullName}
Company: ${formData.company || 'N/A'}
Job Title: ${formData.jobTitle || 'N/A'}
Email: ${formData.workEmail}
Inquiry Type: ${formData.reachType}

Message:
${formData.projectDetails}
            `.trim();

            await emailjs.send(
                'service_jia14ic',
                'template_hygc11p',
                {
                    to_email: 'contact@frostrek.com',
                    from_name: fullName,
                    user_name: fullName,
                    name: fullName,
                    from_email: formData.workEmail,
                    user_email: formData.workEmail,
                    email: formData.workEmail,
                    reply_to: formData.workEmail,
                    subject: `New Contact Inquiry: ${formData.reachType}`,
                    message: messageContent,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    company: formData.company,
                    job_title: formData.jobTitle,
                    work_email: formData.workEmail,
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

                        {/* Contact Methods - Enhanced Design */}
                        <div className="space-y-6">
                            {/* GET IN TOUCH Section */}
                            <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'}`}>
                                <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    GET IN TOUCH
                                </h3>
                                <div className="space-y-4">
                                    {/* Call Us - Primary Featured Button */}
                                    <a
                                        href="tel:+916399999955"
                                        className={`flex items-center justify-between gap-4 p-5 rounded-xl transition-all duration-300 group ${theme === 'dark' ? 'bg-[#B07552] hover:bg-[#8A5A35]' : 'bg-[#B07552] hover:bg-[#8A5A35]'} shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-white/20">
                                                <Phone className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-white">Call Us</h4>
                                                <p className="font-semibold text-white/90 text-base">+91 6399999955</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                    </a>

                                    {/* Email & WhatsApp in Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <a
                                            href="mailto:info@frostrek.com"
                                            className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 group ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-white'}`}>
                                                <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-[#B07552]' : 'text-[#8A5A35]'}`} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className={`font-semibold text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Us</h4>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>info@frostrek.com</p>
                                            </div>
                                        </a>
                                        <a
                                            href="https://wa.me/17574722491"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 group ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-white'}`}>
                                                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className={`font-semibold text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>WhatsApp (US)</h4>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>+1 757 472 2491</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* GLOBAL OFFICES Section */}
                            <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'}`}>
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-[#B07552]' : 'text-[#B07552]'}`} />
                                    <h3 className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        GLOBAL OFFICES
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        {
                                            title: 'India (HQ)',
                                            address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurgaon',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=4th+Floor+Unit+No+455+JMD+Empire+Sector+62+Gurgaon+India',
                                            isHQ: true
                                        },
                                        {
                                            title: 'USA',
                                            address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=701+Tillery+Street+Unit+12-3227+Austin+Texas+78702+United+States',
                                            isHQ: false
                                        },
                                        {
                                            title: 'UK',
                                            address: '24–26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
                                            mapUrl: 'https://www.google.com/maps/search/?api=1&query=24-26+Arcadia+Avenue+London+N3+2JU+United+Kingdom',
                                            isHQ: false
                                        },
                                    ].map((office, i) => (
                                        <a
                                            key={i}
                                            href={office.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-lg border-2 ${theme === 'dark'
                                                    ? 'bg-white/5 border-transparent hover:bg-[#B07552]/20 hover:border-[#B07552]/40'
                                                    : 'bg-gray-50 border-transparent hover:bg-[#B07552]/10 hover:border-[#B07552]/30'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex-1 min-w-0 text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <h4 className={`font-bold text-base transition-colors ${theme === 'dark'
                                                                ? 'text-white group-hover:text-[#B07552]'
                                                                : 'text-gray-900 group-hover:text-[#8A5A35]'
                                                            }`}>
                                                            {office.title}
                                                        </h4>
                                                        {office.isHQ && (
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-[#B07552]/30 text-[#B07552]' : 'bg-[#B07552]/20 text-[#8A5A35]'
                                                                }`}>
                                                                HQ
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm transition-colors ${theme === 'dark'
                                                            ? 'text-gray-400 group-hover:text-[#E6D0C6]'
                                                            : 'text-gray-600 group-hover:text-[#8A5A35]'
                                                        }`}>
                                                        {office.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all ${theme === 'dark' ? 'text-[#B07552]' : 'text-[#8A5A35]'
                                                }`}>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
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