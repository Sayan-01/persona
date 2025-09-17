// api/webhook/polar/route.ts
import { inngest } from "@/inngest/client";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    /// 📝 এখানে Inngest event পাঠাচ্ছি
    await inngest.send({
      name: "polar/webhook.received",
      id: crypto.randomUUID(),
      data: payload,
    });
  },
});
