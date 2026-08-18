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
  Sparkles,
  ChevronRight,
  X,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Cpu,
  Layers,
  Globe,
  Play
} from "lucide-react";

// Platform Specs
const platforms = [
  { name: "TikTok", color: "from-pink-500 to-cyan-400", icon: "🎵", speed: "0.8s" },
  { name: "YouTube", color: "from-red-600 to-red-400", icon: "▶️", speed: "1.2s" },
  { name: "Instagram", color: "from-purple-600 to-pink-500", icon: "📸", speed: "0.9s" },
  { name: "Facebook", color: "from-blue-600 to-blue-400", icon: "📘", speed: "1.1s" },
  { name: "Pinterest", color: "from-red-500 to-pink-600", icon: "📌", speed: "0.7s" },
  { name: "X (Twitter)", color: "from-gray-400 to-slate-100", icon: "𝕏", speed: "0.6s" },
];

const features = [
  { icon: Zap, title: "⚡ High-Speed Engine", desc: "Dedicated multi-proxy pipeline processing 4K media in milliseconds." },
  { icon: Bot, title: "🤖 Zero-Code Bot Deployment", desc: "Instant token deployment directly inside Telegram with 99.9% uptime." },
  { icon: BarChart3, title: "📊 Live Analytics Console", desc: "Track active users, daily media conversions, and traffic spikes in real-time." },
  { icon: Users, title: "👥 User & VIP Access Control", desc: "Manage subscribers, grant premium unlimited access, or ban spammers." },
  { icon: Send, title: "📢 Mass Broadcast Engine", desc: "Send instant HTML broadcast notifications to thousands of bot users." },
  { icon: UserCheck, title: "🔐 Force Join Verification", desc: "Require users to join your main Telegram channel before downloading." },
  { icon: Music, title: "🎵 Automatic Audio Extractor", desc: "Convert any video link straight into 320kbps high-quality MP3 audio." },
  { icon: ShieldCheck, title: "🛠️ Admin Control Center", desc: "Full control panel accessible via Telegram commands or web dashboard." },
];

