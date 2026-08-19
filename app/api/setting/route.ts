import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { isAdminAuthenticated } from "../../../lib/auth";

const defaultSettings = {
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
    tiktok: "",
    instagram: "",
    telegram: "",
    whatsapp: "",
    youtube: "",
    github: "",
  },
  notifications: {
    title: "",
    message: "",
    enabled: false,
  },
};

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const safeUrl = (value: unknown): string => {
  const raw = text(value, 2048);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("vexdou");
    const settings = await db.collection("settings").findOne({ type: "website" });

    if (!settings) {
      await db.collection("settings").updateOne(
        { type: "website" },
        { $setOnInsert: { type: "website", ...defaultSettings, updatedAt: new Date() } },
        { upsert: true }
      );
      return NextResponse.json(defaultSettings);
    }

    const { _id: _ignoredId, type: _ignoredType, updatedAt: _ignoredUpdatedAt, ...data } =
      settings;

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const profile = input.profile as Record<string, unknown> | undefined;
    const media = input.media as Record<string, unknown> | undefined;
    const socials = input.socials as Record<string, unknown> | undefined;
    const notifications = input.notifications as Record<string, unknown> | undefined;

    const update = {
      profile: {
        name: text(profile?.name, 80) || defaultSettings.profile.name,
        description: text(profile?.description, 300),
        photo: text(profile?.photo, 2048) || defaultSettings.profile.photo,
      },
      about: text(input.about, 5000),
      media: {
        backgroundVideo: text(media?.backgroundVideo, 2048) || defaultSettings.media.backgroundVideo,
        music: text(media?.music, 2048) || defaultSettings.media.music,
      },
      socials: {
        tiktok: safeUrl(socials?.tiktok),
        instagram: safeUrl(socials?.instagram),
        telegram: safeUrl(socials?.telegram),
        whatsapp: safeUrl(socials?.whatsapp),
        youtube: safeUrl(socials?.youtube),
        github: safeUrl(socials?.github),
      },
      notifications: {
        title: text(notifications?.title, 160),
        message: text(notifications?.message, 2000),
        enabled: notifications?.enabled === true,
      },
    };

    const client = await clientPromise;
    const db = client.db("vexdou");

    await db.collection("settings").updateOne(
      { type: "website" },
      { $set: { ...update, type: "website", updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("PUT SETTINGS ERROR:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
