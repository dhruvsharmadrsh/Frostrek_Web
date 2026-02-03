import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Mic, Square, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

interface Message {
    type: 'user' | 'bot';
    content: string;
    image?: string;
}

const ChatbotDemo: React.FC = () => {
    const { theme } = useTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { type: 'bot', content: "Hello! 👋 I'm your AI assistant from Frostrek.\nHow can I help you innovate today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        if (!textInput && !audioBlob) return;

        setIsLoading(true);

        if (textInput) {
            setMessages(prev => [...prev, { type: 'user', content: textInput }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            const formData = new FormData();

            if (textInput) {
                formData.append('chatInput', textInput);
                formData.append('Type', 'text');
            }

            if (audioBlob) {
                formData.append('voice', audioBlob, 'recording.webm');
                formData.append('Type', 'voice');
                if (!textInput) formData.append('chatInput', 'Voice message');
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('audio')) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                setMessages(prev => [...prev, { type: 'bot', content: '🎤 (Playing Audio Response...)' }]);
                audio.play().catch(e => console.error("Audio play failed", e));
            } else if (contentType && contentType.includes('image')) {
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);
                setMessages(prev => [...prev, { type: 'bot', content: 'Here is the generated image:', image: imageUrl }]);
            } else {
                const data = await response.json();

                let botText = "I received your message.";
                if (data.output) botText = data.output;
                else if (data.text) botText = data.text;
                else if (data.message) botText = data.message;
                else if (Array.isArray(data) && data[0]?.output) botText = data[0].output;
                else if (typeof data === 'string') botText = data;

                if (data.audioUrl) {
                    const audio = new Audio(data.audioUrl);
                    audio.play().catch(e => console.error("Audio play failed", e));
                    botText += " 🔊";
                }

                setMessages(prev => [...prev, { type: 'bot', content: botText }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            handleSendMessage(message);
        }
    };

    return (
        <motion.div
            className={`rounded-3xl shadow-xl border overflow-hidden flex flex-col h-[500px] ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-100'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Header */}
            <div className={`p-4 text-white flex items-center gap-3 ${theme === 'dark' ? 'bg-gradient-to-r from-dark-accent to-amber-600' : 'bg-gradient-to-r from-brand-green-600 to-brand-green-500'}`}>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Chat with Frosty</h3>
                    <p className={`text-xs opacity-90 ${theme === 'dark' ? 'text-amber-100' : 'text-brand-green-100'}`}>AI-powered assistant</p>
                </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 flex flex-col gap-3 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                    >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.type === 'user'
                            ? (theme === 'dark' ? 'bg-dark-card' : 'bg-gray-200')
                            : (theme === 'dark' ? 'bg-dark-accent/20 border border-dark-accent/30' : 'bg-brand-green-100 border border-brand-green-200')
                            }`}>
                            {msg.type === 'user' ? (
                                <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-600'}`}>You</span>
                            ) : (
                                <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                            )}
                        </div>
                        <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${msg.type === 'user'
                            ? (theme === 'dark' ? 'bg-dark-accent text-dark-bg rounded-tr-none' : 'bg-brand-green-500 text-white rounded-tr-none')
                            : (theme === 'dark' ? 'bg-dark-card text-dark-text border border-dark-accent/20 rounded-tl-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none')
                            }`}>
                            {msg.content}
                            {msg.image && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={msg.image} alt="Generated" className="w-full h-auto" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {isLoading && (
                    <div className="flex gap-2 max-w-[85%]">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20 border border-dark-accent/30' : 'bg-brand-green-100 border border-brand-green-200'}`}>
                            <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                        </div>
                        <div className={`p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center ${theme === 'dark' ? 'bg-dark-card border border-dark-accent/20' : 'bg-white border border-gray-100'}`}>
                            <div className="flex gap-1">
                                <motion.div
                                    className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.5, 1] }}
                                />
                                <motion.div
                                    className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.4, delay: 0.2, repeat: Infinity, times: [0, 0.5, 1] }}
                                />
                                <motion.div
                                    className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.4, delay: 0.4, repeat: Infinity, times: [0, 0.5, 1] }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-3 border-t ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-100'}`}>
                <form onSubmit={onSubmit} className="relative flex items-center gap-2">
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`p-2.5 rounded-xl transition-all duration-200 ${isRecording
                            ? 'bg-red-500/20 text-red-400 animate-pulse ring-2 ring-red-500/20'
                            : (theme === 'dark' ? 'bg-dark-bg text-dark-text-muted hover:bg-dark-accent/20 hover:text-dark-accent' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700')
                            }`}
                        title={isRecording ? "Stop Recording" : "Start Recording"}
                    >
                        {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={isRecording ? "Listening..." : "Type a message..."}
                        disabled={isRecording || isLoading}
                        className={`w-full pl-3 pr-10 py-2.5 border-transparent rounded-xl text-sm transition-all duration-200 outline-none disabled:opacity-60 ${theme === 'dark' ? 'bg-dark-bg text-dark-text placeholder-dark-text-muted/60 focus:bg-dark-bg focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20' : 'bg-gray-100 focus:bg-white focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-500/20'}`}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading || isRecording}
                        className={`absolute right-2 p-1.5 rounded-lg transition-colors disabled:opacity-50 ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90 disabled:hover:bg-dark-accent' : 'bg-brand-green-500 text-white hover:bg-brand-green-600 disabled:hover:bg-brand-green-500'}`}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ChatbotDemo;
