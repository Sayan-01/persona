import { NextResponse } from "next/server";
import { signIn } from "../../../../../auth";
import { db } from "@/lib/db";
import { getUserOnboardInfo } from "../../../../../server/user-profile";

export const POST = async (req:any) => {
  let { email, password } = await req.json();
  try {
    const user = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!user) {
      return NextResponse.json({ message: "Email or password is incorrect" }, { status: 400 });
    }
    const onboardUser = await getUserOnboardInfo(email);
    console.log(onboardUser);
    
    return NextResponse.json({ message: "User login", onboardUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Email or password is incorrect" }, { status: 400 });
  }
};
