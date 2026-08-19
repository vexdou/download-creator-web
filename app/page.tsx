"use client";

import { useEffect, useState } from "react";

type Settings = {
  profile?: {
    name?: string;
    description?: string;
    photo?: string;
  };
  about?: string;
  media?: {
    backgroundVideo?: string;
    music?: string;
  };
  socials?: Record<string, string>;
  notifications?: {
    title?: string;
    message?: string;
    enabled?: boolean;
  };
};

const defaults: Settings = {
  profile: {
    name: "Vexdou",
    description: "Building ideas into reality.",
    photo: "/profile.jpg",
  },
  about: "Welcome to my personal digital space.",
  media: {
    backgroundVideo: "/background.mp4",
    music: "/music.mp3",
  },
  socials: {},
  notifications: {
    enabled: false,
  },
};

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/setting", {
      method: "GET",
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load settings");
        return response.json();
      })
      .then((data) => {
        if (active && data && typeof data === "object") {
          setSettings({
            ...defaults,
            ...data,
            profile: {
              ...defaults.profile,
              ...(data.profile || {}),
            },
            media: {
              ...defaults.media,
              ...(data.media || {}),
            },
            notifications: {
              ...defaults.notifications,
              ...(data.notifications || {}),
            },
          });
        }
      })
      .catch(() => {
        if (active) setSettings(defaults);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const profile = settings.profile || defaults.profile!;
  const media = settings.media || defaults.media!;
  const socials = settings.socials || {};
  const notification = settings.notifications || {};

  const socialEntries = [
    ["TikTok", socials.tiktok],
    ["Instagram", socials.instagram],
    ["Telegram", socials.telegram],
    ["WhatsApp", socials.whatsapp],
    ["YouTube", socials.youtube],
    ["GitHub", socials.github],
  ].filter(([, url]) => Boolean(url));

  return (
    <main className="site">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={media.backgroundVideo || "/background.mp4"} type="video/mp4" />
      </video>

      <div className="video-overlay" />
      <div className="noise" />

      <nav className="navbar">
        <a href="/" className="logo">
          <span>V</span>
          <strong>{profile.name || "VEXDOU"}</strong>
        </a>

        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#socials" onClick={() => setMenuOpen(false)}>Socials</a>
          <a href="/admin">Admin</a>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="status">
            <span />
            AVAILABLE FOR NEW PROJECTS
          </div>

          <h1>
            BUILDING
            <br />
            <span>IDEAS</span>
            <br />
            INTO REALITY.
          </h1>

          <p className="hero-description">
            {profile.description || defaults.profile?.description}
          </p>

          <div className="hero-actions">
            <a href="#about" className="primary-button">
              EXPLORE <span>↓</span>
            </a>

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                GITHUB ↗
              </a>
            )}
          </div>
        </div>

        <div className="hero-side">
          <div className="vertical-text">DIGITAL CREATOR / DEVELOPER</div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      {notification.enabled && notification.message && (
        <section className="notification">
          <div>
            <small>{notification.title || "ANNOUNCEMENT"}</small>
            <p>{notification.message}</p>
          </div>
        </section>
      )}

      <section id="about" className="about-section">
        <div className="section-number">01</div>

        <div className="about-grid">
          <div>
            <span className="section-label">ABOUT ME</span>
            <h2>
              CREATING
              <br />
              <em>WHAT&apos;S NEXT.</em>
            </h2>
          </div>

          <div className="about-text">
            <p>
              {settings.about || defaults.about}
            </p>

            <div className="profile-card">
              <img
                src={profile.photo || "/profile.jpg"}
                alt={profile.name || "Vexdou"}
                onError={(event) => {
                  event.currentTarget.src = "/profile.jpg";
                }}
              />

              <div>
                <strong>{profile.name || "Vexdou"}</strong>
                <span>CREATOR & DEVELOPER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="socials" className="social-section">
        <div className="section-number">02</div>

        <div className="section-heading">
          <span className="section-label">CONNECT</span>
          <h2>FIND ME <em>ONLINE.</em></h2>
        </div>

        <div className="social-grid">
          {socialEntries.length > 0 ? (
            socialEntries.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
              >
                <span>{name}</span>
                <strong>↗</strong>
              </a>
            ))
          ) : (
            <div className="empty-socials">
              Social links will appear here soon.
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-logo">VEXDOU</div>
        <span>© 2026 VEXDOU. ALL RIGHTS RESERVED.</span>

        <button
          className="sound-button"
          onClick={() => setMuted((value) => !value)}
          title={muted ? "Sound is muted" : "Sound enabled"}
        >
          {muted ? "SOUND OFF" : "SOUND ON"}
        </button>
      </footer>

      <div className={loading ? "loader visible" : "loader"}>
        <div className="loader-logo">V</div>
        <div className="loader-line" />
      </div>
    </main>
  );
            }
