import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../lib/auth";
import { defaultContent, readContent, writeContent, SiteContent } from "../../../lib/content";

export const runtime = "nodejs";

const socialKeys = ["tiktok", "instagram", "whatsapp", "telegram", "youtube", "github"] as const;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeUrl(value: unknown) {
  const raw = text(value, 2048);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function objectValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

export async function GET() {
  return NextResponse.json(await readContent(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const current = await readContent();
    const profile = objectValue(input.profile);
    const media = objectValue(input.media);
    const socialsInput = objectValue(input.socials);
    const notifications = objectValue(input.notifications);

    const socials = { ...current.socials } as Record<string, string>;
    for (const key of socialKeys) {
      if (socialsInput[key] !== undefined) {
        const value = safeUrl(socialsInput[key]);
        if (socialsInput[key] && !value) {
          return NextResponse.json({ error: `Invalid ${key} URL. Use a valid HTTPS URL.` }, { status: 400 });
        }
        socials[key] = value;
      }
    }

    const customTexts = Array.isArray(input.customTexts)
      ? input.customTexts
          .filter((item) => item && typeof item === "object")
          .map((item) => {
            const value = item as Record<string, unknown>;
            return {
              id: text(value.id, 100) || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              title: text(value.title, 120),
              text: text(value.text, 5000)
            };
          })
          .filter((item) => item.text)
          .slice(0, 50)
      : current.customTexts;

    const next: SiteContent = {
      ...current,
      profile: {
        name: text(profile.name, 80) || current.profile.name || defaultContent.profile.name,
        description: profile.description !== undefined ? text(profile.description, 300) : current.profile.description,
        photo: profile.photo !== undefined ? text(profile.photo, 2048) || "/profile.jpg" : current.profile.photo
      },
      about: input.about !== undefined ? text(input.about, 5000) : current.about,
      media: {
        backgroundVideo: media.backgroundVideo !== undefined ? text(media.backgroundVideo, 2048) : current.media.backgroundVideo,
        music: media.music !== undefined ? text(media.music, 2048) : current.media.music
      },
      socials,
      notifications: {
        title: notifications.title !== undefined ? text(notifications.title, 160) : current.notifications.title,
        message: notifications.message !== undefined ? text(notifications.message, 2000) : current.notifications.message,
        enabled: notifications.enabled !== undefined ? notifications.enabled === true : current.notifications.enabled
      },
      customTexts
    };

    await writeContent(next);
    return NextResponse.json({ success: true, message: "Settings saved and committed to GitHub." });
  } catch (error) {
    console.error("PUT SETTINGS ERROR:", error);
    return NextResponse.json({ error: "Could not save settings to GitHub." }, { status: 500 });
  }
}
