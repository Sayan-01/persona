import dedent from "dedent";

export const EcommerceBrainPrompt = ({
  name,
  features,
  tone,
  length,
  cta = "Buy Now",
  userPersona,
}: {
  name: string;
  features: string;
  tone: string;
  length: "short" | "medium" | "long";
  cta?: string;
  userPersona: string;
}) => {
  const lengthGuide = {
    short: "50-75 words",
    medium: "100-150 words",
    long: "200-300 words",
  };

  return dedent`
    You are an expert e-commerce copywriter specializing in SEO-optimized product listings.
    Create compelling product content based on the inputs below.
    Respond ONLY with valid JSON—no markdown, no explanation, no preamble.

    INPUT:
    Product Name: ${name}
    Key Features: ${features}
    Tone: ${tone}
    Length: ${length} (${lengthGuide[length]})
    CTA: ${cta}

    OUTPUT FORMAT:
    {
      "title": "SEO-optimized product title (60-70 chars, include primary keyword)",
      "meta": "Compelling meta description (150-160 chars, include CTA)",
      "description": "Full product description based on length requirement",
      "adCopy": "Short social media ad copy (1-2 sentences, punchy, includes CTA)"
    }

    REQUIREMENTS:
    - Title: Include product name + primary keyword, compelling and click-worthy
    - Meta: Must be 150-160 chars, include key benefit and CTA
    - Description: ${lengthGuide[length]}, naturally integrate all keywords, highlight features with benefits
    - Ad Copy: 20-40 words, attention-grabbing, include "${cta}" CTA
    - Tone: Match ${tone} style throughout (${userPersona as string})
    - SEO: Use keywords naturally 2-3 times, avoid keyword stuffing
    - Format: Use line breaks and bullet points in description for readability
  `;
};
