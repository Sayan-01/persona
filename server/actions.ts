"use server";

import { db } from "@/lib/db";

export const IsUserEmailExist = async (email: string) => {
  const response = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (response) return true;
  else return false;
};

export const addInHistory = async (userId: string, contentId: string, contentTitle: string) => {
  await db.generatedContentHistory.create({
    data:{
      userId,
      contentId,
      contentTitle
    }
  })
};

export const getAllHistory = async (userId:string) => {
  const history = await db.generatedContentHistory.findMany({
    where:{
      userId
    },
    orderBy :{
      createdAt:"desc"
    }
  })
  return history;
}
