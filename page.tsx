"use client";

import { FormEvent, useEffect, useState } from "react";

const menu = ["Overview", "Content", "Social Links", "Media", "Notifications", "Settings"];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState("Overview");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/setting", { cache: "no-store" })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  async function login(event?: FormEvent) {
    event?.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      setPassword("");
      setLoggedIn(true);
    } catch {
      setError("Unable to connect to the server.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setLoggedIn(false);
    setActive("Overview");
  }

  async function saveSettings(payload: Record<string, unknown>) {
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/setting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not save settings.");
        return;
      }

      setMessage("Saved successfully.");
    } catch {
      setError("Unable to save settings.");
    }
  }

  if (checking) {
    return <main className="admin-login-page"><div className="login-card"><h1>Loading…</h1></div></main>;
  }

  if (!loggedIn) {
    return (
      <main className="admin-login-page">
        <div className="admin-glow glow-one" />
        <div className="admin-glow glow-two" />
        <form className="login-card" onSubmit={login}>
          <div className="login-logo">V</div>
          <div className="login-small">VEXDOU ADMIN PANEL</div>
          <h1>Welcome back.</h1>
          <p>Enter your administrator password to access your dashboard.</p>

          <div className="password-box">
            <input
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              value={password}
              maxLength={256}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter password"
              required
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <div className="login-error">⚠ {error}</div>}

          <button className="login-button" type="submit">
            LOGIN <span>→</span>
          </button>

          <a href="/" className="back-home">← Back to website</a>
        </form>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">V</div>
          <div><strong>VEXDOU</strong><small>ADMIN PANEL</small></div>
        </div>
        <div className="menu-title">MANAGEMENT</div>
        <div className="sidebar-menu">
          {menu.map((item) => (
            <button
              key={item}
              className={active === item ? "menu-item active" : "menu-item"}
              onClick={() => { setActive(item); setMessage(""); setError(""); }}
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
          <a href="/">← View Website</a>
          <button onClick={logout}>⇥ Logout</button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="header-label">DASHBOARD</div>
            <h1>{active}</h1>
          </div>
          <div className="admin-profile">
            <img src="/profile.jpg" alt="Admin" />
            <div><strong>Vexdou</strong><small>Administrator</small></div>
          </div>
        </header>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="dashboard-error">{error}</div>}

        {active === "Overview" && (
          <>
            <div className="welcome-banner">
              <div>
                <span>ADMINISTRATION</span>
                <h2>Welcome to your<br />control center.</h2>
                <p>Your API endpoints are protected by server-side authentication.</p>
              </div>
              <div className="banner-symbol">V</div>
            </div>
            <div className="stats-grid">
              <div className="stat-card"><span>SECURITY</span><strong>PROTECTED</strong><small>Admin API authentication enabled</small></div>
              <div className="stat-card"><span>DATABASE</span><strong>MongoDB</strong><small>Settings storage</small></div>
              <div className="stat-card"><span>MEDIA</span><strong>Cloudinary</strong><small>Authenticated uploads</small></div>
              <div className="stat-card"><span>STATUS</span><strong>ONLINE</strong><small>Dashboard ready</small></div>
            </div>
          </>
        )}

        {active === "Content" && (
          <div className="content-page">
            <div className="edit-card">
              <span>PROFILE</span><h2>Personal information</h2>
              <label>Display name<input id="displayName" defaultValue="Vexdou" maxLength={80} /></label>
              <label>Short description<textarea id="shortDescription" defaultValue="Building ideas into reality." maxLength={300} /></label>
              <button className="save-button" onClick={() => {
                const name = (document.getElementById("displayName") as HTMLInputElement).value;
                const description = (document.getElementById("shortDescription") as HTMLTextAreaElement).value;
                saveSettings({ profile: { name, description, photo: "/profile.jpg" } });
              }}>SAVE CHANGES</button>
            </div>
            <div className="edit-card">
              <span>ABOUT</span><h2>About me</h2>
              <label>About text<textarea id="aboutText" rows={7} defaultValue="Welcome to my personal digital space. I enjoy technology, creative projects and building useful digital experiences." maxLength={5000} /></label>
              <button className="save-button" onClick={() => {
                const about = (document.getElementById("aboutText") as HTMLTextAreaElement).value;
                saveSettings({ about });
              }}>UPDATE ABOUT</button>
            </div>
          </div>
        )}

        {active === "Social Links" && (
          <div className="content-page">
            {["TikTok","Instagram","Telegram","WhatsApp","YouTube","GitHub"].map((social) => (
              <div className="social-edit" key={social}>
                <strong>{social}</strong>
                <input id={`social-${social}`} defaultValue="" placeholder="https://..." inputMode="url" maxLength={2048} />
                <button onClick={() => {
                  const value = (document.getElementById(`social-${social}`) as HTMLInputElement).value;
                  const key = social.toLowerCase();
                  saveSettings({ socials: { [key]: value } });
                }}>SAVE</button>
              </div>
            ))}
          </div>
        )}

        {active === "Media" && (
          <div className="content-page">
            <div className="media-card"><span>BACKGROUND VIDEO</span><h2>background.mp4</h2><p>Upload API is protected and limited to safe media types.</p></div>
            <div className="media-card"><span>BACKGROUND MUSIC</span><h2>music.mp3</h2><p>Audio uploads are accepted through the authenticated upload endpoint.</p></div>
            <div className="media-card"><span>PROFILE IMAGE</span><h2>profile.jpg</h2><p>Image uploads are accepted through the authenticated upload endpoint.</p></div>
          </div>
        )}

        {active === "Notifications" && (
          <div className="content-page">
            <div className="notification-editor">
              <span>ANNOUNCEMENT</span><h2>Create notification</h2>
              <input id="notificationTitle" placeholder="Notification title" maxLength={160} />
              <textarea id="notificationMessage" placeholder="Write your announcement..." rows={7} maxLength={2000} />
              <button className="save-button" onClick={() => {
                const title = (document.getElementById("notificationTitle") as HTMLInputElement).value;
                const message = (document.getElementById("notificationMessage") as HTMLTextAreaElement).value;
                saveSettings({ notifications: { title, message, enabled: true } });
              }}>PUBLISH</button>
            </div>
          </div>
        )}

        {active === "Settings" && (
          <div className="content-page">
            <div className="settings-card"><div><span>WEBSITE</span><h2>Website status</h2><p>Public website remains available.</p></div><b>● LIVE</b></div>
            <div className="settings-card"><div><span>SECURITY</span><h2>Server authentication</h2><p>Protected admin session cookie is enabled.</p></div><b>● ON</b></div>
            <div className="settings-card"><div><span>UPLOADS</span><h2>Media validation</h2><p>Type and size restrictions are enabled.</p></div><b>● ON</b></div>
          </div>
        )}
      </section>

      <style jsx global>{`
        *{box-sizing:border-box} body{margin:0;background:#050507;color:#fff;font-family:Inter,Arial,sans-serif}
        button,input,textarea{font:inherit}button{cursor:pointer}
        .admin-login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;background:radial-gradient(circle at 20% 20%,rgba(124,58,237,.18),transparent 35%),radial-gradient(circle at 80% 80%,rgba(34,211,238,.08),transparent 30%),#050507;position:relative;overflow:hidden}
        .admin-glow{position:absolute;width:350px;height:350px;border-radius:50%;filter:blur(100px);pointer-events:none}.glow-one{background:rgba(124,58,237,.15);top:-150px;left:-100px}.glow-two{background:rgba(34,211,238,.08);right:-120px;bottom:-150px}
        .login-card{width:100%;max-width:430px;padding:45px;border:1px solid rgba(255,255,255,.09);border-radius:30px;background:rgba(255,255,255,.035);backdrop-filter:blur(30px);box-shadow:0 30px 100px rgba(0,0,0,.45);position:relative;z-index:2}
        .login-logo,.brand-icon{display:grid;place-items:center;background:linear-gradient(135deg,#8b5cf6,#22d3ee);font-weight:900}.login-logo{width:58px;height:58px;border-radius:18px;font-size:22px;margin-bottom:30px}.login-small,.header-label,.menu-title,.edit-card>span,.media-card>span,.notification-editor>span,.settings-card span{color:#a78bfa;font-size:9px;font-weight:800;letter-spacing:3px}
        .login-card h1{margin:12px 0;font-size:38px;letter-spacing:-2px}.login-card>p{color:rgba(255,255,255,.4);line-height:1.7;font-size:13px;margin-bottom:28px}
        .password-box{display:flex;gap:8px;padding:6px;border:1px solid rgba(255,255,255,.09);border-radius:15px;background:rgba(255,255,255,.035)}.password-box input{flex:1;min-width:0;padding:12px;border:0;outline:0;background:transparent;color:#fff}.password-box button{border:0;border-radius:10px;padding:0 12px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.5)}
        .login-error,.dashboard-error{margin-top:12px;padding:11px 14px;border-radius:12px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.18);color:#fca5a5;font-size:11px}.login-button{width:100%;margin-top:18px;padding:15px 20px;border:0;border-radius:14px;background:#fff;color:#050507;font-size:10px;font-weight:900;display:flex;justify-content:space-between}.back-home{display:block;margin-top:22px;text-align:center;color:rgba(255,255,255,.3);font-size:10px}
        .dashboard{min-height:100vh;display:flex;background:#050507}.sidebar{width:250px;min-height:100vh;position:fixed;left:0;top:0;bottom:0;padding:25px 17px;border-right:1px solid rgba(255,255,255,.07);background:rgba(8,8,12,.85);backdrop-filter:blur(25px);display:flex;flex-direction:column;z-index:10}
        .brand{display:flex;align-items:center;gap:12px;padding:5px 10px 35px}.brand-icon{width:38px;height:38px;border-radius:12px}.brand strong{display:block;font-size:12px;letter-spacing:3px}.brand small,.admin-profile small{display:block;margin-top:4px;color:rgba(255,255,255,.3);font-size:7px;letter-spacing:2px}
        .menu-title{padding:0 12px 10px;color:rgba(255,255,255,.25);font-size:7px}.sidebar-menu{display:flex;flex-direction:column;gap:4px}.menu-item{width:100%;display:flex;align-items:center;gap:12px;padding:12px;border:0;border-radius:12px;background:transparent;color:rgba(255,255,255,.4);text-align:left;font-size:11px}.menu-item:hover,.menu-item.active{background:rgba(139,92,246,.1);color:#fff}.menu-item.active{box-shadow:inset 2px 0 0 #8b5cf6}.menu-item span{width:20px;text-align:center;font-size:15px}
        .sidebar-bottom{margin-top:auto;display:flex;flex-direction:column;gap:4px}.sidebar-bottom a,.sidebar-bottom button{padding:12px;border:0;background:transparent;color:rgba(255,255,255,.3);text-align:left;font-size:10px}.sidebar-bottom a:hover,.sidebar-bottom button:hover{color:#fff}
        .dashboard-main{width:calc(100% - 250px);margin-left:250px;padding:35px 45px 60px}.dashboard-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:35px}.dashboard-header h1{margin:7px 0 0;font-size:34px;letter-spacing:-2px}.admin-profile{display:flex;align-items:center;gap:10px}.admin-profile img{width:42px;height:42px;object-fit:cover;border-radius:13px}.admin-profile strong{font-size:11px}.success-message{padding:12px 15px;border:1px solid rgba(52,211,153,.2);background:rgba(52,211,153,.08);color:#6ee7b7;border-radius:12px;margin-bottom:12px;font-size:11px}
        .welcome-banner{position:relative;overflow:hidden;min-height:210px;display:flex;align-items:center;justify-content:space-between;padding:35px;border:1px solid rgba(255,255,255,.08);border-radius:25px;background:radial-gradient(circle at 80% 30%,rgba(139,92,246,.16),transparent 35%),rgba(255,255,255,.025)}.welcome-banner span{color:#a78bfa;font-size:8px;letter-spacing:3px;font-weight:800}.welcome-banner h2{margin:13px 0;font-size:35px;line-height:1;letter-spacing:-2px}.welcome-banner p,.media-card p,.settings-card p{color:rgba(255,255,255,.38);font-size:11px}.banner-symbol{font-size:180px;font-weight:900;color:rgba(255,255,255,.025);transform:rotate(-10deg)}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px}.stat-card,.edit-card,.media-card,.notification-editor,.settings-card,.social-edit{padding:20px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(255,255,255,.025)}.stat-card span{display:block;color:rgba(255,255,255,.3);font-size:7px;letter-spacing:2px}.stat-card strong{display:block;margin-top:18px;font-size:20px}.stat-card small{display:block;margin-top:5px;color:rgba(255,255,255,.25);font-size:9px}
        .content-page{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.edit-card h2,.notification-editor h2,.media-card h2,.settings-card h2{margin:8px 0 20px;font-size:20px}label{display:block;margin-top:16px;color:rgba(255,255,255,.35);font-size:9px}input,textarea{width:100%;margin-top:7px;padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:11px;outline:0;background:rgba(255,255,255,.035);color:#fff;resize:vertical}input:focus,textarea:focus{border-color:rgba(139,92,246,.45)}.save-button{margin-top:20px;padding:12px 18px;border:0;border-radius:10px;background:#fff;color:#050507;font-size:9px;font-weight:900}
        .social-edit{display:flex;align-items:center;gap:12px}.social-edit strong{min-width:80px;font-size:11px}.social-edit input{margin:0;flex:1}.social-edit button{border:0;border-radius:9px;padding:10px 12px;background:rgba(255,255,255,.07);color:#fff;font-size:8px}.media-card p{line-height:1.6}.settings-card{display:flex;align-items:center;justify-content:space-between}.settings-card+.settings-card{margin-top:10px}.settings-card b{color:#34d399;font-size:10px}
        @media(max-width:1000px){.sidebar{width:210px}.dashboard-main{width:calc(100% - 210px);margin-left:210px;padding:25px}.stats-grid{grid-template-columns:repeat(2,1fr)}.content-page{grid-template-columns:1fr}}
        @media(max-width:700px){.sidebar{width:68px;padding:15px 8px}.brand{justify-content:center;padding:5px 0 30px}.brand>div:last-child,.menu-title{display:none}.menu-item{justify-content:center;font-size:0}.menu-item span{font-size:17px}.sidebar-bottom a,.sidebar-bottom button{font-size:0;text-align:center}.dashboard-main{width:calc(100% - 68px);margin-left:68px;padding:20px 13px 40px}.dashboard-header h1{font-size:27px}.admin-profile div{display:none}.banner-symbol{display:none}.welcome-banner{padding:25px}.welcome-banner h2{font-size:27px}.stats-grid{grid-template-columns:1fr 1fr}.login-card{padding:30px 22px}.social-edit{flex-wrap:wrap}.social-edit input{min-width:calc(100% - 95px)}} 
        @media(max-width:420px){.stats-grid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
