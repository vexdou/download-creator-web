import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { isAdminAuthenticated } from "../../../lib/auth";

export const runtime = "nodejs";

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

const text = (value: unknown, max: number): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
};

const safeUrl = (value: unknown): string => {
  const raw = text(value, 2048);

  if (!raw) return "";

  try {
    const url = new URL(raw);

    if (url.protocol !== "https:") {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("vexdou");

    const settings = await db
      .collection("settings")
      .findOne({ type: "website" });

    if (!settings) {
      await db.collection("settings").updateOne(
        { type: "website" },
        {
          $setOnInsert: {
            type: "website",
            ...defaultSettings,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return NextResponse.json(defaultSettings);
    }

    const {
      _id: _ignoredId,
      type: _ignoredType,
      updatedAt: _ignoredUpdatedAt,
      ...data
    } = settings;

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load settings",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error: "Invalid settings payload",
        },
        {
          status: 400,
        }
      );
    }

    const input = body as Record<string, unknown>;

    const client = await clientPromise;
    const db = client.db("vexdou");

    const existing = await db
      .collection("settings")
      .findOne({ type: "website" });

    const current = existing || defaultSettings;

    const currentProfile =
      current.profile && typeof current.profile === "object"
        ? current.profile as Record<string, unknown>
        : {};

    const currentMedia =
      current.media && typeof current.media === "object"
        ? current.media as Record<string, unknown>
        : {};

    const currentSocials =
      current.socials && typeof current.socials === "object"
        ? current.socials as Record<string, unknown>
        : {};

    const currentNotifications =
      current.notifications &&
      typeof current.notifications === "object"
        ? current.notifications as Record<string, unknown>
        : {};

    const inputProfile =
      input.profile && typeof input.profile === "object"
        ? input.profile as Record<string, unknown>
        : {};

    const inputMedia =
      input.media && typeof input.media === "object"
        ? input.media as Record<string, unknown>
        : {};

    const inputSocials =
      input.socials && typeof input.socials === "object"
        ? input.socials as Record<string, unknown>
        : {};

    const inputNotifications =
      input.notifications &&
      typeof input.notifications === "object"
        ? input.notifications as Record<string, unknown>
        : {};

    const update = {
      profile: {
        name:
          text(inputProfile.name, 80) ||
          text(currentProfile.name, 80) ||
          defaultSettings.profile.name,

        description:
          typeof inputProfile.description === "string"
            ? text(inputProfile.description, 300)
            : text(currentProfile.description, 300),

        photo:
          text(inputProfile.photo, 2048) ||
          text(currentProfile.photo, 2048) ||
          defaultSettings.profile.photo,
      },

      about:
        typeof input.about === "string"
          ? text(input.about, 5000)
          : text(current.about, 5000),

      media: {
        backgroundVideo:
          text(inputMedia.backgroundVideo, 2048) ||
          text(currentMedia.backgroundVideo, 2048) ||
          defaultSettings.media.backgroundVideo,

        music:
          text(inputMedia.music, 2048) ||
          text(currentMedia.music, 2048) ||
          defaultSettings.media.music,
      },

      socials: {
        tiktok:
          inputSocials.tiktok !== undefined
            ? safeUrl(inputSocials.tiktok)
            : safeUrl(currentSocials.tiktok),

        instagram:
          inputSocials.instagram !== undefined
            ? safeUrl(inputSocials.instagram)
            : safeUrl(currentSocials.instagram),

        telegram:
          inputSocials.telegram !== undefined
            ? safeUrl(inputSocials.telegram)
            : safeUrl(currentSocials.telegram),

        whatsapp:
          inputSocials.whatsapp !== undefined
            ? safeUrl(inputSocials.whatsapp)
            : safeUrl(currentSocials.whatsapp),

        youtube:
          inputSocials.youtube !== undefined
            ? safeUrl(inputSocials.youtube)
            : safeUrl(currentSocials.youtube),

        github:
          inputSocials.github !== undefined
            ? safeUrl(inputSocials.github)
            : safeUrl(currentSocials.github),
      },

      notifications: {
        title:
          inputNotifications.title !== undefined
            ? text(inputNotifications.title, 160)
            : text(currentNotifications.title, 160),

        message:
          inputNotifications.message !== undefined
            ? text(inputNotifications.message, 2000)
            : text(currentNotifications.message, 2000),

        enabled:
          inputNotifications.enabled !== undefined
            ? inputNotifications.enabled === true
            : currentNotifications.enabled === true,
      },

      type: "website",
      updatedAt: new Date(),
    };

    await db.collection("settings").updateOne(
      { type: "website" },
      {
        $set: update,
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
      settings: update,
    });
  } catch (error) {
    console.error("PUT SETTINGS ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error: "Failed to save settings",
        details:
          process.env.NODE_ENV === "development"
            ? message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
      }
