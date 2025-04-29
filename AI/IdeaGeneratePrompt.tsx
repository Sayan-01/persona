import dedent from "dedent";
import { UserPersona, UserProfile } from "../types";
type IdeaGenerateProps = {
  topic: string;
  numberOfIdeas: string;
  platform: string;
  userProfile: UserProfile;
  aiPersona: UserPersona;
};

export const IdeaGenerateProps = ({ topic, numberOfIdeas, platform, userProfile, aiPersona }: IdeaGenerateProps):string => {
  console.log("first", topic, numberOfIdeas, platform, userProfile, aiPersona);

  return dedent`
    As an a pro AI content strategist, generate ${numberOfIdeas} creative and engaging content ideas (that means ${numberOfIdeas} objects are present in the array) for ${topic} specifically tailored for ${platform}.

    Consider the following context:
    User Profile:
    - Industry: ${userProfile.industry}
    - Target Audience: ${userProfile.targetAudience}
    - Content Goals: ${userProfile.contentGoals}

    Content Preferences:
    - Tone: ${aiPersona.tone}
    - Style: ${aiPersona.style}
    - Sample Content: ${userProfile.sampleContent}
    - Additional Preferences: ${JSON.stringify(aiPersona.preferences)}

    AI Persona:
    - Voice: ${aiPersona.tone}
    - Style: ${aiPersona.style}
    - Tone: ${aiPersona.tone}

    For each idea, provide:
    1. A compelling "title"
    2. Brief content "description" (2-3 sentences)
    3. "Key points" to cover
    4. Suggested "hashtags" (if applicable)
    - object format should be like this:
    {
      "title": "Title",
      "description": "Description",
      "keyPoints": ["Key Point 1", "Key Point 2"],
      "hashtags": ["Hashtag 1", "Hashtag 2"]
    }

    Ensure all ideas:
    - Align with the platform's best practices
    - Match the industry requirements and standards
    - Resonate with the target audience
    - Support the specified content goals
    - Maintain consistency with the preferred tone and style
    - Include a mix of educational, engaging, and value-driven content
    
    Format each idea in a structured way that can be easily parsed and displayed in the content-brain interface.`;
};
