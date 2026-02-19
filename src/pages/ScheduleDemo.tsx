import { MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';

const ScheduleDemo = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen pt-20 relative ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            {theme !== 'dark' && <CuteBackground />}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Left Column - Company Info */}
                    <div className={`rounded-2xl shadow-xl p-8 lg:p-12 ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}>
                        <div className="mb-8">
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-brand-green-100 text-brand-green-700'}`}>
                                FROSTREK
                            </div>
                            <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                Schedule a Demo
                            </h1>
                            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                Meet with our team to discover how Frostrek can transform your business with AI-powered automation.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                    <Clock className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                </div>
                                <div>
                                    <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Meeting Duration</h3>
                                    <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>30 minutes</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                    <MapPin className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                </div>
                                <div>
                                    <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Meeting Location</h3>
                                    <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Microsoft Teams / Google Meet</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                    <CalendarIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                </div>
                                <div>
                                    <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>What to Expect</h3>
                                    <ul className={`space-y-1 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                                        <li>• Product walkthrough</li>
                                        <li>• Q&A session</li>
                                        <li>• Custom solution discussion</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Google Calendar Booking */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-accent/10">
                        <iframe
                            src="https://calendar.app.google/AYzZy8gS8TTfkeEZ6"
                            style={{ border: 0 }}
                            width="100%"
                            height="630"
                            title="Schedule a Demo"
                            className="w-full min-h-[500px] md:min-h-[630px]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleDemo;
