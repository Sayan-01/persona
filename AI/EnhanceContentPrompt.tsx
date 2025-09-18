import dedent from "dedent";
import { UserPersona, UserProfile } from "../types";

interface ContentGenerateProps {
  platform: string;
  previousContent: string;
  enhanceType: string;
  userPersona: UserPersona;
}

const enhanceContentPrompt = ({ platform, previousContent, enhanceType, userPersona }: ContentGenerateProps) => {
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
  ${
    enhanceType === "adjust" &&
    `
    Industry Context: ${userPersona.industry}
    Target Audience: ${userPersona.targetAudience}
    Content Goals: ${userPersona.contentGoals.join(", ")}

    CONTENT STYLE:
    Tone: ${userPersona.tone.join(", ")}
    Writing Style: ${userPersona.tone.join(", ")}
`
  }
    Formatting:
    - Use Bullet Points:  if needed
    - Include Statistics:  if needed
    - Citation Style:  if needed

    ORIGINAL CONTENT:
    """
    ${previousContent}
    """

    ENHANCEMENT INSTRUCTIONS:
    - Maintain the core message and key points of the original content
    - If enhance type is adjust then rewrite according to tone and style, if enhance type is expand then expand the content, if enhance type is condense then condense the content and if enhance type is rewrite then rewrite the content but maintain the core message and key points of the original content
    ${enhanceType === "adjust" &&
    `
    - Adapt the tone to match ${userPersona.tone.join(" and ")} style if and only if enhance type is adjust
    - Incorporate industry-specific terminology for ${userPersona.industry}
    - Ensure content resonates with ${userPersona.targetAudience}
    `}
    - Optimize structure and flow for ${platform} platform
    - Focus on ${enhanceType} improvements while preserving authenticity
    - Follow formatting preferences and language level guidelines
    - Use emojis strategically for engagement

    ENGAGEMENT OPTIMIZATION:
    - Also add emojis for better engagement
    - Include conversation starters or questions
    - Use active voice and direct address
    - Add personal insights or experiences when relevant
    - Maintain authenticity while being informative
    - Consider your audience's pain points and goals
    - Keep content length almost same

    CONTENT FORMAT: JSON object {"content": "Full engaging post with follow all the above points"}
    
    Please enhance this content while maintaining its core message and intent. The enhanced version should be more engaging, better structured, and optimized for the target platform while staying true to the original message. Add emojis strategically to increase engagement where appropriate.`;
};

export default enhanceContentPrompt;
