"use server";

import { db } from "@/lib/db";
import { platform } from "os";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { postToFacebook } from "@/lib/facebook";
import { postToTwitter } from "@/lib/twitter";

export async function saveAsDraft(data: { title: string; body: string; platform: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.content.create({
    data: {
      title: data.title,
      body: data.body,
      status: "Draft",
      platform: data.platform,
      userId: session.user.id,
    },
  });
  
  revalidatePath("/dashboard");
  return true;
}

export async function publishPost(postId: string, platform: "facebook" | "twitter") {
  const session = await auth();
  const post = await db.content.findUnique({
    where: { id: postId, userId: session?.user?.id },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    // Post to social media
    if (platform === "facebook") {
      await postToFacebook(post.body, session.user.accessToken);
    } else {
      await postToTwitter(post.body, session.user.accessToken);
    }

    // Update post status
    await db.content.update({
      where: { id: postId },
      data: {
        status: "Published",
        platform,
        publishedAt: new Date(),
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(`Failed to publish to ${platform}:`, error);
    throw error;
  }
}

export async function schedulePost(postId: string, scheduledAt: Date) {
  const session = await auth();

  await db.content.update({
    where: { id: postId, userId: session?.user?.id },
    data: {
      status: "Scheduled",
      scheduledAt,
    },
  });

  revalidatePath("/dashboard");
}

export async function getDrafts() {
  const session = await auth();

  const drafts = await db.content.findMany({
    where: { userId: session?.user?.id, status: "Draft" },
  });

  return drafts;
}

export async function getPostedContent() {
  const session = await auth();

  const postedContent = await db.content.findMany({
    where: { userId: session?.user?.id, status: "Published" },
  });

  return postedContent;
}

export async function getScheduledContent() {
  const session = await auth();

  const scheduledContent = await db.content.findMany({
    where: { userId: session?.user?.id, status: "Scheduled" },
  });

  return scheduledContent;
}

export async function deleteDraft(postId: string) {
  const session = await auth();

  await db.content.delete({
    where: { id: postId, userId: session?.user?.id, status: "Draft" },
  });

  revalidatePath("/dashboard");
}
