import dedent from "dedent";
import { UserPersona } from "../types";

interface ContentGenerateProps {
  platform: string;
  topic: string;
  hashtags?: string[];
  keyPoints?: string[];
  contentLength: "short" | "medium" | "long";
  userPersona: UserPersona;
}

export const generateContentPrompt = ({ platform, topic, keyPoints = [], hashtags = [], contentLength, userPersona }: ContentGenerateProps) => {
  
  const lengthGuide = {
    short: {
      facebook: "1-2 concise paragraphs (~100 words)",
      instagram: "50-100 words (visual focus)",
      linkedin: "1-2 paragraphs (insight focus)",
      twitter: "1 tweet (240-280 chars)",
      blog: "300-500 words (quick guide)",
    },
    medium: {
      facebook: "2-3 paragraphs with questions (~200 words)",
      instagram: "150-250 words (storytelling focus)",
      linkedin: "3-5 paragraphs (educational focus)",
      twitter: "2-4 tweet thread",
      blog: "600-900 words (analytical focus)",
    },
    long: {
      facebook: "4-6 detailed paragraphs (~400 words)",
      instagram: "300-400 words (deep storytelling)",
      linkedin: "6-8 paragraphs (thought-leadership focus)",
      twitter: "5-10 tweet thread (value-packed)",
      blog: "1000-1500 words (comprehensive resource)",
    },
  };

  const platformStrategy = {
    linkedin: dedent`
      STRATEGY: Professional & Insight-driven. 
      - Hook: Start with a contrarian view, a surprising stat, or a relatable pain point.
      - Body: Provide actionable "How-To" advice or high-level strategic insights.
      - Authority: Position as an expert in ${userPersona.industry}.
      - CTA: Encourage professional networking or comments on industry trends.`,
    twitter: dedent`
      STRATEGY: Punchy & Conversational.
      - Hook: Impactful first line. 
      - Threading: If medium/long, use a "🧵" thread format.
      - Style: High energy, concise, and often use bullet points for readability.
      - CTA: Ask for a Retweet or a reply.`,
    instagram: dedent`
      STRATEGY: Story-first & Visual.
      - Hook: Scroll-stopping first sentence before the "read more".
      - Body: Focus on personal connection, transformation, or behind-the-scenes.
      - Format: Readable with clear spacing and emojis.
      - CTA: "Link in bio" or "Save for later".`,
    facebook: dedent`
      STRATEGY: Community & Relatable.
      - Hook: Question-based or relatable scenario.
      - Body: Humanize the brand, share a story, or provide helpful tips for daily life.
      - Tone: Friendly and approachable.
      - CTA: Ask for opinions or community stories.`,
    blog: dedent`
      STRATEGY: Authoritative & Informative.
      - Structure: Clear headings, introduction, body, and conclusion.
      - SEO: Use relevant industry keywords naturally.
      - Body: Deep dive into the topic with comprehensive explanations.
      - CTA: Newsletter signup or related article click.`,
  };

  return dedent`
    You are a world-class social media copywriter and growth strategist for ${userPersona.industry}. 
    Your goal is to generate high-engagement content for ${platform.toUpperCase()} that resonates with ${userPersona.targetAudience} and achieves ${userPersona.contentGoals.join(", ")}.

    TOPIC/IDEA: ${topic}
    ${keyPoints.length > 0 ? `MUST-INCLUDE POINTS:\n${keyPoints.map((p, i) => `- ${p}`).join("\n")}` : ""}
    
    PLATFORM SPECIFIC STRATEGY:
    ${platformStrategy[platform as keyof typeof platformStrategy] || "Focus on delivering value and engagement."}

    CONTENT SPECIFICATIONS:
    - Target Length: ${lengthGuide[contentLength][platform as keyof (typeof lengthGuide)[typeof contentLength]]}
    - Tone: ${userPersona.tone.join(", ")}
    - Platform Habits: Optimize for ${platform}'s current algorithms and best practices.

    CORE WRITING RULES:
    1. **Strong Hook**: The first sentence MUST grab attention. No boring intros.
    2. **Readability**: Break text into short, digestible paragraphs.
    3. **Plain Text ONLY**: Do NOT use Markdown (bold, italics), HTML tags (<br/>), or special characters for formatting. 
    4. **Line Breaks**: Use a single newline (\n) for small breaks and double newlines (\n\n) to separate major sections/paragraphs.
    5. **Emojis**: Use ${userPersona.tone.includes("professional") ? "subtle" : "creative"} emojis to add personality and visual structure.
    6. **Call to Action (CTA)**: Every post must end with a clear, engaging CTA related to the content goals.

    ${hashtags.length > 0 ? `HASHTAGS:\n${hashtags.join(" ")}` : "Generate 3-5 high-performing, relevant hashtags."}

    OUTPUT FORMAT:
    Provide the response as a JSON object: {"content": "Your fully written, formatted, and engaging post here"}.
    Ensure the "content" value is a single string where newlines are represented as \\n.

    REMINDER: No bolding, no bold characters, no italics. Simple, clean text with emojis.
  `;
};

export default generateContentPrompt;
