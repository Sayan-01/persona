"use client";
import React, { useMemo, useState } from "react";

type ScoreBreakdown = {
  label: string;
  points: number; // points earned
  max: number; // max points for this category
  hint?: string;
};

type ScoreResult = {
  score: number; // 0-100
  breakdown: ScoreBreakdown[];
  suggestions: string[];
};

const powerWords = [
  "ultimate",
  "best",
  "free",
  "easy",
  "simple",
  "pro",
  "secret",
  "hack",
  "tips",
  "guide",
  "new",
  "fast",
  "quick",
  "insane",
  "boost",
  "master",
  "complete",
  "advanced",
  "step-by-step",
];

function hasNumber(s: string) {
  return /\d/.test(s);
}

function hasBrackets(s: string) {
  return /[\[\](){}]/.test(s);
}

function isQuestion(s: string) {
  return /\?$/.test(s.trim());
}

function toTitleCaseScore(s: string) {
  // Reward Title Case-ish (not all caps, not all lower)
  const hasUpper = /[A-Z]/.test(s);
  const hasLower = /[a-z]/.test(s);
  if (hasUpper && hasLower) return 1;
  return 0;
}

function countPowerWords(s: string) {
  const lower = s.toLowerCase();
  let count = 0;
  for (const w of powerWords) {
    if (lower.includes(w)) count++;
  }
  return count;
}

function uniqueWordCount(s: string) {
  const words = s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  return new Set(words).size;
}

function computeSeoScore(title: string): ScoreResult {
  const t = title.trim();
  if (!t) {
    return {
      score: 0,
      breakdown: [],
      suggestions: ["Enter a title to see its SEO score"],
    };
  }

  const breakdown: ScoreBreakdown[] = [];
  const suggestions: string[] = [];

  // Length (ideal ~ 45-60 chars)
  const length = t.length;
  const lengthMax = 25;
  let lengthPoints = 0;
  if (length >= 40 && length <= 65) {
    lengthPoints = lengthMax;
  } else if (length >= 30 && length <= 75) {
    lengthPoints = Math.round(lengthMax * 0.7);
    suggestions.push("Aim for 45–60 characters for optimal visibility");
  } else {
    lengthPoints = Math.round(lengthMax * 0.4);
    suggestions.push("Title is too short/long; try 45–60 characters");
  }
  breakdown.push({ label: "Length", points: lengthPoints, max: lengthMax, hint: `${length} chars` });

  // Numbers
  const numberMax = 10;
  const numberPoints = hasNumber(t) ? numberMax : 0;
  if (!hasNumber(t)) suggestions.push("Consider adding a number (e.g., 7 Tips)");
  breakdown.push({ label: "Contains Number", points: numberPoints, max: numberMax });

  // Brackets
  const bracketMax = 10;
  const bracketPoints = hasBrackets(t) ? bracketMax : 0;
  if (!hasBrackets(t)) suggestions.push("Try adding brackets for specificity: [2025], (Guide)");
  breakdown.push({ label: "Uses Brackets", points: bracketPoints, max: bracketMax });

  // Question / curiosity
  const questionMax = 10;
  const questionPoints = isQuestion(t) ? questionMax : Math.round(questionMax * 0.4);
  if (!isQuestion(t)) suggestions.push("Pose a question to spark curiosity (optional)");
  breakdown.push({ label: "Curiosity", points: questionPoints, max: questionMax });

  // Power words
  const powerMax = 20;
  const pwCount = countPowerWords(t);
  const powerPoints = Math.min(powerMax, pwCount * 7);
  if (pwCount === 0) suggestions.push("Use 1–2 power words (e.g., Ultimate, Free, Best)");
  breakdown.push({ label: "Power Words", points: powerPoints, max: powerMax, hint: `${pwCount} found` });

  // Uniqueness and clarity
  const uniqMax = 15;
  const uniqWords = uniqueWordCount(t);
  const uniqPoints = Math.min(uniqMax, Math.round((uniqWords / 8) * uniqMax));
  if (uniqWords < 5) suggestions.push("Add more descriptive, unique words");
  breakdown.push({ label: "Uniqueness", points: uniqPoints, max: uniqMax, hint: `${uniqWords} unique words` });

  // Case/style (not all caps, not all lowercase)
  const styleMax = 10;
  const stylePoints = toTitleCaseScore(t) ? styleMax : Math.round(styleMax * 0.4);
  if (!toTitleCaseScore(t)) suggestions.push("Use Title Case for readability");
  breakdown.push({ label: "Readability", points: stylePoints, max: styleMax });

  const maxTotal = breakdown.reduce((a, b) => a + b.max, 0);
  const gotTotal = breakdown.reduce((a, b) => a + b.points, 0);
  const score = Math.max(0, Math.min(100, Math.round((gotTotal / maxTotal) * 100)));

  return { score, breakdown, suggestions };
}

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-300";
  return "text-red-400";
}

