"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "VEXDOU2026@";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [active, setActive] = useState("Overview");

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
      return;
    }

    setError("Incorrect password. Please try again.");
  };

  if (!loggedIn) {
    return (
      <main className="admin-login-page">
        <div className="admin-glow glow-one" />
        <div className="admin-glow glow-two" />

        <div className="login-card">
          <div className="login-logo">V</div>

          <div className="login-small">
            VEXDOU ADMIN PANEL
          </div>

          <h1>Welcome back.</h1>

          <p>
            Enter your administrator password to
            access your dashboard.
          </p>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <div className="login-error">
              ⚠ {error}
            </div>
          )}

          <button
            className="login-button"
            onClick={login}
          >
            LOGIN
            <span>→</span>
          </button>

          <a href="/" className="back-home">
            ← Back to website
          </a>
        </div>
      </main>
    );
  }

  const menu = [
    "Overview",
    "Content",
    "Social Links",
    "Media",
    "Notifications",
    "Settings",
  ];

  return (
    <main className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">V</div>

          <div>
            <strong>VEXDOU</strong>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <div className="menu-title">
          MANAGEMENT
        </div>

        <div className="sidebar-menu">
          {menu.map((item) => (
            <button
              key={item}
              className={
                active === item
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => setActive(item)}
            >
              <span>
                {item === "Overview" && "⌂"}
                {item === "Content" && "✦"}
                {item === "Social Links" && "◎"}
                {item === "Media" && "▶"}
                {item === "Notifications" && "♢"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <a href="/">
            ← View Website
          </a>

          <button
            onClick={() => setLoggedIn(false)}
          >
            ⇥ Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <section className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <div className="header-label">
              DASHBOARD
            </div>

            <h1>
              {active}
            </h1>
          </div>

          <div className="header-right">

            <button className="notification">
              🔔
              <span />
            </button>

            <div className="admin-profile">
              <img
                src="/profile.jpg"
                alt="Admin"
              />

              <div>
                <strong>Vexdou</strong>
                <small>Administrator</small>
              </div>
            </div>

          </div>
        </header>

        {/* OVERVIEW */}

        {active === "Overview" && (
          <>
            <div className="welcome-banner">

              <div>
                <span>GOOD EVENING 👋</span>

                <h2>
                  Welcome to your
                  <br />
                  control center.
                </h2>

                <p>
                  Manage everything on your
                  personal platform from here.
                </p>
              </div>

              <div className="banner-symbol">
                V
              </div>

            </div>

            <div className="stats-grid">

              <div className="stat-card">
                <div className="stat-top">
                  <span>VISITORS</span>
                  <b>↗ 12%</b>
                </div>

                <strong>24,891</strong>

                <small>
                  Total website visitors
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>CLICKS</span>
                  <b>↗ 8%</b>
                </div>

                <strong>8,421</strong>

                <small>
                  Social link clicks
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>PROJECTS</span>
                  <b>LIVE</b>
                </div>

                <strong>12</strong>

                <small>
                  Published projects
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>STATUS</span>
                  <b className="online">
                    ● ONLINE
                  </b>
                </div>

                <strong>99.9%</strong>

                <small>
                  Platform availability
                </small>
              </div>

            </div>

            <div className="dashboard-grid">

              {/* ACTIVITY */}

              <div className="panel">

                <div className="panel-header">
                  <div>
                    <span>ANALYTICS</span>
                    <h3>Website activity</h3>
                  </div>

                  <select>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last year</option>
                  </select>
                </div>

                <div className="chart">

                  <div className="chart-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="chart-bars">
                    <span style={{ height: "35%" }} />
                    <span style={{ height: "52%" }} />
                    <span style={{ height: "43%" }} />
                    <span style={{ height: "70%" }} />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "82%" }} />
                    <span style={{ height: "94%" }} />
                  </div>

                </div>

                <div className="chart-labels">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="panel">

                <div className="panel-header">
                  <div>
                    <span>CONTROL</span>
                    <h3>Quick actions</h3>
                  </div>
                </div>

                <div className="quick-actions">

                  <button>
                    <b>✦</b>
                    <span>
                      <strong>Edit website</strong>
                      <small>
                        Change your content
                      </small>
                    </span>
                    →
                  </button>

                  <button>
                    <b>▶</b>
                    <span>
                      <strong>Manage media</strong>
                      <small>
                        Video & music
                      </small>
                    </span>
                    →
                  </button>

                  <button>
                    <b>◎</b>
                    <span>
                      <strong>Social links</strong>
                      <small>
                        Manage platforms
                      </small>
                    </span>
                    →
                  </button>

                  <button>
                    <b>♢</b>
                    <span>
                      <strong>Notifications</strong>
                      <small>
                        Manage announcements
                      </small>
                    </span>
                    →
                  </button>

                </div>

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="panel recent">

              <div className="panel-header">
                <div>
                  <span>SYSTEM</span>
                  <h3>Recent activity</h3>
                </div>

                <button className="view-all">
                  View all
                </button>
              </div>

              <div className="activity-list">

                <div>
                  <i>✓</i>
                  <span>
                    <strong>
                      Website updated
                    </strong>
                    <small>
                      Background video was changed
                    </small>
                  </span>
                  <time>
                    5 min ago
                  </time>
                </div>

                <div>
                  <i>◎</i>
                  <span>
                    <strong>
                      New visitor
                    </strong>
                    <small>
                      Someone visited your website
                    </small>
                  </span>
                  <time>
                    12 min ago
                  </time>
                </div>

                <div>
                  <i>♪</i>
                  <span>
                    <strong>
                      Music updated
                    </strong>
                    <small>
                      Background music changed
                    </small>
                  </span>
                  <time>
                    1 hour ago
                  </time>
                </div>

              </div>

            </div>
          </>
        )}

        {/* CONTENT */}

        {active === "Content" && (
          <div className="content-page">

            <div className="edit-card">
              <span>PROFILE</span>
              <h2>Personal information</h2>

              <label>
                Display name
                <input defaultValue="Vexdou" />
              </label>

              <label>
                Short description
                <textarea
                  defaultValue="Building ideas into reality."
                />
              </label>

              <button className="save-button">
                SAVE CHANGES
              </button>
            </div>

            <div className="edit-card">
              <span>ABOUT</span>
              <h2>About me</h2>

              <label>
                About text
                <textarea
                  rows={7}
                  defaultValue="Welcome to my personal digital space. I enjoy technology, creative projects and building useful digital experiences."
                />
              </label>

              <button className="save-button">
                UPDATE ABOUT
              </button>
            </div>

          </div>
        )}

        {/* SOCIAL LINKS */}

        {active === "Social Links" && (
          <div className="content-page">

            {[
              "TikTok",
              "Instagram",
              "Telegram",
              "WhatsApp",
              "YouTube",
              "GitHub",
            ].map((social) => (
              <div
                className="social-edit"
                key={social}
              >
                <div className="social-edit-icon">
                  {social === "TikTok" && "♪"}
                  {social === "Instagram" && "◎"}
                  {social === "Telegram" && "➤"}
                  {social === "WhatsApp" && "◉"}
                  {social === "YouTube" && "▶"}
                  {social === "GitHub" && "◈"}
                </div>

                <div>
                  <strong>{social}</strong>

                  <input
                    defaultValue={`https://${social.toLowerCase()}.com/`}
                    placeholder="Your link"
                  />
                </div>

                <button>
                  SAVE
                </button>
              </div>
            ))}

          </div>
        )}

        {/* MEDIA */}

        {active === "Media" && (
          <div className="media-grid">

            <div className="media-card">

              <div className="media-preview">
                🎬
              </div>

              <span>
                BACKGROUND VIDEO
              </span>

              <h2>
                background.mp4
              </h2>

              <p>
                Current website background video.
              </p>

              <button className="upload-button">
                CHANGE VIDEO
              </button>

            </div>

            <div className="media-card">

              <div className="media-preview">
                ♪
              </div>

              <span>
                BACKGROUND MUSIC
              </span>

              <h2>
                music.mp3
              </h2>

              <p>
                Music played on the website.
              </p>

              <button className="upload-button">
                CHANGE MUSIC
              </button>

            </div>

            <div className="media-card">

              <div className="media-preview">
                👤
              </div>

              <span>
                PROFILE IMAGE
              </span>

              <h2>
                profile.jpg
              </h2>

              <p>
                Main profile picture.
              </p>

              <button className="upload-button">
                CHANGE IMAGE
              </button>

            </div>

          </div>
        )}

        {/* NOTIFICATIONS */}

        {active === "Notifications" && (
          <div className="content-page">

            <div className="notification-editor">

              <span>
                ANNOUNCEMENT
              </span>

              <h2>
                Create notification
              </h2>

              <input
                placeholder="Notification title"
              />

              <textarea
                placeholder="Write your announcement..."
                rows={7}
              />

              <div className="notification-actions">

                <button className="secondary-action">
                  SAVE DRAFT
                </button>

                <button className="save-button">
                  PUBLISH
                </button>

              </div>

            </div>

          </div>
        )}

        {/* SETTINGS */}

        {active === "Settings" && (
          <div className="content-page">

            <div className="settings-card">

              <div>
                <span>WEBSITE</span>
                <h2>Website status</h2>
                <p>
                  Your website is currently live.
                </p>
              </div>

              <div className="toggle active-toggle">
                <i />
              </div>

            </div>

            <div className="settings-card">

              <div>
                <span>MUSIC</span>
                <h2>Background music</h2>
                <p>
                  Allow music player on website.
                </p>
              </div>

              <div className="toggle active-toggle">
                <i />
              </div>

            </div>

            <div className="settings-card">

              <div>
                <span>VIDEO</span>
                <h2>Background video</h2>
                <p>
                  Show cinematic background video.
                </p>
              </div>

              <div className="toggle active-toggle">
                <i />
              </div>

            </div>

          </div>
        )}

      </section>

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #050507;
          color: white;
          font-family:
            Inter,
            Arial,
            sans-serif;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        /* LOGIN */

        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px;
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(124,58,237,.18),
              transparent 35%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(34,211,238,.08),
              transparent 30%
            ),
            #050507;
          position: relative;
          overflow: hidden;
        }

        .admin-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .glow-one {
          background: rgba(124,58,237,.15);
          top: -150px;
          left: -100px;
        }

        .glow-two {
          background: rgba(34,211,238,.08);
          right: -120px;
          bottom: -150px;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          padding: 45px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 30px;
          background: rgba(255,255,255,.035);
          backdrop-filter: blur(30px);
          box-shadow:
            0 30px 100px rgba(0,0,0,.45);
          position: relative;
          z-index: 2;
        }

        .login-logo {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            #8b5cf6,
            #22d3ee
          );
          color: white;
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 30px;
          box-shadow:
            0 15px 45px rgba(139,92,246,.2);
        }

        .login-small,
        .header-label,
        .menu-title {
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .login-card h1 {
          margin: 12px 0;
          font-size: 38px;
          letter-spacing: -2px;
        }

        .login-card > p {
          color: rgba(255,255,255,.4);
          line-height: 1.7;
          font-size: 13px;
          margin-bottom: 28px;
        }

        .password-box {
          display: flex;
          gap: 8px;
          padding: 6px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 15px;
          background: rgba(255,255,255,.035);
        }

        .password-box input {
          flex: 1;
          min-width: 0;
          padding: 12px;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
        }

        .password-box button {
          border: 0;
          border-radius: 10px;
          padding: 0 12px;
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.5);
          font-size: 10px;
        }

        .login-error {
          margin-top: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.18);
          color: #fca5a5;
          font-size: 11px;
        }

        .login-button {
          width: 100%;
          margin-top: 18px;
          padding: 15px;
          border: 0;
          border-radius: 14px;
          background: white;
          color: #050507;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          display: flex;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 20px;
          transition: .25s;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 15px 40px rgba(255,255,255,.1);
        }

        .back-home {
          display: block;
          margin-top: 22px;
          text-align: center;
          color: rgba(255,255,255,.3);
          font-size: 10px;
        }

        /* DASHBOARD */

        .dashboard {
          min-height: 100vh;
          display: flex;
          background: #050507;
        }

        .sidebar {
          width: 250px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          padding: 25px 17px;
          border-right: 1px solid rgba(255,255,255,.07);
          background: rgba(8,8,12,.85);
          backdrop-filter: blur(25px);
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 5px 10px 35px;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #8b5cf6,
            #22d3ee
          );
          font-weight: 900;
        }

        .brand strong {
          display: block;
          font-size: 12px;
          letter-spacing: 3px;
        }

        .brand small {
          display: block;
          margin-top: 4px;
          color: rgba(255,255,255,.3);
          font-size: 7px;
          letter-spacing: 2px;
        }

        .menu-title {
          padding: 0 12px 10px;
          font-size: 7px;
          color: rgba(255,255,255,.25);
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: rgba(255,255,255,.4);
          text-align: left;
          font-size: 11px;
          transition: .25s;
        }

        .menu-item span {
          width: 20px;
          text-align: center;
          font-size: 15px;
        }

        .menu-item:hover,
        .menu-item.active {
          background: rgba(139,92,246,.1);
          color: white;
        }

        .menu-item.active {
          box-shadow:
            inset 2px 0 0 #8b5cf6;
        }

        .sidebar-bottom {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-bottom a,
        .sidebar-bottom button {
          padding: 12px;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.3);
          text-align: left;
          font-size: 10px;
        }

        .sidebar-bottom a:hover,
        .sidebar-bottom button:hover {
          color: white;
        }

        .dashboard-main {
          width: calc(100% - 250px);
          margin-left: 250px;
          padding: 35px 45px 60px;
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 35px;
        }

        .dashboard-header h1 {
          margin: 7px 0 0;
          font-size: 34px;
          letter-spacing: -2px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification {
          position: relative;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 13px;
          background: rgba(255,255,255,.03);
          color: white;
        }

        .notification span {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8b5cf6;
          top: 8px;
          right: 8px;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-profile img {
          width: 42px;
          height: 42px;
          object-fit: cover;
          border-radius: 13px;
        }

        .admin-profile strong,
        .admin-profile small {
          display: block;
        }

        .admin-profile strong {
          font-size: 11px;
        }

        .admin-profile small {
          margin-top: 4px;
          color: rgba(255,255,255,.3);
          font-size: 8px;
        }

        /* BANNER */

        .welcome-banner {
          position: relative;
          overflow: hidden;
          min-height: 210px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 35px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 25px;
          background:
            radial-gradient(
              circle at 80% 30%,
              rgba(139,92,246,.16),
              transparent 35%
            ),
            rgba(255,255,255,.025);
        }

        .welcome-banner span {
          color: #a78bfa;
          font-size: 8px;
          letter-spacing: 3px;
          font-weight: 800;
        }

        .welcome-banner h2 {
          margin: 13px 0;
          font-size: 35px;
          line-height: 1;
          letter-spacing: -2px;
        }

        .welcome-banner p {
          color: rgba(255,255,255,.38);
          font-size: 11px;
        }

        .banner-symbol {
          font-size: 180px;
          line-height: 1;
          font-weight: 900;
          color: rgba(255,255,255,.025);
          transform: rotate(-10deg);
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .stat-card {
          padding: 20px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px;
          background: rgba(255,255,255,.025);
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          font-size: 7px;
          color: rgba(255,255,255,.3);
          letter-spacing: 2px;
        }

        .stat-top b {
          color: #a78bfa;
          letter-spacing: 0;
        }

        .stat-top b.online {
          color: #34d399;
        }

        .stat-card > strong {
          display: block;
          margin-top: 18px;
          font-size: 28px;
        }

        .stat-card > small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,.25);
          font-size: 9px;
        }

        /* PANELS */

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        .panel {
          padding: 24px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          background: rgba(255,255,255,.025);
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .panel-header span {
          color: #a78bfa;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .panel-header h3 {
          margin: 7px 0 0;
          font-size: 15px;
        }

        .panel-header select {
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          padding: 7px;
          background: #101014;
          color: rgba(255,255,255,.5);
          font-size: 8px;
          outline: 0;
        }

        /* CHART */

        .chart {
          position: relative;
          height: 210px;
          margin-top: 25px;
        }

        .chart-lines {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .chart-lines i {
          display: block;
          width: 100%;
          border-top: 1px dashed rgba(255,255,255,.06);
        }

        .chart-bars {
          position: absolute;
          inset: 10px 10px 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 15px;
        }

        .chart-bars span {
          width: 100%;
          max-width: 35px;
          border-radius: 8px 8px 2px 2px;
          background:
            linear-gradient(
              to top,
              #6d28d9,
              #22d3ee
            );
          opacity: .8;
          transition: .3s;
        }

        .chart-bars span:hover {
          opacity: 1;
          transform: translateY(-5px);
        }

        .chart-labels {
          display: flex;
          justify-content: space-around;
          color: rgba(255,255,255,.2);
          font-size: 7px;
          letter-spacing: 1px;
        }

        /* QUICK ACTIONS */

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 20px;
        }

        .quick-actions button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 12px;
          background: rgba(255,255,255,.02);
          color: rgba(255,255,255,.35);
          text-align: left;
          transition: .25s;
        }

        .quick-actions button:hover {
          border-color: rgba(139,92,246,.3);
          background: rgba(139,92,246,.06);
          color: white;
        }

        .quick-actions button > b {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: rgba(139,92,246,.1);
          color: #a78bfa;
        }

        .quick-actions button span {
          flex: 1;
        }

        .quick-actions strong,
        .quick-actions small {
          display: block;
        }

        .quick-actions strong {
          font-size: 10px;
        }

        .quick-actions small {
          margin-top: 3px;
          color: rgba(255,255,255,.25);
          font-size: 8px;
        }

        /* RECENT */

        .recent {
          margin-top: 12px;
        }

        .view-all {
          border: 0;
          background: transparent;
          color: #a78bfa;
          font-size: 9px;
        }

        .activity-list {
          margin-top: 20px;
        }

        .activity-list > div {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .activity-list > div:last-child {
          border-bottom: 0;
        }

        .activity-list i {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(139,92,246,.08);
          color: #a78bfa;
          font-style: normal;
          font-size: 11px;
        }

        .activity-list span {
          flex: 1;
        }

        .activity-list strong,
        .activity-list small {
          display: block;
        }

        .activity-list strong {
          font-size: 10px;
        }

        .activity-list small {
          margin-top: 4px;
          color: rgba(255,255,255,.25);
          font-size: 8px;
        }

        .activity-list time {
          color: rgba(255,255,255,.2);
          font-size: 8px;
        }

        /* CONTENT */

        .content-page {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .edit-card,
        .notification-editor {
          padding: 25px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          background: rgba(255,255,255,.025);
        }

        .edit-card > span,
        .notification-editor > span {
          color: #a78bfa;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .edit-card h2,
        .notification-editor h2 {
          margin: 8px 0 25px;
          font-size: 20px;
        }

        label {
          display: block;
          margin-top: 16px;
          color: rgba(255,255,255,.35);
          font-size: 9px;
        }

        input,
        textarea {
          width: 100%;
          margin-top: 7px;
          padding: 13px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 11px;
          outline: 0;
          background: rgba(255,255,255,.035);
          color: white;
          resize: vertical;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(139,92,246,.45);
        }

        .save-button,
        .upload-button {
          margin-top: 20px;
          padding: 12px 18px;
          border: 0;
          border-radius: 10px;
          background: white;
          color: #050507;
          font-size: 9px;
          font-weight: 900;
        }

        /* SOCIAL */

        .social-edit {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px;
          background: rgba(255,255,255,.025);
        }

        .social-edit-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 12px;
          background: rgba(139,92,246,.1);
          color: #a78bfa;
        }

        .social-edit > div:nth-child(2) {
          flex: 1;
        }

        .social-edit strong {
          display: block;
          font-size: 11px;
        }

        .social-edit input {
          margin-top: 6px;
        }

        .social-edit > button {
          border: 0;
          border-radius: 9px;
          padding: 9px 12px;
          background: rgba(255,255,255,.07);
          color: white;
          font-size: 8px;
        }

        /* MEDIA */

        .media-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .media-card {
          padding: 20px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          background: rgba(255,255,255,.025);
        }

        .media-preview {
          height: 170px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background:
            radial-gradient(
              circle,
              rgba(139,92,246,.12),
              rgba(255,255,255,.025)
            );
          font-size: 50px;
          margin-bottom: 20px;
        }

        .media-card > span {
          color: #a78bfa;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .media-card h2 {
          margin: 8px 0;
          font-size: 15px;
        }

        .media-card p {
          color: rgba(255,255,255,.3);
          font-size: 9px;
          line-height: 1.6;
        }

        /* NOTIFICATIONS */

        .notification-editor {
          max-width: 700px;
        }

        .notification-actions {
          display: flex;
          gap: 8px;
        }

        .secondary-action {
          margin-top: 20px;
          padding: 12px 18px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px;
          background: rgba(255,255,255,.04);
          color: white;
          font-size: 9px;
        }

        /* SETTINGS */

        .settings-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 23px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px;
          background: rgba(255,255,255,.025);
        }

        .settings-card + .settings-card {
          margin-top: 10px;
        }

        .settings-card span {
          color: #a78bfa;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .settings-card h2 {
          margin: 7px 0 4px;
          font-size: 14px;
        }

        .settings-card p {
          margin: 0;
          color: rgba(255,255,255,.3);
          font-size: 9px;
        }

        .toggle {
          width: 45px;
          height: 25px;
          padding: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,.1);
        }

        .toggle i {
          display: block;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: white;
        }

        .active-toggle {
          background: #7c3aed;
        }

        .active-toggle i {
          margin-left: 20px;
        }

        /* MOBILE */

        @media (max-width: 1000px) {

          .sidebar {
            width: 210px;
          }

          .dashboard-main {
            width: calc(100% - 210px);
            margin-left: 210px;
            padding: 25px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .media-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 700px) {

          .sidebar {
            width: 68px;
            padding: 15px 8px;
          }

          .brand {
            justify-content: center;
            padding: 5px 0 30px;
          }

          .brand > div:last-child,
          .menu-title,
          .menu-item {
            font-size: 0;
          }

          .menu-item {
            justify-content: center;
          }

          .menu-item span {
            font-size: 17px;
          }

          .sidebar-bottom a,
          .sidebar-bottom button {
            font-size: 0;
            text-align: center;
          }

          .dashboard-main {
            width: calc(100% - 68px);
            margin-left: 68px;
            padding: 20px 13px 40px;
          }

          .dashboard-header h1 {
            font-size: 27px;
          }

          .admin-profile div {
            display: none;
          }

          .welcome-banner {
            padding: 25px;
          }

          .welcome-banner h2 {
            font-size: 27px;
          }

          .banner-symbol {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            padding: 15px;
          }

          .stat-card > strong {
            font-size: 22px;
          }

          .content-page {
            grid-template-columns: 1fr;
          }

          .social-edit {
            flex-wrap: wrap;
          }

          .social-edit > div:nth-child(2) {
            min-width: calc(100% - 60px);
          }

          .social-edit > button {
            width: 100%;
          }

          .login-card {
            padding: 30px 22px;
          }

        }

        @media (max-width: 420px) {

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .header-right {
            gap: 8px;
          }

          .notification {
            display: none;
          }

        }

      `}</style>
    </main>
  );
      }
