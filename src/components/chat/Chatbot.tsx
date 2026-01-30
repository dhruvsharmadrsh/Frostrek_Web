import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Mic, Square, Loader2, Image as ImageIcon, Paperclip, Trash2 } from 'lucide-react';


// Webhook URL
const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string, image?: string }>>([
        { type: 'bot', content: "Hello! 👋 I'm your AI assistant from Frostrek.\nHow can I help you innovate today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Image Upload State
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Session ID Management
    const [sessionId] = useState(() => {
        const stored = localStorage.getItem('chatSessionId');
        if (stored) return stored;
        // Simple random ID generator if crypto.randomUUID isn't available, though it usually is in modern browsers
        const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('chatSessionId', newId);
        return newId;
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, previewUrl]);
    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
        document.body.style.overflow = '';
    };
    }, [isOpen]);


    const toggleChat = () => setIsOpen(!isOpen);

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
                // Send audio immediately after stop
                handleSendMessage(undefined, audioBlob);

                // Stop all tracks
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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSendMessage = async (textInput?: string, audioBlob?: Blob) => {
        if (!textInput && !audioBlob && !selectedImage) return;

        setIsLoading(true);
        const currentImage = selectedImage;
        const currentPreview = previewUrl;

        // Clear image state immediately
        removeImage();

        // Add user message to UI
        if (textInput || currentImage) {
            setMessages(prev => [...prev, { 
                type: 'user', 
                content: textInput || '', 
                image: currentPreview || undefined 
            }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            const formData = new FormData();
            formData.append('sessionId', sessionId);

            if (textInput) {
                formData.append('chatInput', textInput);
            }
            
            if (currentImage) {
                formData.append('image', currentImage);
            }

            if (audioBlob) {
                formData.append('audio', audioBlob, 'recording.webm');
                if (!textInput) formData.append('chatInput', 'Voice message');
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            // Check Content-Type to determine how to handle the response
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('audio')) {
                // Handle Audio Response (Binary)
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                setMessages(prev => [...prev, { type: 'bot', content: '🎤 (Playing Audio Response...)' }]);

                audio.play().catch(e => console.error("Audio play failed", e));

            } else {
                const data = await response.json();

                let botText = "I received your message.";
                if (data.output) botText = data.output;
                else if (data.text) botText = data.text;
                else if (data.message) botText = data.message;
                else if (Array.isArray(data) && data[0]?.output) botText = data[0].output;
                else if (typeof data === 'string') botText = data; // Pure text response

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
        if (message.trim() || selectedImage) {
            handleSendMessage(message);
        }
    };

    return (
        <>
            {/* Trigger Button - Floating & Sticky */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 z-[9999] p-1 rounded-full shadow-2xl transition-all duration-300 ${isOpen
                    ? 'bg-gray-100 text-brand-gray-800 rotate-90'
                    : 'bg-brand-green-500 text-white hover:bg-brand-green-400 animate-pulse-subtle'
                    }`}
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <div className="w-14 h-14 relative">
                        <img
                            src="/robo2.gif"
                            alt="Chat"
                            className="w-full h-full object-contain scale-125 rounded-full"
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

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-[90px] right-4 md:right-6 w-[380px] max-w-[95vw] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-[9999]"
>
                            {/* Header */}
                            <div className="bg-gradient-to-r from-brand-green-500 to-teal-400 p-4 flex items-center justify-between text-white rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                <img src="/robo2.gif" className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                <h3 className="font-semibold text-sm">Frostrek Assistant</h3>
                                <p className="text-xs opacity-90">Online • Ready to help</p>
                                </div>
                            </div>
                            <button onClick={toggleChat}>
                                <X className="w-5 h-5"/>
                            </button>
                            </div>
                            {messages.length === 1 && (
                                <div className="text-center px-6 py-6">
                                    <img src="/robo2.gif" className="w-20 mx-auto mb-4 rounded-full"/>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                    Hi, I'm Frostrek Assistant 👋
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-2">
                                    Ask me anything about innovation, products or support.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    <button className="suggestion-chip">💡 Get product ideas</button>
                                    <button className="suggestion-chip">📊 Help with analytics</button>
                                    <button className="suggestion-chip">🛠 Solve a technical issue</button>
                                    </div>
                                </div>
                                )}
                            {/* Chat Body (Messages) */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col gap-4" style={{ overscrollBehavior: 'contain' }}
>
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.type === 'user' ? 'bg-gray-200' : 'bg-brand-green-100 border border-brand-green-200'
                                            }`}>
                                            {msg.type === 'user' ? (
                                                <span className="text-xs font-bold text-gray-600">You</span>
                                            ) : (
                                                <img src="/robo2.gif" alt="Bot" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${msg.type === 'user'
                                            ? 'bg-gradient-to-r from-brand-green-500 to-teal-400 text-white rounded-2xl'
                                            : 'bg-white text-gray-700 rounded-2xl shadow-sm border border-gray-100'
                                            }`}>
                                            {msg.image && (
                                                <div className="mb-2 max-w-[200px]">
                                                    <img src={msg.image} alt="Uploaded" className="rounded-lg w-full h-auto" />
                                                </div>
                                            )}
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full bg-brand-green-100 flex items-center justify-center flex-shrink-0 border border-brand-green-200">
                                            <Sparkles className="w-4 h-4 text-brand-green-600" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                            <Loader2 className="w-5 h-5 animate-spin text-brand-green-500" />
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>

                            {/* Footer (Input) */}
                            <div className="p-4 border-t bg-gray-50">
                                {previewUrl && (
                                    <div className="mb-2 relative inline-block">
                                        <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                                        <button 
                                            onClick={removeImage}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                                <form onSubmit={onSubmit} className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm border border-gray-100">
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleImageSelect} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                    
                                    {/* Upload Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 text-gray-400 hover:text-brand-green-500 transition-colors"
                                        disabled={isRecording || isLoading}
                                        title="Upload Image"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                    </button>

                                    {/* Mic Button */}
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`p-3 rounded-xl transition-all duration-200 ${isRecording
                                            ? 'bg-red-50 text-red-500 animate-pulse ring-2 ring-red-500/20'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                            }`}
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
                                    />
                                    <button
                                        type="submit"
                                        disabled={(!message.trim() && !selectedImage) || isLoading || isRecording}
                                        className="w-9 h-9 bg-gradient-to-r from-brand-green-500 to-teal-400 text-white rounded-full flex items-center justify-center"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                                <div className="text-center mt-2">
                                    <p className="text-[10px] text-gray-400">Powered by Frostrek AI</p>
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