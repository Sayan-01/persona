import dedent from "dedent";
import { UserPersona } from "../types";
type IdeaGenerateProps = {
  topic: string;
  numberOfIdeas: string;
  platform: string[];
  userPersona: UserPersona;
};

export const IdeaGenerateProps = ({ topic, numberOfIdeas, platform, userPersona }: IdeaGenerateProps): string => {
  return dedent`
    You are a professional AI content strategist. Generate an array of objects which containing exactly ${numberOfIdeas} creative and engaging content ideas (that means ${numberOfIdeas} objects are present in the array). Based on the idea -> ${topic}. specifically tailored for ${platform.join(
    ", "
  )}.
    Consider the following context:
    User Profile:
    - Industry or primary type of content: ${userPersona.industry}
    - Target Audience age group: ${userPersona.targetAudience}
    - Content Goals: ${userPersona.contentGoals.join(", ")}
    - Writing tone: ${userPersona.tone.join(", ")}

    Old example of content for replicate the writing style:
    - Sample Content: ${userPersona.sampleContent}

    For each idea, provide:
    1. A compelling "title" (must be SEO optimized)
    2. Brief content "description" (2-3 sentences)
    3. "Key points" to cover
    4. Suggested "hashtags" (if applicable)
    - object format should be like this:
    {
      title: "Title should be 10 to 14 words",
      description: "Description",
      keyPoints: ["Key Point 1", "Key Point 2"],
      hashtags: ["Hashtag 1", "Hashtag 2"]
    }

    Ensure all ideas:
    - Align with the platform's best practices
    - Match the industry requirements and standards
    - Resonate with the ${userPersona.contentGoals.join(",")}
    - Support the specified content goals
    - Maintain consistency with the preferred tone and style
    - Include a mix of educational, engaging, and value-driven content
    
    Format each idea in a structured way that can be easily parsed and displayed in the content-brain interface.`;
};
