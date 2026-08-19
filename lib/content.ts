import { Octokit } from "@octokit/rest";

export type CustomText = {
  id: string;
  title: string;
  text: string;
};

export type SiteContent = {
  profile: {
    name: string;
    description: string;
    photo: string;
  };
  about: string;
  media: {
    backgroundVideo: string;
    music: string;
  };
  socials: Record<string, string>;
  notifications: {
    title: string;
    message: string;
    enabled: boolean;
  };
  customTexts: CustomText[];
};

export const defaultContent: SiteContent = {
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
  socials: {
    tiktok: "https://www.tiktok.com/@Vexdou",
    instagram: "https://www.instagram.com/Vexdou/",
    whatsapp: "https://wa.me/14504066880",
    telegram: "https://t.me/Vexdou",
  },
  notifications: { title: "", message: "", enabled: false },
  customTexts: [],
};

const path = "content/site.json";

function repoParts() {
  const full = process.env.GITHUB_REPO || "vexdou/download-creator-web";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) throw new Error("GITHUB_REPO must be owner/repo");
  return { owner, repo };
}

function octokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  return new Octokit({ auth: token });
}

function mergeContent(input: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...input,
    profile: { ...defaultContent.profile, ...(input.profile || {}) },
    media: { ...defaultContent.media, ...(input.media || {}) },
    socials: { ...defaultContent.socials, ...(input.socials || {}) },
    notifications: {
      ...defaultContent.notifications,
      ...(input.notifications || {}),
    },
    customTexts: Array.isArray(input.customTexts)
      ? input.customTexts
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            id: String(item.id || crypto.randomUUID()),
            title: String(item.title || "").trim().slice(0, 120),
            text: String(item.text || "").trim().slice(0, 5000),
          }))
          .filter((item) => item.text)
          .slice(0, 50)
      : defaultContent.customTexts,
  };
}

export async function readContent(): Promise<SiteContent> {
  try {
    const api = octokit();
    const { owner, repo } = repoParts();
    const branch = process.env.GITHUB_BRANCH || "main";
    const result = await api.repos.getContent({ owner, repo, path, ref: branch });
    const file = result.data;

    if (!("content" in file) || typeof file.content !== "string") {
      return defaultContent;
    }

    const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
    return mergeContent(JSON.parse(decoded));
  } catch (error) {
    console.error("CONTENT READ ERROR:", error);
    return defaultContent;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  const api = octokit();
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_BRANCH || "main";
  const current = await api.repos.getContent({ owner, repo, path, ref: branch });
  const file = current.data;

  if (Array.isArray(file) || !file.sha) throw new Error("Content file not found");

  await api.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    branch,
    sha: file.sha,
    message: "Update website content from admin panel",
    content: Buffer.from(JSON.stringify(mergeContent(content), null, 2) + "\n").toString("base64"),
  });
}
