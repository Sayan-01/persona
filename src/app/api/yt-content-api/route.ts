import { inngest } from "@/inngest/client";
import { getUserPersona } from "../../../../server/user-profile";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export const POST= async (req: Request) => {
    const body = await req.json();
    const session = await auth();
    const userId = session?.user?.id;
    const { userTitle, userDesc} = body;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!userTitle || !userDesc) {
        return NextResponse.json({ error: "Missing user title or description" }, { status: 400 });
    }

    const userPersonaDetails = await getUserPersona(userId);
    
    const result  = await inngest.send({
        name: "ai/generate-content",
        data: {
            userTitle,
            userDesc,
            userId,
            userPersonaDetails,
        },
    });

    return NextResponse.json({ runId: result.ids[0] });
}