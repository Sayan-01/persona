import { inngest } from "@/inngest/client";
import { GenerateThumbnail, HandlePolarEvent, HandleGenerateYtContent, HandleScheduledPost, HandlePublishPost } from "@/inngest/function";
import { serve } from "inngest/next";


// Create an API that serves the functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [GenerateThumbnail, HandlePolarEvent, HandleGenerateYtContent, HandleScheduledPost, HandlePublishPost],
});
