"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { inngest } from "@/inngest/client";

export const savePost = async (data: { 
  id?: string; 
  title: string; 
  platform: string; 
  body: string; 
  mediaIds?: string[];
  status?: "Draft" | "Scheduled" | "Published";
  scheduledAt?: Date;
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const postData = {
    title: data.title,
    body: data.body,
    platform: data.platform,
    userId: session.user.id,
    status: data.status || "Draft",
    scheduledAt: data.scheduledAt,
  };

  if (data.id) {
    const post = await db.content.upsert({
      where: { id: data.id },
      create: {
        ...postData,
        id: data.id,
        media: data.mediaIds ? {
          connect: data.mediaIds.map(id => ({ id }))
        } : undefined
      },
      update: {
        ...postData,
        media: data.mediaIds ? {
          set: data.mediaIds.map(id => ({ id }))
        } : undefined
      },
      include: { media: true }
    });
    revalidatePath("/dashboard/content");
    return post;
  } else {
    const post = await db.content.create({
      data: {
        ...postData,
        media: data.mediaIds ? {
          connect: data.mediaIds.map(id => ({ id }))
        } : undefined
      },
      include: { media: true }
    });
    revalidatePath("/dashboard/content");
    return post;
  }
};

export const saveAsDraft = async (data: { id: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.content.update({
    where: {
      id: data.id,
      userId: session.user.id,
    },
    data: {
      status: "Draft",
    },
  });

  revalidatePath("/dashboard/content");
  return true;
};

export async function publishPost(postId: string, platform: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized", success: false };
  }

  // Check if account is connected
  // Note: we check platform against our database. 
  // platform can be "facebook", "twitter", "linkedin", "instagram" etc.
  const account = await db.account.findFirst({
    where: { 
      userId: session.user.id, 
      platform: {
        contains: platform,
        mode: 'insensitive'
      }
    },
  });

  if (!account) {
    // Save as draft and notify user
    await db.content.update({
      where: { id: postId },
      data: { status: "Draft" },
    });
    return { 
      error: "ACCOUNT_NOT_CONNECTED", 
      message: `No ${platform} account connected. Post saved as draft.`,
      success: false 
    };
  }

  const post = await db.content.findUnique({
    where: { id: postId, userId: session.user.id },
    include: { media: true }
  });

  if (!post) {
    return { error: "Post not found", success: false };
  }

  try {
    // REAL POSTING LOGIC HERE (Simulated or actually implemented)
    // For now we simulate success
    console.log(`Publishing to ${platform}: ${post.body}`);
    
    // Update post status
    await db.content.update({
      where: { id: postId },
      data: {
        status: "Published",
        publishedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/content");
    return { success: true };
  } catch (error) {
    console.error(`Failed to publish to ${platform}:`, error);
    return { error: "Failed to publish", success: false };
  }
}

export async function schedulePost(postId: string, scheduledAt: Date) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const post = await db.content.update({
    where: { id: postId, userId: session.user.id },
    data: {
      status: "Scheduled",
      scheduledAt,
    },
  });

  await inngest.send({
    name: "post/scheduled",
    data: {
      postId: post.id,
      scheduledAt: scheduledAt.toISOString()
    }
  });

  revalidatePath("/dashboard/content");
  return post;
}

export async function getDrafts() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await db.content.findMany({
    where: { userId: session.user.id, status: "Draft" },
    include: { media: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getPostedContent() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await db.content.findMany({
    where: { userId: session.user.id, status: "Published" },
    include: { media: true },
    orderBy: { publishedAt: "desc" }
  });
}

export async function getScheduledContent() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await db.content.findMany({
    where: { userId: session.user.id, status: "Scheduled" },
    include: { media: true },
    orderBy: { scheduledAt: "asc" }
  });
}

export async function deletePost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.content.delete({
    where: { id: postId, userId: session.user.id },
  });

  revalidatePath("/dashboard/content");
}

export const getPostById = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await db.content.findUnique({
    where: { id, userId: session.user.id },
    include: { media: true }
  });
};
