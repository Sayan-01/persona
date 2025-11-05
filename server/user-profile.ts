"use server";
import { db } from "@/lib/db";
import { determineStyleFromTone, generateAIPreferences } from "@/utils/helper";
import { v4 } from "uuid";
import { auth } from "../auth";
import { UserPersona } from "../types";
import { revalidatePath } from "next/cache";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface AIPersonaPreferences {
  [key: string]: JsonValue;
  language: {
    primary: string;
    level: string;
  };
  content: {
    minLength: number;
    maxLength: number;
    useEmojis: boolean;
    formatting: {
      useBulletPoints: boolean;
      useStatistics: boolean;
      citationStyle: string;
    };
  };
  industryTerms?: any;
}

export const upsertOnboardingUserPersona = async (data: UserPersona & { userId: string }) => {
  const { userId, tone, industry, brandDetails, targetAudience, usp, contentGoals, sampleContent } = data;

  try {
    const userPersona = await db.userPersona.create({
      data: {
        id: v4(),
        userId: userId,
        tone: tone,
        industry: industry,
        brandDetails: brandDetails,
        targetAudience: targetAudience || undefined,
        usp: usp,
        contentGoals: contentGoals,
        sampleContent: sampleContent,
        style: [],
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        updatedAt: new Date(),
        onBoarded: true,
      },
    });

    return { userPersona };
  } catch (error) {
    console.error("Error in upsertOnboardingAiPersona:", error);
    throw new Error("Failed to create / update your AI persona");
  }
};

export const getUserPersona = async (userId: string) => {
  try {
    const userPersona = await db.userPersona.findUnique({
      where: { userId },
    });
    if (!userPersona) {
      throw new Error("User not found");
    }
    return userPersona;
  } catch (error) {
    console.error("Error in getUserAIPersona:", error);
    throw new Error("Failed to fetch user AI persona");
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userProfile = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userProfile) {
      throw new Error("User not found");
    }

    // Fetch profile and AI persona separately
    const profile = await (db as any).profile.findUnique({
      where: { userId },
    });

    const aiPersona = await (db as any).AIPersona.findUnique({
      where: { userId },
    });

    return {
      ...userProfile,
      profile,
      aiPersona,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

export const getUserInfo = async () => {
  const session = await auth();

  try {
    const userProfile = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        accounts: true,
      },
    });

    if (!userProfile) {
      throw new Error("User not found");
    }

    return userProfile;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw new Error("Failed to fetch user info");
  }
};

export const getUserOnboardInfo = async (email: string) => {

  try {
    const userProfile = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        onBoarded: true,
      },
    });

    if (!userProfile) {
      throw new Error("User not found");
    }

    return userProfile;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw new Error("Failed to fetch user info");
  }
};

export const updateUserInfo = async (userId: string, data: any) => {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath("/dashboard/settings");
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUserInfo:", error);
    throw new Error("Failed to update user info");
  }
};

export const updateUserPersona = async (userId: string, data: any) => {
  try {
    const updatedUserPersona = await db.userPersona.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
    revalidatePath("/dashboard/settings");
    return updatedUserPersona;
  } catch (error) {
    console.error("Error in updateUserPersona:", error);
    throw new Error("Failed to update user persona");
  }
};