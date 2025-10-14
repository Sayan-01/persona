interface IndustryTerms {
  preferred: string[];
  avoid: string[];
}

// Helper function to determine writing style based on tone
export function determineStyleFromTone(tone: string): string[] {
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
export const generateAIPreferences = (tone: string, industry?: string) => {
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
      preferences.content.useEmojis = true;
      preferences.language.level = "technical";
      break;
    case "persuasive":
      preferences.content.minLength = 300;
      preferences.content.maxLength = 1500;
      preferences.content.useEmojis = true;
      preferences.language.level = "persuasive";
      break;
    case "empathetic":
      preferences.content.minLength = 250;
      preferences.content.maxLength = 1200;
      preferences.content.useEmojis = true;
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
      industryTerms.preferred = ["innovation", "solution", "platform", "scalable", "efficient"];
    }

    return {
      ...preferences,
      industryTerms,
    };
  }

  return preferences;
};


export async function callAiApi(prompt: string, options?: { temperature?: number }) {
  // TODO: Replace with your provider endpoint (/api/ai/generate) or direct OpenAI call from server.
  // This placeholder demonstrates the expected shape and returns a mocked response when dev mode.
  try {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, temperature: options?.temperature ?? 0.7 }),
    });
    if (!res.ok) throw new Error("AI API error: " + res.statusText);
    return await res.json();
  } catch (err) {
    // Fallback mock for local dev (so the UI still demonstrates behavior)
    console.warn("AI API call failed, using mock", err);
    return {
      title: "(mock) Generated title",
      text: "(mock) Generated content for prompt: " + prompt.slice(0, 180) + "...",
      variants: ["(mock) Variant A", "(mock) Variant B"],
      meta: "(mock) meta description",
    };
  }
}

export function parseSimpleCSV(csv: string) {
  const lines = csv.trim().split(/\r?\n/);
  const header =
    lines
      .shift()
      ?.split(",")
      .map((h) => h.trim()) || [];
  return lines.map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
}