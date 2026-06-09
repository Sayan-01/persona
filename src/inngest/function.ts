import { db } from "@/lib/db";
import ImageKit from "imagekit";
import { geminiModel } from "../../AI/models/gemini-model";
import { openai } from "../../AI/models/open-router-sdk";
import { YtContentGeneratePrompt } from "../../AI/YtContentGeneratePrompt";
import { inngest } from "./client";

import { xHelper } from "@/lib/platforms/oauth";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

async function publishPostCore(postId: string) {
  console.log("sayan-1");

  const post = await db.content.findUnique({
    where: { id: postId },
    include: { user: true, media: true },
  });

  if (!post || (post.status !== "Scheduled" && post.status !== "Published" && post.status !== "Draft")) {
    return {
      success: false,
      message: "Post not found or in invalid state",
    };
  }

  const platform = post.platform.toLowerCase();
  console.log("sayan-2", platform);

  if (platform === "twitter" || platform === "x") {
    try {
      const accounts = await db.account.findMany({
        where: {
          userId: post.userId,
          platform: { in: ["twitter", "x"] },
          accessToken: { not: null },
        },
        orderBy: { updatedAt: "desc" },
      });

      if (accounts.length === 0) {
        return {
          success: false,
          error: "ACCOUNT_NOT_CONNECTED",
          message: "X account not connected or token missing",
        };
      }

      let lastError = null;

      for (const account of accounts) {
        const now = Math.floor(Date.now() / 1000);
        let currentToken = account.accessToken;

        if (account.refreshToken && account.expiresAt && now >= account.expiresAt - 60) {
          console.log(`[Twitter] Token expired for ${account.accountHandle || account.id}, refreshing...`);

          try {
            const newTokens = await xHelper.refreshToken(account.refreshToken);

            await db.account.update({
              where: { id: account.id },
              data: {
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                expiresAt: newTokens.expiresAt,
              },
            });

            currentToken = newTokens.accessToken;
          } catch (refreshError) {
            console.error(`[Twitter] Failed to refresh token for ${account.accountHandle || account.id}:`, refreshError);

            continue;
          }
        }

        const response = await fetch("https://api.twitter.com/2/tweets", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: post.body,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("[Twitter] Post successful:", data.data?.id);

          await db.content.update({
            where: { id: postId },
            data: {
              status: "Published",
              publishedAt: new Date(),
            },
          });

          return { success: true, data };
        }

        console.error(`[Twitter Error] Account: ${account.accountHandle || account.id}`, data);

        lastError = data;

        if (data.title === "CreditsDepleted") {
          console.log(`[Twitter] Account ${account.accountHandle || account.id} out of credits, trying next...`);

          continue;
        }
      }

      await db.content.update({
        where: { id: postId },
        data: { status: "Draft" },
      });

      const message =
        lastError?.title === "CreditsDepleted" ? "All connected X accounts have exhausted their monthly post credits." : lastError?.detail || "Failed to post to X after trying all connected accounts";

      return {
        success: false,
        error: lastError?.title || "X_API_ERROR",
        message,
      };
    } catch (error) {
      console.error("[X Publish Catch]", error);

      await db.content.update({
        where: { id: postId },
        data: { status: "Draft" },
      });

      return {
        success: false,
        message: "An unexpected error occurred while publishing to X",
      };
    }
  }

  console.log(`[Publish] Logged: Post ${postId} published to ${post.platform}`);

  return {
    success: true,
    message: `Post logged for ${post.platform}`,
  };
}

/* =========================================================
   GENERATE THUMBNAIL
========================================================= */

