"use client";

import { useEffect, useRef, useState } from "react";

type CustomText = { id: string; title: string; text: string };
type Settings = { profile: { name?: string; description?: string; photo?: string; photos?: string[] }; about?: string; media: { backgroundVideo?: string; music?: string }; socials: Record<string, string>; notifications: { title?: string; message?: string; enabled?: boolean }; customTexts: CustomText[] };

const defaults: Settings = {
  profile: { name: "Vexdou", description: "Building ideas into reality.", photo: "/profile.jpg", photos: ["/profile1.jpg", "/profile2.jpg"] },
  about: "Welcome to my personal digital space.",
  media: { backgroundVideo: "/background.mp4", music: "/music.mp3" },
  socials: { tiktok: "https://www.tiktok.com/@Vexdou", instagram: "https://www.instagram.com/Vexdou/", whatsapp: "https://wa.me/14504066880", telegram: "https://t.me/Vexdou" },
  notifications: { enabled: false }, customTexts: []
};

const platformIcon = (name: string) => ({
  Telegram: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 4.2 18.4 19c-.24 1.04-.87 1.3-1.76.8l-4.87-3.59-2.35 2.27c-.26.26-.48.48-.98.48l.35-4.95 9.02-8.15c.39-.35-.09-.55-.61-.2L6.04 12.83 1.28 11.34c-1.04-.33-1.06-1.04.22-1.54L20.1 2.47c.87-.32 1.63.2 1.5 1.73Z"/></svg>,
  Instagram: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M7 2.8h10A4.2 4.2 0 0 1 21.2 7v10a4.2 4.2 0 0 1-4.2 4.2H7A4.2 4.2 0 0 1 2.8 17V7A4.2 4.2 0 0 1 7 2.8Z"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.6" r="1" fill="currentColor"/></svg>,
  TikTok: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.6 3c.35 2.4 1.7 3.8 4.1 4.05v3.2c-1.48-.04-2.84-.4-4.08-1.14v6.1c0 4.08-2.72 6.62-6.3 6.62-3.5 0-5.92-2.48-5.92-5.72 0-3.5 2.76-6.02 6.16-6.02.34 0 .68.03 1.02.08v3.25a4.8 4.8 0 0 0-1-.12c-1.5 0-2.86 1.04-2.86 2.75 0 1.56 1.1 2.7 2.62 2.7 1.72 0 2.99-1.16 2.99-3.53V3h3.27Z"/></svg>,
  WhatsApp: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a9.45 9.45 0 0 0-8.06 14.4L2.5 21.5l4.72-1.4A9.5 9.5 0 1 0 12 2.5Zm0 16.8a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.8.83.84-2.73-.18-.28A7.3 7.3 0 1 1 12 19.3Zm4.02-5.46c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.85-.13.15-.26.17-.48.06-1.3-.65-2.16-1.16-3.02-2.62-.23-.4.23-.37.66-1.24.07-.15.04-.27-.02-.38-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.8 3.36 1.41.61 1.96.66 2.66.56.43-.06 1.3-.53 1.49-1.04.18-.51.18-.94.13-1.03-.06-.1-.2-.15-.42-.26Z"/></svg>
}[name as "Telegram" | "Instagram" | "TikTok" | "WhatsApp"]);

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    fetch("/api/setting", { cache: "no-store" }).then(async r => r.ok ? r.json() : Promise.reject()).then(data => setSettings({ ...defaults, ...data, profile: { ...defaults.profile, ...(data.profile || {}), photos: Array.isArray(data.profile?.photos) && data.profile.photos.length ? data.profile.photos : defaults.profile.photos }, media: { ...defaults.media, ...(data.media || {}) }, notifications: { ...defaults.notifications, ...(data.notifications || {}) }, socials: { ...defaults.socials, ...(data.socials || {}) }, customTexts: Array.isArray(data.customTexts) ? data.customTexts : [] })).catch(() => setSettings(defaults)).finally(() => setLoading(false));
  }, []);

  const profileImages = Array.from(new Set([settings.profile.photo || "/profile.jpg", ...(settings.profile.photos || [])].filter(Boolean))).slice(0, 3);
  useEffect(() => { setProfileIndex(0); const timer = window.setInterval(() => setProfileIndex(i => (i + 1) % Math.max(profileImages.length, 1)), 3000); return () => window.clearInterval(timer); }, [profileImages.length]);

  const musicUrl = settings.media.music || "/music.mp3";
  useEffect(() => {
    const audio = audioRef.current; if (!audio) return; audio.loop = true; audio.preload = "auto";
    const start = () => { if (musicStartedRef.current || !audio.paused) return; musicStartedRef.current = true; audio.play().then(() => setMusicPlaying(true)).catch(() => { musicStartedRef.current = false; setMusicPlaying(false); }); };
    start(); window.addEventListener("pointerdown", start, { once: true, passive: true }); window.addEventListener("keydown", start, { once: true });
    return () => { window.removeEventListener("pointerdown", start); window.removeEventListener("keydown", start); };
  }, [musicUrl]);

  const toggleMusic = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { try { await audio.play(); musicStartedRef.current = true; setMusicPlaying(true); } catch { setMusicPlaying(false); } } else { audio.pause(); musicStartedRef.current = true; setMusicPlaying(false); } };

  const sendVexdouEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailStatus("");
    setEmailSuccess(false);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setEmailStatus("Please enter a valid Gmail or email address.");
      return;
    }
    setEmailSending(true);
    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Email could not be sent.");
      setEmailSuccess(true);
      setEmailStatus(data.message || "Your Vexdou email has been sent. Check your inbox.");
      setEmail("");
    } catch (error) {
      setEmailStatus(error instanceof Error ? error.message : "Email could not be sent right now.");
    } finally {
      setEmailSending(false);
    }
  };

  const profile = settings.profile, media = settings.media, socials = settings.socials || {}, notification = settings.notifications || {};
  const platforms = [["TikTok", socials.tiktok], ["Instagram", socials.instagram], ["Telegram", socials.telegram], ["WhatsApp", socials.whatsapp]].filter(([, url]) => Boolean(url));
  const extraSocials = [["YouTube", socials.youtube], ["GitHub", socials.github]].filter(([, url]) => Boolean(url));

  return <main className="site">
    <audio ref={audioRef} src={musicUrl} autoPlay loop preload="auto" onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)} onError={() => setMusicPlaying(false)} aria-label="Background music" />
    <video className="background-video" autoPlay loop muted playsInline preload="auto" aria-hidden="true"><source src={media.backgroundVideo || "/background.mp4"} type="video/mp4" /></video><div className="background-overlay" /><div className="noise" />
    <nav className="navbar"><a href="#home" className="logo">vexdou<span>.space</span></a><div className={menuOpen ? "nav-links open" : "nav-links"}><a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a href="#contact" className="connect" onClick={() => setMenuOpen(false)}>Connect →</a></div><button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">☰</button></nav>
    <section id="home" className="hero"><div className="hero-content">
      <div className="profile-container"><div className="profile-glow" /><div className="profile-ring" /><div className="profile">{profileImages.map((src, i) => <img key={`${src}-${i}`} src={src} className={i === profileIndex ? "active" : ""} alt={profile.name || "Vexdou"} onError={e => { e.currentTarget.style.display = "none"; }} />)}</div><div className="online" /></div>
      <div className="eyebrow">DIGITAL CREATOR</div><h1>VEXDOU<span>.SPACE</span></h1><p className="description">{profile.description || defaults.profile.description}</p>
      <div className="buttons"><a href="#about" className="btn btn-primary">Explore Space →</a><a href="#contact" className="btn">Contact Me</a></div>
      <div className="socials">{platforms.map(([name, url]) => <a key={name} className="social" href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>{platformIcon(name)}</a>)}</div>
    </div><div className="scroll">SCROLL DOWN<div className="arrow" /></div></section>
    {notification.enabled && notification.message && <section className="section notification-section"><div className="card notification"><small>{notification.title || "ANNOUNCEMENT"}</small><p>{notification.message}</p></div></section>}
    <section className="section" id="about"><div className="card"><span className="section-label">ABOUT</span><h2>Beyond ordinary.</h2><p>{settings.about || defaults.about}</p><div className="profile-card"><img src={profile.photo || "/profile.jpg"} alt={profile.name || "Vexdou"} /><div><strong>{profile.name || "Vexdou"}</strong><span>CREATOR & DEVELOPER</span></div></div></div></section>
    <section className="section" id="projects"><div className="card"><span className="section-label">PROJECTS</span><h2>Built for the future.</h2><p>Digital products, websites, bots and experimental ideas built with modern technology.</p></div></section>
    <section className="section" id="skills"><div className="card"><span className="section-label">TECHNOLOGY</span><h2>Technology.</h2><p>Web development, automation, AI, Telegram bots, creative digital experiences and software projects.</p></div></section>
    {settings.customTexts.length > 0 && <section className="section"><div className="card"><span className="section-label">UPDATES</span><h2>My notes.</h2>{settings.customTexts.map(item => <article key={item.id} className="custom-text-card">{item.title && <h3>{item.title}</h3>}<p>{item.text}</p></article>)}</div></section>}

    <section className="section email-section" id="email">
      <div className="card email-card">
        <div className="email-orbit">✦</div>
        <span className="section-label">VEXDOU EMAIL</span>
        <h2>Stay connected.</h2>
        <p>Enter your Gmail or email address and Vexdou will send you a beautifully designed personal message introducing the platform, its vision and the digital experience we're building.</p>
        <form className="email-form" onSubmit={sendVexdouEmail}>
          <label htmlFor="vexdou-email">Your email address</label>
          <div className="email-input-wrap">
            <span className="email-symbol">@</span>
            <input id="vexdou-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@gmail.com" autoComplete="email" required disabled={emailSending} />
            <button type="submit" disabled={emailSending}>{emailSending ? "Sending..." : "Send Email →"}</button>
          </div>
          <div className="email-hint">A single Vexdou introduction email will be sent to the address you provide.</div>
        </form>
        {emailStatus && <div className={emailSuccess ? "email-status success" : "email-status error"}>{emailSuccess ? "✓" : "!"} {emailStatus}</div>}
        <div className="email-highlights"><span>✦ Personal message</span><span>⚡ HTML design</span><span>🌐 Vexdou.space</span></div>
      </div>
    </section>

    <section className="section" id="contact"><div className="card"><span className="section-label">CONNECT</span><h2>Let's connect.</h2><p>Connect with Vexdou through your favorite platform.</p><div className="buttons contact-buttons">{platforms.map(([name, url]) => <a key={name} className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">{name} →</a>)}</div><div className="social-grid-mini">{extraSocials.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div></div></section>
    <footer><div className="footer-logo">VEXDOU.SPACE</div><span>© 2026 VEXDOU.SPACE — ALL RIGHTS RESERVED.</span><div className="customer-support"><a href="mailto:costumer@vexdou.space">costumer@vexdou.space</a><small>Official Customer Support · Trusted & Secure Service</small></div></footer>
    <button className={musicPlaying ? "music-player playing" : "music-player"} onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"} aria-pressed={musicPlaying}><span className="music-cover"><img src={profile.photo || "/profile.jpg"} alt="Music cover" /></span><span className="music-info"><strong>VEXDOU • My Music</strong><small>{musicPlaying ? "Now playing" : "Tap to listen"}</small></span><span className="music-button">{musicPlaying ? "Ⅱ" : "▶"}</span></button>
    <div className={loading ? "loader visible" : "loader"}><div className="loader-logo">V</div><div className="loader-line" /></div>
  </main>;
}
