"use client";

import { useState } from "react";
import { ArrowUp, Copy, Check } from "lucide-react";
import { useCredits } from "@/hooks/credit-provider";

type ScriptContent = {
  optimized_script: {
    hook: string;
    intro: string;
    main_content: string;
    cta: string;
    outro: string;
  };
  improvements: string[];
  engagement_score: number;
  pacing_notes: string;
};

export default function Page6() {
  const [userInput, setUserInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [videoType, setVideoType] = useState<"shorts" | "long">("shorts");
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<ScriptContent | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const { decrementCredits } = useCredits();

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const onGenerate = async () => {
    setLoading(true);
    setContent(null);

    try {
      const result = await fetch("/api/optimize-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          title,
          videoType,
        }),
      });

      const data = await result.json();

      if (data) {
        const dataObj = JSON.parse(data.data);
        decrementCredits(100);
        setContent(dataObj);
      }
      setLoading(false);
    } catch (error) {
      console.error("Generation error:", error);
      setLoading(false);
    }
  };

  const getFullScript = () => {
    if (!content) return "";
    const { hook, intro, main_content, cta, outro } = content.optimized_script;
    return `${hook}\n\n${intro}\n\n${main_content}\n\n${cta}\n\n${outro}`;
  };

  return (
    <section className="flex items-center flex-col w-full max-w-4xl mx-auto h-full mt-8 px-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">Script </span>Optimizer
        </h1>
        <p className="text-sm opacity-60 mt-1">Transform your raw script into an engagement powerhouse</p>

        {/* Video Type Selector */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setVideoType("shorts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${videoType === "shorts" ? "bg-orange-300 text-black" : "bg-[#ffffff08] text-white/70 hover:bg-[#ffffff12]"}`}
          >
            Shorts (60s)
          </button>
          <button
            onClick={() => setVideoType("long")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${videoType === "long" ? "bg-orange-300 text-black" : "bg-[#ffffff08] text-white/70 hover:bg-[#ffffff12]"}`}
          >
            Long Form (8-12min)
          </button>
        </div>

        {/* Title Input */}
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-0 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🎬 Enter your video title"
            />
          </div>
        </div>

        {/* Script Input */}
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="outline-0 h-30 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="📝 Paste your raw script here..."
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              disabled={loading || !(userInput.length > 10 && title.length > 5)}
              className="h-8 w-8 flex items-center justify-center ml-auto bg-zinc-300 rounded-full disabled:opacity-60 transition-opacity"
              onClick={userInput.length > 10 && title.length > 5 ? onGenerate : undefined}
            >
              <ArrowUp
                className="text-zinc-700"
                size={20}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full mt-4 p-4 rounded-xl bg-[#ffffff10]">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-orange-300 border-t-transparent rounded-full"></div>
            <p>Optimizing your script...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {content && (
        <div className="w-full mt-4 space-y-4">
          {/* Engagement Score */}
          <div className="p-4 rounded-xl bg-[#ffffff10] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-70">Engagement Score</h3>
              <p className="text-2xl font-bold text-orange-300 mt-1">{content.engagement_score}/100</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium opacity-70">Video Type</h3>
              <p className="text-lg font-semibold mt-1">{videoType === "shorts" ? "Shorts" : "Long Form"}</p>
            </div>
          </div>

          {/* Full Script with Copy */}
          <div className="p-4 rounded-xl bg-[#ffffff10] relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Complete Optimized Script</h3>
              <button
                onClick={() => copyToClipboard(getFullScript(), "full")}
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-700/70 hover:bg-zinc-600 transition-colors flex items-center gap-1.5"
              >
                {copiedSection === "full" ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy All
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {Object.entries(content.optimized_script).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-[#ffffff08] p-3 rounded-lg relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-orange-300 uppercase tracking-wide">{key.replace("_", " ")}</h4>
                    <button
                      onClick={() => copyToClipboard(value, key)}
                      className="text-xs px-2 py-1 rounded bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors flex items-center gap-1"
                    >
                      {copiedSection === key ? (
                        <>
                          <Check size={12} /> Copied
                        </>
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                  <p className="text-white/80 whitespace-pre-wrap leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <h3 className="text-lg font-semibold mb-3">Key Improvements</h3>
            <ul className="space-y-2">
              {content.improvements.map((improvement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-orange-300 mt-1">•</span>
                  <span className="text-white/80">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pacing Notes */}
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <h3 className="text-lg font-semibold mb-2">Pacing & Timing</h3>
            <p className="text-sm text-white/80">{content.pacing_notes}</p>
          </div>
        </div>
      )}
    </section>
  );
}
