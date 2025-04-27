import dedent from "dedent";
const AiPrompt = (topic: string, platform: string, userProfile: any, aiPersona: any, numberOfIdeas: number) => {
  return dedent`
    As an a pro AI content strategist, generate ${numberOfIdeas} creative and engaging content ideas for ${topic} specifically tailored for ${platform}.

    Consider the following context:
    User Profile:
    - Background: ${userProfile.background}
    - Expertise: ${userProfile.expertise}
    - Target Audience: ${userProfile.targetAudience}

    AI Persona:
    - Voice: ${aiPersona.voice}
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
    - Match the user's expertise level
    - Resonate with the target audience
    - Maintain consistency with the AI persona's voice and style
    - Include a mix of educational, engaging, and value-driven content
    
    Format each idea in a structured way that can be easily parsed and displayed in the content-brain interface.`;
};

export default AiPrompt;
