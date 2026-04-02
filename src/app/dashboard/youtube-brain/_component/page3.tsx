"use client";
import { ArrowUp, Copy, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/utils/helper";
import { useCredits } from "@/hooks/credit-provider";

type ScriptContent = {
  hook: string;
  intro: string;
  main_content: string;
  cta: string;
  outro: string;
};

type SubContent = {
  video_script: ScriptContent;
  tags: string[];
  titles: {
    title: string;
    seo_score: number;
  }[];
};

const Page3 = () => {
  const [userTitle, setUserTitle] = useState<string>("");
  const [userDesc, setUserDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<SubContent | null>(null);
  const [videoType, setVideoType] = useState<"shorts" | "long">("shorts");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const { decrementCredits } = useCredits();

  const onGenerate = async () => {
    setLoading(true);
    setContent(null);

    try {
      const result = await fetch("/api/yt-content-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userTitle,
          userDesc,
          videoType,
        }),
      });

      const data = await result.json();

      if (data) {
        const dataObj = JSON.parse(data.data);
        decrementCredits(100);
        console.log("Generated content:", dataObj);
        setContent(dataObj);
      }
      setLoading(false);
    } catch (error) {
      console.error("Generation error:", error);
      setLoading(false);
    }
  };

  const handleCopy = (text: string, section: string) => {
    copyToClipboard(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getFullScript = () => {
    if (!content) return "";
    const { hook, intro, main_content, cta, outro } = content.video_script;
    return `${hook}\n\n${intro}\n\n${main_content}\n\n${cta}\n\n${outro}`;
  };

  return (
    <section className={`flex items-center flex-col w-full max-w-4xl mx-auto h-full mt-8 px-4`}>
      <div className="w-full">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">AI Content </span>Generator
        </h1>
        <p className="text-sm opacity-60 mt-1">What would you like to create today</p>

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
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
              className="outline-0 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your video title"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <textarea
              value={userDesc}
              onChange={(e) => setUserDesc(e.target.value)}
              className="outline-0 h-16 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 box"
              placeholder="🏀 Describe your video context"
            />
          </div>
          <div className="flex gap-3">
            <button
              disabled={loading || !(userTitle.length > 5 && userDesc.length > 5)}
              className="h-8 w-8 flex items-center justify-center ml-auto bg-zinc-300 rounded-full disabled:opacity-60 transition-opacity"
              onClick={userTitle.length > 5 && userDesc.length > 5 ? onGenerate : undefined}
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
      {content && (
        <div className="w-full mt-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Generated Content</h1>
              <p className="text-sm opacity-60 mt-1">Your optimized YouTube content is ready</p>
            </div>
            <button
              onClick={() => {
                setContent(null);
                setUserTitle("");
                setUserDesc("");
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#ffffff08] text-white/70 hover:bg-[#ffffff12] transition-colors"
            >
              Generate New
            </button>
          </div>

          {/* Content Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Tags and Titles */}

            <div className="p-4 rounded-xl bg-[#ffffff10] lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Complete Optimized Script</h3>
                <button
                  onClick={() => handleCopy(getFullScript(), "full")}
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
                {Object.entries(content.video_script).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-[#ffffff08] p-3 rounded-lg relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-orange-300 uppercase tracking-wide">{key.replace("_", " ")}</h4>
                      <button
                        onClick={() => handleCopy(value, key)}
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

            {/* Right Column - Script */}
            <div className="space-y-4">
              {/* Tags */}
              <div className="p-4 rounded-xl bg-[#ffffff10]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Video Tags</h3>
                  <button
                    onClick={() => copyToClipboard(content.tags.join(", "))}
                    className="text-xs px-3 py-1.5 rounded-lg bg-zinc-700/70 hover:bg-zinc-600 transition-colors flex items-center gap-1.5"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-zinc-700/70 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Titles */}
              <div className="p-4 rounded-xl bg-[#ffffff10]">
                <h3 className="text-lg font-semibold mb-3">YouTube Video Titles</h3>
                <ul className="space-y-2">
                  {content.titles.map((t, i) => (
                    <li
                      key={i}
                      className="bg-zinc-700/70 rounded-lg px-3 py-2 text-sm"
                    >
                      {t.title} <span className="text-xs text-gray-400">(SEO: {t.seo_score})</span>
                      
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="w-full mt-4 p-4 rounded-xl bg-[#ffffff10]">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-orange-300 border-t-transparent rounded-full"></div>
            <p>Generating content...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page3;
