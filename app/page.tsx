"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Instagram,
  Menu,
  Music2,
  Play,
  Pause,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Youtube,
  MessageCircle,
  Code2,
  Globe2,
  Zap,
  ChevronRight,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const socials = [
  {
    name: "TikTok",
    username: "@vexdou",
    url: "https://www.tiktok.com/@vexdou",
    icon: Sparkles,
    description: "Follow my latest content",
  },
  {
    name: "Instagram",
    username: "@vexdou",
    url: "https://instagram.com/vexdou",
    icon: Instagram,
    description: "Photos, stories & updates",
  },
  {
    name: "Telegram",
    username: "@vexdou",
    url: "https://t.me/vexdou",
    icon: Send,
    description: "Join my Telegram",
  },
  {
    name: "WhatsApp",
    username: "Message me",
    url: "https://wa.me/",
    icon: MessageCircle,
    description: "Direct contact",
  },
  {
    name: "YouTube",
    username: "VEXDOU",
    url: "https://youtube.com/",
    icon: Youtube,
    description: "Videos & projects",
  },
  {
    name: "GitHub",
    username: "vexdou",
    url: "https://github.com/vexdou",
    icon: Github,
    description: "My coding projects",
  },
];

const projects = [
  {
    number: "01",
    title: "VEXDOU Platform",
    description:
      "A personal digital platform combining my profile, social world, projects, updates and creative work.",
    tag: "PERSONAL PLATFORM",
    url: "#",
  },
  {
    number: "02",
    title: "ORPIT-PAY",
    description:
      "A modern SaaS platform focused on creating powerful digital experiences and tools.",
    tag: "SAAS / TECHNOLOGY",
    url: "#",
  },
  {
    number: "03",
    title: "Digital Projects",
    description:
      "Experiments, websites, bots and creative technology projects built along the way.",
    tag: "CREATIVE / CODE",
    url: "#",
  },
];

