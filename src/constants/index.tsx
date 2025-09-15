import { Facebook, Twitter, Instagram, Linkedin, Youtube, Target, Users, Zap, Sparkle, AudioLines } from "lucide-react";

export const Platforms = [
  { value: "linkedIn", label: "💼 LinkedIn Post", desc: "Professional networking content", color: "bg-blue-50 border-blue-200" },
  { value: "twitter", label: "🐦 Twitter Thread", desc: "Engaging thread format", color: "bg-sky-50 border-sky-200" },
  { value: "instagram", label: "📸 Instagram Caption", desc: "Visual storytelling", color: "bg-pink-50 border-pink-200" },
  { value: "facebook", label: "🤩 Facebook Caption", desc: "Engaging fb post format", color: "bg-pink-50 border-pink-200"},
  { value: "blog", label: "📰 Blog Article", desc: "Long-form content", color: "bg-purple-50 border-purple-200" },
  { value: "youtube", label: "🎬 YouTube Script", desc: "Video content script", color: "bg-red-50 border-red-200" },
];

export const ContentLengths = [
  { value: "short", label: "Short", desc: "50-150 words", icon: Zap, color: "text-emerald-600 dark:text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-700" },
  { value: "medium", label: "Medium", desc: "150-400 words", icon: AudioLines, color: "text-blue-600 dark:text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-700" },
  { value: "long", label: "Long", desc: "400+ words", icon: Target, color: "text-purple-600 dark:text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-700" },
];

export const socialPlatforms = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
    textColor: "text-white",
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700",
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
export const LandingPageNav = [
  {title: "Feature", href: "#features"},
  {title: "How It Works", href: "#how-it-works"},
  {title: "Pricing", href: "#pricing"},
  {title: "Testimonials", href: "#testimonials"},
  {title: "FAQ", href: "#faq"},
]

export const YT_Features = [
  {
    id: 1,
    title: "AI Thumbline Generator",
    icon: Sparkle,
    path: "ai-thumbnail-generator",
    desc: "Generate AI-powered thumbnails for your YouTube videos",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-gradient-to-r from-blue-50 to-blue-50 dark:bg-blue-500",
    border: "border-blue-200 dark:border-blue-600",
  },
  {
    id: 2,
    title: "AI Thumbline Search",
    icon: Sparkle,
    path: "ai-thumbnail-search",
    desc: "Search for AI-powered thumbnails for your YouTube videos",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-gradient-to-r from-purple-50 to-purple-50 dark:bg-purple-500",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 3,
    title: "Content Generator",
    icon: Sparkle,
    path: "content-generator",
    desc: "Generate AI-powered content for your YouTube videos",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-gradient-to-r from-green-50 to-green-50 dark:bg-green-500",
    border: "border-green-200 dark:border-green-600",
  },
  {
    id: 4,
    title: "Outlier",
    icon: Sparkle,
    path: "outlier",
    desc: "Generate AI-powered outline for your YouTube videos",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-gradient-to-r from-orange-50 to-orange-50 dark:bg-orange-500",
    border: "border-orange-200 dark:border-orange-600",
  },
  {
    id: 5,
    title: "AI Thumbline Search",
    icon: Sparkle,
    path: "ai-thumbnail-search",
    desc: "Search for AI-powered thumbnails for your YouTube videos",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-gradient-to-r from-purple-50 to-purple-50 dark:bg-purple-500",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 6,
    title: "Optimize Script",
    icon: Sparkle,
    path: "optimize-script",
    desc: "Optimize your YouTube videos for better performance",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-gradient-to-r from-red-50 to-red-50 dark:bg-red-500",
    border: "border-red-200 dark:border-red-600",
  }
]