import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";

/**
 * DELETE /api/accounts/[id]
 * Deletes an external integration account completely from the database.
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Verify ownership and existence
        const account = await db.account.findFirst({
            where: { 
                id, 
                userId: session.user.id 
            }
        });

        if (!account) {
            return NextResponse.json({ error: "Account not found or unauthorized" }, { status: 404 });
        }

        await db.account.delete({
            where: { id }
        });

        return NextResponse.json({ 
            success: true,
            message: "Account deleted successfully" 
        });
    } catch (error) {
        console.error("Account delete error:", error);
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}

/**
 * PATCH /api/accounts/[id]
 * Disconnects an account by clearing OAuth tokens but keeping the record metadata.
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        
        // If they didn't specify an action, we assume they want to disconnect
        // Alternatively, we could strictly check for { action: 'disconnect' }
        
        // Verify ownership and existence
        const account = await db.account.findFirst({
            where: { 
                id, 
                userId: session.user.id 
            }
        });

        if (!account) {
            return NextResponse.json({ error: "Account not found or unauthorized" }, { status: 404 });
        }

        // Disconnect logic: clear tokens and expiration
        await db.account.update({
            where: { id },
            data: {
                accessToken: null,
                refreshToken: null,
                expiresAt: null
            }
        });

        return NextResponse.json({ 
            success: true,
            message: "Account disconnected successfully" 
        });
    } catch (error) {
        console.error("Account disconnect error:", error);
        return NextResponse.json({ error: "Failed to disconnect account" }, { status: 500 });
    }
}