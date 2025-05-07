"use server";
import { db } from "@/lib/db";
import { determineStyleFromTone, generateAIPreferences } from "@/utils/helper";
import { v4 } from "uuid";
import { auth } from "../auth";

interface OnboardingData {
  userId: string;
  tone: string;
  industry: string;
  specialization: string;
  targetAudience: string;
  usp: string;
  contentGoals: string[];
  sampleContent: string;
}

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

export const upsertOnboardingProfile = async (data: OnboardingData) => {
  const { userId, tone, industry, specialization, targetAudience, usp, contentGoals, sampleContent } = data;  

  try {
    const profile = await (db as any).profile.create({
     
      data: {
        id: v4(),
        userId: userId,
        industry: industry || null,
        specialization: specialization || null,
        targetAudience: targetAudience || null,
        usp: usp || null,
        contentGoals: contentGoals || [],
        sampleContent: sampleContent || null,
      },
    });

    const preferences = generateAIPreferences(tone, industry);

    const aiPersona = await (db as any).AIPersona.upsert({
      where: {
        userId: userId,
      },
      update: {
        tone: [tone],
        style: determineStyleFromTone(tone),
        preferences: preferences as unknown,
      },
      create: {
        id: v4(),
        userId: userId,
        tone: [tone],
        style: determineStyleFromTone(tone),
        preferences: preferences as unknown,
      },
    });

    // Mark user as onboarded
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return { profile, aiPersona };
  } catch (error) {
    console.error("Error in updateOnboardingProfile:", error);
    throw new Error("Failed to update profile and AI persona");
  }
};

export const updateAIPersonaPreferences = async (userId: string, preferences: Partial<AIPersonaPreferences>) => {
  try {
    const aiPersona = await (db as any).AIPersona.update({
      where: {
        userId: userId,
      },
      data: {
        preferences: preferences as unknown,
      },
    });

    return aiPersona;
  } catch (error) {
    console.error("Error in updateAIPersonaPreferences:", error);
    throw new Error("Failed to update AI persona preferences");
  }
};

export const getUserAIPersona = async (userId: string) => {
  try {
    const aiPersona = await (db as any).AIPersona.findUnique({
      where: { userId },
    });
    return aiPersona;
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
        accounts: true
      }
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