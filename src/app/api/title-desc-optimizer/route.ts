import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { geminiModel } from "../../../../AI/models/gemini-model";
import { auth } from "../../../../auth";
import { getUserPersona } from "../../../../server/user-profile";
import { YtTitleDescOptimizerPrompt } from "../../../../AI/TitleDescOptimizer";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    const { userTitle, userDesc } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!userTitle || !userDesc) {
      return NextResponse.json({ error: "Missing user title or description" }, { status: 400 });
    }

    const userPersonaDetails = await getUserPersona(userId);

    const prompt = YtTitleDescOptimizerPrompt({
      title: userTitle,
      description: userDesc,
      userPersona: userPersonaDetails,
    });

    const result = await geminiModel.sendMessage(prompt);
    const aiRes = result.response.text(); //json

    let parsedRes: any;
    try {
      parsedRes = JSON.parse(aiRes);
    } catch (error) {
      console.error("AI response parse error:", error);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }

    await db.ytContent.create({
      data: {
        userId,
        content: parsedRes,
      },
    });

    return NextResponse.json({ success: true, data: aiRes }, { status: 200 });
  } catch (error: any) {
    console.error("POST /yt-content error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
