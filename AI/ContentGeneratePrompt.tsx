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
      facebook: "1 paragraphs",
      instagram: "50-100 words",
      linkedin: "1-2 paragraphs",
      twitter: "240-280 characters",
      blog: "300-500 words",
    },
    medium: {
      facebook: "2-3 paragraphs",
      instagram: "150-300 words",
      linkedin: "2-4 paragraphs",
      twitter: "1-2 threaded tweets",
      blog: "500-800 words",
    },
    long: {
      facebook: "4-6 paragraphs",
      instagram: "300-400 words",
      linkedin: "4-8 paragraphs",
      twitter: "3-5 threaded tweets",
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
      * Properly formatted (camelCase for multi-word tags)
      * Start from a new line allways`;
  };

  return dedent`
    You are an expert content creator specializing in ${platform} content. Create content with the following specifications:

    TOPIC: ${topic}

    PLATFORM CONTEXT: ${platformGuide[platform as keyof typeof platformGuide]}
    
    TARGET LENGTH: ${lengthGuide[contentLength][platform as keyof (typeof lengthGuide)[typeof contentLength]]}

    USER PROFILE:
    Industry: ${userPersona.industry}
    Target Audience: ${userPersona.targetAudience}
    Content Goals: ${userPersona.contentGoals.join(", ")}

    CONTENT STYLE:
    Tone: ${userPersona.tone.join(", ")}

    Formatting:
    - Use Bullet Points When appropriate"}
    - Include Statistics When relevant"}

    ${keyPoints.length > 0 ? `KEY POINTS TO INCLUDE:\n${keyPoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}` : ""}

    ${hashtags.length > 0 ? `\nHASHTAG GUIDELINES:\n${hashtagGuide()}\nSUGGESTED HASHTAGS: ${hashtags.join(" ")}` : ""}

    ADDITIONAL INSTRUCTIONS:
    1. Maintain consistency with the user's sample content style
    2. Incorporate industry-specific terminology appropriate for ${userPersona.targetAudience}
    3. Focus on achieving the specified content goals: ${userPersona.contentGoals.join(", ")}
    4. Optimize for ${platform}'s best practices and algorithm preferences
    5. Follow the specified formatting preferences and language level
    6. Also use emojis if needed.
    7. Do not use any text formating like bolding, italics, or any other special character formatting. Write simple HTML text only containing <br/> for line breaks.
    8. For points use bullet points or numbers or emojis.


    ENGAGEMENT OPTIMIZATION:
    - Include conversation starters or questions
    - Use active voice and direct address
    - Add personal insights or experiences when relevant
    - Maintain authenticity while being informative
    - Consider your audience's pain points and goals

    CONTENT FORMAT: 
    - JSON object {"content": "Full engaging post with follow all the above points"}
    
    GENERATE CONTENT GUIDLINE OR FORMAT:
    - Use <br/> for line breaks and <br/><br/> for double line breaks.
    - The content should be engaging, authentic, and provide value to the audience.
    - Focus on creating a natural flow.
    - Position the content to establish me as a thought leader in my field while remaining approachable and relatable.
    - Incorporate emojis for better engagement.
    - Structure the content into four distinct sections:
        1. Introduction part
        2. Content main body (which can contain bullet points or - or links if needed)
        3. Conclusion or footer
        4. Hashtag section
    - **Crucially, do not use any text formatting like bolding, italics, or any other special character formatting. Write simple HTML text only containing <br/> for line breaks.**
    - Example post format-> 
      🚀 Boost Your Brand's Online Presence with Azeorex! 🚀

      <br/><br/>Looking for a website that stands out and grows with your business? Look no further! Azeorex is your trusted Web Development & Design Agency committed to delivering powerful, scalable, and modern web solutions tailored to your needs.

      <br/><br/>✨ Why Choose Azeorex?

      <br/>🖌 Stunning Website Design - Unique, eye-catching designs to elevate your brand.
      <br/>🔧 Custom Backend Solutions - Built to support your growth with robust infrastructure.
      <br/>🌐 Professional WordPress Websites - Fully optimized and responsive.
      <br/>💻 Custom Coded Websites - Tailored from scratch to meet your specific needs.
      <br/>🚀 Scalable & Future-Ready - Websites designed to evolve with your business.
      <br/>📱 Responsive Across Devices - Ensuring a seamless experience on mobile, tablet, and desktop.
      <br/>💥 Modern Tech Stack - Leveraging the latest tools and technologies for best results.
      <br/>💸 Affordable Pricing - Quality web solutions within your budget!
      <br/>Let's turn your vision into reality with Azeorex! 🌟

      <br/><br/>📧 Contact Us:

      <br/>Email: xxxxxxxxx@gmail.com
      <br/>Phone: xxxxx xxxxx (WP only)
      <br/>Website: xyz.com 

      <br/><br/>#azeorex #webdesign #webdevelopment #customwebsites #moderndesign #responsivedesign #affordablewebsites #scalablesolutions #wordpressexperts #latesttechstack #highqualitydesign #userexperience #creativeagency 
`;
};

export default generateContentPrompt;
