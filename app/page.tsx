"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Zap,
  BarChart3,
  Users,
  Send,
  UserCheck,
  Music,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Play,
  Globe,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Platform Data
const platforms = [
  { name: "TikTok", color: "from-pink-500 to-cyan-400", icon: "🎵" },
  { name: "YouTube", color: "from-red-600 to-red-400", icon: "▶️" },
  { name: "Instagram", color: "from-purple-600 to-pink-500", icon: "📸" },
  { name: "Facebook", color: "from-blue-600 to-blue-400", icon: "📘" },
  { name: "Pinterest", color: "from-red-500 to-pink-600", icon: "📌" },
  { name: "X (Twitter)", color: "from-gray-400 to-slate-100", icon: "𝕏" },
];

// Features Data
const features = [
  {
    icon: Zap,
    title: "⚡ Fast Downloads",
    desc: "Ultra-fast media processing via high-speed dedicated proxy network.",
  },
  {
    icon: Bot,
    title: "🤖 Automatic Bot Creation",
    desc: "One-click Managed Bot generation via Telegram API instantly.",
  },
  {
    icon: BarChart3,
    title: "📊 Advanced Statistics",
    desc: "Real-time metrics on user activity, bandwith, and popular media sources.",
  },
  {
    icon: Users,
    title: "👥 User Management",
    desc: "Track active users, grant VIP access, or restrict abusive accounts easily.",
  },
  {
    icon: Send,
    title: "📢 Broadcast System",
    desc: "Send targeted mass updates and promotional announcements in seconds.",
  },
  {
    icon: UserCheck,
    title: "🔐 Force Join",
    desc: "Require users to subscribe to your channel before downloading media.",
  },
  {
    icon: Music,
    title: "🎵 Video to MP3",
    desc: "Automatic high-bitrate audio extraction for all supported platforms.",
  },
  {
    icon: ShieldCheck,
    title: "🛠️ Personal Admin Panel",
    desc: "Full command center right inside Telegram or custom web console.",
  },
];

// Counter Component
const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-2">
        {value}
      </h3>
      <p className="text-slate-400 font-medium text-sm md:text-base">{label}</p>
    </motion.div>
  );
};

export default function DownloadCreatorLanding() {
  const [heroStep, setHeroStep] = useState(0);

  // Hero loop animation runner
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glowing Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 py-6 backdrop-blur-md bg-slate-950/60 border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Download Creator
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#platforms" className="hover:text-cyan-400 transition-colors">
            Platforms
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How It Works
          </a>
          <a href="#dashboard" className="hover:text-cyan-400 transition-colors">
            Dashboard
          </a>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all">
          Create Your Bot
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-xs md:text-sm font-medium mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            Next-Gen Telegram Bot Builder Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Create Your Own <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Download Bot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
          >
            Build a powerful Telegram downloader bot in seconds — no coding required. Fully automated cloud delivery system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-xl shadow-blue-500/30 hover:scale-[1.03] transition-all flex items-center gap-2 group">
              Create Your Bot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-slate-200 transition-all backdrop-blur-md"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* HERO ANIMATED SIMULATION */}
        <div className="relative">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent backdrop-blur-2xl border border-white/10 shadow-2xl">
            <div className="bg-slate-900/90 rounded-[22px] p-6 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">MediaSaver_Bot</h4>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Online ●
                    </span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Managed Bot
                </span>
              </div>

              {/* Dynamic Animated Sequence */}
              <div className="space-y-4 my-auto">
                <AnimatePresence mode="wait">
                  {heroStep === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                    >
                      <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-2 animate-bounce" />
                      <p className="text-sm font-medium text-slate-200">Initializing Managed Bot API...</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.5 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {heroStep === 1 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="p-3 rounded-lg bg-blue-600/20 border border-blue-500/30 text-xs text-blue-300">
                        🔗 Connecting platforms: TikTok, YouTube, Instagram, X...
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {platforms.slice(0, 6).map((p, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-center text-xs flex items-center justify-center gap-1"
                          >
                            <span>{p.icon}</span> {p.name}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {heroStep === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-slate-800/80 border border-cyan-500/40"
                    >
                      <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2">
                        <Download className="w-4 h-4 animate-pulse" /> Downloading 1080p Video...
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full"
                          initial={{ width: "10%" }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {heroStep === 3 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500 text-slate-950 font-bold">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-400">Media Ready!</p>
                          <p className="text-xs text-slate-400">4K Ultra HD • MP4 • No Watermark</p>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">
                        Sent to Chat
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bot Footer Mockup */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                <span>Auto-powered by Download Creator Cloud</span>
                <span>v2.4 Pro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section id="platforms" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Supported Platforms</h2>
          <p className="text-slate-400 text-sm md:text-base">
            Your created bot works effortlessly across all major video and social platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="font-semibold text-sm text-slate-200">{p.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Everything You Need To Build A <span className="text-cyan-400">Viral Bot</span>
          </h2>
          <p className="text-slate-400">
            Engineered with high-performance features designed for scalability, speed, and audience growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 transition-all group"
              >
                <div className="p-3 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 w-fit mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">How It Works</h2>
          <p className="text-slate-400">3 simple steps to launching your automated downloader bot.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            {
              step: "01",
              title: "Open Download Creator",
              desc: "Start our Main Telegram Platform bot and click 'Create New Bot'.",
            },
            {
              step: "02",
              title: "Create Your Bot",
              desc: "Follow the native Telegram bot prompt to choose your bot username.",
            },
            {
              step: "03",
              title: "Your Bot Goes Online",
              desc: "Your downloader bot instantly starts serving users 24/7 without servers.",
            },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group"
            >
              <span className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:text-cyan-500/10 transition-colors">
                {s.step}
              </span>
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold mb-6">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="p-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-blue-500/30 border border-white/10 backdrop-blur-2xl">
          <div className="bg-slate-950/90 rounded-[22px] p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold">Admin Control Dashboard</h3>
                <p className="text-sm text-slate-400">Live platform analytics and active bot overview.</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                System Health: 100% Operational
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">My Bots</p>
                <p className="text-2xl font-bold text-cyan-400">12 Active</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-purple-400">142,850</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Total Downloads</p>
                <p className="text-2xl font-bold text-blue-400">1.8M+</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Daily Traffic</p>
                <p className="text-2xl font-bold text-emerald-400">45,210</p>
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400">Download Volume (Last 7 Days)</span>
                <span className="text-xs text-cyan-400">+24% vs last week</span>
              </div>
              <div className="h-32 flex items-end gap-2 pt-4">
                {[40, 65, 55, 80, 95, 75, 100].map((height, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-t-lg h-full flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: "0%" }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LARGE STATS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatedCounter value="10,000,000+" label="Media Files Downloaded" />
          <AnimatedCounter value="500,000+" label="Active Bot End-Users" />
          <AnimatedCounter value="2,500+" label="Bots Successfully Launched" />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 border border-white/10 backdrop-blur-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to Create Your Own Bot?
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of creators building high-traffic Telegram downloader bots effortlessly.
          </p>
          <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-bold text-lg text-white shadow-2xl shadow-cyan-500/40 hover:scale-[1.03] transition-all inline-flex items-center gap-3">
            Create Your Bot Now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 md:px-16 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500 text-slate-950">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Download Creator</span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          <p className="text-xs text-slate-500">© 2026 Download Creator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
