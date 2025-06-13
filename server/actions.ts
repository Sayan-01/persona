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

export const addInHistory = async (userId: string, content:any) => {
  // await db.generatedContentHistory.create({
  //   data:{
  //     userId,
  //     contentId: 
  //   }
  // })
  console.log(content);
  
}
