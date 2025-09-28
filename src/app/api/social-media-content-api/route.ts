import { NextResponse } from "next/server";
import { geminiModel } from "../../../../AI/models/gemini-model";
import { openai } from "../../../../AI/models/open-router-sdk";

export const POST = async (req: any) => {
  const { prompt } = await req.json();
  try {    
    const result = await geminiModel.sendMessage(prompt);
    const aiRes = result.response.text(); //json

    return NextResponse.json(aiRes);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
