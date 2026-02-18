import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

const ScheduleDemo = () => {
    const { theme } = useTheme();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Generate calendar days
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];

        // Add empty slots for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
    ];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // n8n Webhook URL for automated meeting scheduling
    const WEBHOOK_URL = 'https://frostysandy.app.n8n.cloud/webhook/schedule-demo';

    const formatTimeForWebhook = (timeStr: string) => {
        // Convert "09:00 AM" to "09:00:00"
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }
        return `${hours}:${minutes}:00`;
    };

    const getEndTime = (startTimeStr: string) => {
        // Add 30 minutes for demo duration
        const [time, modifier] = startTimeStr.split(' ');
        let [hours, minutes] = time.split(':');

        // Convert to minutes
        let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        if (modifier === 'PM' && hours !== '12') totalMinutes += 12 * 60;
        if (modifier === 'AM' && hours === '12') totalMinutes = parseInt(minutes); // 00:xx

        totalMinutes += 30; // Add duration

        // Convert back
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;

        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:00`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
            setSubmitError('Please fill in all required fields.');
            return;
        }

        setIsLoading(true);

        try {
            // Format Date as YYYY-MM-DD
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            const timeStr = formatTimeForWebhook(selectedTime);
            const endTimeStr = getEndTime(selectedTime);

            const payload = {
                name: formData.name,
                email: formData.email,
                notes: formData.notes || '',
                date: dateStr,
                time: timeStr,
                endTime: endTimeStr
            };

            // Try to send to n8n webhook for automated meeting scheduling
            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    // Webhook succeeded - meeting link will be sent automatically
                    setIsSubmitted(true);
                    return;
                }
            } catch (webhookError) {
                console.warn('Webhook failed, using email fallback:', webhookError);
            }

            // Fallback: Send via EmailJS if webhook fails
            const dateOptions: Intl.DateTimeFormatOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const formattedDate = selectedDate.toLocaleDateString('en-US', dateOptions);

            const messageContent = `
Demo Booking Request

Name: ${formData.name}
Email: ${formData.email}
Preferred Date: ${formattedDate}
Preferred Time: ${selectedTime}

Additional Notes:
${formData.notes || 'N/A'}
            `.trim();

            await emailjs.send(
                'service_jia14ic',
                'template_hygc11p',
                {
                    to_email: 'contact@frostrek.com',
                    from_name: formData.name,
                    user_name: formData.name,
                    name: formData.name,
                    from_email: formData.email,
                    user_email: formData.email,
                    email: formData.email,
                    reply_to: formData.email,
                    subject: `Demo Request - ${formattedDate} at ${selectedTime}`,
                    message: messageContent,
                    demo_date: formattedDate,
                    demo_time: selectedTime,
                    notes: formData.notes
                },
                'BiiX__h7V1vLoyEQb'
            );

            setIsSubmitted(true);
        } catch (error) {
            console.error('Booking Error:', error);
            setSubmitError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const isDateDisabled = (date: Date | null) => {
        if (!date) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isTimeDisabled = (timeStr: string) => {
        if (!selectedDate) return true;

        const now = new Date();
        const selected = new Date(selectedDate);

        // Check if selected date is today
        const isToday =
            selected.getDate() === now.getDate() &&
            selected.getMonth() === now.getMonth() &&
            selected.getFullYear() === now.getFullYear();

        if (!isToday) return false;

        // Parse timeStr "09:00 AM" => Hours/Minutes
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (hours === 12) {
            hours = modifier === 'AM' ? 0 : 12;
        } else if (modifier === 'PM') {
            hours += 12;
        }

        const slotTime = new Date();
        slotTime.setHours(hours, minutes, 0, 0);

        return slotTime < now;
    };

    if (isSubmitted) {
        return (
            <div className={`min-h-screen pt-20 relative ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
                {theme !== 'dark' && <CuteBackground />}
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className={`max-w-2xl mx-auto text-center rounded-2xl shadow-2xl p-12 ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-green-100'}`}>
                            <Check className={`w-10 h-10 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        </div>
                        <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Demo Scheduled!</h1>
                        <p className={`mb-6 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                            Thank you, {formData.name}! We've sent a confirmation email to {formData.email}.
                        </p>
                        <div className={`border rounded-lg p-6 mb-8 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-green-50 border-brand-green-200'}`}>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Your meeting is scheduled for:</p>
                            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-700'}`}>
                                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className={`text-lg mt-2 ${theme === 'dark' ? 'text-dark-accent/80' : 'text-brand-green-600'}`}>{selectedTime}</p>
                        </div>
                        <Button onClick={() => window.location.href = '/'} className={theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-brand-green-600 hover:bg-brand-green-700'}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

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
                                    <Calendar className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
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

                    {/* Right Column - Booking Interface */}
                    <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}>
                        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Select Date & Time</h2>

                        {/* Calendar */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrevMonth}
                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-dark-bg text-dark-text' : 'hover:bg-gray-100'}`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleNextMonth}
                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-dark-bg text-dark-text' : 'hover:bg-gray-100'}`}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className={`text-center text-xs font-semibold py-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {getDaysInMonth(currentMonth).map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => date && !isDateDisabled(date) && setSelectedDate(date)}
                                        disabled={isDateDisabled(date)}
                                        className={`
                                            aspect-square rounded-lg text-sm font-medium transition-all
                                            ${!date ? 'invisible' : ''}
                                            ${isDateDisabled(date) ? `${theme === 'dark' ? 'text-dark-text-muted/30' : 'text-gray-300'} cursor-not-allowed` : `${theme === 'dark' ? 'hover:bg-dark-accent/20' : 'hover:bg-brand-green-100'} cursor-pointer`}
                                            ${selectedDate && date && selectedDate.toDateString() === date.toDateString()
                                                ? `${theme === 'dark' ? 'bg-dark-accent text-dark-bg' : 'bg-brand-green-600 text-white hover:bg-brand-green-700'}`
                                                : theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}
                                        `}
                                    >
                                        {date?.getDate()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div className="mb-8">
                                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Available Times</h3>
                                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            disabled={isTimeDisabled(time)}
                                            className={`
                                                py-2 px-3 rounded-lg text-sm font-medium transition-all
                                                ${selectedTime === time
                                                    ? theme === 'dark' ? 'bg-dark-accent text-dark-bg' : 'bg-brand-green-600 text-white'
                                                    : isTimeDisabled(time)
                                                        ? theme === 'dark' ? 'bg-dark-bg text-dark-text-muted/20 cursor-not-allowed opacity-50' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                                        : theme === 'dark' ? 'bg-dark-bg text-dark-text hover:bg-dark-accent/20' : 'bg-gray-50 text-gray-700 hover:bg-brand-green-100'}
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Form */}
                        {selectedDate && selectedTime && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 text-dark-text focus:ring-dark-accent focus:border-transparent placeholder:text-dark-text-muted/50' : 'border-gray-300 focus:ring-brand-green-500 focus:border-transparent'}`}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 text-dark-text focus:ring-dark-accent focus:border-transparent placeholder:text-dark-text-muted/50' : 'border-gray-300 focus:ring-brand-green-500 focus:border-transparent'}`}
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 text-dark-text focus:ring-dark-accent focus:border-transparent placeholder:text-dark-text-muted/50' : 'border-gray-300 focus:ring-brand-green-500 focus:border-transparent'}`}
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3 ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-brand-green-600 hover:bg-brand-green-700 text-white'}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Scheduling...
                                        </>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </Button>
                                {submitError && (
                                    <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleDemo;
