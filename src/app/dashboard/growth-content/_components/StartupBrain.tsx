import { useState } from "react";
import { callAiApi, Field } from "../page";
import AIinput from "@/components/global/ai-input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function buildStartupPrompt({
  company,
  product,
  problem,
  solution,
  traction,
  ask,
  tone,
}: {
  company: string;
  product: string;
  problem: string;
  solution: string;
  traction?: string;
  ask?: string; // funding ask or CTA
  tone: string;
}) {
  return `You are a seasoned startup advisor. Create a clean pitch deck copy and an investor cold email.
Company: ${company}
Product: ${product}
Problem: ${problem}
Solution: ${solution}
Traction: ${traction || "N/A"}
Funding ask: ${ask || "N/A"}
Tone: ${tone}

Produce:
1) One-line tagline
2) 6 pitch deck slide texts: problem, solution, market, business model, traction, team
3) A short investor cold email (subject + body).`;
}

function StartupBrain({ setStartupResult }: { setStartupResult: (result: string | null) => void }) {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [traction, setTraction] = useState("");
  const [ask, setAsk] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    const prompt = buildStartupPrompt({ company, product, problem, solution, traction, ask, tone });
    const res = await callAiApi(prompt);
    setStartupResult(res.text || JSON.stringify(res, null, 2));
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <Field
        title="🏀 Company name"
        description="Enter the company name for the startup content"
      >
        <AIinput
          value={company}
          onChange={(e: any) => setCompany(e.target.value)}
          placeholder="Enter company name"
        />
      </Field>

      <div className="mt-3">
        <Field
          title="👽 Product / service"
          description="Describe your product"
        >
          <AIinput
            value={product}
            onChange={(e: any) => setProduct(e.target.value)}
            placeholder="Describe your product"
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field
          title="👀 Problem For Startup"
          description="Enter the problem for the startup content"
        >
          <textarea
            placeholder="Enter the problem for the startup content"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field
          title="🎯 Solution"
          description="Enter the solution for the startup content"
        >
          <textarea
            placeholder="Enter the solution for the startup content"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            rows={3}
            className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <Field
            title="💥 Traction (optional)"
            description="Enter the traction for the startup content"
          >
            <AIinput
              value={traction}
              onChange={(e: any) => setTraction(e.target.value)}
              placeholder="e.g. $10k MRR, 5k users"
            />
          </Field>
        </div>

        <div>
          <Field
            title="💰 Funding ask / CTA"
            description="Enter the funding ask for the startup content"
          >
            <AIinput
              value={ask}
              onChange={(e: any) => setAsk(e.target.value)}
              placeholder="e.g. Raising $500k"
            />
          </Field>
        </div>
      </div>

      <div className="mt-3">
        <Field
          title="🎯 Content Tone"
          description="Enter the tone for the startup content"
        >
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-white dark:bg-zinc-800 box p-3 font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-zinc-600 transition-all outline-none"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="inspiring">Inspiring</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Button
          onClick={onGenerate}
          disabled={loading}
          className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
        >
          {loading ? (
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

export default StartupBrain;