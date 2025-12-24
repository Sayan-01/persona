"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Command, Eye, Loader2, MessageCircleMore, ThumbsUp } from "lucide-react";
import React, { useState } from "react";

const Outlier = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<any[]>([]);

  const onSearch = async () => {
    setLoading(true);
    try {
      const result = await fetch("/api/outlier?query=" + userInput);
      const data = await result.json();
      console.log(data);
      setVideos(data.data);
    } catch (error) {
      console.error("Error generating outline:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }

    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }

    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }

    return num.toString();
  }
  return (
    <section className={`flex items-center  flex-col w-full  h-full mt-8`}>
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold">
          <span className="text-orange-300">Search Outlier </span>Generator
        </h1>
        <p className="text-sm opacity-60 mt-1">Generate an outline for your YouTube video</p>
        <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-4">
          <div className="flex gap-2 items-center w-full">
            <textarea
              onChange={(e) => setUserInput(e.target.value)}
              className="outline-0  box-1 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="🏀 Enter your video title"
            />
          </div>
          <div className=" flex gap-3 ">
            <button
              disabled={loading || !(userInput.length > 5)}
              className="h-8 w-8 flex items-center justify-center ml-auto bg-zinc-300 rounded-full disabled:opacity-60"
              onClick={userInput.length > 5 ? onSearch : undefined}
            >
              {loading ? (
                <Loader2
                  className="text-zinc-700 animate-spin"
                  size={18}
                  strokeWidth={1.9}
                />
              ) : (
                <ArrowUp
                  className="text-zinc-700"
                  size={20}
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 flex-col p-3"
                >
                  <div className="bg-[#ffffff08] w-full aspect-[16/9] rounded-xl animate-pulse"></div>
                  <div className="bg-[#ffffff08] h-4 w-[80%] rounded-lg" />
                  <div className="bg-[#ffffff08] h-4 w-[50%] rounded-lg" />
                </div>
              ))
            : null}
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative flex flex-col items-center gap-4  rounded-xl p-3  hover:bg-[#232323] transition"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer absolute right-3 flex items-center gap-1 text-white text-xs bg-blue-500 rounded-tr-lg px-1.5 py-0.5 pb-1 rounded-bl-lg">{video.smartScore}x</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Smart Score and Outlier</p>
                </TooltipContent>
              </Tooltip>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-[16/9] rounded-lg object-cover border border-zinc-700 -mb-1"
              />
              <div className="w-full">
                <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">{video.title}</h3>
                <div className="flex items-center w-full gap-2 text-xs text-white/60 mb-1">
                  <span>{video.channelTitle}</span>
                  {/* <span>&bull;</span> */}
                  {/* <span>{new Date(video.publishedAt).toLocaleDateString()}</span> */}
                </div>
                <div className="flex w-full items-center justify-between text-[12px] text-orange-300 font-medium">
                  <div className="flex flex-1 gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {formatNumber(video.viewCount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={12} /> {formatNumber(video.likeCount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircleMore size={12} /> {formatNumber(video.commentCount)}
                    </span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center bg-green-500/30 text-white px-2 py-0.5 rounded">{video.engagementRate}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Engagement Rate</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outlier;
