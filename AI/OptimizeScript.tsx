import dedent from "dedent";
import { UserPersona } from "../types";

export const YtScriptOptimizerPrompt = ({
  title,
  userInput,
  userPersona,
  videoType = "shorts",
  duration,
}: {
  title: string;
  userInput: string;
  userPersona: UserPersona;
  videoType?: "long" | "shorts";
  duration?: number;
}) => {
  return dedent`
    You are a YouTube scriptwriting expert. Optimize the script below for maximum engagement and retention.
    Respond ONLY with valid JSON—no markdown, no explanation, no preamble.

    INPUT:
    User Script: ${userInput}
    Video Title: ${title}
    Video Type: ${videoType}
    Target Duration: ${duration ? `${duration} seconds` : videoType === "shorts" ? "60 seconds" : "8-12 minutes"}
    User Persona: ${JSON.stringify(userPersona)}

    OUTPUT FORMAT:
    {
      "optimized_script": {
        "hook": "First 3-5 seconds attention grabber",
        "intro": "15-20 second introduction",
        "main_content": "Core content structured in clear sections",
        "cta": "Strong call-to-action (subscribe, like, comment)",
        "outro": "Closing statement with next video tease"
      },
      "improvements": ["Change 1 made", "Change 2 made", "Change 3 made"],
      "engagement_score": 85,
      "pacing_notes": "Brief timing and delivery suggestions"
    }

    REQUIREMENTS:
    - Hook: Must capture attention in first 3 seconds (${videoType === "shorts" ? "fast-paced, visual" : "question/bold claim"})
    - Structure: Match ${videoType} pacing (${videoType === "shorts" ? "rapid cuts, no fluff" : "storytelling with clear sections"})
    - Tone: Align with persona's ${userPersona.tone || "preferred communication style"}
    - Keywords: Naturally integrate keywords from title: "${title}"
    - Length: Target ${duration ? `${duration}s` : videoType === "shorts" ? "45-60s spoken content" : "8-12 min spoken content"}
    - Retention: Add pattern interrupts, questions, or visual cues every 15-20 seconds
    - CTA: Place ${videoType === "shorts" ? "at peak engagement (40-50s)" : "mid-video and end"}
  `;
};
