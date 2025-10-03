"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info, RefreshCw } from "lucide-react";
import AIinput from "@/components/global/ai-input";

/**
 * PersonaAI - Brains Components
 * Single-file React component with 4 "brains":
 * - EcommerceBrain
 * - EdTechBrain
 * - StartupBrain
 * - MarketingBrain
 *
 * This file is intended to be dropped into a Next.js + Tailwind project (app router).
 * It contains UI, prompt builders, and placeholder API calls for integration with your AI backend.
 *
 * Usage:
 * - Place it in a page or component and render <PersonaBrainsApp />
 * - Wire your AI API by implementing `callAiApi(prompt, options)` to hit your backend or OpenAI/Resend/Respective provider
 *
 * Styling uses Tailwind utility classes. All components are kept minimal and self-contained for clarity.
 */

// ---------------------- Shared Utilities & Types ----------------------

type Platform = "linkedin" | "instagram" | "twitter" | "youtube" | "facebook";

type GenerateResult = {
  title?: string;
  text?: string;
  variants?: string[];
  meta?: string;
};

async function callAiApi(prompt: string, options?: { temperature?: number }) {
  // TODO: Replace with your provider endpoint (/api/ai/generate) or direct OpenAI call from server.
  // This placeholder demonstrates the expected shape and returns a mocked response when dev mode.
  try {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, temperature: options?.temperature ?? 0.7 }),
    });
    if (!res.ok) throw new Error("AI API error: " + res.statusText);
    return await res.json();
  } catch (err) {
    // Fallback mock for local dev (so the UI still demonstrates behavior)
    console.warn("AI API call failed, using mock", err);
    return {
      title: "(mock) Generated title",
      text: "(mock) Generated content for prompt: " + prompt.slice(0, 180) + "...",
      variants: ["(mock) Variant A", "(mock) Variant B"],
      meta: "(mock) meta description",
    };
  }
}

