import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookmarkIcon, ExternalLink, Eye, Heart, Share } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string;
  keyPoints: string[];
  hashtags: string[];
  isBookmarked?: boolean;
}

const IdeaCard = ({ idea, onClickEvent, platform }: { idea: Props; onClickEvent: (idea: Props, platform: string) => void; platform: string }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-zinc-700 p-6 transition-all duration-200 group relative overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-zinc-900/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl"></div>

      <div className="relative z-10">
        {/* Enhanced Platform Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">{platform}</span>
            <div className="flex items-center space-x-1 text-gray-400 dark:text-zinc-500">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">1.2k</span>
            </div>
          </div>
          <button
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 hover:scale-110 text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
              // isBookmarked ? "text-yellow-500 bg-yellow-50 shadow-md" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            )}
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Content */}
        <h3 className="text-xl font-bold tracking-wide text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {idea.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">{idea.description}</p>

        {/* Key Points */}
        <div className="my-6">
          {idea.keyPoints.map((keyPoint: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-2 py-2"
            >
              <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">{index + 1}.</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{keyPoint}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {idea.hashtags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 text-xs rounded-xl transition-colors duration-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
          {idea.hashtags.length > 4 && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-xl font-semibold">
              +{idea.hashtags.length - 4} more
            </span>
          )}
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-700 gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-xl text-sm"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-600 dark:text-green-400 dark:hover:text-green-400 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-xl text-sm"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => onClickEvent(idea, platform)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white opacity-80 group-hover:opacity-100 transition-all duration-300 rounded-xl text-sm"
          >
            Use This Idea
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