export default function DownloadCreatorLanding() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Live Simulator States
  const [customBotName, setCustomBotName] = useState("MyDownloader_Bot");
  const [simState, setSimState] = useState<"idle" | "building" | "online">("idle");
  const [simProgress, setSimProgress] = useState(0);

  // TELEGRAM MAIN BOT LINK (Halkan ku qor bot-kaaga rasmiga ah)
  const MAIN_TELEGRAM_BOT_URL = "https://t.me/YourBotUsernameHere_bot";

  const handleStartCreationSim = () => {
    setSimState("building");
    setSimProgress(15);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimState("online");
          return 100;
        }
        return prev + 25;
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* BACKGROUND NEON GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] right-[-10%] w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-40 flex items-center justify-between px-6 md:px-16 py-6 backdrop-blur-xl bg-[#030712]/70 border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              DOWNLOAD CREATOR
            </span>
            <span className="block text-[10px] font-mono text-cyan-400 tracking-widest uppercase">Telegram Bot Engine</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#simulator" className="hover:text-cyan-400 transition-colors">Live Studio</a>
          <a href="#platforms" className="hover:text-cyan-400 transition-colors">Platforms</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</a>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          Create Your Bot
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Next-Gen Automated Downloader Builder
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Build Your Own <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Download Bot
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Deploy a high-speed, multi-platform Telegram media downloader bot in seconds. Complete with user management, broadcast system, and force-join channel locks.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 font-bold text-white shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-base"
            >
              Create Your Bot Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#simulator"
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-slate-200 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Try Live Demo
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            <div>
              <h4 className="text-2xl md:text-3xl font-black text-cyan-400">10M+</h4>
              <p className="text-xs text-slate-400 font-medium">Downloads Served</p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-black text-purple-400">2,500+</h4>
              <p className="text-xs text-slate-400 font-medium">Active Bots</p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-black text-emerald-400">99.9%</h4>
              <p className="text-xs text-slate-400 font-medium">Cloud Uptime</p>
            </div>
          </div>
        </div>

        {/* HERO LIVE SIMULATOR DISPLAY */}
        <div id="simulator" className="relative">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-blue-600/30 backdrop-blur-2xl border border-white/15 shadow-2xl">
            <div className="bg-[#0b1329]/95 rounded-[22px] p-6 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-100">{customBotName}</h4>
                    <span className="text-xs flex items-center gap-1.5 font-mono">
                      {simState === "online" ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online ●
                        </span>
                      ) : simState === "building" ? (
                        <span className="text-amber-400">Generating Bot Core...</span>
                      ) : (
                        <span className="text-slate-500">Ready to Deploy</span>
                      )}
                    </span>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  v2.8 Active Engine
                </span>
              </div>

              {/* Interactive Controls inside Card */}
              <div className="my-6 space-y-4">
                {simState === "idle" && (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-slate-400">Customize Bot Name:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customBotName}
                        onChange={(e) => setCustomBotName(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        onClick={handleStartCreationSim}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1"
                      >
                        <Zap className="w-4 h-4" /> Build
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed">
                      💡 Click <strong className="text-cyan-300">Build</strong> above to simulate how our cloud engine deploys your bot instantly.
                    </div>
                  </div>
                )}

                {simState === "building" && (
                  <div className="space-y-4 py-6 text-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-semibold text-slate-200">Generating Bot Webhooks & Proxies...</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full transition-all duration-300"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {simState === "online" && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Bot Deployed & Live on Telegram</span>
                      <button onClick={() => setSimState("idle")} className="text-slate-400 hover:text-white underline">Reset</button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
                      <p className="text-xs text-slate-400">Supported Media Platforms Attached:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {platforms.map((p, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-white/5 text-center text-xs flex items-center justify-center gap-1 font-medium">
                            <span>{p.icon}</span> {p.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bot Footer Simulation Status */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                <span>Cloud Server: Frankfurt #01</span>
                <span>Latency: 14ms</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section id="platforms" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Supported Download Engines</h2>
          <p className="text-slate-400 text-sm md:text-base">Your bot automatically extracts high-definition media without watermarks.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:-translate-y-1.5 transition-all text-center group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{p.icon}</div>
              <h3 className="font-bold text-sm text-slate-200 mb-1">{p.name}</h3>
              <span className="text-[10px] text-cyan-400 font-mono">Speed: {p.speed}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Built For Massive <span className="text-cyan-400">Scale & Traffic</span>
          </h2>
          <p className="text-slate-400">Everything needed to grow and monetize your Telegram channel network.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 transition-all group"
              >
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 w-fit mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DASHBOARD MOCKUP */}
      <section id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="p-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-blue-500/30 border border-white/10 backdrop-blur-2xl">
          <div className="bg-[#070d1e]/90 rounded-[22px] p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold">Bot Control Dashboard</h3>
                <p className="text-sm text-slate-400">Real-time stats from all your deployed bots.</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                System Status: All Proxies Healthy
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Active Bots</p>
                <p className="text-3xl font-black text-cyan-400">12</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Total Audience</p>
                <p className="text-3xl font-black text-purple-400">284,120</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Total Downloads</p>
                <p className="text-3xl font-black text-blue-400">3.4M+</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Daily Traffic</p>
                <p className="text-3xl font-black text-emerald-400">92,400</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 border border-white/10 backdrop-blur-2xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Ready to Launch Your Own Bot?
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Start creating your Telegram downloader bot right now through our official Main Telegram Bot.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-bold text-lg text-white shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
          >
            Create Your Bot Now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 md:px-16 bg-[#030712]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Download Creator</span>
          </div>

          <p className="text-xs text-slate-500">© 2026 Download Creator. All rights reserved.</p>
        </div>
      </footer>

      {/* LIVE CREATE BOT MODAL (KEENAYA TELEGRAM BOT-KA) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-1 rounded-3xl bg-gradient-to-b from-cyan-400 via-blue-600 to-purple-600 max-w-lg w-full shadow-2xl"
            >
              <div className="bg-slate-950 rounded-[22px] p-6 md:p-8 relative">
                
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Create Your Bot Now</h3>
                    <p className="text-xs text-slate-400">Launch inside Telegram in under 30 seconds</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed">
                    🚀 Taabo batoonka hoose si aad toos ugu furto Main Bot-ka Telegram-ka, oo aad ugu dhex abuurto Bot-kaaga gaarka ah.
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span className="truncate">{MAIN_TELEGRAM_BOT_URL}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(MAIN_TELEGRAM_BOT_URL);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white ml-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={MAIN_TELEGRAM_BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-bold text-center text-white shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Open Bot in Telegram <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 font-semibold text-slate-400 text-sm transition-all"
                  >
                    Close Window
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
