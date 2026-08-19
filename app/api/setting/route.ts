import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const defaultSettings = {
  profile: {
    name: "Vexdou",
    description: "Building ideas into reality.",
    photo: "/profile.jpg",
  },

  about:
    "Welcome to my personal digital space.",

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

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("vexdou");

    const settings = await db
      .collection("settings")
      .findOne({ type: "website" });

    if (!settings) {
      await db.collection("settings").insertOne({
        type: "website",
        ...defaultSettings,
        updatedAt: new Date(),
      });

      return NextResponse.json(defaultSettings);
    }

    const { _id, type, ...data } = settings;

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;

    const db = client.db("vexdou");

    await db.collection("settings").updateOne(
      { type: "website" },
      {
        $set: {
          ...body,
          type: "website",
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error("PUT SETTINGS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
