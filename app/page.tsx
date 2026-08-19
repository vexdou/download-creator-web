"use client";

import { useEffect, useRef, useState } from "react";

type CustomText = { id: string; title: string; text: string };
type Settings = { profile: { name?: string; description?: string; photo?: string }; about?: string; media: { backgroundVideo?: string; music?: string }; socials: Record<string, string>; notifications: { title?: string; message?: string; enabled?: boolean }; customTexts: CustomText[] };

const defaults: Settings = {
  profile: { name: "Vexdou", description: "Building ideas into reality.", photo: "/profile.jpg" },
  about: "Welcome to my personal digital space.",
  media: { backgroundVideo: "/background.mp4", music: "/music.mp3" },
  socials: { tiktok: "https://www.tiktok.com/@Vexdou", instagram: "https://www.instagram.com/Vexdou/", whatsapp: "https://wa.me/14504066880", telegram: "https://t.me/Vexdou" },
  notifications: { enabled: false }, customTexts: []
};

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    fetch("/api/setting", { cache: "no-store" })
      .then(async (response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setSettings({ ...defaults, ...data, profile: { ...defaults.profile, ...(data.profile || {}) }, media: { ...defaults.media, ...(data.media || {}) }, notifications: { ...defaults.notifications, ...(data.notifications || {}) }, socials: { ...defaults.socials, ...(data.socials || {}) }, customTexts: Array.isArray(data.customTexts) ? data.customTexts : [] }))
      .catch(() => setSettings(defaults)).finally(() => setLoading(false));
  }, []);

  const musicUrl = settings.media.music || "/music.mp3";
  const profileImages = [settings.profile.photo || "/profile.jpg", "/profile1.jpg", "/profile2.jpg", "/profile3.jpg"];

  useEffect(() => {
    const timer = window.setInterval(() => setProfileIndex((current) => (current + 1) % profileImages.length), 3000);
    return () => window.clearInterval(timer);
  }, [profileImages.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true; audio.preload = "auto";
    const tryStartMusic = () => {
      if (musicStartedRef.current || !audio.paused) return;
      musicStartedRef.current = true;
      audio.play().then(() => setMusicPlaying(true)).catch(() => { musicStartedRef.current = false; setMusicPlaying(false); });
    };
    tryStartMusic();
    const startAfterInteraction = () => tryStartMusic();
    window.addEventListener("pointerdown", startAfterInteraction, { once: true, passive: true });
    window.addEventListener("keydown", startAfterInteraction, { once: true });
    return () => { window.removeEventListener("pointerdown", startAfterInteraction); window.removeEventListener("keydown", startAfterInteraction); };
  }, [musicUrl]);

  const toggleMusic = async () => {
    const audio = audioRef.current; if (!audio) return;
    if (audio.paused) { try { await audio.play(); musicStartedRef.current = true; setMusicPlaying(true); } catch { setMusicPlaying(false); } }
    else { audio.pause(); musicStartedRef.current = true; setMusicPlaying(false); }
  };

  const profile = settings.profile;
  const media = settings.media;
  const socials = settings.socials || {};
  const notification = settings.notifications || {};
  const socialEntries = [["TikTok", socials.tiktok], ["Instagram", socials.instagram], ["WhatsApp", socials.whatsapp], ["Telegram", socials.telegram], ["YouTube", socials.youtube], ["GitHub", socials.github]].filter(([, url]) => Boolean(url));
  const iconFor = (name: string) => name === "Telegram" ? "TG" : name === "GitHub" ? "GH" : name === "Instagram" ? "IG" : name === "TikTok" ? "TK" : name === "WhatsApp" ? "WA" : "YT";

  return (
    <main className="site">
      <audio ref={audioRef} src={musicUrl} autoPlay loop preload="auto" onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)} onError={() => setMusicPlaying(false)} aria-label="Background music" />
      <video className="background-video" autoPlay loop muted playsInline preload="auto" aria-hidden="true"><source src={media.backgroundVideo || "/background.mp4"} type="video/mp4" /></video>
      <div className="background-overlay" /><div className="noise" />

      <nav className="navbar">
        <a href="#home" className="logo">vexdou<span>.space</span></a>
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a href="#contact" className="connect" onClick={() => setMenuOpen(false)}>Connect →</a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">☰</button>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="profile-container"><div className="profile-glow" /><div className="profile-ring" /><div className="profile">{profileImages.map((src, index) => <img key={`${src}-${index}`} src={src} className={index === profileIndex ? "active" : ""} alt={profile.name || "Vexdou"} onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />)}</div><div className="online" /></div>
          <div className="eyebrow">DIGITAL CREATOR</div>
          <h1>VEXDOU<span>.SPACE</span></h1>
          <p className="description">{profile.description || defaults.profile.description}</p>
          <div className="buttons"><a href="#about" className="btn btn-primary">Explore Space →</a><a href="#contact" className="btn">Contact Me</a></div>
          <div className="socials">{socialEntries.slice(0, 6).map(([name, url]) => <a key={name} className="social" href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>{iconFor(name)}</a>)}</div>
        </div>
        <div className="scroll">SCROLL DOWN<div className="arrow" /></div>
      </section>

      {notification.enabled && notification.message && <section className="section notification-section"><div className="card notification"><small>{notification.title || "ANNOUNCEMENT"}</small><p>{notification.message}</p></div></section>}

      <section className="section" id="about"><div className="card"><span className="section-label">ABOUT</span><h2>Beyond ordinary.</h2><p>{settings.about || defaults.about}</p><div className="profile-card"><img src={profile.photo || "/profile.jpg"} alt={profile.name || "Vexdou"} /><div><strong>{profile.name || "Vexdou"}</strong><span>CREATOR & DEVELOPER</span></div></div></div></section>
      <section className="section" id="projects"><div className="card"><span className="section-label">PROJECTS</span><h2>Built for the future.</h2><p>Digital products, websites, bots and experimental ideas built with modern technology.</p></div></section>
      <section className="section" id="skills"><div className="card"><span className="section-label">TECHNOLOGY</span><h2>Technology.</h2><p>Web development, automation, AI, Telegram bots, creative digital experiences and software projects.</p></div></section>

      {settings.customTexts.length > 0 && <section className="section custom-texts-section"><div className="card"><span className="section-label">UPDATES</span><h2>My notes.</h2>{settings.customTexts.map((item) => <article key={item.id} className="custom-text-card">{item.title && <h3>{item.title}</h3>}<p>{item.text}</p></article>)}</div></section>}

      <section className="section" id="contact"><div className="card"><span className="section-label">CONNECT</span><h2>Let's connect.</h2><p>Connect with Vexdou through your favorite platform.</p><div className="buttons contact-buttons"><a className="btn btn-primary" href={socials.telegram || "#"} target="_blank" rel="noopener noreferrer">Telegram →</a>{socials.github && <a className="btn" href={socials.github} target="_blank" rel="noopener noreferrer">GitHub →</a>}</div></div></section>

      <footer>
        <div className="footer-logo">VEXDOU.SPACE</div><span>© 2026 VEXDOU.SPACE — ALL RIGHTS RESERVED.</span>
        <div className="customer-support"><a href="mailto:costumer@vexdou.space">costumer@vexdou.space</a><small>Official Customer Support · Trusted & Secure Service</small></div>
        <button className={musicPlaying ? "music-player playing" : "music-player"} onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"} aria-pressed={musicPlaying}><span className="music-cover"><img src={profile.photo || "/profile.jpg"} alt="Music cover" /></span><span className="music-info"><strong>VEXDOU • My Music</strong><small>{musicPlaying ? "Now playing" : "Tap to listen"}</small></span><span className="music-button">{musicPlaying ? "Ⅱ" : "▶"}</span></button>
      </footer>
      <div className={loading ? "loader visible" : "loader"}><div className="loader-logo">V</div><div className="loader-line" /></div>
    </main>
  );
}
