"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, MessageSquare, Repeat2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialPostPreviewProps {
  platform: string;
  content: string;
  media?: { url: string; type: string }[];
  user: { name: string; avatarUrl?: string | null };
  isLoading?: boolean;
  onContentChange?: (content: string) => void;
}

export default function SocialPostPreview({ 
  platform, 
  content, 
  media, 
  user,
  isLoading = false,
  onContentChange 
}: SocialPostPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.replace(/<br\s*\/?>/gi, "\n"));
    setCopied(true);
    toast.success("Content copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      );
    }

    if (onContentChange) {
      return (
        <textarea
          value={content.replace(/<br\s*\/?>/gi, "\n")}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm resize-none outline-none min-h-[150px] scrollbar-hide font-sans whitespace-pre-wrap leading-relaxed"
          placeholder="Write your content here..."
          autoFocus={false}
        />
      );
    }

    return (
      <div 
        className="text-sm whitespace-pre-wrap leading-relaxed font-sans" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  const renderHeader = (iconColor?: string) => (
    <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatarUrl || ""} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className={cn("font-semibold text-sm", platform === "x" || platform === "twitter" ? "text-white" : "text-zinc-900 dark:text-white")}>
            {user.name}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={handleCopy}
              title="Copy content"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
            </Button>
            <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {platform === "linkedin" ? "AI Content Creator · 1m · 🌐" : "Just now · 🌍"}
        </span>
      </div>
    </CardHeader>
  );

  const renderFacebook = () => (
    <Card className="max-w-[500px] border shadow-sm dark:bg-zinc-950">
      {renderHeader()}
      <CardContent className="p-0">
        <div className="px-4 pb-3">
          {renderContent()}
        </div>
        {isLoading ? (
          <Skeleton className="aspect-video w-full rounded-none" />
        ) : (
          media && media.length > 0 && (
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-zinc-900 border-y">
              <img src={media[0].url} alt="Post media" className="w-full h-full object-cover" />
            </div>
          )
        )}
        <div className="p-3 border-t flex items-center justify-between">
            <div className="flex space-x-1 sm:space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md transition-colors">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:inline">Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:inline">Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:inline">Share</span>
                </button>
            </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderX = () => (
    <Card className="max-w-[500px] border shadow-sm bg-black text-white rounded-none">
      <div className="p-4 flex space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl || ""} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-sm">{user.name}</span>
              <span className="text-gray-500 text-sm">@{user.name.toLowerCase().replace(/\s/g, "")} · 1m</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-zinc-900"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
              </Button>
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="mt-1">
            {renderContent()}
          </div>
          {isLoading ? (
            <Skeleton className="mt-3 aspect-video w-full rounded-2xl bg-zinc-800" />
          ) : (
            media && media.length > 0 && (
              <div className="mt-3 rounded-2xl border border-zinc-800 overflow-hidden">
                <img src={media[0].url} alt="Post media" className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )
          )}
          <div className="mt-3 flex justify-between max-w-sm text-gray-500">
            <MessageCircle className="h-4 w-4 hover:text-sky-400 cursor-pointer" />
            <Repeat2 className="h-4 w-4 hover:text-green-400 cursor-pointer" />
            <Heart className="h-4 w-4 hover:text-pink-400 cursor-pointer" />
            <Share2 className="h-4 w-4 hover:text-sky-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </Card>
  );

  const renderInstagram = () => (
    <Card className="max-w-[400px] border shadow-sm rounded-lg overflow-hidden dark:bg-zinc-950">
      <CardHeader className="flex flex-row items-center space-x-3 p-3">
        <Avatar className="h-8 w-8 ring-1 ring-pink-500 p-0.5">
          <AvatarImage src={user.avatarUrl || ""} className="rounded-full" />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-xs flex-1">{user.name.toLowerCase().replace(/\s/g, "")}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
          </Button>
          <MoreHorizontal className="h-4 w-4" />
        </div>
      </CardHeader>
      <div className="aspect-square bg-gray-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-none" />
        ) : (
          media && media.length > 0 ? (
            <img src={media[0].url} alt="Post" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-xs text-center px-4 italic">Add an image to see it here</div>
          )
        )}
      </div>
      <div className="p-3">
        <div className="flex space-x-3 mb-2">
          <Heart className="h-6 w-6 hover:text-red-500 cursor-pointer transition-colors" />
          <MessageCircle className="h-6 w-6 hover:text-gray-600 cursor-pointer" />
          <Send className="h-6 w-6 hover:text-gray-600 cursor-pointer" />
          <Bookmark className="ml-auto h-6 w-6 hover:text-gray-600 cursor-pointer" />
        </div>
        <div className="text-sm font-semibold mb-1">1,234 likes</div>
        <div className="text-sm leading-snug">
          <span className="font-semibold mr-2">{user.name.toLowerCase().replace(/\s/g, "")}</span>
          <div className="inline">{renderContent()}</div>
        </div>
        <div className="text-[10px] text-gray-400 mt-2 uppercase">Just now</div>
      </div>
    </Card>
  );

  const renderLinkedIn = () => (
    <Card className="max-w-[500px] border shadow-sm dark:bg-zinc-950">
        <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
            <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatarUrl || ""} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
                    </Button>
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <span className="text-xs text-gray-500">AI Content Creator</span>
                <span className="text-xs text-gray-400">1m · 🌐</span>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <div className="px-4 py-3">
              {renderContent()}
            </div>
            {isLoading ? (
              <Skeleton className="aspect-video w-full rounded-none" />
            ) : (
              media && media.length > 0 && (
                  <div className="bg-gray-100 dark:bg-zinc-900 border-y">
                      <img src={media[0].url} alt="Post" className="w-full h-auto" />
                  </div>
              )
            )}
            <div className="px-4 py-2 border-t flex items-center justify-between sm:justify-start sm:space-x-6">
                <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                    <Heart className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Like</span>
                </div>
                <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Comment</span>
                </div>
                <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                    <Repeat2 className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Repost</span>
                </div>
                <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                    <Send className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Send</span>
                </div>
            </div>
        </CardContent>
    </Card>
  );

  switch (platform.toLowerCase()) {
    case "facebook":
      return renderFacebook();
    case "twitter":
    case "x":
      return renderX();
    case "instagram":
      return renderInstagram();
    case "linkedin":
      return renderLinkedIn();
    default:
      return (
        <Card className="p-6 border-dashed dark:bg-zinc-950">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium opacity-50 uppercase tracking-wider">{platform} Preview</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
            </Button>
          </div>
          {renderContent()}
          {isLoading ? (
            <Skeleton className="mt-4 aspect-video w-full rounded-lg" />
          ) : (
            media && media.length > 0 && (
              <div className="mt-4 rounded-lg overflow-hidden border">
                <img src={media[0].url} alt="Media" className="w-full h-auto" />
              </div>
            )
          )}
        </Card>
      );
  }
}
