import dedent from "dedent";
import { UserPersona } from "../types";

interface ContentEnhanceProps {
  platform: string;
  previousContent: string;
  enhanceType: "rewrite" | "expand" | "condense" | "adjust";
  userPersona: UserPersona;
}

const enhanceContentPrompt = ({ platform, previousContent, enhanceType, userPersona }: ContentEnhanceProps) => {
  const platformTarget = {
    linkedin: "Professional B2B network focus.",
    twitter: "Concise, punchy, and conversational.",
    instagram: "Visual storytelling vibes.",
    facebook: "Community and relatable storytelling.",
    blog: "SEO-optimized, authoritative long-form.",
  };

  const enhancementInstruction = {
    rewrite: "Rephrase for better flow and impact while keeping the core message exactly as is.",
    expand: "Add more context, storytelling, or detailed bullet points to make it more comprehensive.",
    condense: "Strip away the fluff and deliver only the most impactful message concisely.",
    adjust: `Pivot the tone to perfectly match: ${userPersona.tone.join(", ")} while targeting ${userPersona.targetAudience}.`,
  };

  return dedent`
    You are a premium social media content editor. Enhance the following ${platform.toUpperCase()} post to be world-class.
    
    ENHANCEMENT GOAL: ${enhancementInstruction[enhanceType]}
    PLATFORM CONTEXT: ${platformTarget[platform as keyof typeof platformTarget] || "Optimize for maximum platform engagement."}

    USER PERSONA:
    - Industry: ${userPersona.industry}
    - Content Goals: ${userPersona.contentGoals.join(", ")}
    - Target Audience: ${userPersona.targetAudience}

    ORIGINAL CONTENT:
    """
    ${previousContent}
    """

    STRICT GUIDELINES:
    1. **Preserve Value**: Do not lose the original key points or intention unless condensed.
    2. **Hook Improvement**: Ensure the first line is a powerful, attention-grabbing hook.
    3. **Readability**: Use short paragraphs and white space for a better reading experience.
    4. **Plain Text ONLY**: Do NOT use Markdown (bold, italics), HTML tags (<br/>), or special characters for formatting.
    5. **Newlines**: Use \\n for single line breaks and \\n\\n for double line breaks.
    6. **Strategic Emojis**: Use emojis to guide the reader's eye and add personality.
    7. **Call to Action**: Ensure there is an engaging CTA at the end.

    OUTPUT FORMAT:
    Return a single JSON object: {"content": "Enhanced content here"}.
    Ensure all newlines are represented as \\n within the string.
  `;
};

export default enhanceContentPrompt;
