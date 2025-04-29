import dedent from "dedent";
import { UserPersona, UserProfile } from "../types";

interface ContentGenerateProps {
  platform: string;
  content: string;
  enhanceType: string;
  userProfile: UserProfile;
  userPersona: UserPersona;
}

const enhanceContentPrompt = ({ platform, content, enhanceType, userProfile, userPersona }: ContentGenerateProps) => {
  const platformGuide = {
    linkedin: "Professional network focused on B2B content, industry insights, and career development",
    twitter: "Fast-paced, concise updates with high engagement through hashtags and mentions",
    instagram: "Visual-first platform with emphasis on storytelling and emotional connection",
    facebook: "Community-focused platform balancing personal and professional content",
    blog: "In-depth, comprehensive content with SEO optimization and detailed analysis",
  };

  return dedent`
    As an expert content enhancer, optimize the following content while maintaining its core message and intent.

    PLATFORM CONTEXT:
    Target Platform: ${platform}
    Platform Requirements: ${platformGuide[platform as keyof typeof platformGuide]}

    ENHANCEMENT PARAMETERS:
    Enhancement Type: ${enhanceType}
    Industry Context: ${userProfile.industry}
    Target Audience: ${userProfile.targetAudience}
    Content Goals: ${userProfile.contentGoals.join(", ")}

    CONTENT STYLE:
    Tone: ${userPersona.tone.join(", ")}
    Writing Style: ${userPersona.style.join(", ")}
    Language Level: ${userPersona.preferences.language.level}

    CONTENT PREFERENCES:
    Length Range: ${userPersona.preferences.content.minLength}-${userPersona.preferences.content.maxLength} characters
    Emoji Usage: ${userPersona.preferences.content.useEmojis ? "Yes" : "Minimal"}
    Formatting:
    - Use Bullet Points: ${userPersona.preferences.content.formatting.useBulletPoints ? "Yes" : "When appropriate"}
    - Include Statistics: ${userPersona.preferences.content.formatting.useStatistics ? "Yes" : "When relevant"}
    - Citation Style: ${userPersona.preferences.content.formatting.citationStyle}

    ORIGINAL CONTENT:
    """
    ${content}
    """

    ENHANCEMENT INSTRUCTIONS:
    1. Maintain the core message and key points of the original content
    2. Adapt the tone to match ${userPersona.tone.join(" and ")} style
    3. Optimize structure and flow for ${platform} platform
    4. Incorporate industry-specific terminology for ${userProfile.industry}
    5. Ensure content resonates with ${userProfile.targetAudience}
    6. Focus on ${enhanceType} improvements while preserving authenticity
    7. Follow formatting preferences and language level guidelines
    8. Use emojis ${userPersona.preferences.content.useEmojis ? "strategically for engagement" : "minimally and professionally"}

    ENGAGEMENT OPTIMIZATION:
    - Also add emojis for better engagement
    - Include conversation starters or questions
    - Use active voice and direct address
    - Add personal insights or experiences when relevant
    - Maintain authenticity while being informative
    - Consider your audience's pain points and goals
    - Keep content length between ${userPersona.preferences.content.minLength}-${userPersona.preferences.content.maxLength} characters

    CONTENT FORMAT: JSON object {"content": "Full engaging post with follow all the above points"}
    
    Please enhance this content while maintaining its core message and intent. The enhanced version should be more engaging, better structured, and optimized for the target platform while staying true to the original message. Add emojis strategically to increase engagement where appropriate.`;
};

export default enhanceContentPrompt;
