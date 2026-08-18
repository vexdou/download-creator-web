"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;

    if (playing) {
      audio.play().catch(() => {
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing]);

  const toggleMusic = () => {
    setPlaying((value) => !value);
  };

  return (
    <main>
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="background">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="orb" />
        <div className="orb two" />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav>
        <a href="#" className="logo">
          VEXDOU
        </a>

        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#social">SOCIAL</a>
          <a href="#projects">PROJECTS</a>
          <a href="#updates">UPDATES</a>
        </div>

        <a href="/admin" className="admin-button">
          ADMIN
        </a>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="status">
            <span className="status-dot" />
            ONLINE • AVAILABLE
          </div>

          <img
            src="/profile.jpg"
            alt="Vexdou profile"
            className="profile"
          />

          <div className="kicker">
            WELCOME TO MY WORLD
          </div>

          <h1>VEXDOU</h1>

          <p className="hero-description">
            Welcome to my personal space. Discover my projects,
            social platforms, latest updates and everything I am
            building in one place.
          </p>

          <div className="hero-buttons">
            <a href="#about" className="button primary">
              EXPLORE
            </a>

            <a href="#social" className="button secondary">
              MY SOCIALS
            </a>
          </div>

          <div className="scroll-text">
            SCROLL TO EXPLORE ↓
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section id="about">
        <div className="about">
          <div className="about-image">
            <img
              src="/profile.jpg"
              alt="About Vexdou"
            />
          </div>

          <div className="about-text">
            <div className="eyebrow">
              ABOUT ME
            </div>

            <h2>
              Building ideas
              <br />
              into <span>reality.</span>
            </h2>

            <p>
              Hey, I&apos;m Vexdou. This is my personal
              digital space where I share my work, projects,
              ideas and the things I am currently creating.
            </p>

            <p>
              I enjoy technology, creative projects,
              websites, automation and building things
              that people can actually use.
            </p>

            <p>
              Everything you see here can be connected to
              my different platforms and projects.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT I DO
      ===================================================== */}

      <section>
        <div className="eyebrow">
          WHAT I DO
        </div>

        <h2 className="section-title">
          Creating digital experiences.
        </h2>

        <p className="section-description">
          A few things I enjoy working on and exploring.
        </p>

        <div className="cards">
          <div className="card">
            <div className="card-icon">💻</div>

            <h3>Web Development</h3>

            <p>
              Modern websites and digital experiences
              designed to look great and work smoothly.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">⚡</div>

            <h3>Automation</h3>

            <p>
              Building useful systems and tools that
              simplify repetitive tasks.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🚀</div>

            <h3>Creative Projects</h3>

            <p>
              Turning ideas into unique digital projects,
              experiments and products.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIALS
      ===================================================== */}

      <section
        className="social-section"
        id="social"
      >
        <div className="eyebrow">
          FIND ME ONLINE
        </div>

        <h2 className="section-title">
          Let&apos;s connect.
        </h2>

        <p className="section-description">
          Follow me across my platforms and stay connected
          with what I&apos;m creating.
        </p>

        <div className="social-grid">

          {/* TikTok */}

          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ♪
            </div>

            <div>
              <b>TikTok</b>

              <small>
                Follow me on TikTok
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

          {/* Instagram */}

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ◎
            </div>

            <div>
              <b>Instagram</b>

              <small>
                Follow me on Instagram
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

          {/* Telegram */}

          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ➤
            </div>

            <div>
              <b>Telegram</b>

              <small>
                Join my Telegram
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

          {/* WhatsApp */}

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ◉
            </div>

            <div>
              <b>WhatsApp</b>

              <small>
                Contact me on WhatsApp
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

          {/* YouTube */}

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ▶
            </div>

            <div>
              <b>YouTube</b>

              <small>
                Watch my videos
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

          {/* GitHub */}

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <div className="social-icon">
              ◈
            </div>

            <div>
              <b>GitHub</b>

              <small>
                Explore my projects
              </small>
            </div>

            <span className="arrow">
              ↗
            </span>
          </a>

        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section id="projects">
        <div className="eyebrow">
          MY WORK
        </div>

        <h2 className="section-title">
          Selected projects.
        </h2>

        <p className="section-description">
          Some of the things I&apos;m building and working on.
        </p>

        <div>

          <div className="project">
            <div className="project-number">
              01
            </div>

            <div>
              <div className="project-tag">
                WEB PLATFORM
              </div>

              <h3>
                VEXDOU Platform
              </h3>

              <p>
                A modern personal platform designed to
                bring my projects, content and social
                presence together.
              </p>
            </div>

            <div className="project-arrow">
              ↗
            </div>
          </div>

          <div className="project">
            <div className="project-number">
              02
            </div>

            <div>
              <div className="project-tag">
                AUTOMATION
              </div>

              <h3>
                Smart Systems
              </h3>

              <p>
                Useful automation systems and tools
                designed to make digital workflows easier.
              </p>
            </div>

            <div className="project-arrow">
              ↗
            </div>
          </div>

          <div className="project">
            <div className="project-number">
              03
            </div>

            <div>
              <div className="project-tag">
                CREATIVE
              </div>

              <h3>
                Future Ideas
              </h3>

              <p>
                Experimental projects and new ideas that
                are currently being developed.
              </p>
            </div>

            <div className="project-arrow">
              ↗
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          UPDATES
      ===================================================== */}

      <section id="updates">
        <div className="eyebrow">
          LATEST
        </div>

        <h2 className="section-title">
          Recent updates.
        </h2>

        <p className="section-description">
          News, announcements and things I&apos;m currently
          working on.
        </p>

        <div className="updates">

          <article className="update">
            <div className="date">
              AUG 2026
            </div>

            <h3>
              New website is live.
            </h3>

            <p>
              Welcome to the new Vexdou platform. More
              features and content are coming soon.
            </p>
          </article>

          <article className="update">
            <div className="date">
              PROJECT
            </div>

            <h3>
              Building something new.
            </h3>

            <p>
              A new digital project is currently being
              developed behind the scenes.
            </p>
          </article>

          <article className="update">
            <div className="date">
              SOON
            </div>

            <h3>
              More updates coming.
            </h3>

            <p>
              Stay connected through my social platforms
              for the latest news.
            </p>
          </article>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section>
        <div className="cta">
          <div className="eyebrow">
            STAY CONNECTED
          </div>

          <h2>
            See you around.
          </h2>

          <p>
            Follow me on social media and keep up with
            everything I&apos;m creating.
          </p>

          <div className="hero-buttons">
            <a
              href="#social"
              className="button primary"
            >
              CONNECT WITH ME
            </a>

            <a
              href="#home"
              className="button secondary"
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          MUSIC PLAYER
      ===================================================== */}

      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
      />

      <div className="music-player">
        <img
          src="/profile.jpg"
          alt="Music"
          className="music-cover"
        />

        <div className="music-info">
          <span className="music-label">
            NOW PLAYING
          </span>

          <span className="music-title">
            Vexdou — My Background Music
          </span>

          <div className="music-progress">
            <span />
          </div>
        </div>

        <button
          type="button"
          className="play-button"
          onClick={toggleMusic}
          aria-label={
            playing
              ? "Pause music"
              : "Play music"
          }
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>
        <span>
          © 2026 VEXDOU
        </span>

        <span>
          BUILT WITH PASSION
        </span>
      </footer>
    </main>
  );
      }