function buildPrompt(title: string) {
  return `You are an expert YouTube SEO strategist and copywriter.  
Analyze the given video title ${title} and generate exactly 3 optimized alternative titles.  

Requirements:  
- Return response strictly in JSON format:  
  {"titles":[{"title":"...","seo_score":93},{"title":"...","seo_score":85},{"title":"...","seo_score":90}]}  
- Each title must be between 45-60 characters.  
- Apply best SEO practices: use numbers, brackets/parentheses where natural, emotional or power words, curiosity elements, and ensure uniqueness.  
- Score each title (0-100) based on: keyword relevance, length, uniqueness, readability (Title Case), CTR potential, SEO-friendliness and use best powerfull words.  
- Do not add explanations or extra text outside the JSON.`;
}

const Page2 = () => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [optimizedTitles, setOptimizedTitles] = useState<{ title: string; seo_score: number }[]>([]);

  const result = useMemo(() => computeSeoScore(title), [title]);
  const prompt = useMemo(() => buildPrompt(title), [title]);

  return (
    <section className={`flex items-center flex-col w-full max-w-3xl mx-auto h-full mt-8`}>
      <div className="w-full">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">SEO Score </span>Checker
        </h1>
        <p className="text-sm opacity-60 mt-1">Evaluate your YouTube title instantly</p>

        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-0 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your video title"
            />
          </div>
        </div>

        {/* Score Card */}
        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#ffffff10] md:col-span-1 flex flex-col items-start">
            <p className="text-sm opacity-70">Overall Score</p>
            <div className={`text-5xl font-bold mt-2 ${scoreColor(result.score)}`}>{result.score}</div>
            <p className="text-xs opacity-60 mt-1">out of 100</p>
          </div>

          <div className="p-4 rounded-xl bg-[#ffffff10] md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">Breakdown</h3>
            <ul className="space-y-2">
              {result.breakdown.map((b, i) => {
                const pct = Math.round((b.points / b.max) * 100);
                return (
                  <li
                    key={i}
                    className="text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="opacity-90">
                        {b.label}
                        {b.hint ? ` • ${b.hint}` : ""}
                      </span>
                      <span className="opacity-70">
                        {b.points}/{b.max}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-700/50 rounded mt-1">
                      <div
                        className="h-2 rounded bg-orange-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
              {result.breakdown.length === 0 && <li className="text-sm opacity-60">Start typing a title to see the analysis…</li>}
            </ul>
          </div>
        </div>

        {/* Suggestions */}
        {result.suggestions.length > 0 && (
          <div className="p-4 rounded-xl bg-[#ffffff10] mt-4">
            <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
            <ul className="list-disc list-inside text-sm opacity-90">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Prompt */}
        <div className="p-4 rounded-xl bg-[#ffffff10] mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Enhanced Title</h3>
            <button
              className="text-xs px-2 py-1 rounded bg-zinc-700/60 hover:bg-zinc-700/80"
              onClick={() => navigator.clipboard?.writeText(prompt)}
            >
              Copy
            </button>
          </div>
          <div className="">
            <ul className="list-disc list-inside text-sm opacity-90">
              {optimizedTitles &&
                optimizedTitles.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="opacity-90">{t.title}</span>
                    <span className="opacity-70">{t.seo_score}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={!title.trim() || submitting}
            onClick={async () => {
              if (!title.trim()) return;
              setSubmitting(true);
              setSubmitMsg(null);
              try {
                const res = await fetch("/api/seo-score-api", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: title.trim(),
                    localScore: result.score,
                    breakdown: result.breakdown,
                    prompt,
                  }),
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json().catch(() => ({}));

                if (data) {
                  const dataObj = JSON.parse(data.result); //object
                  console.log("sayan", dataObj);

                  setOptimizedTitles(dataObj.titles);
                }
                setSubmitMsg(data?.message || "Submitted successfully.");
              } catch (e: any) {
                setSubmitMsg(`Submit failed: ${e?.message || "Unknown error"}`);
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-4 h-9 rounded-lg bg-orange-300 text-zinc-900 disabled:opacity-60"
          >
            {submitting ? "Enhancing..." : "Enhance"}
          </button>
          {submitMsg && <span className="text-sm opacity-80">{submitMsg}</span>}
        </div>
      </div>
    </section>
  );
};

export default Page2;
