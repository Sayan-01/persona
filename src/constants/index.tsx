import { Facebook, Twitter, Instagram, Linkedin, Youtube, Target, Users, Zap } from "lucide-react";

export const Platforms = [
  { value: "linkedIn", label: "💼 LinkedIn Post", desc: "Professional networking content", color: "bg-blue-50 border-blue-200" },
  { value: "twitter", label: "🐦 Twitter Thread", desc: "Engaging thread format", color: "bg-sky-50 border-sky-200" },
  { value: "instagram", label: "📸 Instagram Caption", desc: "Visual storytelling", color: "bg-pink-50 border-pink-200" },
  { value: "facebook", label: "🤩 Facebook Caption", desc: "Engaging fb post format", color: "bg-pink-50 border-pink-200"},
  { value: "blog", label: "📰 Blog Article", desc: "Long-form content", color: "bg-purple-50 border-purple-200" },
  { value: "youtube", label: "🎬 YouTube Script", desc: "Video content script", color: "bg-red-50 border-red-200" },
];

export const ContentLengths = [
  { value: "short", label: "Short", desc: "50-150 words", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { value: "medium", label: "Medium", desc: "150-400 words", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { value: "long", label: "Long", desc: "400+ words", icon: Target, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
];

export const socialPlatforms = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-700",
    textColor: "text-white",
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500 hover:bg-sky-600",
    textColor: "text-white",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    textColor: "text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700 hover:bg-blue-800",
    textColor: "text-white",
  },
  {
    name: "YouTube",
    icon: Youtube,
    color: "bg-red-600 hover:bg-red-700",
    textColor: "text-white",
  },
];