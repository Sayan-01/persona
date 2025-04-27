"use server"

import { db } from "@/lib/db"

export const IsUserEmailExist = async (email: string) => {
  const response = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (response) return true;
  else return false;
};
