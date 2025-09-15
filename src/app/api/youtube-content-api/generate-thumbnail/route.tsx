import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { inngest } from "@/inngest/client";
import { File } from "buffer";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  
  try {
    const userInput = formData.get("userInput") as string | null  ;
    const referanceImage = formData.get("referanceImage") as File | null;
    const faceImage = formData.get("faceImage") as File | null;
    const session = await auth();

    const inngestInputData = {
      userInput: userInput,
      referanceImage: referanceImage ? await getFileBufferData(referanceImage) : null,
      faceImage: faceImage ? await getFileBufferData(faceImage) : null,
      userEmail: session?.user?.email,
    };

    const result = await inngest.send({
      name: "ai/generate-thumbnail",
      data: inngestInputData,
    });

    
    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error})
  }
};

const getFileBufferData = async (file: File) => {
  
  const xyz = await file.arrayBuffer();
  const buffer = Buffer.from(xyz);
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    buffer: buffer.toString("base64"),
  };
};