export const GenerateThumbnail = inngest.createFunction(
  {
    id: "ai/generate-thumbnail",
    triggers: [{ event: "ai/generate-thumbnail" }],
  },
  async ({ event, step }) => {
    const { userInput, referanceImage, faceImage, userEmail } = event.data;

    const uploadImage = await step.run("UploadImage", async () => {
      const referanceImageUrl = await imagekit.upload({
        file: referanceImage.buffer,
        fileName: referanceImage.name,
        isPublished: true,
      });

      const faceImageUrl = await imagekit.upload({
        file: faceImage.buffer,
        fileName: faceImage.name,
        isPublished: true,
      });

      return {
        referanceImageUrl: referanceImageUrl.url,
        faceImageUrl: faceImageUrl.url,
      };
    });

    const generateThumbnailPrompt = await step.run("GeneratePrompt", async () => {
      const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.2-11b-vision-instruct:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: uploadImage
                  ? "Refering to this thumbnail url write a text prompt to generate a youtube thumbnail similer to the attach referance image with the 2nd attachment image face, folloing user input: " +
                    userInput +
                    ".Only give me text prompt."
                  : "Depends on user input write a text prompt to generate high quality professional Youtube thumbnail prompt according to the title. User input: " + userInput,
              },
              {
                type: "image_url",
                image_url: {
                  url: uploadImage.referanceImageUrl ?? "",
                },
              },
              {
                type: "image_url",
                image_url: {
                  url: uploadImage.faceImageUrl ?? "",
                },
              },
            ],
          },
        ],
      });

      return completion.choices[0].message.content;
    });

    return generateThumbnailPrompt;
  },
);

/* =========================================================
   POLAR WEBHOOK
========================================================= */

export const HandlePolarEvent = inngest.createFunction(
  {
    id: "polar/webhook.received",
    triggers: [{ event: "polar/webhook.received" }],
  },
  async ({ event, step }) => {
    console.log("polar webhook received");

    const type = event.data?.type;
    const subscriptionId = event.data?.data?.id;

    const customerEmail = event.data?.data?.customer?.email as string | undefined;

    if (!customerEmail || !subscriptionId) return;

    if (type === "subscription.created" || type === "subscription.renewed" || type === "subscription.updated") {
      const status = event.data?.data?.status;

      if (status !== "active") {
        console.log("Subscription is not active yet. Skipping credits.");

        return;
      }

      await step.run("add-credits", async () => {
        await db.user.update({
          where: { email: customerEmail },
          data: {
            credits: { increment: 1000 },
          },
        });
      });
    }
  },
);

/* =========================================================
   GENERATE YOUTUBE CONTENT
========================================================= */

export const HandleGenerateYtContent = inngest.createFunction(
  {
    id: "ai/generate-content",
    triggers: [{ event: "ai/generate-content" }],
  },
  async ({ event, step }) => {
    const { userTitle, userDesc, userId, userPersonaDetails } = event.data;

    return "sayan";
  },
);

/* =========================================================
   SCHEDULED POST
========================================================= */

export const HandleScheduledPost = inngest.createFunction(
  {
    id: "post/scheduled-post",
    triggers: [{ event: "post/scheduled" }],
  },
  async ({ event, step }) => {
    const { postId, scheduledAt } = event.data;

    if (!scheduledAt || isNaN(new Date(scheduledAt).getTime())) {
      throw new Error("Invalid scheduledAt");
    }

    await step.sleepUntil("wait-for-schedule", scheduledAt);

    return await step.run("scheduled-publish", async () => {
      return await publishPostCore(postId);
    });
  },
);

/* =========================================================
   INSTANT PUBLISH
========================================================= */

export const HandlePublishPost = inngest.createFunction(
  {
    id: "post/publish",
    triggers: [{ event: "post/publish" }],
  },
  async ({ event, step }) => {
    const { postId } = event.data;

    return await step.run("instant-publish", async () => {
      return await publishPostCore(postId);
    });
  },
);

export const HandlePublishPost2 = inngest.createFunction(
  {
    id: "post/publish2",
    triggers: [{ event: "post/publish2" }],
  },
  async ({ event, step }) => {
    const { postId } = event.data;

    return await step.run("instant-publish", async () => {
      return await publishPostCore(postId);
    });
  },
);

export const demoPart = () => {};
