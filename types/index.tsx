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

export type UserPersona = {
  tone: string[];
  style: string[];
  preferences: AIPreferences;
}
