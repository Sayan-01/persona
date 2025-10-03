import { NextResponse } from "next/server";
import { geminiModel } from "../../../../AI/models/gemini-model";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const aiRes = await geminiModel.sendMessage(prompt);
    const result = aiRes.response.text(); //json
    

    return NextResponse.json({ result }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || "Unexpected error" }, { status: 500 });
  }
}
