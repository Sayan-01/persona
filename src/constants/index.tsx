import { Target, Users, Zap } from "lucide-react";

export const Platforms = [
  { value: "LinkedIn Post", label: "💼 LinkedIn Post", desc: "Professional networking content", color: "bg-blue-50 border-blue-200" },
  { value: "Twitter Thread", label: "🐦 Twitter Thread", desc: "Engaging thread format", color: "bg-sky-50 border-sky-200" },
  { value: "Instagram Caption", label: "📸 Instagram Caption", desc: "Visual storytelling", color: "bg-pink-50 border-pink-200" },
  { value: "Blog Article", label: "📰 Blog Article", desc: "Long-form content", color: "bg-purple-50 border-purple-200" },
  { value: "YouTube Script", label: "🎬 YouTube Script", desc: "Video content script", color: "bg-red-50 border-red-200" },
];

export const ContentLengths = [
  { value: "Short", label: "Short", desc: "50-150 words", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { value: "Medium", label: "Medium", desc: "150-400 words", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { value: "Long", label: "Long", desc: "400+ words", icon: Target, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
];
