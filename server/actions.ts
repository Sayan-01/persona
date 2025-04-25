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

export const getBalances = async (userId: string) => {
  const userBalances = await db.balance.findMany({
    where: {
      userId
    }
  })
  return userBalances
}

export const createContact = async (data: any, userId: string) => {  
  const newContact = await db.contact.create({
    data: {
      userId: userId,
      ...data
    }
  })
  return newContact
}

export const getAllcontacts = async(userId: string) =>{
  const contacts = await db.contact.findMany({
    where: {
      userId: userId,
    },
    include: {
      transactions: true,
    },
  });
  
  return contacts
}