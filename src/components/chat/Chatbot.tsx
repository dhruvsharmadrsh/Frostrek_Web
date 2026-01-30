import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Mic, Square, Loader2, Paperclip } from 'lucide-react';

// Webhook URL
const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

// Color Scheme - AI Copilot Theme
const COLORS = {
    primary: '#A67C52', // Brown/Tan
    primaryDark: '#8B6741',
    primaryLight: '#C9987A',
    accent: '#A67C52', // Teal/Cyan
    accentLight: '#A67C52',
    background: '#F8F6F0', // Light beige
    text: '#1a1a1a',
    textLight: '#666666',
    white: '#FFFFFF',
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Session ID Management
    const [sessionId] = useState(() => {
        const stored = localStorage.getItem('chatSessionId');
        if (stored && stored.startsWith('session_')) return stored;

        const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('chatSessionId', newId);
        return newId;
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setMessages(prev => [
                ...prev,
                { type: 'user', content: `📎 File selected: ${file.name}` }
            ]);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                handleSendMessage(undefined, audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSendMessage = async (textInput?: string, audioBlob?: Blob) => {
        if (!textInput && !audioBlob && !selectedFile) return;

        setIsLoading(true);

        if (textInput) {
            setMessages(prev => [...prev, { type: 'user', content: textInput }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            let response;

            if (selectedFile || audioBlob) {
                // Use FormData for files/audio
                const formData = new FormData();
                formData.append('sessionId', sessionId);
                formData.append('message', textInput || (audioBlob ? 'Voice message' : 'File uploaded'));

                if (selectedFile) {
                    formData.append('file', selectedFile);
                }

                if (audioBlob) {
                    formData.append('audio', audioBlob, 'recording.webm');
                }

                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                // Use JSON for text-only messages (as requested)
                console.log('Sending JSON payload:', { message: textInput, sessionId });
                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: textInput,
                        sessionId: sessionId
                    }),
                });
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            // hello 
            const contentType = response.headers.get('content-type') || '';

            if (contentType.includes('audio/')) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: '🔊 Playing voice response…' }
                ]);

                // const audio = new Audio()  ;
                // audio.src = audioUrl;
                // audio.preload = 'auto';

                // audio.oncanplaythrough = () => {
                //     audio.play().catch(err => {
                //         console.error('Autoplay blocked:', err);
                //     });
                // };

                // audio.onerror = (e) => {
                //     console.error('Audio playback error', e);
                // };

                const audio = new Audio(audioUrl);
                audio.preload = 'auto';

                try {
                    await audio.play(); // user already interacted → autoplay allowed
                } catch (err) {
                    console.error('Audio play failed:', err);
                }

                return;
            }
            else {
                const rawText = await response.text();
                console.log('Raw Server Response:', rawText);

                if (!rawText) {
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: '✅ Voice received. Processing…' }
                    ]);
                    return;
                }

                let data: any;

                try {
                    data = JSON.parse(rawText);
                    console.log('=== FULL PARSED RESPONSE ===');
                    console.log('Type:', typeof data);
                    console.log('Is Array:', Array.isArray(data));
                    console.log('Data:', JSON.stringify(data, null, 2));
                    if (Array.isArray(data)) {
                        console.log('Array Length:', data.length);
                        console.log('First Item:', data[0]);
                    }
                    console.log('Keys:', Object.keys(data));
                    console.log('===========================');
                } catch {
                    console.log('Could not parse JSON, displaying raw text');
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: rawText }
                    ]);
                    return;
                }

                // Try to extract the bot response from various possible structures
                let botText: string | undefined;

                // Handle array response (n8n often returns arrays)
                if (Array.isArray(data)) {
                    const firstItem = data[0];
                    if (firstItem) {
                        console.log('First array item keys:', Object.keys(firstItem));
                        botText =
                            firstItem.output ||
                            firstItem.text ||
                            firstItem.message ||
                            firstItem.response ||
                            firstItem.content ||
                            (firstItem.body && (firstItem.body.message || firstItem.body.output || firstItem.body.text)) ||
                            (typeof firstItem === 'string' ? firstItem : undefined);
                    }
                } else {
                    // Handle object response
                    botText =
                        data.output ||
                        data.text ||
                        data.message ||
                        data.response ||
                        data.content ||
                        (data.body && (data.body.message || data.body.output || data.body.text));
                }

                // Fallback to raw JSON if nothing found
                if (!botText) {
                    console.warn('Could not extract text from response, showing raw JSON');
                    botText = JSON.stringify(data, null, 2);
                }

                console.log('Extracted botText:', botText);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: botText }
                ]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
            setSelectedFile(null);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() || selectedFile) {
            handleSendMessage(message);
        }
    };

    return (
        <>
            <style>{`
                .ai-copilot-button:hover {
                    background-color: ${COLORS.primaryDark} !important;
                }
                .ai-copilot-suggestion {
                    background-color: white;
                    border: 1.5px solid ${COLORS.primary};
                    color: ${COLORS.text};
                    border-radius: 20px;
                    padding: 8px 14px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .ai-copilot-suggestion:hover {
                    background-color: ${COLORS.primary};
                    color: white;
                    transform: translateY(-2px);
                }
                /* Custom Scrollbar Styling */
                .ai-copilot-chat::-webkit-scrollbar {
                    width: 8px;
                }
                .ai-copilot-chat::-webkit-scrollbar-track {
                    background: ${COLORS.background};
                    border-radius: 10px;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb {
                    background: ${COLORS.accent};
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb:hover {
                    background: ${COLORS.accentLight};
                }
                /* Firefox Scrollbar */
                .ai-copilot-chat {
                    scrollbar-color: ${COLORS.accent} ${COLORS.background};
                    scrollbar-width: thin;
                }
            `}</style>

            {/* Trigger Button - Always Visible */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 10000,
                    backgroundColor: isOpen ? '#f0f0f0' : COLORS.primary,
                }}
                className={`p-3 rounded-full shadow-2xl transition-all duration-300 ai-copilot-button ${isOpen ? 'rotate-90' : ''}`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" style={{ color: COLORS.text }} />
                ) : (
                    <div className="w-12 h-12 relative flex items-center justify-center overflow-hidden">
                        <img
                            src="/robo2.gif"
                            alt="Chat"
                            className="w-full h-full object-cover scale-150"
                        />
                    </div>
                )}
            </motion.button>

            {/* Chat Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleChat}
                            className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-sm md:hidden"
                        />

                        {/* Draggable Sidebar Panel */}
                        <motion.div
                            ref={chatContainerRef}
                            drag
                            dragElastic={0.15}
                            dragMomentum={false}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-[90px] right-4 md:right-6 
                                        w-[380px] max-w-[95vw] h-[600px] max-h-[80vh] 
                                        rounded-2xl shadow-2xl border border-gray-200
                                        overflow-hidden flex flex-col z-[9999]"
                            style={{ backgroundColor: COLORS.white }}
                        >

                            {/* Header - Draggable Area */}
                            <div
                                className="p-4 flex items-center justify-between text-white rounded-t-2xl cursor-grab active:cursor-grabbing select-none touch-none"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <div className="flex items-center gap-3 pointer-events-none">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <img src="/robo2.gif" className="w-10 h-10" alt="Robot" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Frostrek Assistant</h3>
                                        <p className="text-xs opacity-90">Online • Ready to help</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleChat}
                                    className="pointer-events-auto hover:bg-white/20 p-1 rounded transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Chat Body (Messages) */}
                            <div
                                className="ai-copilot-chat flex-1 overflow-y-auto p-6 flex flex-col gap-4"
                                style={{ backgroundColor: COLORS.background, overscrollBehavior: 'contain' }}
                            >
                                <div className="text-center px-6 py-6">
                                    <img src="/robo2.gif" className="w-32 mx-auto mb-4" alt="Robot" />
                                    <h4 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                                        Hi, I'm Frostry 👋
                                    </h4>
                                    <p className="text-sm mt-2" style={{ color: COLORS.textLight }}>
                                        Ask me anything about your business, support, or innovation.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        <button className="ai-copilot-suggestion">💡 Get ideas</button>
                                        <button className="ai-copilot-suggestion">📊 Analytics</button>
                                        <button className="ai-copilot-suggestion">🛠 Support</button>
                                    </div>
                                </div>

                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.type === 'user' ? 'text-xs font-bold' : ''}`}
                                            style={{
                                                backgroundColor: msg.type === 'user' ? '#e8e8e8' : COLORS.accent + '20',
                                                color: msg.type === 'user' ? COLORS.text : COLORS.accent,
                                            }}
                                        >
                                            {msg.type === 'user' ? (
                                                <span>You</span>
                                            ) : (
                                                <img src="/robo2.gif" alt="Bot" className="w-6 h-6 object-contain" />
                                            )}
                                        </div>
                                        <div
                                            className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${msg.type === 'user' ? 'text-white rounded-br-sm' : 'text-gray-700 rounded-bl-sm border'}`}
                                            style={{
                                                backgroundColor: msg.type === 'user' ? COLORS.primary : COLORS.white,
                                                color: msg.type === 'user' ? COLORS.white : COLORS.text,
                                                borderColor: msg.type === 'user' ? 'transparent' : '#e0e0e0',
                                            }}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                                            style={{
                                                backgroundColor: COLORS.accent + '20',
                                                borderColor: COLORS.accent,
                                            }}
                                        >
                                            <Sparkles className="w-4 h-4" style={{ color: COLORS.accent }} />
                                        </div>
                                        <div className="p-4 rounded-2xl rounded-tl-none shadow-sm border" style={{ backgroundColor: COLORS.white, borderColor: '#e0e0e0' }}>
                                            <Loader2 className="w-5 h-5 animate-spin" style={{ color: COLORS.primary }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer (Input) */}
                            <div className="p-4 border-t" style={{ backgroundColor: COLORS.white, borderColor: '#e0e0e0' }}>
                                {selectedFile && (
                                    <div className="text-xs mb-2 flex items-center gap-2" style={{ color: COLORS.textLight }}>
                                        <span>📎 {selectedFile.name}</span>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-red-500 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm border" style={{ backgroundColor: COLORS.background, borderColor: '#d0d0d0' }}>
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {/* Upload Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 rounded-lg transition-all duration-200"
                                        style={{
                                            backgroundColor: COLORS.primary + '20',
                                            color: COLORS.primary,
                                        }}
                                        title="Upload file"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                    </button>

                                    {/* Mic Button */}
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`p-2 rounded-lg transition-all duration-200 ${isRecording ? 'animate-pulse' : ''}`}
                                        style={{
                                            backgroundColor: isRecording ? '#ff4444' : COLORS.primary + '20',
                                            color: isRecording ? 'white' : COLORS.primary,
                                        }}
                                        title={isRecording ? "Stop Recording" : "Start Recording"}
                                    >
                                        {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                                    </button>

                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={isRecording ? "Listening..." : "Type your message..."}
                                        disabled={isRecording || isLoading}
                                        className="flex-1 bg-transparent outline-none text-sm px-2"
                                        style={{ color: COLORS.text }}
                                    />

                                    <button
                                        type="submit"
                                        disabled={!message.trim() || isLoading || isRecording}
                                        className="w-9 h-9 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>

                                <div className="text-center mt-2">
                                    <p className="text-[10px]" style={{ color: COLORS.textLight }}>Powered by Frostrek AI</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
