"use client";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { getRuns } from "../../../../../sevices/getRun";

type Content = {
  id: number;
  userId: string;
  content: SubContent;
  createdAt: string;
};

type SubContent = {
  description: string;
  tags: string[];
  titles: [
    {
      seo_score: number;
      title: string;
    }
  ];
  image_prompts: string[];
};

const page = () => {
  const [userTitle, setUserTitle] = useState<string>("");
  const [userDesc, setUserDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<Content | null>(null);

  const onGenerate = async () => {
    try {
      const result = await fetch("/api/yt-content-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userTitle,
          userDesc,
        }),
      });
      const data = await result.json();
      console.log(data);

      while (true) {
        const run = await getRuns(data.runId);

        if (run.status === "Completed") {
          console.log("✅ Done:", run.output);
          return run.output;
        } else if (run.status === "Failed" || run.status === "Cancelled") {
          console.log("❌ Failed:", run.error);
          return null;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center  flex-col w-full max-w-3xl mx-auto h-full mt-8">
      {/* Input */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">AI Content </span>Generator
        </h1>
        <p className="text-sm opacity-60 mt-1">What would like to create today</p>
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              onChange={(e) => setUserTitle(e.target.value)}
              className="outline-0   resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your video title"
            />
          </div>
        </div>
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <textarea
              onChange={(e) => setUserDesc(e.target.value)}
              className="outline-0 h-16 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Descripbe your video context"
            />
          </div>
          <div className=" flex gap-3 ">
            <button
              disabled={loading || !(userTitle.length > 5 && userDesc.length > 5)}
              className="h-8 w-8 flex items-center justify-center ml-auto bg-zinc-300 rounded-full disabled:opacity-60"
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
      {/* Loading State */}
      {loading && (
        <div className="w-full mt-6 p-4 rounded-xl bg-[#ffffff10]">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-orange-300 border-t-transparent rounded-full"></div>
            <p>Generating content...</p>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="w-full mt-6">
        {content && (
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
            <div className="mt-3">
              <h3 className="font-medium text-sm">Tags:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {content.content.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-zinc-800 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-medium text-sm">Titles:</h3>
              <ul className="list-disc list-inside">
                {content.content.titles.map((t, i) => (
                  <li key={i}>
                    {t.title} <span className="text-xs text-gray-400">(SEO: {t.seo_score})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