function downloadCSV(filename: string, rows: Array<Record<string, string>>) {
  const header = Object.keys(rows[0] || {}).join(",") + "\n";
  const body = rows
    .map((r) =>
      Object.values(r)
        .map((v) => `"${(v || "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
  const csv = header + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseSimpleCSV(csv: string) {
  const lines = csv.trim().split(/\r?\n/);
  const header =
    lines
      .shift()
      ?.split(",")
      .map((h) => h.trim()) || [];
  return lines.map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
}

function getSuggestedPostingTimes(platform: Platform) {
  // Simple heuristics — replace with analytics-driven logic later
  switch (platform) {
    case "linkedin":
      return ["08:00", "12:00", "17:00"];
    case "instagram":
      return ["10:00", "13:00", "20:00"];
    case "twitter":
      return ["09:00", "12:30", "18:00"];
    case "youtube":
      return ["15:00", "18:00"];
    default:
      return ["09:00", "12:00", "18:00"];
  }
}

// ---------------------- Small UI primitives ----------------------

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <label className={`block text-sm font-medium text-slate-700 ${className}`}>{children}</label>;
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="mt-2">{children}</div>;
}

function ResultCard({ title, content, extra }: { title?: string; content?: string; extra?: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <pre className="whitespace-pre-wrap text-sm text-slate-800">{content}</pre>
      {extra}
    </div>
  );
}

// ---------------------- Prompt Builders ----------------------

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

function buildEdTechPrompt({ topic, level, objectives, format }: { topic: string; level: string; objectives: string; format: "outline" | "summary" | "quiz" }) {
  return `You are an experienced educator. Produce a ${format} for the topic: ${topic}.
Student level: ${level}
Learning objectives: ${objectives}
If outline: produce 5-8 lesson points with short notes. If quiz: create 8 multiple-choice questions with 4 options and mark the correct answer. If summary: provide a concise study note of ~200 words.`;
}

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

function buildMarketingPrompt({
  campaignName,
  goal,
  platforms,
  durationDays,
  numberOfPosts,
}: {
  campaignName: string;
  goal: string;
  platforms: Platform[];
  durationDays: number;
  numberOfPosts: number;
}) {
  return `You are a senior marketing manager. For campaign: ${campaignName}
Goal: ${goal}
Platforms: ${platforms.join(",")}
Duration (days): ${durationDays}
Create ${numberOfPosts} post ideas / captions and adapt each into platform-specific variants (LinkedIn long, Instagram caption + hashtag set, Twitter/X short thread starter). Also provide a simple schedule with dates spaced evenly across the duration and suggested posting times for each platform.`;
}

// ---------------------- Brain Components ----------------------

export default function PersonaBrainsApp() {
  const [activeTab, setActiveTab] = useState<"ecommerce" | "edtech" | "startup" | "marketing">("ecommerce");

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="w-full flex min-[1150px]:flex-row flex-col gap-0 min-[1150px]:h-full"
      >
        {/* Top nav like content-brain */}
        <div className="flex-1 border-r h-full">
          <nav className="flex border-b min-[1316px]:justify-between justify-end h-12">
            <div className="min-[1316px]:flex items-center py-2 px-2 hidden">
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <TabsList className="p-0 flex h-12 bg-transparent px-0 ">
              <TabsTrigger
                value="ecommerce"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🛍️ <span className="hidden min-[535px]:block">E-commerce</span>
              </TabsTrigger>
              <TabsTrigger
                value="edtech"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🎓 <span className="hidden min-[535px]:block">EdTech</span>
              </TabsTrigger>
              <TabsTrigger
                value="startup"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🚀 <span className="hidden min-[535px]:block">Startup</span>
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                📣 <span className="hidden min-[535px]:block">Marketing</span>
              </TabsTrigger>
            </TabsList>
          </nav>

          {/* Tabs content area */}
          <section className="min-[1150px]:h-[calc(100%-48px)] h-full overflow-scroll box">
            <TabsContent value="ecommerce">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">E-commerce Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Generate listings, ad copy and bulk product content</p>
                  </div>
                </div>
                <EcommerceBrain />
              </div>
            </TabsContent>

            <TabsContent value="edtech">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">EdTech Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Outlines, quizzes and study notes</p>
                  </div>
                </div>
                <EdTechBrain />
              </div>
            </TabsContent>

            <TabsContent value="startup">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Startup Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Pitch copy and cold outreach</p>
                  </div>
                </div>
                <StartupBrain />
              </div>
            </TabsContent>

            <TabsContent value="marketing">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Marketing Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Campaign ideas and schedules</p>
                  </div>
                </div>
                <MarketingBrain />
              </div>
            </TabsContent>
          </section>
        </div>
      </Tabs>
    </div>
  );
}

// ---------------------- Ecommerce Brain ----------------------

function EcommerceBrain() {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [cta, setCta] = useState("Buy Now");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);

  async function onGenerate() {
    setLoading(true);
    const prompt = buildEcommercePrompt({ name, features, targetKeywords: keywords, tone, length, cta });
    const res = await callAiApi(prompt);
    setResult(res);
    setLoading(false);
  }

  // Bulk demo: accept CSV with product rows: name,features,keywords
  const [bulkRows, setBulkRows] = useState<Array<Record<string, string>>>([]);

  function onBulkUpload(csvText: string) {
    const rows = parseSimpleCSV(csvText);
    setBulkRows(rows);
  }

  async function generateBulk() {
    if (bulkRows.length === 0) return;
    setLoading(true);
    const outputs: Array<Record<string, string>> = [];
    for (const row of bulkRows) {
      const p = buildEcommercePrompt({
        name: row["name"] || row["product"] || "",
        features: row["features"] || "",
        targetKeywords: row["keywords"] || "",
        tone,
        length,
        cta,
      });
      // for performance, you may want to batch requests server-side
      const r = await callAiApi(p);
      outputs.push({ name: row["name"], title: r.title || "", description: r.text || "" });
    }
    downloadCSV("ecommerce_bulk_output.csv", outputs);
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label>Product name</Label>
          <Field>
            <AIinput
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </Field>
        </div>

        <div>
          <Label>Key features (comma separated)</Label>
          <Field>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
            />
          </Field>
        </div>

        <div>
          <Label>Target keywords (comma separated)</Label>
          <Field>
            <AIinput
              value={keywords}
              onChange={(e: any) => setKeywords(e.target.value)}
              placeholder="e.g. ceramic mug, blue mug"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Tone</Label>
            <Field>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="luxury">Luxury</option>
                <option value="fun">Fun</option>
              </select>
            </Field>
          </div>

          <div>
            <Label>Length</Label>
            <Field>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as any)}
                className="w-full border rounded p-2"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </Field>
          </div>
        </div>

        <div>
          <Label>CTA (optional)</Label>
          <Field>
            <AIinput
              value={cta}
              onChange={(e: any) => setCta(e.target.value)}
              placeholder="Buy Now"
            />
          </Field>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={() => {
              const sample = "name,features,keywords\nBlue Mug,16oz ceramic;microwave safe;dishwasher safe,ceramic mug;blue mug";
              onBulkUpload(sample);
              alert("Sample CSV loaded into Bulk Upload (see Bulk section)");
            }}
            className="px-4 py-2 border rounded"
          >
            Load sample CSV
          </button>
        </div>

        <div className="mt-6">
          <Label>Bulk Upload CSV (name,features,keywords)</Label>
          <Field>
            <textarea
              placeholder={`name,features,keywords\nProduct A,Feat1;Feat2,kw1;kw2`}
              className="w-full border rounded p-2"
              rows={4}
              onChange={(e) => onBulkUpload(e.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={generateBulk}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Generate Bulk
              </button>
              <button
                onClick={() => downloadCSV("ecommerce_bulk_template.csv", [{ name: "name", features: "features", keywords: "keywords" }])}
                className="px-4 py-2 border rounded"
              >
                Download Template
              </button>
            </div>
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Result</h3>
        {result ? (
          <ResultCard
            title={result.title}
            content={`${result.meta ? result.meta + "\n\n" : ""}${result.text || ""}`}
            extra={<CopyButton text={`${result.meta || ""}\n\n${result.text || ""}`} />}
          />
        ) : (
          <div className="text-sm text-slate-600">No result yet — enter product details and click Generate.</div>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-2 px-2 py-1 border rounded text-sm"
    >
      Copy
    </button>
  );
}

// ---------------------- EdTech Brain ----------------------

function EdTechBrain() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("High School");
  const [objectives, setObjectives] = useState("");
  const [format, setFormat] = useState<"outline" | "summary" | "quiz">("outline");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    const prompt = buildEdTechPrompt({ topic, level, objectives, format });
    const res = await callAiApi(prompt);
    // If API returns structured data use it. Here we assume `res.text` contains the content.
    setResult(res.text || JSON.stringify(res, null, 2));
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Topic</Label>
        <Field>
          <AIinput
            value={topic}
            onChange={(e: any) => setTopic(e.target.value)}
            placeholder="Enter topic"
          />
        </Field>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <Label>Student level</Label>
            <Field>
              <AIinput
                value={level}
                onChange={(e: any) => setLevel(e.target.value)}
                placeholder="e.g. High School"
              />
            </Field>
          </div>

          <div>
            <Label>Format</Label>
            <Field>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full border rounded p-2"
              >
                <option value="outline">Lesson Outline</option>
                <option value="summary">Summary / Notes</option>
                <option value="quiz">Quiz (MCQs)</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="mt-3">
          <Label>Learning objectives (comma separated)</Label>
          <Field>
            <textarea
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              rows={4}
              className="w-full border rounded p-2"
            />
          </Field>
        </div>

        <div className="mt-4">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Output</h3>
        {result ? <ResultCard content={result} /> : <div className="text-sm text-slate-600">No output yet.</div>}
      </div>
    </div>
  );
}

// ---------------------- Startup Brain ----------------------

function StartupBrain() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [traction, setTraction] = useState("");
  const [ask, setAsk] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    const prompt = buildStartupPrompt({ company, product, problem, solution, traction, ask, tone });
    const res = await callAiApi(prompt);
    setResult(res.text || JSON.stringify(res, null, 2));
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Company name</Label>
        <Field>
          <AIinput
            value={company}
            onChange={(e: any) => setCompany(e.target.value)}
            placeholder="Enter company name"
          />
        </Field>

        <div className="mt-3">
          <Label>Product / service</Label>
          <Field>
            <AIinput
              value={product}
              onChange={(e: any) => setProduct(e.target.value)}
              placeholder="Describe your product"
            />
          </Field>
        </div>

        <div className="mt-3">
          <Label>Problem</Label>
          <Field>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={3}
              className="w-full border rounded p-2"
            />
          </Field>
        </div>

        <div className="mt-3">
          <Label>Solution</Label>
          <Field>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              rows={3}
              className="w-full border rounded p-2"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <Label>Traction (optional)</Label>
            <Field>
              <AIinput
                value={traction}
                onChange={(e: any) => setTraction(e.target.value)}
                placeholder="e.g. $10k MRR, 5k users"
              />
            </Field>
          </div>

          <div>
            <Label>Funding ask / CTA</Label>
            <Field>
              <AIinput
                value={ask}
                onChange={(e: any) => setAsk(e.target.value)}
                placeholder="e.g. Raising $500k"
              />
            </Field>
          </div>
        </div>

        <div className="mt-3">
          <Label>Tone</Label>
          <Field>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="inspiring">Inspiring</option>
            </select>
          </Field>
        </div>

        <div className="mt-4">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            {loading ? "Generating..." : "Generate Pitch + Email"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Pitch & Email</h3>
        {result ? <ResultCard content={result} /> : <div className="text-sm text-slate-600">No output yet.</div>}
      </div>
    </div>
  );
}

// ---------------------- Marketing Brain ----------------------

function MarketingBrain() {
  const [campaignName, setCampaignName] = useState("");
  const [goal, setGoal] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["linkedin", "instagram"]);
  const [duration, setDuration] = useState(30);
  const [numberOfPosts, setNumberOfPosts] = useState(12);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const togglePlatform = (p: Platform) => {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  async function onGenerate() {
    setLoading(true);
    const prompt = buildMarketingPrompt({ campaignName, goal, platforms, durationDays: duration, numberOfPosts });
    const res = await callAiApi(prompt);
    // Expect res to contain list of post ideas + adapted variants and a schedule
    setResult(res);
    setLoading(false);
  }

  function exportSchedule() {
    if (!result?.schedule || !result?.posts) return alert("No schedule generated yet");
    downloadCSV(
      "campaign_schedule.csv",
      result.posts.map((p: any, i: number) => ({ date: p.date || "", platform: p.platform || "", copy: p.copy || "" }))
    );
  }

  const suggestedTimes = useMemo(() => {
    // pick first selected platform's suggested times
    return platforms.length ? getSuggestedPostingTimes(platforms[0]) : getSuggestedPostingTimes("linkedin");
  }, [platforms]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Campaign name</Label>
        <Field>
          <AIinput
            value={campaignName}
            onChange={(e: any) => setCampaignName(e.target.value)}
            placeholder="Enter campaign name"
          />
        </Field>

        <div className="mt-3">
          <Label>Goal</Label>
          <Field>
            <AIinput
              value={goal}
              onChange={(e: any) => setGoal(e.target.value)}
              placeholder="e.g. lead gen, awareness"
            />
          </Field>
        </div>

        <div className="mt-3">
          <Label>Platforms</Label>
          <Field>
            <div className="flex gap-2 flex-wrap">
              {(["linkedin", "instagram", "twitter", "youtube", "facebook"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1 rounded ${platforms.includes(p) ? "bg-slate-800 text-white" : "border"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <Label>Duration (days)</Label>
            <Field>
              <AIinput
                type="number"
                value={duration}
                onChange={(e: any) => setDuration(Number(e.target.value))}
                placeholder="30"
              />
            </Field>
          </div>
          <div>
            <Label>Number of posts</Label>
            <Field>
              <AIinput
                type="number"
                value={numberOfPosts}
                onChange={(e: any) => setNumberOfPosts(Number(e.target.value))}
                placeholder="12"
              />
            </Field>
          </div>
        </div>

        <div className="mt-3">
          <Label>Suggested posting times</Label>
          <Field>
            <div className="flex gap-2">
              {suggestedTimes.map((t) => (
                <div
                  key={t}
                  className="text-sm px-2 py-1 border rounded"
                >
                  {t}
                </div>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            {loading ? "Generating..." : "Generate Campaign"}
          </button>
          <button
            onClick={exportSchedule}
            className="px-4 py-2 border rounded"
          >
            Export Schedule
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Campaign Output Preview</h3>
        {result ? (
          <div className="space-y-3">
            <ResultCard
              title="Top Post Idea"
              content={result.topIdea || result.text || "No text"}
            />
            <div className="border rounded p-3 bg-slate-50">
              <h4 className="font-semibold mb-2">Generated Schedule</h4>
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result.schedule || result.posts || result, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">No campaign generated yet. Provide inputs and click Generate.</div>
        )}
      </div>
    </div>
  );
}

// ---------------------- End of file ----------------------

/*
Notes & Next steps:
- Implement server-side API route /api/ai/generate to securely call your chosen LLM provider and return JSON.
- For large/bulk generation, batch requests server-side to avoid client timeouts and rate limits.
- Replace mocked fallback with structured parsing (e.g., instruct LLM to return JSON). You can use a schema validator on the server (Zod) to guarantee structure.
- To support multi-user / teams, connect results to your database (MongoDB/Postgres) and add permissions / drafts.
- Add analytics to pick posting times using real performance data (GA / social insights).
*/
