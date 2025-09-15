"use server";
import { db } from "@/lib/db";
import { determineStyleFromTone, generateAIPreferences } from "@/utils/helper";
import { v4 } from "uuid";
import { auth } from "../auth";
import { UserPersona } from "../types";

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
        style: []
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        updatedAt: new Date(),
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
