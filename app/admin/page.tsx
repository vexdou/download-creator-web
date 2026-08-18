"use client";

import {
  Activity,
  Bell,
  Check,
  ChevronRight,
  Edit3,
  Eye,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Menu,
  MessageCircle,
  Music,
  Plus,
  Save,
  Settings,
  Shield,
  Trash2,
  Upload,
  Video,
  X,
  Youtube,
  Instagram,
  Send,
  Github,
} from "lucide-react";

import { useEffect, useState } from "react";

type Social = {
  id: number;
  name: string;
  username: string;
  url: string;
  enabled: boolean;
};

type Project = {
  id: number;
  title: string;
  description: string;
  url: string;
};

type Update = {
  id: number;
  title: string;
  text: string;
  date: string;
};

type SiteData = {
  name: string;
  role: string;
  about: string;
  profile: string;
  background: string;
  music: string;
  musicTitle: string;
  musicArtist: string;
  socials: Social[];
  projects: Project[];
  updates: Update[];
};

const defaultData: SiteData = {
  name: "VEXDOU",
  role: "Creator · Developer · Builder",

  about:
    "I'm passionate about technology, digital products, creative projects and building experiences that people actually enjoy using.",

  profile: "/profile.jpg",
  background: "/background.mp4",
  music: "/music.mp3",

  musicTitle: "VEXDOU Music",
  musicArtist: "My Favorite Track",

  socials: [
    {
      id: 1,
      name: "TikTok",
      username: "@vexdou",
      url: "https://www.tiktok.com/@vexdou",
      enabled: true,
    },
    {
      id: 2,
      name: "Instagram",
      username: "@vexdou",
      url: "https://instagram.com/vexdou",
      enabled: true,
    },
    {
      id: 3,
      name: "WhatsApp",
      username: "Message me",
      url: "https://wa.me/",
      enabled: true,
    },
    {
      id: 4,
      name: "Telegram",
      username: "@vexdou",
      url: "https://t.me/vexdou",
      enabled: true,
    },
    {
      id: 5,
      name: "YouTube",
      username: "VEXDOU",
      url: "https://youtube.com/",
      enabled: true,
    },
    {
      id: 6,
      name: "GitHub",
      username: "vexdou",
      url: "https://github.com/vexdou",
      enabled: true,
    },
  ],

  projects: [
    {
      id: 1,
      title: "VEXDOU Platform",
      description:
        "My personal digital platform for projects, media, social links and updates.",
      url: "#",
    },
    {
      id: 2,
      title: "ORPIT-PAY",
      description:
        "A modern digital SaaS platform currently being developed.",
      url: "#",
    },
  ],

  updates: [
    {
      id: 1,
      title: "Welcome to VEXDOU",
      text:
        "The new VEXDOU digital platform is now live.",
      date: "2026-08-18",
    },
  ],
};

const menuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "profile",
    name: "Profile",
    icon: Shield,
  },
  {
    id: "socials",
    name: "Social Platforms",
    icon: LinkIcon,
  },
  {
    id: "media",
    name: "Media",
    icon: ImageIcon,
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
  },
  {
    id: "projects",
    name: "Projects",
    icon: Activity,
  },
  {
    id: "updates",
    name: "Updates",
    icon: FileText,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
  },
];

