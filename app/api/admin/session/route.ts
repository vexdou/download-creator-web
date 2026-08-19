"use client";

import { FormEvent, useEffect, useState } from "react";

const menu = [
  "Overview",
  "Content",
  "Social Links",
  "Media",
  "Notifications",
  "Settings",
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [active, setActive] = useState("Overview");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        const data = await response.json();

        if (mounted) {
          setLoggedIn(data.authenticated === true);
        }
      } catch {
        if (mounted) {
          setLoggedIn(false);
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function login(event?: FormEvent) {
    event?.preventDefault();

    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      setPassword("");
      setLoggedIn(true);
      setActive("Overview");
    } catch {
      setError("Unable to connect to the server.");
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors during local logout.
    }

    setLoggedIn(false);
    setActive("Overview");
    setMessage("");
    setError("");
  }

  async function saveSettings(
    payload: Record<string, unknown>
  ) {
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/setting", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setLoggedIn(false);
          setError("Your admin session has expired.");
          return;
        }

        setError(
          data.error || "Could not save settings."
        );

        return;
      }

      setMessage("Saved successfully.");
    } catch {
      setError("Unable to save settings.");
    }
  }

  if (checking) {
    return (
      <main className="admin-login-page">
        <div className="login-card">
          <div className="login-logo">V</div>
          <h1>Loading…</h1>
          <p>Checking your administrator session.</p>
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="admin-login-page">
        <div className="admin-glow glow-one" />
        <div className="admin-glow glow-two" />

        <form className="login-card" onSubmit={login}>
          <div className="login-logo">V</div>

          <div className="login-small">
            VEXDOU ADMIN PANEL
          </div>

          <h1>Welcome back.</h1>

          <p>
            Enter your administrator password to access
            your dashboard.
          </p>

          <div className="password-box">
            <input
              autoComplete="current-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              maxLength={256}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Enter password"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
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
            type="submit"
          >
            LOGIN <span>→</span>
          </button>

          <a
            href="/"
            className="back-home"
          >
            ← Back to website
          </a>
        </form>
      </main>
    );
  }

  return (
    <main className="dashboard">
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
              onClick={() => {
                setActive(item);
                setMessage("");
                setError("");
              }}
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

          <button onClick={logout}>
            ⇥ Logout
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="header-label">
              DASHBOARD
            </div>

            <h1>{active}</h1>
          </div>

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
        </header>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {active === "Overview" && (
          <>
            <div className="welcome-banner">
              <div>
                <span>
                  ADMINISTRATION
                </span>

                <h2>
                  Welcome to your
                  <br />
                  control center.
                </h2>

                <p>
                  Your admin APIs are protected by
                  server-side authentication.
                </p>
              </div>

              <div className="banner-symbol">
                V
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span>SECURITY</span>
                <strong>PROTECTED</strong>
                <small>
                  Server-side authentication
                </small>
              </div>

              <div className="stat-card">
                <span>DATABASE</span>
                <strong>MongoDB</strong>
                <small>
                  Settings storage
                </small>
              </div>

              <div className="stat-card">
                <span>MEDIA</span>
                <strong>Cloudinary</strong>
                <small>
                  Authenticated uploads
                </small>
              </div>

              <div className="stat-card">
                <span>STATUS</span>
                <strong>ONLINE</strong>
                <small>
                  Dashboard ready
                </small>
              </div>
            </div>
          </>
        )}

        {active === "Content" && (
          <div className="content-page">
            <div className="edit-card">
              <span>PROFILE</span>

              <h2>
                Personal information
              </h2>

              <label>
                Display name

                <input
                  id="displayName"
                  defaultValue="Vexdou"
                  maxLength={80}
                />
              </label>

              <label>
                Short description

                <textarea
                  id="shortDescription"
                  defaultValue="Building ideas into reality."
                  maxLength={300}
                />
              </label>

              <button
                className="save-button"
                onClick={() => {
                  const name =
                    (
                      document.getElementById(
                        "displayName"
                      ) as HTMLInputElement
                    ).value;

                  const description =
                    (
                      document.getElementById(
                        "shortDescription"
                      ) as HTMLTextAreaElement
                    ).value;

                  saveSettings({
                    profile: {
                      name,
                      description,
                      photo: "/profile.jpg",
                    },
                  });
                }}
              >
                SAVE CHANGES
              </button>
            </div>

            <div className="edit-card">
              <span>ABOUT</span>

              <h2>
                About me
              </h2>

              <label>
                About text

                <textarea
                  id="aboutText"
                  rows={7}
                  defaultValue="Welcome to my personal digital space. I enjoy technology, creative projects and building useful digital experiences."
                  maxLength={5000}
                />
              </label>

              <button
                className="save-button"
                onClick={() => {
                  const about =
                    (
                      document.getElementById(
                        "aboutText"
                      ) as HTMLTextAreaElement
                    ).value;

                  saveSettings({
                    about,
                  });
                }}
              >
                UPDATE ABOUT
              </button>
            </div>
          </div>
        )}

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
                <strong>
                  {social}
                </strong>

                <input
                  id={`social-${social}`}
                  defaultValue=""
                  placeholder="https://..."
                  inputMode="url"
                  maxLength={2048}
                />

                <button
                  onClick={() => {
                    const value =
                      (
                        document.getElementById(
                          `social-${social}`
                        ) as HTMLInputElement
                      ).value;

                    const key =
                      social.toLowerCase();

                    saveSettings({
                      socials: {
                        [key]: value,
                      },
                    });
                  }}
                >
                  SAVE
                </button>
              </div>
            ))}
          </div>
        )}

        {active === "Media" && (
          <div className="content-page">
            <div className="media-card">
              <span>
                BACKGROUND VIDEO
              </span>

              <h2>
                background.mp4
              </h2>

              <p>
                Upload endpoint is protected and
                validates file types and sizes.
              </p>
            </div>

            <div className="media-card">
              <span>
                BACKGROUND MUSIC
              </span>

              <h2>
                music.mp3
              </h2>

              <p>
                Audio uploads use the protected
                upload endpoint.
              </p>
            </div>

            <div className="media-card">
              <span>
                PROFILE IMAGE
              </span>

              <h2>
                profile.jpg
              </h2>

              <p>
                Image uploads use the protected
                upload endpoint.
              </p>
            </div>
          </div>
        )}

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
                id="notificationTitle"
                placeholder="Notification title"
                maxLength={160}
              />

              <textarea
                id="notificationMessage"
                placeholder="Write your announcement..."
                rows={7}
                maxLength={2000}
              />

              <button
                className="save-button"
                onClick={() => {
                  const title =
                    (
                      document.getElementById(
                        "notificationTitle"
                      ) as HTMLInputElement
                    ).value;

                  const notificationMessage =
                    (
                      document.getElementById(
                        "notificationMessage"
                      ) as HTMLTextAreaElement
                    ).value;

                  saveSettings({
                    notifications: {
                      title,
                      message:
                        notificationMessage,
                      enabled: true,
                    },
                  });
                }}
              >
                PUBLISH
              </button>
            </div>
          </div>
        )}

        {active === "Settings" && (
          <div className="content-page">
            <div className="settings-card">
              <div>
                <span>WEBSITE</span>
                <h2>Website status</h2>
                <p>
                  Public website is available.
                </p>
              </div>

              <b>● LIVE</b>
            </div>

            <div className="settings-card">
              <div>
                <span>SECURITY</span>
                <h2>
                  Server authentication
                </h2>
                <p>
                  Protected session cookie enabled.
                </p>
              </div>

              <b>● ON</b>
            </div>

            <div className="settings-card">
              <div>
                <span>UPLOADS</span>
                <h2>
                  Media validation
                </h2>
                <p>
                  File validation is enabled.
                </p>
              </div>

              <b>● ON</b>
            </div>
          </div>
        )}
      </section>
    </main>
  );
    }
