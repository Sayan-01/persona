'use server'
import { sendOtpViaNodeMailer } from "@/lib/sendOtpViaNodeMailer";

export const sendCodeThroughNodemailer = async (email: string, username: string, otp: string) => {
  const emailRes = await sendOtpViaNodeMailer(email, username, otp);
  if (emailRes) {
    return { success: true, message: "Email error is", status: 200 };
  } else return { success: false, message: "Email error is", status: 500 };
};
