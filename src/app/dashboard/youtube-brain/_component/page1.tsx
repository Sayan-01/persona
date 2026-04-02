"use client";

import { useCredits } from "@/hooks/credit-provider";
import { copyToClipboard } from "@/utils/helper";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

type SubContent = {
  video_description: string;
  titles: {
    title: string;
    seo_score: number;
  }[];
};

const Page1 = () => {
  const [userTitle, setUserTitle] = useState<string>("");
  const [userDesc, setUserDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<SubContent | null>();
  const { decrementCredits } = useCredits();

  const onGenerate = async () => {
    setLoading(true);
    setContent(null);

    try {
      const result = await fetch("/api/title-desc-optimizer", {
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

  return (
    <section className={`flex items-center  flex-col w-full max-w-3xl mx-auto h-full mt-8`}>
      <div className="w-full ">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">Title & Description </span>Optimizer
        </h1>
        <p className="text-sm opacity-60 mt-1">Optimize your YouTube title and description</p>
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              onChange={(e) => setUserTitle(e.target.value)}
              className="outline-0   resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your current video title"
            />
          </div>
        </div>
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <textarea
              onChange={(e) => setUserDesc(e.target.value)}
              className="outline-0 h-16 box-1 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Describe your video context"
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
      {content && (
        <div className="w-full mt-4 grid grid-cols-1 gap-4">
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-2">Suggested Titles</h3>
              <ul className="list-disc list-inside">
                {content.titles.map((t, i) => (
                  <li
                    key={i}
                    className=" bg-zinc-700/70 rounded-lg px-3 py-2 mb-2 text-sm"
                  >
                    {t.title} <span className="text-xs text-gray-400 ">(SEO: {t.seo_score})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#ffffff10] relative">
            <h3 className="text-lg font-semibold mb-2">Video Description</h3>

            <button
              onClick={() => copyToClipboard(content.video_description)}
              className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-zinc-700/70 hover:bg-zinc-600"
            >
              Copy
            </button>

            <p className="text-sm whitespace-pre-wrap">{content.video_description}</p>
          </div>
        </div>
      )}

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

export default Page1;
