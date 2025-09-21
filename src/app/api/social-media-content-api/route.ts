import { NextResponse } from "next/server";
import { geminiModel } from "../../../../AI/models/gemini-model";
import { openai } from "../../../../AI/models/open-router-sdk";

export const POST = async (req: any) => {
  const { prompt } = await req.json();
  try {
    const result = await geminiModel.sendMessage(prompt);
    const aiRes = result.response.text(); //json
    // const aires = await openai.chat.completions.create({
    //   model: "deepseek/deepseek-chat-v3.1:free",
    //   messages: [{ role: "user", content: prompt }],
    // });

    // const data = aires?.choices[0]?.message?.content;

    console.log(aiRes);
    return NextResponse.json(aiRes);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
