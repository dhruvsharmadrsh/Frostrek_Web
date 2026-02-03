import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

interface VoiceCallWidgetProps {
    onCallStateChange?: (isActive: boolean) => void;
}

const VoiceCallWidget: React.FC<VoiceCallWidgetProps> = ({ onCallStateChange }) => {
    const { theme } = useTheme();
    const [isCallActive, setIsCallActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');

    // Ref to track call active state for async callbacks
    const isCallActiveRef = useRef(false);



    // Audio recording refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Audio visualization
    const [audioLevel, setAudioLevel] = useState(0);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Audio level visualization
    const updateAudioLevel = useCallback(() => {
        if (!analyserRef.current || !isListening) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(average / 255);

        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }, [isListening]);

    // Start the voice call
    const startCall = async () => {
        console.log('🎤 startCall triggered');
        try {
            setCallStatus('connecting');
            setAiResponse('');
            setTranscript('');
            console.log('🎤 Status set to connecting');

            console.log('🎤 Requesting microphone access...');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('🎤 Microphone access granted');
            streamRef.current = stream;

            // Setup audio analyser for visualization
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;
            console.log('🎤 Audio context setup complete');

            setIsCallActive(true);
            isCallActiveRef.current = true;
            setCallStatus('active');
            onCallStateChange?.(true);
            console.log('🎤 Call is now active');

            // Initial greeting from AI
            const greeting = "Hi! I'm Frostrek's AI assistant. How can I help you today?";
            setAiResponse(greeting);
            setIsSpeaking(true);
            console.log('🎤 Starting speech synthesis...');
            await speakText(greeting);
            console.log('🎤 Speech finished');
            setIsSpeaking(false);

            // Start listening after greeting
            console.log('🎤 Starting to listen...');
            startListening();
        } catch (error) {
            console.error('🎤 Error starting call:', error);
            setCallStatus('idle');
            alert('Cannot access microphone. Please check permissions. Error: ' + (error as Error).message);
        }
    };

    // End the voice call
    const endCall = () => {
        setIsCallActive(false);
        isCallActiveRef.current = false;
        setIsListening(false);
        setIsSpeaking(false);
        setCallStatus('ended');
        onCallStateChange?.(false);

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // Clear session for fresh start next time
        sessionStorage.removeItem('voiceCallSessionId');

        setTimeout(() => setCallStatus('idle'), 2000);
    };

    // Start listening for user speech
    const startListening = () => {
        if (!streamRef.current || isMuted) return;

        setIsListening(true);
        audioChunksRef.current = [];

        const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            if (audioChunksRef.current.length > 0) {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await sendToAI(audioBlob);
            }
        };

        mediaRecorder.start();
        updateAudioLevel();

        // Auto-stop after 10 seconds of recording
        silenceTimeoutRef.current = setTimeout(() => {
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                setIsListening(false);
            }
        }, 10000);
    };

    // Stop listening
    const stopListening = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);

        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    // Send audio to n8n and get response
    const sendToAI = async (audioBlob: Blob) => {
        setIsLoading(true);
        setTranscript('Processing your message...');

        try {
            const formData = new FormData();
            formData.append('voice', audioBlob, 'recording.webm');
            formData.append('Type', 'voice');
            formData.append('chatInput', 'Voice message');

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('audio')) {
                // Handle audio response
                const responseBlob = await response.blob();
                const audioUrl = URL.createObjectURL(responseBlob);
                const audio = new Audio(audioUrl);

                setAiResponse('🎤 Playing voice response...');
                setIsSpeaking(true);

                audio.onended = () => {
                    setIsSpeaking(false);
                    URL.revokeObjectURL(audioUrl);
                    if (isCallActiveRef.current) {
                        setTimeout(() => startListening(), 500);
                    }
                };

                await audio.play();
            } else {
                // Handle text response
                const data = await response.json();
                let responseText = "I received your message.";

                if (data.output) responseText = data.output;
                else if (data.text) responseText = data.text;
                else if (data.message) responseText = data.message;
                else if (Array.isArray(data) && data[0]?.output) responseText = data[0].output;
                else if (typeof data === 'string') responseText = data;

                setAiResponse(responseText);
                setIsSpeaking(true);
                await speakText(responseText);
                setIsSpeaking(false);

                // Continue listening after response
                if (isCallActiveRef.current) {
                    setTimeout(() => startListening(), 500);
                }
            }

            setTranscript('');
        } catch (error) {
            console.error('Error sending to AI:', error);
            setAiResponse("Sorry, I'm having trouble connecting. Please try again.");
            setIsSpeaking(true);
            await speakText("Sorry, I'm having trouble connecting. Please try again.");
            setIsSpeaking(false);

            if (isCallActiveRef.current) {
                setTimeout(() => startListening(), 1000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Text to speech using Web Speech API
    const speakText = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            // Function to set voice and speak
            const setVoiceAndSpeak = () => {
                const voices = speechSynthesis.getVoices();
                if (voices.length > 0) {
                    const preferredVoice = voices.find(v =>
                        v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.lang.startsWith('en')
                    ) || voices[0];

                    if (preferredVoice) {
                        utterance.voice = preferredVoice;
                    }
                }

                utterance.onend = () => resolve();
                utterance.onerror = (e) => {
                    console.error('Speech error:', e);
                    resolve();
                };

                speechSynthesis.speak(utterance);
            };

            // Check if voices are already loaded
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoiceAndSpeak();
            } else {
                // Wait for voices to load
                speechSynthesis.onvoiceschanged = () => {
                    setVoiceAndSpeak();
                };
                // Fallback if onvoiceschanged doesn't fire
                setTimeout(() => {
                    if (speechSynthesis.speaking === false) {
                        setVoiceAndSpeak();
                    }
                }, 100);
            }
        });
    };

    // Toggle mute
    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => {
                track.enabled = isMuted; // Toggle opposite since we're toggling the state
            });
        }
    };

    return (
        <div className="relative">
            {/* Main Call Widget */}
            <motion.div
                className={`relative rounded-3xl p-8 shadow-xl border overflow-hidden ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Glow Effect */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isCallActive ? 'opacity-100' : 'opacity-0'} ${theme === 'dark' ? 'bg-gradient-to-br from-dark-accent/10 to-amber-500/10' : 'bg-gradient-to-br from-brand-green-500/10 to-cyan-500/10'}`}
                />

                {/* Animated Orb */}
                <div className="relative flex justify-center mb-8">
                    <motion.div
                        className={`relative w-32 h-32 rounded-full flex items-center justify-center ${isCallActive
                            ? (theme === 'dark' ? 'bg-gradient-to-br from-dark-accent to-amber-600' : 'bg-gradient-to-br from-brand-green-400 to-cyan-500')
                            : (theme === 'dark' ? 'bg-gradient-to-br from-gray-600 to-gray-700' : 'bg-gradient-to-br from-gray-200 to-gray-300')
                            }`}
                        animate={{
                            scale: isCallActive ? [1, 1.05, 1] : 1,
                            boxShadow: isCallActive
                                ? [
                                    '0 0 0 0px rgba(20, 184, 166, 0.3)',
                                    '0 0 0 20px rgba(20, 184, 166, 0)',
                                ]
                                : '0 0 0 0px rgba(0, 0, 0, 0)',
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: isCallActive ? Infinity : 0,
                            ease: 'easeInOut',
                        }}
                    >
                        {/* Inner pulsing circles for listening state */}
                        <AnimatePresence>
                            {isListening && (
                                <>
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-0 rounded-full border-2 border-white/50"
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 1.5 + i * 0.2, opacity: 0 }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.3,
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </AnimatePresence>

                        {/* Icon */}
                        {isLoading ? (
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        ) : isSpeaking ? (
                            <Volume2 className="w-12 h-12 text-white animate-pulse" />
                        ) : isListening ? (
                            <Mic className="w-12 h-12 text-white" />
                        ) : (
                            <Phone className={`w-12 h-12 ${isCallActive ? 'text-white' : 'text-gray-400'}`} />
                        )}
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>
                        {callStatus === 'idle' && 'Voice AI Assistant'}
                        {callStatus === 'connecting' && 'Connecting...'}
                        {callStatus === 'active' && (
                            isListening ? 'Listening...' :
                                isSpeaking ? 'Speaking...' :
                                    isLoading ? 'Processing...' : 'Ready'
                        )}
                        {callStatus === 'ended' && 'Call Ended'}
                    </h3>

                    {/* AI Response Display */}
                    <AnimatePresence mode="wait">
                        {aiResponse && (
                            <motion.p
                                key={aiResponse}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`text-sm max-w-xs mx-auto leading-relaxed ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}
                            >
                                {aiResponse}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {transcript && (
                        <p className={`text-xs mt-2 italic ${theme === 'dark' ? 'text-dark-text-muted/70' : 'text-gray-400'}`}>{transcript}</p>
                    )}
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-4">
                    {!isCallActive ? (
                        <button
                            onClick={() => {
                                console.log('Button clicked!');
                                startCall();
                            }}
                            disabled={callStatus === 'connecting'}
                            className={`flex items-center gap-2 px-8 py-4 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer ${theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white hover:from-brand-green-600 hover:to-brand-green-700'}`}
                        >
                            <Phone className="w-5 h-5" />
                            Try Voice Call
                        </button>
                    ) : (
                        <>
                            {/* Mute Button */}
                            <motion.button
                                onClick={toggleMute}
                                className={`p-4 rounded-full transition-all duration-300 ${isMuted
                                    ? 'bg-red-500/20 text-red-400'
                                    : (theme === 'dark' ? 'bg-dark-bg text-dark-text-muted hover:bg-dark-accent/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </motion.button>

                            {/* End Call Button */}
                            <motion.button
                                onClick={endCall}
                                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <PhoneOff className="w-5 h-5" />
                                End Call
                            </motion.button>

                            {/* Manual Stop Listening */}
                            {isListening && (
                                <motion.button
                                    onClick={stopListening}
                                    className={`p-4 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent hover:bg-dark-accent/30' : 'bg-brand-green-100 text-brand-green-600 hover:bg-brand-green-200'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <Volume2 className="w-6 h-6" />
                                </motion.button>
                            )}
                        </>
                    )}
                </div>

                {/* Audio Level Indicator */}
                {isListening && (
                    <div className="mt-6 flex items-center justify-center gap-1">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-brand-green-500'}`}
                                animate={{
                                    height: Math.random() * 20 + 5 + audioLevel * 30,
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default VoiceCallWidget;
