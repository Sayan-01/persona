import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  
  const { username, email, password, otp, expires } = await req.json();
  console.log(username, email, password, otp, expires);
  
  let hashPass = await bcrypt.hash(password, 10);
  const newUser = await db.user.create({
    data: {
      name: username,
      email,
      password: hashPass, // Assuming password hashing is done before this step
      varifiedToken: otp, // Ensure field names match Prisma schema
      varifiedTokenExpire: expires,
      isVarified: true,
    },
  });
  if (newUser) {
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } else {
    console.log("user creation failed");
    
    return NextResponse.json({ message: "User creation failed" }, { status: 500 });
  }
};