const updates = [
  {
    date: "18 AUG 2026",
    title: "Welcome to VEXDOU",
    text: "The new VEXDOU digital experience is now live.",
  },
  {
    date: "2026",
    title: "Building Something New",
    text: "More projects, ideas and digital experiences are coming.",
  },
  {
    date: "2026",
    title: "The Journey Continues",
    text: "Creating, learning and building one project at a time.",
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMusic() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    }
  }

  function toggleMute() {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030406] text-white">

      {/* ================= AUDIO ================= */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-3"
          >
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/50 to-cyan-400/40 opacity-70" />
              <span className="relative text-sm font-black">V</span>
            </div>

            <div className="hidden sm:block">
              <div className="text-sm font-black tracking-[4px]">VEXDOU</div>
              <div className="text-[8px] tracking-[3px] text-white/35">
                DIGITAL WORLD
              </div>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["Home", "home"],
              ["About", "about"],
              ["Work", "work"],
              ["Socials", "socials"],
              ["Updates", "updates"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-[11px] font-semibold tracking-[1.5px] text-white/55 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] text-white/70 backdrop-blur-xl transition hover:bg-white/10 sm:flex"
            >
              <Music2
                size={14}
                className={playing ? "animate-pulse text-violet-400" : ""}
              />
              {playing ? "PLAYING" : "MUSIC"}
            </button>

            <a
              href="/admin"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold tracking-[1px] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white md:block"
            >
              ADMIN
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#05060a]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
            <div className="space-y-1">
              {[
                ["Home", "home"],
                ["About", "about"],
                ["Work", "work"],
                ["Socials", "socials"],
                ["Updates", "updates"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/60 hover:bg-white/5 hover:text-white"
                >
                  {label}
                  <ChevronRight size={15} />
                </button>
              ))}

              <a
                href="/admin"
                className="mt-2 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-black"
              >
                Admin Panel
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* VIDEO */}
        <video
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-[#030406]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(120,80,255,.25),transparent_35%)]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:80px_80px]" />

        {/* FLOATING LIGHTS */}
        <div className="absolute left-[8%] top-[30%] h-32 w-32 rounded-full bg-violet-600/20 blur-[70px]" />
        <div className="absolute bottom-[25%] right-[8%] h-40 w-40 rounded-full bg-cyan-500/15 blur-[80px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-20 text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,.8)]" />
            <span className="text-[9px] font-semibold tracking-[3px] text-white/65">
              ONLINE • WELCOME TO MY WORLD
            </span>
          </div>

          {/* PROFILE */}
          <div className="relative mx-auto mb-8 h-24 w-24">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 opacity-30 blur-xl" />
            <img
              src="/profile.jpg"
              alt="VEXDOU"
              className="relative h-24 w-24 rounded-full border-2 border-white/20 object-cover shadow-2xl"
            />
            <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[#101116] bg-emerald-400" />
          </div>

          <p className="text-[10px] font-semibold tracking-[6px] text-white/45 sm:text-xs">
            CREATOR • DEVELOPER • BUILDER
          </p>

          <h1 className="mt-5 text-[18vw] font-black leading-[.78] tracking-[-.08em] sm:text-[120px] lg:text-[160px]">
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              VEXDOU
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Building digital experiences, creative projects and technology that
            turn ideas into reality.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("work")}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-black transition hover:scale-[1.03] sm:w-auto"
            >
              Explore My Work
              <ArrowUpRight
                size={15}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <button
              onClick={() => scrollToSection("socials")}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-white/10 sm:w-auto"
            >
              Connect With Me
            </button>
          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => scrollToSection("about")}
              className="group flex flex-col items-center gap-3 text-white/30"
            >
              <span className="text-[8px] tracking-[4px]">
                SCROLL TO DISCOVER
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition group-hover:border-white/30 group-hover:text-white">
                <ArrowDown size={15} className="animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="relative overflow-hidden px-5 py-28 lg:px-8 lg:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[.8fr_1.2fr]">
            {/* IMAGE */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-violet-600/20 to-cyan-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[.04] p-2">
                <img
                  src="/profile.jpg"
                  alt="About VEXDOU"
                  className="aspect-[4/5] w-full rounded-[24px] object-cover"
                />

                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[9px] tracking-[3px] text-white/40">
                        CURRENT STATUS
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Building & Creating
                      </div>
                    </div>

                    <Zap size={18} className="text-violet-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400" />
                <span className="text-[9px] font-bold tracking-[4px] text-violet-400">
                  ABOUT ME
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Turning ideas into
                <span className="block bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  digital experiences.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
                I'm VEXDOU. I enjoy technology, creating digital products,
                experimenting with new ideas and building things that people
                can actually use.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/35">
                This platform is my personal digital space where you can discover
                my projects, social platforms, updates and the things I'm
                currently working on.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <InfoBox
                  icon={<Code2 size={18} />}
                  title="BUILD"
                  text="Digital Projects"
                />
                <InfoBox
                  icon={<Globe2 size={18} />}
                  title="CREATE"
                  text="Online Experiences"
                />
                <InfoBox
                  icon={<Zap size={18} />}
                  title="EXPLORE"
                  text="New Technology"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOCIALS ================= */}
      <section
        id="socials"
        className="relative border-y border-white/5 bg-white/[.015] px-5 py-28 lg:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="MY DIGITAL WORLD"
            title="Find me everywhere."
            description="Choose a platform and connect with me directly."
          />

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-5 transition duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/[.06]"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition group-hover:opacity-100" />

                  <div className="relative flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] transition group-hover:bg-white/10">
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold">{social.name}</h3>
                        <span className="text-[9px] text-white/20">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-white/40">
                        {social.username}
                      </p>

                      <p className="mt-2 text-[10px] text-white/25">
                        {social.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-white/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section id="work" className="px-5 py-28 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Things I'm building."
            description="A few projects, ideas and digital experiences."
          />

          <div className="mt-14 space-y-4">
            {projects.map((project) => (
              <a
                key={project.number}
                href={project.url}
                className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/[.025] p-6 transition duration-500 hover:border-white/20 hover:bg-white/[.05] sm:p-8 lg:p-10"
              >
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px] transition group-hover:bg-violet-600/20" />

                <div className="relative grid gap-8 lg:grid-cols-[100px_1fr_auto] lg:items-center">
                  <div className="text-3xl font-black text-white/15">
                    {project.number}
                  </div>

                  <div>
                    <div className="mb-3 text-[8px] font-bold tracking-[3px] text-violet-400">
                      {project.tag}
                    </div>

                    <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[.03] transition group-hover:border-violet-400/30 group-hover:bg-violet-500/10">
                    <ArrowUpRight
                      size={18}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UPDATES ================= */}
      <section
        id="updates"
        className="border-t border-white/5 bg-white/[.015] px-5 py-28 lg:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="LATEST"
            title="Updates & thoughts."
            description="What's happening in my digital world."
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {updates.map((update) => (
              <article
                key={update.title}
                className="group rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:bg-white/[.05]"
              >
                <div className="text-[8px] font-bold tracking-[3px] text-violet-400">
                  {update.date}
                </div>

                <h3 className="mt-5 text-lg font-black">{update.title}</h3>

                <p className="mt-3 text-xs leading-7 text-white/40">
                  {update.text}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[10px] text-white/30 transition group-hover:text-white/70">
                  Read more
                  <ChevronRight size={13} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MUSIC ================= */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[.04] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-600/15 blur-[80px]" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl">
                <img
                  src="/profile.jpg"
                  alt="Music"
                  className={`absolute inset-0 h-full w-full object-cover ${
                    playing ? "animate-[spin_8s_linear_infinite]" : ""
                  }`}
                />

                <div className="absolute inset-0 bg-black/45" />

                <Music2 size={23} className="relative" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[8px] font-bold tracking-[3px] text-violet-400">
                  NOW PLAYING
                </div>

                <div className="mt-2 truncate text-lg font-black">
                  VEXDOU MUSIC
                </div>

                <div className="mt-1 text-xs text-white/35">
                  Personal soundtrack
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 ${
                      playing ? "w-[65%] animate-pulse" : "w-[18%]"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  onClick={toggleMusic}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition hover:scale-105"
                >
                  {playing ? (
                    <Pause size={17} fill="currentColor" />
                  ) : (
                    <Play size={17} fill="currentColor" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 py-28 lg:px-8 lg:py-40">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[35px] border border-white/10 bg-gradient-to-br from-violet-950/40 via-white/[.03] to-cyan-950/30 px-6 py-20 text-center sm:px-12">
          <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative">
            <Sparkles size={22} className="mx-auto text-violet-400" />

            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Let's connect.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
              Follow my journey, explore my projects and stay connected with what
              I'm building next.
            </p>

            <button
              onClick={() => scrollToSection("socials")}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-black transition hover:scale-105"
            >
              Explore My Socials
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-black tracking-[4px]">VEXDOU</div>
            <p className="mt-2 text-[10px] text-white/25">
              Creator • Developer • Builder
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => scrollToSection("home")}
              className="text-[10px] text-white/35 transition hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-[10px] text-white/35 transition hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="text-[10px] text-white/35 transition hover:text-white"
            >
              Work
            </button>
            <a
              href="/admin"
              className="text-[10px] text-white/35 transition hover:text-white"
            >
              Admin
            </a>
          </div>

          <div className="text-[9px] text-white/20">© 2026 VEXDOU</div>
        </div>
      </footer>

      {/* ================= FLOATING MUSIC ================= */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white shadow-2xl backdrop-blur-xl transition hover:scale-105"
        >
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full bg-violet-500/20" />
          )}

          {playing ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Music2 size={17} />
          )}
        </button>
      </div>
    </main>
  );
}

/* ================= SMALL COMPONENTS ================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-9 bg-violet-400" />
        <span className="text-[8px] font-bold tracking-[4px] text-violet-400">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-white/35">{description}</p>
    </div>
  );
}

function InfoBox({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
      <div className="text-violet-400">{icon}</div>

      <div className="mt-4 text-[8px] font-bold tracking-[2px] text-white/35">
        {title}
      </div>

      <div className="mt-1 text-xs font-semibold text-white/70">{text}</div>
    </div>
  );
}
