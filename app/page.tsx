"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Music2,
  Play,
  Send,
  Youtube,
  Github,
  MessageCircle,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const SITE = {
  name: "VEXDOU",

  tagline: "Welcome to my digital world.",

  description:
    "A personal digital space where creativity, technology, projects and my journey come together.",

  aboutTitle: "Behind VEXDOU.",

  about:
    "I'm passionate about technology, digital products, creative projects and building experiences that people actually enjoy using. This is my digital home where you can discover my work, follow my journey and connect with me.",

  profileImage: "/profile.jpg",

  backgroundVideo: "/background.mp4",

  music: {
    title: "VEXDOU — Now Playing",
    artist: "My Favorite Track",
    cover: "/music-cover.jpg",
    file: "/music.mp3",
  },

  socials: [
    {
      name: "TikTok",
      username: "@vexdou",
      url: "https://www.tiktok.com/@vexdou",
      icon: "tiktok",
    },
    {
      name: "Instagram",
      username: "@vexdou",
      url: "https://instagram.com/vexdou",
      icon: "instagram",
    },
    {
      name: "WhatsApp",
      username: "Message me",
      url: "https://wa.me/",
      icon: "whatsapp",
    },
    {
      name: "Telegram",
      username: "@vexdou",
      url: "https://t.me/vexdou",
      icon: "telegram",
    },
    {
      name: "YouTube",
      username: "VEXDOU",
      url: "https://youtube.com/",
      icon: "youtube",
    },
    {
      name: "GitHub",
      username: "VEXDOU",
      url: "https://github.com/vexdou",
      icon: "github",
    },
  ],

  projects: [
    {
      title: "VEXDOU Platform",
      description:
        "A modern digital ecosystem for projects, media and social platforms.",
      link: "#",
    },
    {
      title: "ORPIT-PAY",
      description:
        "A modern SaaS platform for digital products and online services.",
      link: "#",
    },
    {
      title: "Future Project",
      description:
        "Something new is currently being built.",
      link: "#",
    },
  ],
};

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;
  }, []);

  return (
    <main className="min-h-screen bg-[#05060a] text-white">

      {/* BACKGROUND VIDEO */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <video
          className="h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          poster={SITE.profileImage}
        >
          <source
            src={SITE.backgroundVideo}
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(118,87,255,.25),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(22,217,255,.12),transparent_30%)]" />

      </div>


      {/* NAVBAR */}

      <nav className="fixed left-1/2 top-5 z-50 flex w-[92%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl">

        <div className="flex items-center gap-3">

          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-black">
            V
          </div>

          <div>
            <div className="font-black tracking-[3px]">
              VEXDOU
            </div>

            <div className="text-[8px] tracking-[3px] text-white/40">
              DIGITAL WORLD
            </div>
          </div>

        </div>


        <div className="hidden items-center gap-7 text-xs text-white/60 md:flex">

          <a href="#about" className="hover:text-white">
            About
          </a>

          <a href="#socials" className="hover:text-white">
            Socials
          </a>

          <a href="#projects" className="hover:text-white">
            Projects
          </a>

          <a href="#updates" className="hover:text-white">
            Updates
          </a>

        </div>


        <a
          href="#socials"
          className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black"
        >
          Connect
        </a>

      </nav>


      {/* HERO */}

      <section className="flex min-h-screen items-center justify-center px-6 pt-28 text-center">

        <div className="max-w-4xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] text-white/70 backdrop-blur-xl">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]" />

            VEXDOU IS ONLINE

          </div>


          <h1 className="bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-[clamp(60px,12vw,150px)] font-black leading-[.8] tracking-[-8px] text-transparent">

            {SITE.name}

          </h1>


          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            {SITE.description}
          </p>


          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <a
              href="#about"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-xs font-bold"
            >
              Explore
            </a>

            <a
              href="#socials"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold backdrop-blur-xl"
            >
              Connect With Me
            </a>

          </div>

        </div>

      </section>


      {/* MUSIC */}

      <audio
        ref={audioRef}
        src={SITE.music.file}
        preload="metadata"
      />


      <div className="fixed bottom-5 right-5 z-40 w-[calc(100%-40px)] max-w-sm rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur-2xl">

        <div className="flex items-center gap-3">

          <img
            src={SITE.music.cover}
            alt="Music cover"
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">

            <div className="truncate text-xs font-bold">
              {SITE.music.title}
            </div>

            <div className="mt-1 text-[10px] text-white/40">
              {SITE.music.artist}
            </div>

          </div>


          <button
            onClick={toggleMute}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5"
          >
            {muted ? (
              <VolumeX size={15} />
            ) : (
              <Volume2 size={15} />
            )}
          </button>


          <button
            onClick={toggleMusic}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"
          >
            {playing ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>

        </div>

      </div>


      {/* ABOUT */}

      <section
        id="about"
        className="mx-auto w-[92%] max-w-6xl py-32"
      >

        <div className="mb-12">

          <div className="text-[10px] tracking-[4px] text-violet-400">
            01 — ABOUT
          </div>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            {SITE.aboutTitle}
          </h2>

        </div>


        <div className="grid gap-10 md:grid-cols-[360px_1fr]">

          <div className="relative h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-white/5">

            <img
              src={SITE.profileImage}
              alt={SITE.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">

              <div className="text-[9px] tracking-[3px] text-white/40">
                PROFILE
              </div>

              <div className="mt-1 text-xl font-black">
                {SITE.name}
              </div>

              <div className="mt-1 text-xs text-white/50">
                Creator · Developer · Builder
              </div>

            </div>

          </div>


          <div className="flex items-center">

            <div>

              <h3 className="text-3xl font-bold md:text-5xl">
                Building something different.
              </h3>

              <p className="mt-7 max-w-2xl text-sm leading-8 text-white/50 md:text-base">
                {SITE.about}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* SOCIALS */}

      <section
        id="socials"
        className="mx-auto w-[92%] max-w-6xl py-32"
      >

        <div className="mb-12">

          <div className="text-[10px] tracking-[4px] text-violet-400">
            02 — SOCIALS
          </div>

          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            Find me everywhere.
          </h2>

        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {SITE.socials.map((social) => (

            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/[.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-white/[.07]"
            >

              <div className="mb-8 flex items-center justify-between">

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5">

                  {social.icon === "instagram" && (
                    <Instagram size={20} />
                  )}

                  {social.icon === "whatsapp" && (
                    <MessageCircle size={20} />
                  )}

                  {social.icon === "telegram" && (
                    <Send size={20} />
                  )}

                  {social.icon === "youtube" && (
                    <Youtube size={20} />
                  )}

                  {social.icon === "github" && (
                    <Github size={20} />
                  )}

                  {social.icon === "tiktok" && (
                    <Music2 size={20} />
                  )}

                </div>

                <ArrowUpRight
                  size={17}
                  className="text-white/30 transition group-hover:text-white"
                />

              </div>


              <div className="text-lg font-bold">
                {social.name}
              </div>

              <div className="mt-2 text-xs text-white/40">
                {social.username}
              </div>

            </a>

          ))}

        </div>

      </section>


      {/* PROJECTS */}

      <section
        id="projects"
        className="mx-auto w-[92%] max-w-6xl py-32"
      >

        <div className="mb-12">

          <div className="text-[10px] tracking-[4px] text-violet-400">
            03 — PROJECTS
          </div>

          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            Things I'm building.
          </h2>

        </div>


        <div className="grid gap-5 md:grid-cols-3">

          {SITE.projects.map((project) => (

            <div
              key={project.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.04]"
            >

              <div className="grid h-52 place-items-center bg-gradient-to-br from-violet-950/60 to-cyan-950/20 text-5xl">
                ✦
              </div>

              <div className="p-6">

                <h3 className="font-bold">
                  {project.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/40">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold"
                >
                  View Project
                  <ArrowUpRight size={13} />
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* UPDATE */}

      <section
        id="updates"
        className="mx-auto w-[92%] max-w-6xl py-32"
      >

        <div className="mb-12">

          <div className="text-[10px] tracking-[4px] text-violet-400">
            04 — UPDATES
          </div>

          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            Latest updates.
          </h2>

        </div>


        <div className="rounded-3xl border border-white/10 bg-white/[.04] p-7 backdrop-blur-xl">

          <div className="text-[10px] tracking-[3px] text-violet-400">
            AUG 18, 2026
          </div>

          <h3 className="mt-3 text-2xl font-bold">
            Welcome to VEXDOU.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
            The new VEXDOU digital platform is now live.
            More projects, media and features are coming soon.
          </p>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="mx-auto flex w-[92%] max-w-6xl justify-between border-t border-white/10 py-10 text-[10px] text-white/30">

        <span>
          © 2026 VEXDOU
        </span>

        <span>
          Built for the future.
        </span>

      </footer>

    </main>
  );
              }
