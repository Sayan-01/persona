import dedent from "dedent";
import { UserPersona } from "../types";

export const YtContentGeneratePrompt = ({ title, description, userPersona }: { title: string; description: string; userPersona: UserPersona }) => {
  return dedent`
    You are an expert YouTube SEO strategist and AI creative assistant Based on the user input below, generale a JSON response only (no explaination, no markdown, no commentry), containing:
    -Three YouTube video titles optimized for SEO.
    -SEO Score for each title (1 to 100)
    -A compelling video description based on the selected topic.
    -10 YouTube tags relevant to the video.
    User Input: ${title}
    Retum format (JSON only):
    jsonCopy:
    {
    "titles": [
    {
    "title": "Title 1",
    "seo_score": 87
    },
    {
    "title": "Title 2",
    "seo_score":82
    },
    {
    "title": "Title 3",
    "seo_score": 78
    }
    ],
    "description": "Write a professional and engaging YouTube video description here based on the input ", "tags":  ["tag 1", "tag 2", "tag 3", tag 4, tag 5 "tag 6", "tag 7", "tag 8, "tag 8""tag 10"] 
    "image_prompts": [
    "Professional thumbnail style prompt 1 based on the input title and topic.",
    "Professional thumbnail style prompt 2 with different visual concept based on the same topic"
    ]
    }
    Make sure the response includes real content based on the user input and follows this structure exactly.
  `;
};
