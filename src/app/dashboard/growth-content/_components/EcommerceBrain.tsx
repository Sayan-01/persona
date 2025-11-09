import { useEffect, useState } from "react";
import AIinput from "@/components/global/ai-input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { callAiApi, parseSimpleCSV } from "@/utils/helper";
import { Field } from "./growth-content-component";
import { EcommerceBrainPrompt } from "../../../../../AI/growth-brain/EcommerceBrainPrompt";
import { getUserPersona } from "../../../../../server/user-profile";
import { useCredits } from "@/hooks/credit-provider";
import { useSession } from "next-auth/react";

function buildEcommercePrompt({
  name,
  features,
  targetKeywords,
  tone,
  length,
  cta,
}: {
  name: string;
  features: string;
  targetKeywords: string;
  tone: string;
  length: "short" | "medium" | "long";
  cta?: string;
}) {
  return `Write an SEO-friendly product listing for an e-commerce store.

Product name: ${name}
Key features: ${features}
Target keywords (use naturally): ${targetKeywords}
Tone: ${tone}
Length: ${length}
Include: a catchy title, a short descriptive meta (max 160 chars), a product description (highlight features), and one short ad copy for social.
If CTA provided: include CTA "${cta || "Buy Now"}".

Format the output as JSON with keys: title, meta, description, adCopy.`;
}

type GenerateResult = {
  title?: string;
  text?: string;
  variants?: string[];
  meta?: string;
};

function EcommerceBrain({ setEcommerceResult }: { setEcommerceResult: (result: GenerateResult | null) => void }) {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [cta, setCta] = useState("Buy Now");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [generating, setGenerating] = useState(false);
  const [userPersona, setUserPersona] = useState<any>(null);

  const { decrementCredits } = useCredits();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserPersona = async () => {
      if (session?.user?.id) {
        const userPersonaDetails = await getUserPersona(session?.user?.id);
        setUserPersona(userPersonaDetails);
      }
    };
    fetchUserPersona();
  }, [session]);

  async function onGenerate() {
    const ideaPrompt = EcommerceBrainPrompt({
      name: name,
      features: features,
      tone: tone,
      length: length,
      cta: cta,
      userPersona: JSON.stringify(userPersona),
    });
    setGenerating(true);
    try {
      const res = await fetch("/api/growth-content-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: ideaPrompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI template.");
      }
      const data = await res.json(); //json

      console.log(data);

      if (data) {
        decrementCredits(100);
        const dataObj = JSON.parse(data); //object
        setResult(dataObj);
      }

      setGenerating(false);
    } catch (error) {
      console.log("Error in idea generation", error);
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-8">
      <Field
        title="🏀 Product name"
        description="Enter product name or product title"
      >
        <AIinput
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Enter product name"
        />
      </Field>

      <div>
        <Field
          title="🎯 Key features"
          description="Enter key features of the product with comma separated"
        >
          <textarea
            placeholder="Enter key features of the product with comma separated way"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
            rows={4}
          />
        </Field>
      </div>

      <div>
        <Field
          title="#️⃣ Target keywords"
          description="Enter target keywords of the product with comma separated"
        >
          <AIinput
            value={keywords}
            onChange={(e: any) => setKeywords(e.target.value)}
            placeholder="e.g. ceramic mug, blue mug"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Field
            title="🎨 Content Tone"
            description="Select tone of the product"
          >
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-white dark:bg-zinc-800 p-3 box font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-zinc-600 transition-all outline-none"
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="luxury">Luxury</option>
              <option value="fun">Fun</option>
            </select>
          </Field>
        </div>

        <div>
          <Field
            title="⚖️ Length"
            description="Select length of the product"
          >
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as any)}
              className="bg-white dark:bg-zinc-800 p-3 box font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-zinc-600 transition-all outline-none"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </Field>
        </div>
      </div>

      <div>
        <Field
          title="💥 CTA (optional)"
          description="Enter CTA of the product"
        >
          <AIinput
            value={cta}
            onChange={(e: any) => setCta(e.target.value)}
            placeholder="Buy Now"
          />
        </Field>
      </div>

      <div className="mt-2 flex gap-2">
        <Button
          onClick={onGenerate}
          className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
        >
          {generating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>✨ Generate</>
          )}
        </Button>
      </div>
    </div>
  );
}

export default EcommerceBrain;
