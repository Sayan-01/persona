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
      "video_script": {
        "hook": "First 3-5 seconds attention grabber",
        "intro": "15-20 second introduction",
        "main_content": "Core content structured in clear sections",
        "cta": "Strong call-to-action (subscribe, like, comment)",
        "outro": "Closing statement with next video tease"
      },
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
    - Hook: Must capture attention in first 3 seconds (${videoType === "shorts" ? "fast-paced, visual" : "question/bold claim"})
    - Structure: Match ${videoType} pacing (${videoType === "shorts" ? "rapid cuts, no fluff" : "storytelling with clear sections"})
    - Tone: Align with persona's ${userPersona.tone || "preferred communication style"}
    - Keywords: Naturally integrate keywords from title: "${title}"
    - Retention: Add pattern interrupts, questions, or visual cues every 15-20 seconds
    - CTA: Place ${videoType === "shorts" ? "at peak engagement (40-50s)" : "mid-video and end"}
    - Tags should be relevant to the topic, trending keywords, lowercase, and max 10 items.
    - Ensure the output is strictly valid JSON (parsable with JSON.parse).
  `;
};
