import { Facebook, Twitter, Instagram, Linkedin, Youtube, Target, Users, Zap, Sparkle, AudioLines } from "lucide-react";
import { Image as ImageIcon, Search, FileText, List, Wand2, Rocket } from "lucide-react";
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
    title: "AI Thumbnail Generator",
    icon: ImageIcon,
    path: "ai-thumbnail-generator",
    desc: "Automatically create eye-catching AI thumbnails to boost your YouTube video's visual appeal and engagement.",
    border: "border-blue-200 dark:border-blue-600",
  },
  {
    id: 2,
    title: "AI Thumbnail Search",
    icon: Search,
    path: "ai-thumbnail-search",
    desc: "Quickly search through a curated library of AI-generated thumbnails for your YouTube content needs.",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 3,
    title: "Content Generator",
    icon: FileText,
    path: "content-generator",
    desc: "Generate high-quality, AI-driven content ideas and full scripts to enhance your YouTube video production.",
    border: "border-green-200 dark:border-green-600",
  },
  {
    id: 4,
    title: "Outlier",
    icon: List,
    path: "outlier",
    desc: "Easily generate structured AI outlines that help organize your YouTube video scripts and planning process.",
    border: "border-orange-200 dark:border-orange-600",
  },
  {
    id: 5,
    title: "AI Thumbnail Search",
    icon: Search,
    path: "ai-thumbnail-search",
    desc: "Discover and select from various AI-generated thumbnails tailored for different YouTube video categories quickly.",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 6,
    title: "Optimize Script",
    icon: Rocket,
    path: "optimize-script",
    desc: "Improve your YouTube scripts using AI optimization tools to increase viewer retention and overall performance.",
    border: "border-red-200 dark:border-red-600",
  },
];