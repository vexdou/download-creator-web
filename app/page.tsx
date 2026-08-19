"use client";

import { useEffect, useRef, useState } from "react";

type CustomText = { id: string; title: string; text: string };
type Settings = {
  profile: { name?: string; description?: string; photo?: string };
  about?: string;
  media: { backgroundVideo?: string; music?: string };
  socials: Record<string, string>;
  notifications: { title?: string; message?: string; enabled?: boolean };
  customTexts: CustomText[];
};

const defaults: Settings = {
  profile: { name: "Vexdou", description: "Building ideas into reality.", photo: "/profile.jpg" },
  about: "Welcome to my personal digital space.",
  media: { backgroundVideo: "/background.mp4", music: "/music.mp3" },
  socials: {
    tiktok: "https://www.tiktok.com/@Vexdou",
    instagram: "https://www.instagram.com/Vexdou/",
    whatsapp: "https://wa.me/14504066880",
    telegram: "https://t.me/Vexdou"
  },
  notifications: { enabled: false },
  customTexts: []
};

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    fetch("/api/setting", { cache: "no-store" })
      .then(async (response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setSettings({
        ...defaults,
        ...data,
        profile: { ...defaults.profile, ...(data.profile || {}) },
        media: { ...defaults.media, ...(data.media || {}) },
        notifications: { ...defaults.notifications, ...(data.notifications || {}) },
        socials: { ...defaults.socials, ...(data.socials || {}) },
        customTexts: Array.isArray(data.customTexts) ? data.customTexts : []
      }))
      .catch(() => setSettings(defaults))
      .finally(() => setLoading(false));
  }, []);

  const musicUrl = settings.media.music || defaults.media.music || "/music.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";

    const tryStartMusic = () => {
      if (musicStartedRef.current || !audio.paused) return;
      musicStartedRef.current = true;
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch(() => {
          musicStartedRef.current = false;
          setMusicPlaying(false);
        });
    };

    tryStartMusic();

    // Modern browsers may block unmuted autoplay. Start the music on the
    // visitor's first interaction when that happens.
    const startAfterInteraction = () => tryStartMusic();
    window.addEventListener("pointerdown", startAfterInteraction, { once: true, passive: true });
    window.addEventListener("keydown", startAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };
  }, [musicUrl]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        musicStartedRef.current = true;
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    } else {
      audio.pause();
      musicStartedRef.current = true;
      setMusicPlaying(false);
    }
  };

  const profile = settings.profile;
  const media = settings.media;
  const socials = settings.socials || {};
  const notification = settings.notifications || {};
  const socialEntries = [
    ["TikTok", socials.tiktok],
    ["Instagram", socials.instagram],
    ["WhatsApp", socials.whatsapp],
    ["Telegram", socials.telegram],
    ["YouTube", socials.youtube],
    ["GitHub", socials.github]
  ].filter(([, url]) => Boolean(url));

  return (
    <main className="site">
      <audio
        ref={audioRef}
        src={musicUrl}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={() => setMusicPlaying(false)}
        aria-label="Background music"
      />

      <video className="background-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src={media.backgroundVideo || "/background.mp4"} type="video/mp4" />
      </video>
      <div className="video-overlay" />
      <div className="noise" />

      <nav className="navbar">
        <a href="/" className="logo"><span>V</span><strong>{profile.name || "VEXDOU"}</strong></a>
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#socials" onClick={() => setMenuOpen(false)}>Socials</a>
          <a href="/admin">Admin</a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">☰</button>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="status"><span /> AVAILABLE FOR NEW PROJECTS</div>
          <h1>BUILDING<br /><span>IDEAS</span><br />INTO REALITY.</h1>
          <p className="hero-description">{profile.description || defaults.profile.description}</p>
          <div className="hero-actions">
            <a href="#about" className="primary-button">EXPLORE <span>↓</span></a>
            {socials.github && <a href={socials.github} target="_blank" rel="noopener noreferrer" className="secondary-button">GITHUB ↗</a>}
          </div>
        </div>
        <div className="hero-side"><div className="vertical-text">DIGITAL CREATOR / DEVELOPER</div></div>
        <div className="scroll-indicator"><span>SCROLL</span><i /></div>
      </section>

      {notification.enabled && notification.message && (
        <section className="notification"><div><small>{notification.title || "ANNOUNCEMENT"}</small><p>{notification.message}</p></div></section>
      )}

      <section id="about" className="about-section">
        <div className="section-number">01</div>
        <div className="about-grid">
          <div><span className="section-label">ABOUT ME</span><h2>CREATING<br /><em>WHAT&apos;S NEXT.</em></h2></div>
          <div className="about-text">
            <p>{settings.about || defaults.about}</p>
            <div className="profile-card">
              <img src={profile.photo || "/profile.jpg"} alt={profile.name || "Vexdou"} onError={(event) => { event.currentTarget.src = "/profile.jpg"; }} />
              <div><strong>{profile.name || "Vexdou"}</strong><span>CREATOR & DEVELOPER</span></div>
            </div>
          </div>
        </div>
      </section>

      {settings.customTexts.length > 0 && (
        <section className="about-section custom-texts-section">
          <div className="section-number">02</div>
          <div className="about-grid">
            <div><span className="section-label">UPDATES</span><h2>MY<br /><em>NOTES.</em></h2></div>
            <div className="about-text custom-text-list">
              {settings.customTexts.map((item) => (
                <article key={item.id} className="custom-text-card">
                  {item.title && <h3>{item.title}</h3>}
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="socials" className="social-section">
        <div className="section-number">03</div>
        <div className="section-heading"><span className="section-label">CONNECT</span><h2>FIND ME <em>ONLINE.</em></h2></div>
        <div className="social-grid">
          {socialEntries.length ? socialEntries.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-card"><span>{name}</span><strong>↗</strong></a>
          )) : <div className="empty-socials">Social links will appear here soon.</div>}
        </div>
      </section>

      <footer>
        <div className="footer-logo">VEXDOU</div>
        <span>© 2026 VEXDOU. ALL RIGHTS RESERVED.</span>
        <div className="customer-support">
          <a href="mailto:costumer@vexdou.space">costumer@vexdou.space</a>
          <small>Official Customer Support · Trusted & Secure Service</small>
        </div>
        <button className={musicPlaying ? "sound-button music-control playing" : "sound-button music-control"} onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"} aria-pressed={musicPlaying}>
          <span className="music-icon" aria-hidden="true">{musicPlaying ? "Ⅱ" : "▶"}</span>
          <span>{musicPlaying ? "PAUSE MUSIC" : "PLAY MUSIC"}</span>
        </button>
      </footer>

      <div className={loading ? "loader visible" : "loader"}><div className="loader-logo">V</div><div className="loader-line" /></div>
    </main>
  );
}
