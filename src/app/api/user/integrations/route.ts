import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accounts = await db.account.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        platform: true,
        expiresAt: true,
        accountHandle: true,
        accountName: true,
        accountImage: true,
        accessToken: true,
      }
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Integrations fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider } = await req.json();
    if (!provider) {
        return NextResponse.json({ error: "Provider is required" }, { status: 400 });
    }

    await db.account.deleteMany({
      where: {
        userId: session.user.id,
        platform: provider,
      }
    });

    return NextResponse.json({ message: "Disconnected successfully" });
  } catch (error) {
    console.error("Disconnect error:", error);
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 });
  }
}
