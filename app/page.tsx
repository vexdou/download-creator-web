"use client";

import React, { useState, useEffect } from "react";
import {
  Instagram,
  Mail,
  Send,
  MessageCircle,
  MapPin,
  Eye,
  Settings,
  X,
  Save,
  Globe,
  Sparkles,
} from "lucide-react";

export default function Home() {
  // Config state (defaults match your image)
  const [profile, setProfile] = useState({
    username: "vexdou",
    subtitle: "SCHOLES",
    location: "Sky",
    views: 37,
    avatarUrl: "/profile.jpg",
    bgUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-at-sunset-41138-large.mp4",
    bgType: "video", // 'video' or 'image'
    tiktok: "https://tiktok.com/@vexdou",
    email: "mailto:example@gmail.com",
    instagram: "https://instagram.com/vexdou",
    whatsapp: "https://wa.me/123456789",
    telegram: "https://t.me/vexdou",
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  // Load saved settings on startup
  useEffect(() => {
    const saved = localStorage.getItem("vexdou_profile_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setTempProfile(parsed);
      } catch (e) {
        console.error("Could not load local profile data", e);
      }
    }
  }, []);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("vexdou_profile_data", JSON.stringify(tempProfile));
    setIsAdminOpen(false);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white select-none">
      {/* ================= BACKGROUND MEDIA ================= */}
      <div className="absolute inset-0 z-0">
        {profile.bgType === "video" ? (
          <video
            src={profile.bgUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover brightness-75 contrast-125"
          />
        ) : (
          <img
            src={profile.bgUrl}
            alt="Background"
            className="h-full w-full object-cover brightness-75 contrast-125"
          />
        )}
        {/* Subtle grid and dark gradient overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* ================= ADMIN TOGGLE BUTTON ================= */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-4 right-4 z-40 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white/70 backdrop-blur-md border border-white/10 transition hover:bg-black/80 hover:text-white"
        title="Open Admin Panel"
      >
        <Settings size={18} />
      </button>

      {/* ================= MAIN PROFILE CARD ================= */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        {/* Profile Avatar */}
        <div className="relative mb-5">
          <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.4)]">
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback avatar if link breaks
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
              }}
            />
          </div>
        </div>

        {/* Username */}
        <h1 className="text-3xl font-extrabold tracking-wide text-amber-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {profile.username}
        </h1>

        {/* Subtitle / Role */}
        <p className="mt-1 text-sm font-bold tracking-[3px] uppercase text-orange-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {profile.subtitle}
        </p>

        {/* Location Badge */}
        <div className="mt-4 flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 border border-amber-500/30 text-amber-400 backdrop-blur-md shadow-lg">
          <MapPin size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold">{profile.location}</span>
        </div>

        {/* Social Icons Row */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {/* TikTok */}
          <a
            href={profile.tiktok}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 hover:bg-white/20"
          >
            <Sparkles size={20} />
          </a>

          {/* Email */}
          <a
            href={profile.email}
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 hover:bg-white/20"
          >
            <Mail size={20} />
          </a>

          {/* Instagram */}
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 hover:bg-white/20"
          >
            <Instagram size={20} />
          </a>

          {/* WhatsApp */}
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-xl bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] transition hover:scale-110"
          >
            <MessageCircle size={20} />
          </a>

          {/* Telegram */}
          <a
            href={profile.telegram}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] transition hover:scale-110"
          >
            <Send size={18} className="-translate-x-0.5 translate-y-0.5" />
          </a>
        </div>

        {/* View Count Badge (Bottom Left style) */}
        <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-xs text-amber-500/80 font-medium">
          <Eye size={15} />
          <span>{profile.views}</span>
        </div>
      </div>

      {/* ================= ADMIN PANEL MODAL ================= */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-[#121318] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-amber-400">Admin Panel</h2>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-white/60 mb-1">Username</label>
                <input
                  type="text"
                  value={tempProfile.username}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, username: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={tempProfile.subtitle}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, subtitle: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Location</label>
                <input
                  type="text"
                  value={tempProfile.location}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, location: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={tempProfile.avatarUrl}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, avatarUrl: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Background Media URL (Video / Image)</label>
                <input
                  type="text"
                  value={tempProfile.bgUrl}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, bgUrl: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Background Type</label>
                <select
                  value={tempProfile.bgType}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, bgType: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#1e2028] p-3 text-white outline-none focus:border-amber-400"
                >
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1">WhatsApp URL</label>
                <input
                  type="text"
                  value={tempProfile.whatsapp}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, whatsapp: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Telegram URL</label>
                <input
                  type="text"
                  value={tempProfile.telegram}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, telegram: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
