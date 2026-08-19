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

const socialKeys = [
  "tiktok",
  "instagram",
  "telegram",
  "whatsapp",
  "youtube",
  "github",
] as const;

function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanUrl(value: unknown): string {
  const raw = cleanText(value, 2048);

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
}

function objectValue(value: unknown): Record<string, unknown> {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>;
  }

  return {};
}

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
            ...defaultSettings,
            type: "website",
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return NextResponse.json(defaultSettings);
    }

    const data = { ...settings } as Record<string, unknown>;

    delete data._id;
    delete data.type;
    delete data.updatedAt;

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

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON request",
        },
        {
          status: 400,
        }
      );
    }

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
    const collection = db.collection("settings");

    const existing = await collection.findOne({
      type: "website",
    });

    const current =
      (existing as Record<string, unknown> | null) ||
      defaultSettings;

    const currentProfile = objectValue(current.profile);
    const currentMedia = objectValue(current.media);
    const currentSocials = objectValue(current.socials);
    const currentNotifications =
      objectValue(current.notifications);

    const inputProfile = objectValue(input.profile);
    const inputMedia = objectValue(input.media);
    const inputSocials = objectValue(input.socials);
    const inputNotifications =
      objectValue(input.notifications);

    const socials: Record<string, string> = {};

    for (const key of socialKeys) {
      if (inputSocials[key] !== undefined) {
        const value = cleanUrl(inputSocials[key]);

        if (inputSocials[key] && !value) {
          return NextResponse.json(
            {
              error: `Invalid ${key} URL. Use a valid HTTPS URL.`,
            },
            {
              status: 400,
            }
          );
        }

        socials[key] = value;
      } else {
        socials[key] = cleanUrl(
          currentSocials[key]
        );
      }
    }

    const update = {
      type: "website",

      profile: {
        name:
          inputProfile.name !== undefined
            ? cleanText(inputProfile.name, 80) ||
              "Vexdou"
            : cleanText(currentProfile.name, 80) ||
              "Vexdou",

        description:
          inputProfile.description !== undefined
            ? cleanText(
                inputProfile.description,
                300
              )
            : cleanText(
                currentProfile.description,
                300
              ),

        photo:
          inputProfile.photo !== undefined
            ? cleanText(
                inputProfile.photo,
                2048
              ) || "/profile.jpg"
            : cleanText(
                currentProfile.photo,
                2048
              ) || "/profile.jpg",
      },

      about:
        input.about !== undefined
          ? cleanText(input.about, 5000)
          : cleanText(current.about, 5000),

      media: {
        backgroundVideo:
          inputMedia.backgroundVideo !== undefined
            ? cleanText(
                inputMedia.backgroundVideo,
                2048
              )
            : cleanText(
                currentMedia.backgroundVideo,
                2048
              ) || "/background.mp4",

        music:
          inputMedia.music !== undefined
            ? cleanText(
                inputMedia.music,
                2048
              )
            : cleanText(
                currentMedia.music,
                2048
              ) || "/music.mp3",
      },

      socials,

      notifications: {
        title:
          inputNotifications.title !== undefined
            ? cleanText(
                inputNotifications.title,
                160
              )
            : cleanText(
                currentNotifications.title,
                160
              ),

        message:
          inputNotifications.message !== undefined
            ? cleanText(
                inputNotifications.message,
                2000
              )
            : cleanText(
                currentNotifications.message,
                2000
              ),

        enabled:
          inputNotifications.enabled !== undefined
            ? inputNotifications.enabled === true
            : currentNotifications.enabled === true,
      },

      updatedAt: new Date(),
    };

    await collection.updateOne(
      {
        type: "website",
      },
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
    });
  } catch (error) {
    console.error(
      "PUT SETTINGS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Database error while saving settings",
      },
      {
        status: 500,
      }
    );
  }
}
