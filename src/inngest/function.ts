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

  return "sayan"
});
