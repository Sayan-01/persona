import dedent from "dedent";

interface ContentGenerateProps {
  platform: string;
  topic: string;
  hashtags?: string[];
  keyPoints?: string[];
  contentLength: "short" | "medium" | "long";
  tone?: string;
  userPersona?: {
    industry?: string;
    expertise?: string;
    style?: string;
  };
}

export const generateContentPrompt = ({ platform, topic, keyPoints = [], hashtags = [], contentLength, tone = "professional", userPersona = {} }: ContentGenerateProps) => {
  const lengthGuide = {
    short: {
      linkedin: "2-3 paragraphs",
      "linkedin-article": "500-800 words",
      twitter: "240-280 characters",
      "twitter-thread": "4-6 tweets",
    },
    medium: {
      linkedin: "4-5 paragraphs",
      "linkedin-article": "800-1200 words",
      twitter: "280 characters",
      "twitter-thread": "8-10 tweets",
    },
    long: {
      linkedin: "6-8 paragraphs",
      "linkedin-article": "1500-2000 words",
      twitter: "280 characters",
      "twitter-thread": "12-15 tweets",
    },
  };

  const platformGuide = {
    linkedin: "professional network focused on business insights and career development",
    "linkedin-article": "in-depth professional content with industry insights",
    twitter: "concise, engaging content with hashtags",
    "twitter-thread": "breaking down complex topics into digestible tweets",
  };

  const suggestHashtags = (platform: string, providedHashtags: string[]) => {
    const hashtagGuidelines = {
      linkedin: "3-5 professional hashtags",
      "linkedin-article": "5-7 industry-relevant hashtags",
      twitter: "1-2 trending or relevant hashtags",
      "twitter-thread": "2-3 topic-specific hashtags",
    };

    return `
    HASHTAG STRATEGY:
    - Use provided hashtags: ${providedHashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")}
    - Add ${hashtagGuidelines[platform as keyof typeof hashtagGuidelines]}
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

    TONE: ${tone}

    ${userPersona.industry ? `INDUSTRY CONTEXT: ${userPersona.industry}` : ""}
    ${userPersona.expertise ? `EXPERTISE LEVEL: ${userPersona.expertise}` : ""}
    ${userPersona.style ? `WRITING STYLE: ${userPersona.style}` : ""}

    ${
      keyPoints.length > 0
        ? `KEY POINTS TO INCLUDE:
    ${keyPoints.map((point) => `- ${point}`).join("\n")}`
        : ""
    }

    CONTENT GUIDELINES:
    ${
      platform === "linkedin" || platform === "linkedin-article"
        ? `
    - Start with a compelling hook that resonates with your professional audience
    - Include specific data points, statistics, or case studies to support your points
    - Break down complex ideas into digestible sections
    - Use bullet points or numbered lists for better readability
    - End with a thought-provoking question or clear call-to-action
    - Add appropriate line breaks between paragraphs
    - Do not use any type markdown like **bold**
    - Use emojis to  make the post look more beautiful 
`
        : ""
    }
    
    ${
      platform === "twitter"
        ? `
    - Start with a powerful hook that grabs attention in the first few words
    - Use concise, impactful language
    - Include one key insight or takeaway
    - Leave ~20 characters for engagement space
    - Use emojis strategically (1-2 max)
    - Consider adding a call-to-action
    - Do not use any type markdown like **bold**
    - Use emojis to  make the post look more beautiful 
`
        : ""
    }
    
    ${
      platform === "twitter-thread"
        ? `
    - First tweet: Strong hook + "🧵" emoji
    - Number format: (1/X) at start of each tweet
    - One main point per tweet
    - Use transition words between tweets for flow
    - Include relevant emojis (max 1 per tweet)
    - End thread with clear takeaway + CTA
    - Add "End 🧵" in last tweet`
        : ""
    }

    ${suggestHashtags(platform, hashtags)}

    ENGAGEMENT OPTIMIZATION:
    - Also add emojis for better engagement
    - Include conversation starters or questions
    - Use active voice and direct address
    - Add personal insights or experiences when relevant
    - Maintain authenticity while being informative
    - Consider your audience's pain points and goals

    CONTENT FORMAT: JSON object {content: "Full engaging post with follow all the above points"}
    
    Generate content that is engaging, authentic, and provides value to the audience. Focus on creating a natural flow while maintaining the specified tone and length guidelines. The content should position you as a thought leader in your field while remaining approachable and relatable, also add emojis for better engagement.
  `;
};

export default generateContentPrompt;
