import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "No userId provided" }, { status: 400 });

    const user = await db.user.findUnique({
      where: { id: session?.user?.id },
      select: { credits: true },
    });

    return NextResponse.json({ credits: user?.credits ?? 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, amount } = body;
    if (!userId || !amount) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const user = await db.user.update({
      where: { id: userId },
      data: {
        credits: { decrement: amount },
      },
    });

    return NextResponse.json({ credits: user.credits });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to decrement credits" }, { status: 500 });
  }
}
