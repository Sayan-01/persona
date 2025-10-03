"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";

type SubContent = {
  video_script: string;
  tags: string[];
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
        }),
      });

      const data = await result.json();

      if (data) {
        const dataObj = JSON.parse(data.data);
        setContent(dataObj);
      }
      setLoading(false);
    } catch (error) {
      console.error("Generation error:", error);
      setLoading(false);
    }
  };

  return (
    <section className={`flex items-center  flex-col w-full ${content ? "max-w-7xl" : "max-w-3xl"} mx-auto h-full mt-8`}>
      {!content ? (
        <div className="w-full">
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
      ) : (
        <div className="w-full mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <div className="">
              <h3 className="text-lg font-semibold mb-2">Recommended Tags</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {content.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-zinc-700/70 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

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
          <div className="p-4 rounded-xl bg-[#ffffff10]">
            <h3 className="text-lg font-semibold mb-2">Video Script</h3>
            <p className="text-sm">{content.video_script}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-full mt-6 p-4 rounded-xl bg-[#ffffff10]">
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
