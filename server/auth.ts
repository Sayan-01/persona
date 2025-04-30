"use server";

import { signIn, signOut } from "../auth";
import { sendOtpViaNodeMailer } from "@/lib/sendOtpViaNodeMailer";


export const Goo_login = async () => {
  await signIn("google");
};

export const Git_login = async () => {
  await signIn("github");
};

export const Sign_Out = async () => {
  await signOut();
};


export const sendCodeThroughNodemailer = async (email: string, username: string, otp: string) => {
  const emailRes = await sendOtpViaNodeMailer(email, username, otp);
  if (emailRes) {
    return { success: true, message: "Email error is", status: 200 };
  } else return { success: false, message: "Email error is", status: 500 };
};