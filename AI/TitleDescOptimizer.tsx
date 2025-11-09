import dedent from "dedent";
import { UserPersona } from "../types";

export const YtTitleDescOptimizerPrompt = ({
  title,
  description,
  userPersona,
  videoType = "shorts",
}: {
  title: string;
  description: string;
  userPersona: UserPersona;
  videoType?: "long" | "shorts";
}) => {
  return dedent`
    You are a YouTube SEO expert. Generate 3 optimized titles and a description based on the inputs below.
    Respond ONLY with valid JSON—no markdown, no explanation, no preamble.

    INPUT:
    Title: ${title}
    Description: ${description}
    Video Type: ${videoType}
    User Persona: ${JSON.stringify(userPersona)}

    OUTPUT FORMAT:
    {
      "titles": [
        { "title": "Engaging SEO Title 1", "seo_score": 87 },
        { "title": "Engaging SEO Title 2", "seo_score": 82 },
        { "title": "Engaging SEO Title 3", "seo_score": 78 }
      ],
      "video_description": "Professional 280-300 char description with 5-6 hashtags and 5-6 keywords matching the titles."
    }

    REQUIREMENTS:
    - Titles: Under 60 chars, click-worthy, keyword-rich, aligned to ${videoType} format and persona
    - SEO scores: 70-100, higher = better keyword density + engagement potential
    - Description: 280-300 chars max, natural keyword integration, relevant hashtags
    - Ensure all keywords/hashtags appear in at least one title
  `;
};
