"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, MessageSquare, Repeat2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialPostPreviewProps {
  platform: string;
  content: string;
  media?: { url: string; type: string }[];
  user: { name: string; avatarUrl?: string | null };
}

export default function SocialPostPreview({ platform, content, media, user }: SocialPostPreviewProps) {
  const renderFacebook = () => (
    <Card className="max-w-[500px] border shadow-sm">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl || ""} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm hover:underline cursor-pointer">{user.name}</span>
          <span className="text-xs text-gray-500">Just now · 🌍</span>
        </div>
        <MoreHorizontal className="ml-auto h-5 w-5 text-gray-500 cursor-pointer" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 pb-3 text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content }} />
        {media && media.length > 0 && (
          <div className="relative aspect-video w-full bg-gray-100">
            <img src={media[0].url} alt="Post media" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-3 border-t flex items-center justify-between">
            <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Share</span>
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
          <div className="flex items-center space-x-1">
            <span className="font-bold text-sm">{user.name}</span>
            <span className="text-gray-500 text-sm">@{user.name.toLowerCase().replace(/\s/g, "")} · 1m</span>
            <MoreHorizontal className="ml-auto h-4 w-4 text-gray-500" />
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap leading-normal" dangerouslySetInnerHTML={{ __html: content }} />
          {media && media.length > 0 && (
            <div className="mt-3 rounded-2xl border border-zinc-800 overflow-hidden">
              <img src={media[0].url} alt="Post media" className="w-full h-auto object-cover max-h-[500px]" />
            </div>
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
    <Card className="max-w-[400px] border shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center space-x-3 p-3">
        <Avatar className="h-8 w-8 ring-1 ring-pink-500 p-0.5">
          <AvatarImage src={user.avatarUrl || ""} className="rounded-full" />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-xs">{user.name.toLowerCase().replace(/\s/g, "")}</span>
        <MoreHorizontal className="ml-auto h-4 w-4" />
      </CardHeader>
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {media && media.length > 0 ? (
          <img src={media[0].url} alt="Post" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300 text-xs">Recommended: Add an image</div>
        )}
      </div>
      <div className="p-3">
        <div className="flex space-x-3 mb-2">
          <Heart className="h-6 w-6 hover:text-gray-600 cursor-pointer" />
          <MessageCircle className="h-6 w-6 hover:text-gray-600 cursor-pointer" />
          <Send className="h-6 w-6 hover:text-gray-600 cursor-pointer" />
          <Bookmark className="ml-auto h-6 w-6 hover:text-gray-600 cursor-pointer" />
        </div>
        <div className="text-sm font-semibold mb-1">1,234 likes</div>
        <div className="text-sm leading-snug">
          <span className="font-semibold mr-2">{user.name.toLowerCase().replace(/\s/g, "")}</span>
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="text-[10px] text-gray-400 mt-2 uppercase">Just now</div>
      </div>
    </Card>
  );

  const renderLinkedIn = () => (
    <Card className="max-w-[500px] border shadow-sm">
        <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
            <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatarUrl || ""} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{user.name}</span>
                <span className="text-xs text-gray-500">AI Content Creator</span>
                <span className="text-xs text-gray-400">1m · 🌐</span>
            </div>
            <MoreHorizontal className="ml-auto h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent className="p-0">
            <div className="px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
            {media && media.length > 0 && (
                <div className="bg-gray-100">
                    <img src={media[0].url} alt="Post" className="w-full h-auto" />
                </div>
            )}
            <div className="px-4 py-2 border-t flex items-center space-x-6">
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
        <Card className="p-6 border-dashed">
          <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: content }} />
          {media && media.length > 0 && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <img src={media[0].url} alt="Media" className="w-full h-auto" />
            </div>
          )}
        </Card>
      );
  }
}
