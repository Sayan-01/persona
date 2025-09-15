import { geminiModel } from "../../AI/models/gemini-model";
import YtThumnailPrompt from "../../AI/YtThumnailPrompt";
import { inngest } from "./client";
import ImageKit from "imagekit";
import { openai } from "../../AI/models/open-router-sdk";

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
