"use client";
import React, { useMemo, useState } from "react";

type KeywordTags = {
  keywords:string[]
  hashtags:string[]
};

function toHashtag(term: string) {
  // CamelCase simple
  const parts = term.split(" ").filter(Boolean);
  if (parts.length === 1) return `#${parts[0]}`;
  return "#" + parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

function buildPrompt(title: string, script: string) {
  return `You are an expert in YouTube SEO and content optimization.

Task:
Given a video title and script, extract the best **hashtags** and **keywords** to maximize discoverability.
Rules:
- Return only structured JSON.
- Hashtags: 20–40 high-quality hashtags, all lowercase, no duplicates, no symbols except #.
- Keywords: 20–40 keyword phrases, lowercase, no duplicates, sorted by importance.

Input:
Title: "${title}"
Script: """${script}"""

Output JSON example:
{
  "hashtags": ["#fitnessmotivation", "#homeworkout", "#weightlossjourney"],
  "keywords": ["fitness motivation", "home workout tips", "weight loss journey"]
}
`;
}

const Page5 = () => {
  const [title, setTitle] = useState("");
  const [script, setScript] = useState("");
  const [generated, setGenerated] = useState<KeywordTags>();
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(20);

  const prompt = useMemo(() => buildPrompt(title, script), [title, script]);

  const canGenerate = title.trim().length > 3 || script.trim().length > 10;

  return (
    <section className={`flex items-center flex-col w-full max-w-3xl mx-auto h-full mt-8`}>
      <div className="w-full">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">Tags & Keywords </span>Finder
        </h1>
        <p className="text-sm opacity-60 mt-1">Generate the best hashtags and keywords from your title and script</p>

        {/* Title input */}
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-0 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your video title (optional but recommended)"
            />
          </div>
        </div>

        {/* Script input */}
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="box-1 outline-0 h-24 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="📝 Paste your video script or description"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={!canGenerate || submitting}
            onClick={async () => {
              setSubmitting(true);
              setSubmitMsg(null);
              try {
                const res = await fetch("/api/tags-keyword-finder-api", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ prompt }),
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                const parsed = JSON.parse(data.result); // AI returns JSON string
                setGenerated(parsed);
                setSubmitMsg("AI tags generated ✅");
              } catch (e: any) {
                setSubmitMsg(`Failed: ${e?.message || "Unknown error"}`);
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-4 h-9 rounded-lg bg-orange-300 text-zinc-900 disabled:opacity-60"
          >
            {submitting ? "Generating..." : "Generate with AI"}
          </button>
          {/* {generated && (
            <>
              <button
                className="px-3 h-9 rounded-lg bg-zinc-700/60 hover:bg-zinc-700/80 text-sm"
                onClick={() => {
                  const text = hashtags.join(" ");
                  navigator.clipboard?.writeText(text);
                  setCopied("all");
                  setTimeout(() => setCopied(null), 1200);
                }}
              >
                {copied === "all" ? "Copied" : "Copy All"}
              </button>
            </>
          )} */}
        </div>

        {/* Results */}
        {generated && (
          <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* keywords */}
            <div className="p-4 rounded-xl bg-[#ffffff10]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">Suggested Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {generated.keywords.map((h, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 bg-zinc-700/70 rounded-lg text-sm hover:bg-zinc-700/90"
                    title="Copy hashtag"
                  >
                    {h}
                  </button>
                ))}
                {generated.keywords.length === 0 && <span className="text-sm opacity-60">No keywords. Add more content and try again.</span>}
              </div>
            </div>
            {/* Hashtags */}
            <div className="p-4 rounded-xl bg-[#ffffff10]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">Suggested Hashtags</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {generated.hashtags.map((h, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 bg-zinc-700/70 rounded-lg text-sm hover:bg-zinc-700/90"
                    title="Copy hashtag"
                  >
                    {h}
                  </button>
                ))}
                {generated.hashtags.length === 0 && <span className="text-sm opacity-60">No hashtags. Add more content and try again.</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page5;
