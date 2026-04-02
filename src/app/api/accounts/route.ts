import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const accounts = await db.account.findMany({
            where: {
                userId: session.user.id
            }
        });
        return NextResponse.json(accounts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
    }
}