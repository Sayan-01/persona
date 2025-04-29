import dedent from "dedent";
import { UserPersona, UserProfile } from "../types";

interface ContentGenerateProps {
  platform: string;
  topic: string;
  hashtags?: string[];
  keyPoints?: string[];
  contentLength: "short" | "medium" | "long";
  userProfile: UserProfile;
  userPersona: UserPersona;
}

export const generateContentPrompt = ({ platform, topic, keyPoints = [], hashtags = [], contentLength, userProfile, userPersona }: ContentGenerateProps) => {
  
  const lengthGuide = {
    short: {
      linkedin: "2-3 paragraphs",
      "linkedin-article": "500-800 words",
      twitter: "240-280 characters",
      instagram: "150-200 words",
      facebook: "1-2 paragraphs",
      blog: "300-500 words",
    },
    medium: {
      linkedin: "4-6 paragraphs",
      twitter: "1-2 threaded tweets",
      instagram: "200-300 words",
      facebook: "3-4 paragraphs",
      blog: "500-800 words",
    },
    long: {
      linkedin: "7-10 paragraphs",
      twitter: "3-5 threaded tweets",
      instagram: "300-400 words",
      facebook: "5-7 paragraphs",
      blog: "800-1500 words",
    },
  };

  const platformGuide = {
    linkedin: "Professional network focused on B2B content, industry insights, and career development",
    twitter: "Fast-paced, concise updates with high engagement through hashtags and mentions",
    instagram: "Visual-first platform with emphasis on storytelling and emotional connection",
    facebook: "Community-focused platform balancing personal and professional content",
    blog: "In-depth, comprehensive content with SEO optimization and detailed analysis",
  };

  const hashtagGuide = () => {
    return dedent`
    - Ensure hashtags are:
      * Relevant to the topic and industry
      * Currently active in your platform
      * Mix of broad and specific terms
      * Properly formatted (camelCase for multi-word tags)`;
  };

  return dedent`
    You are an expert content creator specializing in ${platform} content. Create content with the following specifications:

    TOPIC: ${topic}

    PLATFORM CONTEXT: ${platformGuide[platform as keyof typeof platformGuide]}
    
    TARGET LENGTH: ${lengthGuide[contentLength][platform as keyof (typeof lengthGuide)[typeof contentLength]]}

    USER PROFILE:
    Industry: ${userProfile.industry}
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

    ${keyPoints.length > 0 ? `KEY POINTS TO INCLUDE:\n${keyPoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}` : ""}

    ${hashtags.length > 0 ? `\nHASHTAG GUIDELINES:\n${hashtagGuide()}\nSUGGESTED HASHTAGS: ${hashtags.join(" ")}` : ""}

    ADDITIONAL INSTRUCTIONS:
    1. Maintain consistency with the user's sample content style
    2. Incorporate industry-specific terminology appropriate for ${userProfile.targetAudience}
    3. Focus on achieving the specified content goals: ${userProfile.contentGoals.join(", ")}
    4. Optimize for ${platform}'s best practices and algorithm preferences
    5. Follow the specified formatting preferences and language level
    6. Use emojis ${userPersona.preferences.content.useEmojis ? "strategically for engagement" : "minimally and professionally"}

    ENGAGEMENT OPTIMIZATION:
    - Also add emojis for better engagement
    - Include conversation starters or questions
    - Use active voice and direct address
    - Add personal insights or experiences when relevant
    - Maintain authenticity while being informative
    - Consider your audience's pain points and goals
    - Keep content length between ${userPersona.preferences.content.minLength}-${userPersona.preferences.content.maxLength} characters

    CONTENT FORMAT: JSON object {"content": "Full engaging post with follow all the above points"}
    
    Generate content that is engaging, authentic, and provides value to the audience. Focus on creating a natural flow while maintaining the specified tone and length guidelines. The content should position you as a thought leader in your field while remaining approachable and relatable, also add emojis for better engagement.
`;
};

export default generateContentPrompt;
