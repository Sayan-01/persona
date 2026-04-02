//handle callback and store tokens
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { xHelper } from "@/lib/platforms/oauth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ platform: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  const { platform } = await params;
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }


  try {
    if (platform === "twitter") {
      const tokens = await xHelper.exchangeCode(code, state || undefined);

      const existingAccount = await db.account.findFirst({
        where: {
          userId: session.user.id,
          platform: "twitter"
        }
      });

      if (existingAccount) {
        await db.account.update({
          where: { id: existingAccount.id },
          data: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresAt: tokens.expiresAt,
            accountHandle: tokens.accountHandle,
            accountName: tokens.accountName,
            accountImage: tokens.accountImage,
          }
        });
      } else {
        await db.account.create({
          data: {
            userId: session.user.id,
            platform: "twitter",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresAt: tokens.expiresAt,
            accountHandle: tokens.accountHandle,
            accountName: tokens.accountName,
            accountImage: tokens.accountImage,
          }
        });
      }

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL_NGROK}/dashboard/integration?status=success`);
    }
  } catch (error: any) {
    console.error("OAuth error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Platform not supported" }, { status: 400 });
}