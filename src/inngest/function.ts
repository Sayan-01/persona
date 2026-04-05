import { db } from "@/lib/db";
import ImageKit from "imagekit";
import { geminiModel } from "../../AI/models/gemini-model";
import { openai } from "../../AI/models/open-router-sdk";
import { YtContentGeneratePrompt } from "../../AI/YtContentGeneratePrompt";
import { inngest } from "./client";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

import { xHelper } from "@/lib/platforms/oauth";

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
      let account = await db.account.findFirst({
        where: {
          userId: post.userId,
          platform: { in: ["twitter", "x"] },
        },
      });

      if (!account || !account.accessToken) {
        return { success: false, error: "ACCOUNT_NOT_CONNECTED", message: "X account not connected or token missing" };
      }

      // 🔄 Check if token is expired (X tokens expire every 2 hours)
      const now = Math.floor(Date.now() / 1000);
      let currentToken = account.accessToken;

      if (account.refreshToken && account.expiresAt && now >= account.expiresAt - 60) {
        console.log("[Twitter] Token expired, refreshing...");
        try {
          const newTokens = await xHelper.refreshToken(account.refreshToken);

          // Update database with new tokens
          const updatedAccount = await db.account.update({
            where: { id: account.id },
            data: {
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
              expiresAt: newTokens.expiresAt,
            },
          });

          currentToken = newTokens.accessToken;
          console.log("[Twitter] Token refreshed successfully.");
        } catch (refreshError) {
          console.error("[Twitter] Failed to refresh token:", refreshError);
          return { success: false, error: "TOKEN_REFRESH_FAILED", message: "Failed to refresh X token. Please reconnect your account." };
        }
      }

      console.log("sayan-3", currentToken);
      

      const response = await fetch("https://api.x.com/2/tweets", {
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
      console.log("sayan-4", data);
      

      if (!response.ok) {
        console.error("[Twitter Error]", data);
        // Revert status to Draft so user can try again
        await db.content.update({
          where: { id: postId },
          data: { status: "Draft" },
        });
        return { success: false, error: data.title || "X_API_ERROR", message: data.detail || "Failed to post to X" };
      }

      console.log("sayan-5");
      

      // 🚀 Success! Update status to Published
      await db.content.update({
        where: { id: postId },
        data: {
          status: "Published",
          publishedAt: new Date(),
        },
      });

      console.log(`[Publish] Post ${postId} successfully published to X`);
      return { success: true, data };
    } catch (error) {
      console.error("[X Publish Catch]", error);
      // Revert status to Draft on unexpected error
      await db.content.update({
        where: { id: postId },
        data: { status: "Draft" },
      });
      return { success: false, message: "An unexpected error occurred while publishing to X" };
    }
  }

  console.log(`[Publish] Logged: Post ${postId} published to ${post.platform} (API integration pending for this platform)`);
  return { success: true, message: `Post logged for ${post.platform}` };
}

export const GenerateThumbnail = inngest.createFunction({ id: "ai/generate-thumbnail" }, { event: "ai/generate-thumbnail" }, async ({ event, step }) => {
  const { userInput, referanceImage, faceImage, userEmail } = event.data;

  //upload image to cloud/ imagekit

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
    return { referanceImageUrl: referanceImageUrl.url, faceImageUrl: faceImageUrl.url };
  });
  //generate ai prompt for ai model

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
                  ".Only gime me text prompt. No other comment text"
                : "Depends on user input write a text prompt to generate high quality professional Youtube thumbnail prompt and add icons, illustration and other elements to make it more engaging according to the title. User input: " +
                  userInput +
                  ".Only gime me text prompt. No other comment text",
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

  //generate thumbnail

  //save image to database

  //return thumbnail

  return generateThumbnailPrompt;
});

export const HandlePolarEvent = inngest.createFunction({ id: "polar/webhook.received" }, { event: "polar/webhook.received" }, async ({ event, step }) => {
  console.log("polar webhook received");

  const type = event.data?.type;
  const subscriptionId = event.data?.data?.id; // subscription ID
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
        where: { email: customerEmail as string },
        data: {
          credits: { increment: 1000 },
        },
      });
    });
  }
});

export const HandleGenerateYtContent = inngest.createFunction({ id: "ai/generate-content" }, { event: "ai/generate-content" }, async ({ event, step }) => {
  const { userTitle, userDesc, userId, userPersonaDetails } = await event.data;

  //generate ai content
  // const generateAiContent = await step.run("GenerateAiContent", async () => {
  //   const prompt = YtContentGeneratePrompt({
  //     title: userTitle,
  //     description: userDesc,
  //     userPersona: userPersonaDetails,
  //   });
  //   const result = await geminiModel.sendMessage(prompt);
  //   const aiRes = result.response.text(); //json

  //   let parsedRes;
  //   try {
  //     parsedRes = JSON.parse(aiRes); //object
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return parsedRes;

  // });

  // const saveContentOnDb = await step.run("SaveContentOnDb", async () => {
  //   const result = await db.ytContent.create({
  //     data: {
  //       userId: userId,
  //       content: generateAiContent,
  //     }
  //   })
  //   return result;
  // })

  // return saveContentOnDb;

  return "sayan";
});

export const HandleScheduledPost = inngest.createFunction({ id: "post/scheduled-post" }, { event: "post/scheduled" }, async ({ event, step }) => {
  const { postId, scheduledAt } = event.data;

  // 🛑 Validate date
  if (!scheduledAt || isNaN(new Date(scheduledAt).getTime())) {
    throw new Error("Invalid scheduledAt");
  }

  // ⏳ Wait until scheduled time
  await step.sleepUntil("wait-for-schedule", scheduledAt);

  // 🚀 Publish
  return await step.run("scheduled-publish", async () => {
    return await publishPostCore(postId);
  });
});

export const HandlePublishPost = inngest.createFunction({ id: "post/publish" }, { event: "post/publish" }, async ({ event, step }) => {
  const { postId } = event.data;

  return await step.run("instant-publish", async () => {
    return await publishPostCore(postId);
  });
});
