export enum ContactType {
  PAYER = "PAYER",
  PAYEE = "PAYEE",
  BOTH = "BOTH",
}

export type UserProfile = {
  industry: string;
  targetAudience: string;
  contentGoals: string[];
  sampleContent: string;
}

interface AIPreferencesFormatting {
  useBulletPoints: boolean;
  useStatistics: boolean;
  citationStyle: string;
}

interface AIPreferencesContent {
  minLength: number;
  maxLength: number;
  useEmojis: boolean;
  formatting: AIPreferencesFormatting;
}

interface AIPreferencesLanguage {
  primary: string;
  level: string;
}

interface AIPreferences {
  language: AIPreferencesLanguage;
  content: AIPreferencesContent;
}

export type IdeaGeneratePromptDetails = {
  topic: string;
  numberOfIdeas: string;
  platform: string[];
}


export type ContentGeneratePromptDetails = {
  topic: string;
  description: string;
  contentType: string;
  hashtags: string[];
  keyPoints: string[];
  contentLength: "short" | "medium" | "long";
}

export type ContentEnhancePromptDetails = {
  contentType: string;
  previousContent: string;
  enhanceType: "rewrite" | "expand" | "condense" | "adjust";
};

export type UserPersona = {
  tone: string[];
  industry: string;
  brandDetails: string;
  targetAudience: string | null;
  usp: string;
  contentGoals: string[];
  sampleContent: string;
}

export interface PlatformHelper {
  getAuthUrl: (state: string) => string;
  exchangeCode: (code: string, codeVerifier?: string) => Promise<any>;
  refreshToken: (refreshToken: string) => Promise<any>;
}

export interface OAuthTokens {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  accountHandle?: string;
  accountName?: string;
  accountImage?: string;
  providerAccountId?: string;
}