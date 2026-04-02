// d:\SAYAN-X\abc\persona-ai\src\app\api\oauth\[platform]\route.ts

import { NextRequest, NextResponse } from "next/server";
import { xHelper } from "@/lib/platforms/oauth";
import { cookies } from "next/headers";
import { auth } from "../../../../../auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }, // Better typing
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }
  const { platform } = await params;
  const cookieStore = await cookies();

  if (platform === "twitter") {
    // Generate a random state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15);

    // Store state in a secure, HTTP-only cookie
    cookieStore.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    const authUrl = xHelper.getAuthUrl(state);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.json({ error: "Platform not supported" }, { status: 400 });
}
