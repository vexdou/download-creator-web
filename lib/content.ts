export type CustomText = {
  id: string;
  title: string;
  text: string;
};

export type SiteContent = {
  profile: { name: string; description: string; photo: string };
  about: string;
  media: { backgroundVideo: string; music: string };
  socials: Record<string, string>;
  notifications: { title: string; message: string; enabled: boolean };
  customTexts: CustomText[];
};

export const defaultContent: SiteContent = {
  profile: { name: "Vexdou", description: "Building ideas into reality.", photo: "/profile.jpg" },
  about: "Welcome to my personal digital space.",
  media: { backgroundVideo: "/background.mp4", music: "/music.mp3" },
  socials: {
    tiktok: "https://www.tiktok.com/@Vexdou",
    instagram: "https://www.instagram.com/Vexdou/",
    whatsapp: "https://wa.me/14504066880",
    telegram: "https://t.me/Vexdou"
  },
  notifications: { title: "", message: "", enabled: false },
  customTexts: []
};

const path = "content/site.json";

function repoParts() {
  const full = process.env.GITHUB_REPO || "vexdou/download-creator-web";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) throw new Error("GITHUB_REPO must be owner/repo");
  return { owner, repo };
}

function headers() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function mergeContent(input: Partial<SiteContent>): SiteContent {
  const customTexts = Array.isArray(input.customTexts)
    ? input.customTexts
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          id: String(item.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`),
          title: String(item.title || "").trim().slice(0, 120),
          text: String(item.text || "").trim().slice(0, 5000)
        }))
        .filter((item) => item.text)
        .slice(0, 50)
    : defaultContent.customTexts;

  return {
    ...defaultContent,
    ...input,
    profile: { ...defaultContent.profile, ...(input.profile || {}) },
    media: { ...defaultContent.media, ...(input.media || {}) },
    socials: { ...defaultContent.socials, ...(input.socials || {}) },
    notifications: { ...defaultContent.notifications, ...(input.notifications || {}) },
    customTexts
  };
}

export async function readContent(): Promise<SiteContent> {
  try {
    const { owner, repo } = repoParts();
    const branch = process.env.GITHUB_BRANCH || "main";
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
      { headers: headers(), cache: "no-store" }
    );
    if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
    const file = await response.json();
    const decoded = Buffer.from(String(file.content || "").replace(/\n/g, ""), "base64").toString("utf8");
    return mergeContent(JSON.parse(decoded));
  } catch (error) {
    console.error("CONTENT READ ERROR:", error);
    return defaultContent;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_BRANCH || "main";
  const currentResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { headers: headers(), cache: "no-store" }
  );
  if (!currentResponse.ok) throw new Error(`GitHub content lookup failed: ${currentResponse.status}`);
  const current = await currentResponse.json();
  const body = JSON.stringify(mergeContent(content), null, 2) + "\n";

  const updateResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update website content from admin panel",
        content: Buffer.from(body).toString("base64"),
        sha: current.sha,
        branch
      })
    }
  );
  if (!updateResponse.ok) {
    const detail = await updateResponse.text();
    console.error("GITHUB WRITE ERROR:", detail);
    throw new Error("GitHub could not save the content");
  }
}
