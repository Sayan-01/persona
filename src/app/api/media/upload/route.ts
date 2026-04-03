import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imagekit } from "@/lib/imagekit";
import { auth } from "../../../../../auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: file.name,
      folder: "/uploads",
      tags: ["persona-ai", session.user.id],
    });

    // Store in Media table
    const media = await db.media.create({
      data: {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
        name: uploadResponse.name,
        type: uploadResponse.fileType || "image",
        size: uploadResponse.size,
        userId: session.user.id,
      },
    });

    return NextResponse.json(media);
  } catch (error: any) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload media" }, { status: 500 });
  }
}