export default function AdminPage() {
  const [data, setData] = useState<SiteData>(defaultData);

  const [active, setActive] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [saved, setSaved] = useState(false);

  const [login, setLogin] = useState(false);

  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");

  const [newSocial, setNewSocial] = useState({
    name: "",
    username: "",
    url: "",
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    url: "",
  });

  const [newUpdate, setNewUpdate] = useState({
    title: "",
    text: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("vexdou-site-data");

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch {
        setData(defaultData);
      }
    }
  }, []);

  function saveData() {
    localStorage.setItem(
      "vexdou-site-data",
      JSON.stringify(data)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function updateData<K extends keyof SiteData>(
    key: K,
    value: SiteData[K]
  ) {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function addSocial() {
    if (
      !newSocial.name ||
      !newSocial.username ||
      !newSocial.url
    ) {
      return;
    }

    const social: Social = {
      id: Date.now(),
      name: newSocial.name,
      username: newSocial.username,
      url: newSocial.url,
      enabled: true,
    };

    updateData("socials", [
      ...data.socials,
      social,
    ]);

    setNewSocial({
      name: "",
      username: "",
      url: "",
    });
  }

  function deleteSocial(id: number) {
    updateData(
      "socials",
      data.socials.filter(
        (social) => social.id !== id
      )
    );
  }

  function toggleSocial(id: number) {
    updateData(
      "socials",
      data.socials.map((social) =>
        social.id === id
          ? {
              ...social,
              enabled: !social.enabled,
            }
          : social
      )
    );
  }

  function addProject() {
    if (
      !newProject.title ||
      !newProject.description
    ) {
      return;
    }

    const project: Project = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      url: newProject.url || "#",
    };

    updateData("projects", [
      ...data.projects,
      project,
    ]);

    setNewProject({
      title: "",
      description: "",
      url: "",
    });
  }

  function deleteProject(id: number) {
    updateData(
      "projects",
      data.projects.filter(
        (project) => project.id !== id
      )
    );
  }

  function addUpdate() {
    if (
      !newUpdate.title ||
      !newUpdate.text
    ) {
      return;
    }

    const update: Update = {
      id: Date.now(),
      title: newUpdate.title,
      text: newUpdate.text,
      date: new Date()
        .toISOString()
        .split("T")[0],
    };

    updateData("updates", [
      update,
      ...data.updates,
    ]);

    setNewUpdate({
      title: "",
      text: "",
    });
  }

  function deleteUpdate(id: number) {
    updateData(
      "updates",
      data.updates.filter(
        (item) => item.id !== id
      )
    );
  }

  function showNotification(message: string) {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  function handleLogin() {
    if (password === "VEXDOU2026") {
      setLogin(true);
      setPassword("");
    } else {
      showNotification("Wrong admin password");
    }
  }

  if (!login) {
    return (
      <main className="min-h-screen bg-[#05060a] text-white">

        <div className="fixed inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[150px]" />

        </div>

        <div className="relative flex min-h-screen items-center justify-center px-5">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.04] p-8 backdrop-blur-2xl">

            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 text-2xl font-black">
              V
            </div>

            <h1 className="mt-6 text-center text-3xl font-black">
              VEXDOU ADMIN
            </h1>

            <p className="mt-2 text-center text-xs text-white/40">
              Secure control panel
            </p>

            <div className="mt-8">

              <label className="mb-2 block text-xs text-white/50">
                Admin Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                placeholder="Enter password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
              />

            </div>

            <button
              onClick={handleLogin}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black transition hover:bg-white/90"
            >
              <Shield size={17} />
              Enter Admin Panel
            </button>

            <p className="mt-5 text-center text-[10px] text-white/25">
              VEXDOU secure dashboard
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05060a] text-white">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#08090e] transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 font-black">
              V
            </div>

            <div>

              <div className="text-sm font-black tracking-[2px]">
                VEXDOU
              </div>

              <div className="text-[8px] tracking-[2px] text-white/30">
                ADMIN PANEL
              </div>

            </div>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={19} />
          </button>

        </div>


        <div className="px-4 py-6">

          <div className="mb-3 px-3 text-[9px] font-bold tracking-[3px] text-white/25">
            MANAGEMENT
          </div>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              const selected =
                active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition ${
                    selected
                      ? "bg-violet-600/15 text-white"
                      : "text-white/45 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <Icon size={17} />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {selected && (
                    <ChevronRight size={14} />
                  )}

                </button>
              );
            })}

          </div>

        </div>


        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

          <a
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/45 hover:bg-white/5 hover:text-white"
          >
            <Eye size={17} />
            View Website
          </a>

          <button
            onClick={() => setLogin(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <section className="min-h-screen lg:ml-72">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#05060a]/80 px-5 backdrop-blur-xl lg:px-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 p-2 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>

              <div className="text-xs text-white/35">
                VEXDOU
              </div>

              <h1 className="text-xl font-black">
                {menuItems.find(
                  (item) => item.id === active
                )?.name}
              </h1>

            </div>

          </div>


          <div className="flex items-center gap-2">

            {saved && (
              <div className="hidden items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-[10px] text-emerald-400 sm:flex">
                <Check size={14} />
                Saved
              </div>
            )}

            <button
              onClick={saveData}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black"
            >
              <Save size={15} />
              <span className="hidden sm:block">
                Save Changes
              </span>
            </button>

          </div>

        </header>


        {/* CONTENT */}

        <div className="p-5 lg:p-8">

          {/* DASHBOARD */}

          {active === "dashboard" && (
            <Dashboard
              data={data}
              setActive={setActive}
            />
          )}


          {/* PROFILE */}

          {active === "profile" && (
            <div className="space-y-6">

              <PageTitle
                title="Profile"
                description="Manage your public profile and About section."
              />

              <div className="grid gap-6 xl:grid-cols-[1fr_350px]">

                <div className="space-y-5">

                  <Card>

                    <Field
                      label="Display Name"
                      value={data.name}
                      onChange={(value) =>
                        updateData("name", value)
                      }
                    />

                    <Field
                      label="Role / Tagline"
                      value={data.role}
                      onChange={(value) =>
                        updateData("role", value)
                      }
                    />

                    <TextArea
                      label="About Me"
                      value={data.about}
                      onChange={(value) =>
                        updateData("about", value)
                      }
                    />

                  </Card>


                  <Card>

                    <div className="mb-4 flex items-center gap-2">
                      <ImageIcon size={17} />
                      <h3 className="font-bold">
                        Profile Image
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">

                      <img
                        src={data.profile}
                        alt="Profile"
                        className="h-28 w-28 rounded-2xl object-cover"
                      />

                      <div>

                        <p className="text-xs text-white/40">
                          Current image
                        </p>

                        <p className="mt-1 text-xs text-white/60">
                          {data.profile}
                        </p>

                        <div className="mt-4 flex gap-2">

                          <button
                            onClick={() =>
                              showNotification(
                                "Put your new image inside public/ and update the path."
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs"
                          >
                            <Upload size={14} />
                            Upload
                          </button>

                        </div>

                      </div>

                    </div>

                  </Card>

                </div>


                <PreviewProfile data={data} />

              </div>

            </div>
          )}


          {/* SOCIALS */}

          {active === "socials" && (
            <div className="space-y-6">

              <PageTitle
                title="Social Platforms"
                description="Add and manage the platforms displayed on your website."
              />


              <Card>

                <div className="mb-5 flex items-center gap-2">
                  <Plus size={17} />
                  <h3 className="font-bold">
                    Add Platform
                  </h3>
                </div>

                <div className="grid gap-3 md:grid-cols-3">

                  <Input
                    placeholder="Platform name"
                    value={newSocial.name}
                    onChange={(value) =>
                      setNewSocial({
                        ...newSocial,
                        name: value,
                      })
                    }
                  />

                  <Input
                    placeholder="@username"
                    value={newSocial.username}
                    onChange={(value) =>
                      setNewSocial({
                        ...newSocial,
                        username: value,
                      })
                    }
                  />

                  <Input
                    placeholder="https://..."
                    value={newSocial.url}
                    onChange={(value) =>
                      setNewSocial({
                        ...newSocial,
                        url: value,
                      })
                    }
                  />

                </div>

                <button
                  onClick={addSocial}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black"
                >
                  <Plus size={15} />
                  Add Platform
                </button>

              </Card>


              <div className="grid gap-4 md:grid-cols-2">

                {data.socials.map((social) => (

                  <Card key={social.id}>

                    <div className="flex items-center gap-4">

                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-600/10">
                        <LinkIcon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="font-bold">
                          {social.name}
                        </h3>

                        <p className="text-xs text-white/40">
                          {social.username}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-white/25">
                          {social.url}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          toggleSocial(social.id)
                        }
                        className={`rounded-full px-3 py-1 text-[9px] ${
                          social.enabled
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {social.enabled
                          ? "VISIBLE"
                          : "HIDDEN"}
                      </button>

                      <button
                        onClick={() =>
                          deleteSocial(social.id)
                        }
                        className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </Card>

                ))}

              </div>

            </div>
          )}


          {/* MEDIA */}

          {active === "media" && (
            <div className="space-y-6">

              <PageTitle
                title="Media"
                description="Manage your website background and profile media."
              />

              <div className="grid gap-5 md:grid-cols-2">

                <Card>

                  <div className="flex items-center gap-3">

                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10">
                      <Video size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Background Video
                      </h3>

                      <p className="text-xs text-white/35">
                        Full-screen website background
                      </p>
                    </div>

                  </div>


                  <div className="mt-5 overflow-hidden rounded-xl border border-white/10">

                    <video
                      src={data.background}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="h-52 w-full object-cover"
                    />

                  </div>


                  <p className="mt-3 text-xs text-white/30">
                    Current: {data.background}
                  </p>

                  <button
                    onClick={() =>
                      showNotification(
                        "Replace background.mp4 inside public/."
                      )
                    }
                    className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs"
                  >
                    <Upload size={15} />
                    Change Video
                  </button>

                </Card>


                <Card>

                  <div className="flex items-center gap-3">

                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/10">
                      <ImageIcon size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Profile Image
                      </h3>

                      <p className="text-xs text-white/35">
                        Main profile picture
                      </p>
                    </div>

                  </div>


                  <img
                    src={data.profile}
                    alt="Profile"
                    className="mt-5 h-52 w-full rounded-xl object-cover"
                  />


                  <button
                    onClick={() =>
                      showNotification(
                        "Replace profile.jpg inside public/."
                      )
                    }
                    className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs"
                  >
                    <Upload size={15} />
                    Change Image
                  </button>

                </Card>

              </div>

            </div>
          )}


          {/* MUSIC */}

          {active === "music" && (
            <div className="space-y-6">

              <PageTitle
                title="Music"
                description="Control the music player shown to your visitors."
              />

              <Card>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs text-white/45">
                      Music Title
                    </label>

                    <input
                      value={data.musicTitle}
                      onChange={(e) =>
                        updateData(
                          "musicTitle",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs text-white/45">
                      Artist
                    </label>

                    <input
                      value={data.musicArtist}
                      onChange={(e) =>
                        updateData(
                          "musicArtist",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"
                    />

                  </div>

                </div>


                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

                  <div className="flex items-center gap-4">

                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400">
                      <Music size={22} />
                    </div>

                    <div className="flex-1">

                      <div className="font-bold">
                        {data.musicTitle}
                      </div>

                      <div className="text-xs text-white/40">
                        {data.musicArtist}
                      </div>

                    </div>

                    <div className="text-xs text-white/30">
                      {data.music}
                    </div>

                  </div>

                </div>


                <button
                  onClick={() =>
                    showNotification(
                      "Replace music.mp3 inside public/."
                    )
                  }
                  className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black"
                >
                  <Upload size={15} />
                  Change Music
                </button>

              </Card>

            </div>
          )}


          {/* PROJECTS */}

          {active === "projects" && (
            <div className="space-y-6">

              <PageTitle
                title="Projects"
                description="Showcase the things you're building."
              />

              <Card>

                <h3 className="mb-5 font-bold">
                  Add New Project
                </h3>

                <div className="space-y-3">

                  <Input
                    placeholder="Project title"
                    value={newProject.title}
                    onChange={(value) =>
                      setNewProject({
                        ...newProject,
                        title: value,
                      })
                    }
                  />

                  <TextArea
                    label="Description"
                    value={newProject.description}
                    onChange={(value) =>
                      setNewProject({
                        ...newProject,
                        description: value,
                      })
                    }
                  />

                  <Input
                    placeholder="Project URL"
                    value={newProject.url}
                    onChange={(value) =>
                      setNewProject({
                        ...newProject,
                        url: value,
                      })
                    }
                  />

                </div>


                <button
                  onClick={addProject}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black"
                >
                  <Plus size={15} />
                  Add Project
                </button>

              </Card>


              <div className="grid gap-4 md:grid-cols-2">

                {data.projects.map((project) => (

                  <Card key={project.id}>

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="font-bold">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-white/40">
                          {project.description}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          deleteProject(project.id)
                        }
                        className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>


                    <a
                      href={project.url}
                      target="_blank"
                      className="mt-4 inline-flex items-center gap-2 text-xs text-violet-400"
                    >
                      View project
                      <ExternalLink size={13} />
                    </a>

                  </Card>

                ))}

              </div>

            </div>
          )}


          {/* UPDATES */}

          {active === "updates" && (
            <div className="space-y-6">

              <PageTitle
                title="Updates"
                description="Publish news and updates on your website."
              />


              <Card>

                <h3 className="mb-5 font-bold">
                  Publish Update
                </h3>

                <div className="space-y-3">

                  <Input
                    placeholder="Update title"
                    value={newUpdate.title}
                    onChange={(value) =>
                      setNewUpdate({
                        ...newUpdate,
                        title: value,
                      })
                    }
                  />

                  <TextArea
                    label="Update"
                    value={newUpdate.text}
                    onChange={(value) =>
                      setNewUpdate({
                        ...newUpdate,
                        text: value,
                      })
                    }
                  />

                </div>


                <button
                  onClick={addUpdate}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black"
                >
                  <Plus size={15} />
                  Publish Update
                </button>

              </Card>


              <div className="space-y-4">

                {data.updates.map((item) => (

                  <Card key={item.id}>

                    <div className="flex items-start gap-4">

                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10">
                        <FileText size={18} />
                      </div>

                      <div className="flex-1">

                        <div className="text-[9px] tracking-[2px] text-violet-400">
                          {item.date}
                        </div>

                        <h3 className="mt-2 font-bold">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-white/40">
                          {item.text}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          deleteUpdate(item.id)
                        }
                        className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </Card>

                ))}

              </div>

            </div>
          )}


          {/* NOTIFICATIONS */}

          {active === "notifications" && (
            <div className="space-y-6">

              <PageTitle
                title="Notifications"
                description="Create announcements for your website visitors."
              />


              <Card>

                <div className="flex items-center gap-3">

                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-yellow-500/10">
                    <Bell size={20} />
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Website Notification
                    </h3>

                    <p className="text-xs text-white/35">
                      Send a notification to the public website.
                    </p>

                  </div>

                </div>


                <textarea
                  value={notification}
                  onChange={(e) =>
                    setNotification(e.target.value)
                  }
                  placeholder="Write notification..."
                  className="mt-6 min-h-32 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm outline-none"
                />


                <button
                  onClick={() => {
                    if (!notification) return;

                    localStorage.setItem(
                      "vexdou-notification",
                      notification
                    );

                    showNotification(
                      "Notification published."
                    );
                  }}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black"
                >
                  <Bell size={15} />
                  Publish Notification
                </button>

              </Card>


              <Card>

                <h3 className="font-bold">
                  Notification Preview
                </h3>

                <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

                  <div className="flex items-start gap-3">

                    <Bell
                      size={18}
                      className="text-yellow-400"
                    />

                    <div>

                      <div className="text-xs font-bold">
                        VEXDOU
                      </div>

                      <div className="mt-1 text-xs text-white/50">
                        {notification ||
                          "Your notification will appear here."}
                      </div>

                    </div>

                  </div>

                </div>

              </Card>

            </div>
          )}


          {/* SETTINGS */}

          {active === "settings" && (
            <div className="space-y-6">

              <PageTitle
                title="Settings"
                description="General controls for your VEXDOU platform."
              />


              <Card>

                <h3 className="font-bold">
                  Website
                </h3>

                <div className="mt-5 space-y-4">

                  <SettingRow
                    title="Public Website"
                    description="Make your website publicly accessible."
                    enabled={true}
                  />

                  <SettingRow
                    title="Music Player"
                    description="Show music controls to visitors."
                    enabled={true}
                  />

                  <SettingRow
                    title="Background Video"
                    description="Show your video background."
                    enabled={true}
                  />

                </div>

              </Card>


              <Card>

                <h3 className="font-bold">
                  Admin
                </h3>

                <div className="mt-5 rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-4">

                  <div className="flex gap-3">

                    <Shield
                      size={18}
                      className="text-yellow-400"
                    />

                    <div>

                      <div className="text-xs font-bold">
                        Current demo authentication
                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-white/40">
                        This panel currently uses browser-side
                        authentication. For a real production
                        admin system, authentication must be moved
                        to a secure server/database.
                      </p>

                    </div>

                  </div>

                </div>

              </Card>


              <Card>

                <h3 className="font-bold">
                  Danger Zone
                </h3>

                <p className="mt-2 text-xs text-white/35">
                  Reset the website data stored in this browser.
                </p>

                <button
                  onClick={() => {
                    localStorage.removeItem(
                      "vexdou-site-data"
                    );

                    setData(defaultData);

                    showNotification(
                      "Website data reset."
                    );
                  }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs text-red-400"
                >
                  <Trash2 size={15} />
                  Reset Data
                </button>

              </Card>

            </div>
          )}

        </div>

      </section>


      {/* TOAST */}

      {notification && active !== "notifications" && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl border border-white/10 bg-[#11131a] px-5 py-3 text-xs shadow-2xl">
          {notification}
        </div>
      )}

    </main>
  );
}


/* ================= COMPONENTS ================= */

function Dashboard({
  data,
  setActive,
}: {
  data: SiteData;
  setActive: (page: string) => void;
}) {
  const visibleSocials = data.socials.filter(
    (social) => social.enabled
  );

  return (
    <div className="space-y-8">

      <PageTitle
        title="Dashboard"
        description="Welcome back. Control your VEXDOU platform from here."
      />


      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Social Platforms"
          value={visibleSocials.length.toString()}
          icon={<LinkIcon size={19} />}
        />

        <StatCard
          title="Projects"
          value={data.projects.length.toString()}
          icon={<Activity size={19} />}
        />

        <StatCard
          title="Updates"
          value={data.updates.length.toString()}
          icon={<FileText size={19} />}
        />

        <StatCard
          title="Status"
          value="ONLINE"
          icon={<Check size={19} />}
          green
        />

      </div>


      <div className="grid gap-5 xl:grid-cols-2">

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-bold">
                Quick Management
              </h3>

              <p className="mt-1 text-xs text-white/35">
                Jump directly to a section.
              </p>

            </div>

          </div>


          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <QuickButton
              icon={<Shield size={17} />}
              text="Edit Profile"
              onClick={() => setActive("profile")}
            />

            <QuickButton
              icon={<LinkIcon size={17} />}
              text="Social Platforms"
              onClick={() => setActive("socials")}
            />

            <QuickButton
              icon={<Music size={17} />}
              text="Manage Music"
              onClick={() => setActive("music")}
            />

            <QuickButton
              icon={<Video size={17} />}
              text="Manage Media"
              onClick={() => setActive("media")}
            />

          </div>

        </Card>


        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-bold">
                Website Preview
              </h3>

              <p className="mt-1 text-xs text-white/35">
                Your public website is ready.
              </p>

            </div>

            <a
              href="/"
              target="_blank"
              className="rounded-xl bg-white/5 p-2 text-white/60"
            >
              <ExternalLink size={16} />
            </a>

          </div>


          <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/30 to-cyan-950/10 p-6">

            <div className="text-3xl font-black">
              {data.name}
            </div>

            <div className="mt-2 text-xs text-white/40">
              {data.role}
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/5">

              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />

            </div>

            <div className="mt-2 text-[9px] text-white/25">
              Website configuration
            </div>

          </div>

        </Card>

      </div>


      <Card>

        <div className="flex items-center gap-3">

          <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/10">

            <Activity
              size={18}
              className="text-emerald-400"
            />

          </div>

          <div>

            <h3 className="font-bold">
              System Status
            </h3>

            <p className="text-xs text-white/35">
              Everything is running normally.
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
}


function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>

      <h2 className="text-3xl font-black tracking-tight">
        {title}
      </h2>

      <p className="mt-2 text-sm text-white/40">
        {description}
      </p>

    </div>
  );
}


function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5 backdrop-blur-xl lg:p-6">
      {children}
    </div>
  );
}


function StatCard({
  title,
  value,
  icon,
  green = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  green?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5">

      <div className="flex items-center justify-between">

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10">
          {icon}
        </div>

        {green && (
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
        )}

      </div>

      <div className="mt-5 text-2xl font-black">
        {value}
      </div>

      <div className="mt-1 text-xs text-white/35">
        {title}
      </div>

    </div>
  );
}


function QuickButton({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4 text-left text-xs transition hover:bg-white/[.07]"
    >
      {icon}
      <span>{text}</span>
      <ChevronRight
        size={14}
        className="ml-auto text-white/25"
      />
    </button>
  );
}


function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-5 last:mb-0">

      <label className="mb-2 block text-xs text-white/45">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
      />

    </div>
  );
}


function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-5 last:mb-0">

      <label className="mb-2 block text-xs text-white/45">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="min-h-32 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 outline-none transition focus:border-violet-500"
      />

    </div>
  );
}


function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
    />
  );
}


function PreviewProfile({
  data,
}: {
  data: SiteData;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5">

      <div className="mb-4 flex items-center gap-2">

        <Eye size={17} />

        <h3 className="font-bold">
          Preview
        </h3>

      </div>


      <div className="overflow-hidden rounded-2xl border border-white/10">

        <img
          src={data.profile}
          alt={data.name}
          className="h-72 w-full object-cover"
        />

        <div className="bg-black/40 p-5">

          <div className="text-xl font-black">
            {data.name}
          </div>

          <div className="mt-1 text-xs text-white/40">
            {data.role}
          </div>

        </div>

      </div>

    </div>
  );
}


function SettingRow({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/10 p-4">

      <div className="flex-1">

        <div className="text-sm font-bold">
          {title}
        </div>

        <div className="mt-1 text-xs text-white/35">
          {description}
        </div>

      </div>

      <div
        className={`rounded-full px-3 py-1 text-[9px] ${
          enabled
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </div>

    </div>
  );
    }
