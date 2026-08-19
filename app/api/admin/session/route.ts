import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();

    return NextResponse.json({
      authenticated,
    });
  } catch (error) {
    console.error("SESSION CHECK ERROR:", error);

    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 200,
      }
    );
  }
}
