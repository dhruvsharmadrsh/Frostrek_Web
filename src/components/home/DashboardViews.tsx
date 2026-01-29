"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    MoreHorizontal,
    Search,
    Bell,
    CheckCircle2,
    Shield,
    Wifi,
    RefreshCw,
    Send,
    Bot,
    User
} from "lucide-react";

// --- ANALYTICS VIEW (Colorful & Interactive) ---
export const AnalyticsView = () => {
    const [data, setData] = useState([45, 72, 58, 89, 63, 85, 94]);
    const [stats, setStats] = useState([
        { label: "Total Requests", value: "2.4M", trend: "+12.5%", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { label: "Avg. Response", value: "45ms", trend: "-5.2%", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
        { label: "Active Agents", value: "842", trend: "+8.1%", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    ]);

    const regenerateData = () => {
        setData(data.map(() => Math.floor(Math.random() * 60) + 30));
        setStats(prev => prev.map(s => ({
            ...s,
            value: s.label === "Avg. Response" ? `${Math.floor(Math.random() * 40 + 20)}ms`
                : s.label === "Total Requests" ? `${(Math.random() * 1 + 2).toFixed(1)}M`
                    : `${Math.floor(Math.random() * 300 + 600)}`,
            trend: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(1)}%`
        })));
    };

    return (
        <div className="w-full h-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 text-sm md:text-base overflow-y-auto">
            <div className="flex items-center justify-between order-1">
                <div>
                    <h3 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        System Performance
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500">Real-time metrics analysis</p>
                </div>
                <button
                    onClick={regenerateData}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 text-xs font-medium text-slate-300 group"
                >
                    <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Reference</span>
                </button>
            </div>

            {/* Colorful Stats Cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-4 order-3 md:order-2">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        layout
                        className={`border rounded-xl p-4 relative overflow-hidden group hover:bg-white/5 transition-colors ${stat.border}`}
                    >
                        <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${stat.bg.replace('/10', '/50')}`} />

                        <div className="text-xs text-slate-400 mb-1 relative z-10">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color} relative z-10`}>{stat.value}</div>
                        <div className={`text-xs ${stat.color} mt-1 flex items-center gap-1 opacity-80`}>
                            <ArrowUpRight size={12} /> {stat.trend}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Interactive Graph (Responsive: Bar on Desktop, Pie on Mobile) */}
            <div className="flex-1 min-h-[250px] bg-black/20 border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center order-2 md:order-3">

                {/* Desktop: Bar Chart */}
                <div className="hidden md:flex w-full h-full items-end justify-between gap-2 md:gap-4 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
                        style={{ backgroundImage: "linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "100% 40px" }}
                    />

                    {data.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-2 h-full group/bar relative cursor-pointer" onClick={regenerateData}>
                            {/* Hover Glow */}
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg" />

                            <motion.div
                                layout
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`w-full rounded-t-lg relative transition-all duration-300 group-hover/bar:brightness-110 shadow-[0_0_15px_-5px_rgba(0,0,0,0.5)]
                                    ${i % 3 === 0 ? "bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-cyan-500/20" :
                                        i % 3 === 1 ? "bg-gradient-to-t from-purple-600 to-purple-400 shadow-purple-500/20" :
                                            "bg-gradient-to-t from-pink-600 to-pink-400 shadow-pink-500/20"}
                                `}
                            >
                            </motion.div>

                            <div className="text-[10px] text-center text-slate-500 font-mono group-hover/bar:text-slate-300 transition-colors hidden sm:block">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: Pie/Donut Chart */}
                {/* Mobile: Interactive SVG Pie/Donut Chart */}
                <div className="flex md:hidden w-full h-full items-center justify-center flex-col gap-6" onClick={regenerateData}>
                    <div className="relative w-56 h-56 shrink-0 group/pie">
                        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                            {/* Segment 1: Cyan (40%) */}
                            <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#22d3ee" strokeWidth="5"
                                strokeDasharray="40 60" strokeDashoffset="0"
                                className="transition-all duration-300 hover:stroke-[7] hover:brightness-110 origin-center cursor-pointer"
                            />
                            {/* Segment 2: Purple (35%) */}
                            <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#c084fc" strokeWidth="5"
                                strokeDasharray="35 65" strokeDashoffset="-40"
                                className="transition-all duration-300 hover:stroke-[7] hover:brightness-110 origin-center cursor-pointer"
                            />
                            {/* Segment 3: Pink (25%) */}
                            <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#f472b6" strokeWidth="5"
                                strokeDasharray="25 75" strokeDashoffset="-75"
                                className="transition-all duration-300 hover:stroke-[7] hover:brightness-110 origin-center cursor-pointer"
                            />
                        </svg>

                        {/* Inner Hole text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white group-hover/pie:scale-110 transition-transform duration-300">2.4k</span>
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6 justify-center w-full flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                            <span className="text-xs text-slate-300">Requests</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
                            <span className="text-xs text-slate-300">Response</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
                            <span className="text-xs text-slate-300">Agents</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MESSAGES VIEW (Interactive Chat) ---
export const MessagesView = () => {
    const [activeId, setActiveId] = useState(0);
    const [inputText, setInputText] = useState("");
    const [showMobileChat, setShowMobileChat] = useState(false); // Mobile Master-Detail State
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [conversations, setConversations] = useState([
        {
            id: 0,
            user: "Sarah Connor",
            status: "online",
            role: "Product Owner",
            messages: [
                { id: 1, text: "Deployment scheduled for Friday 🚀", sender: "user", time: "2m ago" },
                { id: 2, text: "Acknowledged. All pre-flight checks are green.", sender: "me", time: "1m ago" },
                { id: 3, text: "Great, let's proceed with the staging build.", sender: "user", time: "Just now" }
            ]
        },
        {
            id: 1,
            user: "System Bot",
            status: "bot",
            role: "Automated",
            messages: [
                { id: 1, text: "Automated report generated.", sender: "user", time: "1h ago" },
                { id: 2, text: "No anomalies detected in the last 24h cycle.", sender: "user", time: "1h ago" }
            ]
        },
        {
            id: 2,
            user: "Alex Chen",
            status: "away",
            role: "Developer",
            messages: [
                { id: 1, text: "Can we review the API limits?", sender: "user", time: "3h ago" }
            ]
        }
    ]);

    const scrollToBottom = () => {
        if (containerRef.current) {
            const { scrollHeight, clientHeight } = containerRef.current;
            containerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations, activeId, showMobileChat]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now(),
            text: inputText,
            sender: "me",
            time: "Just now"
        };

        const updatedConversations = [...conversations];
        updatedConversations[activeId].messages.push(newMsg);
        setConversations(updatedConversations);
        setInputText("");

        // Simulated Bot Reply
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "Message received. I'm just a demo bot, but I think that sounds great! 🤖",
                sender: "user",
                time: "Just now"
            };
            const wReply = [...conversations];
            wReply[activeId].messages.push(botMsg);
            setConversations(wReply);
        }, 1500);
    };

    const activeChat = conversations[activeId];

    return (
        <div className="w-full h-full flex flex-col md:flex-row overflow-hidden rounded-xl bg-[#18181b] border border-white/5">
            {/* Sidebar List (Visible on Desktop OR Mobile if Chat NOT active) */}
            <div className={`
                ${showMobileChat ? "hidden md:flex" : "flex"}
                w-full md:w-[280px] h-full border-r border-white/5 bg-[#18181b] flex-col shrink-0
            `}>
                <div className="p-3 md:p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h3 className="font-bold text-slate-200 text-sm md:text-base">Inbox</h3>
                    <div className="flex gap-1">
                        <div className="p-1.5 hover:bg-white/5 rounded-md cursor-pointer transition-colors text-slate-500 hover:text-slate-300">
                            <Search size={14} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pt-2 space-y-0.5 px-2">
                    {conversations.map((chat, i) => (
                        <div
                            key={chat.id}
                            onClick={() => {
                                setActiveId(i);
                                setShowMobileChat(true);
                            }}
                            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex gap-3 items-center group relative
                                ${activeId === i
                                    ? "bg-white/5"
                                    : "hover:bg-white/[0.02]"}
                            `}
                        >
                            {/* Active Indicator Bar - Desktop Only */}
                            {activeId === i && (
                                <motion.div
                                    layoutId="active-bar"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-green-500 rounded-r-full hidden md:block"
                                />
                            )}

                            <div className="relative shrink-0">
                                <div className={`w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-sm font-bold shadow-sm border border-white/5
                                    ${chat.status === 'bot'
                                        ? "bg-purple-500/10 text-purple-400"
                                        : "bg-slate-800 text-slate-300"}
                                `}>
                                    {chat.status === 'bot' ? <Bot size={18} /> : chat.user[0]}
                                </div>
                                {/* Online Status Dot */}
                                {chat.status !== 'bot' && (
                                    <div className={`absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 border-2 border-[#18181b] rounded-full
                                        ${chat.status === 'online' ? "bg-emerald-500" : "bg-slate-500"}
                                    `} />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex justify-between items-baseline gap-2">
                                    <div className={`text-sm font-semibold truncate transition-colors ${activeId === i ? "text-slate-200" : "text-slate-400 group-hover:text-slate-300"}`}>
                                        {chat.user}
                                    </div>
                                    <span className="text-[10px] text-slate-600 shrink-0">{chat.messages[chat.messages.length - 1].time.replace(" ago", "")}</span>
                                </div>
                                <div className={`text-xs truncate transition-colors ${activeId === i ? "text-slate-400" : "text-slate-600 group-hover:text-slate-500"}`}>
                                    {chat.messages[chat.messages.length - 1].sender === 'me' ? 'You: ' : ''}
                                    {chat.messages[chat.messages.length - 1].text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area (Visible on Desktop OR Mobile if Chat IS active) */}
            <div className={`
                ${!showMobileChat ? "hidden md:flex" : "flex"}
                flex-1 flex-col bg-[#1e1e20] relative min-h-0
            `}>
                {/* Chat Header */}
                <div className="h-14 md:h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-white/[0.02] backdrop-blur-sm z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Mobile Back Button */}
                        <div
                            className="md:hidden p-1.5 -ml-2 mr-1 hover:bg-white/5 rounded-lg cursor-pointer text-slate-400"
                            onClick={() => setShowMobileChat(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </div>

                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md border border-white/5
                            ${activeChat.status === 'bot'
                                ? "bg-purple-900/50 text-purple-300"
                                : "bg-slate-800 text-slate-300"}
                        `}>
                            {activeChat.status === 'bot' ? <Bot size={14} /> : activeChat.user[0]}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-200">{activeChat.user}</div>
                            <div className="text-[10px] flex items-center gap-1.5 text-slate-500">
                                {activeChat.status === 'online' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                                {activeChat.role} • {activeChat.status === 'bot' ? 'System' : activeChat.status === 'online' ? 'Online' : 'Away'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                        <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"><Search size={16} /></div>
                    </div>
                </div>

                {/* Messages List - Optimized Rendering */}
                <div ref={containerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scroll-smooth">
                    {activeChat.messages.map((msg, idx) => {
                        const isMe = msg.sender === 'me';
                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[85%] md:max-w-[75%]`}>
                                    <div className={`
                                        rounded-2xl px-4 py-2 md:px-5 md:py-3 text-sm leading-relaxed shadow-sm backdrop-blur-sm relative
                                        ${isMe
                                            ? "bg-emerald-600 text-white rounded-br-none shadow-emerald-500/10 border border-emerald-500/20"
                                            : "bg-[#27272a] border border-white/5 text-slate-200 rounded-bl-none"}
                                    `}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-slate-600 mt-1.5 px-1 font-medium bg-black/20 rounded-full py-0.5">
                                        {msg.time}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                    {/* Invisible spacer for scrolling */}
                    <div className="h-4" />
                </div>

                {/* Floating Input Area */}
                <div className="p-3 md:p-5 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1e1e20] via-[#1e1e20]/90 to-transparent pt-10">
                    <form onSubmit={sendMessage} className="relative group max-w-3xl mx-auto">
                        <div className="absolute inset-0 bg-brand-green-500/10 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative flex items-center gap-2 md:gap-3 bg-[#27272a] border border-white/10 rounded-full px-2 py-1.5 md:py-2 shadow-xl group-focus-within:border-brand-green-500/40 group-focus-within:ring-1 group-focus-within:ring-brand-green-500/20 transition-all backdrop-blur-md">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-white/10 hover:text-white transition-colors shrink-0">
                                <span className="text-lg pb-1">+</span>
                            </div>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 h-9 min-w-0"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0
                                    ${inputText.trim()
                                        ? "bg-brand-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 hover:bg-brand-green-400"
                                        : "bg-white/5 text-slate-600 cursor-not-allowed"}
                                `}
                            >
                                <Send size={16} className={inputText.trim() ? "translate-x-0.5 translate-y-0.5" : ""} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- TEAM VIEW ---
export const TeamView = () => {
    return (
        <div className="w-full h-full p-4 md:p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-slate-200">Team Members</h3>
                <button className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 text-xs px-3 py-1.5 rounded-md transition-colors border border-emerald-500/20">
                    + Invite
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: "Felix Chen", role: "Admin", status: "Online", color: "text-emerald-500" },
                    { name: "Sarah Smith", role: "Viewer", status: "Away", color: "text-amber-500" },
                    { name: "Marcus O.", role: "Editor", status: "Offline", color: "text-slate-500" },
                    { name: "AI Bot", role: "System", status: "Active", color: "text-blue-500" },
                ].map((member, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                                <span className="text-xs font-bold text-slate-400">{member.name[0]}</span>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-300 group-hover:text-emerald-400 transition-colors">{member.name}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${member.color}`} />
                                    {member.role}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- SETTINGS VIEW (Futuristic Modules) ---
export const SettingsView = () => {
    // State for toggles
    const [toggles, setToggles] = useState({
        notifications: true,
        security: false,
        network: false,
        updates: true
    });

    const toggleSetting = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const modules = [
        { key: "notifications", label: "Neural Notifications", desc: "Direct feedback loop", icon: Bell, color: "#ec4899", from: "from-pink-500", to: "to-rose-500" },
        { key: "security", label: "Quantum Security", desc: "Encryption Layer: L4", icon: Shield, color: "#06b6d4", from: "from-cyan-500", to: "to-blue-500" },
        { key: "network", label: "Global Mesh", desc: "Latency: <12ms", icon: Wifi, color: "#8b5cf6", from: "from-violet-500", to: "to-purple-500" },
        { key: "updates", label: "Auto-Evolution", desc: "Core v2.5.0-rc", icon: CheckCircle2, color: "#10b981", from: "from-emerald-500", to: "to-green-500" },
    ];

    return (
        <div className="w-full h-full p-4 md:p-8 flex flex-col overflow-y-auto">
            <h3 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 md:mb-6">
                Core Configuration
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6 flex-1">
                {modules.map((mod) => {
                    const isActive = toggles[mod.key as keyof typeof toggles];
                    const Icon = mod.icon;
                    return (
                        <motion.div
                            key={mod.key}
                            layout
                            onClick={() => toggleSetting(mod.key as keyof typeof toggles)}
                            className={`
                                relative rounded-xl md:rounded-2xl border p-3 md:p-6 cursor-pointer group transition-all duration-500 overflow-hidden flex flex-col justify-between
                                ${isActive ? "bg-black/40 border-transparent" : "bg-white/5 border-white/5 hover:border-white/10"}
                            `}
                            style={{
                                boxShadow: isActive ? `0 0 40px -10px ${mod.color}30` : "none"
                            }}
                        >
                            {/* Active Glow Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${mod.from} ${mod.to} opacity-0 transition-opacity duration-500 ${isActive ? "opacity-10" : ""}`} />

                            {/* Top Row: Icon & Status */}
                            <div className="flex justify-between items-start relative z-10">
                                <div
                                    className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 
                                        ${isActive ? `bg-gradient-to-br ${mod.from} ${mod.to} text-white shadow-lg` : "bg-white/5 text-slate-500"}
                                    `}
                                    style={{
                                        boxShadow: isActive ? `0 4px 20px ${mod.color}50` : "none"
                                    }}
                                >
                                    <Icon size={16} className="md:w-6 md:h-6 transition-transform duration-500 group-hover:scale-110" />
                                </div>

                                {/* Toggle Switch */}
                                <div className={`w-8 h-5 md:w-12 md:h-7 rounded-full relative transition-colors duration-500 ${isActive ? "bg-white/20" : "bg-white/5"}`}>
                                    <div className={`absolute top-1 w-3 h-3 md:w-5 md:h-5 rounded-full shadow-sm transition-all duration-500 
                                        ${isActive ? "left-4 md:left-6 bg-white" : "left-1 bg-slate-500"}
                                    `} />
                                </div>
                            </div>

                            {/* Bottom Row: Text */}
                            <div className="relative z-10 mt-2 md:mt-4">
                                <h4 className={`text-xs md:text-lg font-bold transition-colors duration-300 leading-tight ${isActive ? "text-white" : "text-slate-300"}`}>
                                    {mod.label}
                                </h4>
                                <p className={`text-[10px] md:text-xs transition-colors duration-300 mt-0.5 ${isActive ? "text-white/60" : "text-slate-500"}`}>
                                    {mod.desc}
                                </p>
                            </div>

                            {/* Decorative Neon Line active state */}
                            <div className={`absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r ${mod.from} ${mod.to} transform transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
