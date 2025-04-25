import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

// Types for our actions
interface OnboardingData {
  userId: string;
  tone: string;
  toneNotes?: string;
  industry?: string;
  targetAudience?: string[];
  contentGoals?: string[];
  sampleContent?: string;
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface IndustryTerms {
    preferred: string[];
    avoid: string[];
}

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
  industryTerms?:any
}

// Create or update user's Profile and AIPersona during onboarding
export async function upsertOnboardingProfile(data: OnboardingData) {
  const { userId, tone, toneNotes, industry, targetAudience, contentGoals, sampleContent } = data;

  try {
    const profile = await (db as any).profile.upsert({
      where: {
        userId: userId,
      },
      update: {
        industry: industry || null,
        targetAudience: targetAudience || [],
        contentGoals: contentGoals || [],
        writingTone: tone || null,
        sampleContent: sampleContent || null,
      },
      create: {
        userId: userId,
        industry: industry || null,
        targetAudience: targetAudience || [],
        contentGoals: contentGoals || [],
        writingTone: tone || null,
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
        preferences: preferences as unknown as Prisma.JsonObject,
      },
      create: {
        userId: userId,
        tone: [tone],
        style: determineStyleFromTone(tone),
        preferences: preferences as unknown as Prisma.JsonObject,
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
}

// Helper function to determine writing style based on tone
function determineStyleFromTone(tone: string): string[] {
  switch (tone) {
    case "professional":
      return ["formal", "analytical", "data-driven"];
    case "conversational":
      return ["informal", "engaging", "natural"];
    case "educational":
      return ["structured", "clear", "explanatory"];
    case "persuasive":
      return ["compelling", "action-oriented", "convincing"];
    case "empathetic":
      return ["supportive", "understanding", "compassionate"];
    default:
      return ["balanced", "neutral"];
  }
}

// Helper function to generate AI preferences based on tone and industry
function generateAIPreferences(tone: string, industry?: string) {
  const basePreferences = {
    language: {
      primary: "en-US",
      level: "professional",
    },
    content: {
      minLength: 300,
      maxLength: 1500,
      useEmojis: false,
      formatting: {
        useBulletPoints: true,
        useStatistics: true,
        citationStyle: "apa",
      },
    },
  };

  // Customize preferences based on tone
  const preferences = { ...basePreferences };
  
  switch (tone) {
    case "professional":
      preferences.content.minLength = 400;
      preferences.content.maxLength = 2000;
      preferences.language.level = "advanced";
      break;
    case "conversational":
      preferences.content.minLength = 200;
      preferences.content.maxLength = 1000;
      preferences.content.useEmojis = true;
      preferences.language.level = "conversational";
      break;
    case "educational":
      preferences.content.minLength = 600;
      preferences.content.maxLength = 2500;
      preferences.language.level = "technical";
      break;
    case "persuasive":
      preferences.content.minLength = 300;
      preferences.content.maxLength = 1500;
      preferences.language.level = "persuasive";
      break;
    case "empathetic":
      preferences.content.minLength = 250;
      preferences.content.maxLength = 1200;
      preferences.language.level = "supportive";
      break;
  }

  // Add industry-specific preferences if industry is provided
  if (industry) {
    const industryTerms: IndustryTerms = {
      preferred: [],
      avoid: [],
    };
    
    // Add industry-specific terminology (example for technology industry)
    if (industry === "technology") {
      industryTerms.preferred = [
        "innovation",
        "solution",
        "platform",
        "scalable",
        "efficient",
      ];
    }

    return {
      ...preferences,
      industryTerms,
    };
  }

  return preferences;
}

// Get user's complete profile including AI Persona
export async function getUserProfile(userId: string) {
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
}

// Update specific AI Persona preferences
export async function updateAIPersonaPreferences(
  userId: string,
  preferences: Partial<AIPersonaPreferences>
) {
  try {
    const aiPersona = await (db as any).AIPersona.update({
      where: {
        userId: userId,
      },
      data: {
        preferences: preferences as unknown as Prisma.JsonObject,
      },
    });

    return aiPersona;
  } catch (error) {
    console.error("Error in updateAIPersonaPreferences:", error);
    throw new Error("Failed to update AI persona preferences");
  }
}