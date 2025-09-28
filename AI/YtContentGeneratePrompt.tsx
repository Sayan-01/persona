import dedent from "dedent";
import { UserPersona } from "../types";

export const YtContentGeneratePrompt = ({ title, description, userPersona, videoType = "shorts" }: { title: string; description: string; userPersona: UserPersona; videoType: "long" | "shorts" }) => {
  return dedent`
    You are an expert YouTube SEO strategist and AI creative assistant. 
    Based on the user input below, generate a response in **valid JSON only** 
    (no explanations, no markdown, no commentary). 

    ### User Input:
    - Title: ${title}
    - Description: ${description}
    - Video Type: ${videoType}
    - Target Persona: ${JSON.stringify(userPersona)}

    ### Response Format (strict JSON only):
    {
      "titles": [
        { "title": "SEO Optimized Title 1", "seo_score": 87 },
        { "title": "SEO Optimized Title 2", "seo_score": 82 },
        { "title": "SEO Optimized Title 3", "seo_score": 78 }
      ],
      "video_script": "A professional and engaging YouTube video script here based on the inputs.",
      "tags": [
        "tag1", "tag2", "tag3", "tag4", "tag5",
        "tag6", "tag7", "tag8", "tag9", "tag10"
      ]
    }

    ### Rules:
    - Always include 3 titles with unique variations.
    - Titles must be optimized for YouTube SEO (clear, engaging, under 60 characters if possible).
    - "seo_score" should be a realistic integer between 70 and 100.
    - Script must be professional, engaging, and tailored to the provided persona.
    - Tags should be relevant to the topic, trending keywords, lowercase, and max 10 items.
    - Ensure the output is strictly valid JSON (parsable with JSON.parse).
  `;
};
