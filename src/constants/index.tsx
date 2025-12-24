import { Facebook, Twitter, Instagram, Linkedin, Youtube, Target, Users, Zap, Sparkle, AudioLines } from "lucide-react";
import { Type, BarChart3, FileText, List, Tags, Rocket } from "lucide-react";
export const Platforms = [
  { value: "linkedIn", label: "💼 LinkedIn Post", desc: "Professional networking content", color: "bg-blue-50 border-blue-200" },
  { value: "facebook", label: "🤩 Facebook Caption", desc: "Engaging fb post format", color: "bg-pink-50 border-pink-200"},
  { value: "instagram", label: "📸 Instagram Caption", desc: "Visual storytelling", color: "bg-pink-50 border-pink-200" },
  { value: "twitter", label: "🐦 Twitter Thread", desc: "Engaging thread format", color: "bg-sky-50 border-sky-200" },
  { value: "blog", label: "📰 Blog Article", desc: "Long-form content", color: "bg-purple-50 border-purple-200" },
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
  {title: "Home", href: "/"},
  {title: "Feature", href: "#features"},
  {title: "Pricing", href: "#pricing"},
  {title: "FAQ", href: "#faq"},
  {title: "Profile", href: "/dashboard/settings"},
  {title: "Know_More", href: "/blog/know-more"},
]


export const YT_Features = [
  {
    id: 1,
    title: "Title & Desc Optimizer",
    icon: Type, // ✍️ for writing text
    path: "title-desc-optimizer",
    desc: "Generate catchy, SEO-friendly titles and descriptions to increase visibility and clicks on videos.",
    border: "border-blue-200 dark:border-blue-600",
  },
  {
    id: 2,
    title: "Find SEO Score",
    icon: BarChart3, // 📊 for scoring and analytics
    path: "seo-score-checker",
    desc: "Analyze your video's metadata to calculate SEO score and suggest improvements for better ranking.",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 3,
    title: "Content Generator",
    icon: FileText, // 📝 for writing full scripts
    path: "content-generator",
    desc: "Generate complete AI-powered video scripts or content ideas to speed up your production process.",
    border: "border-green-200 dark:border-green-600",
  },
  {
    id: 4,
    title: "Outline Generator",
    icon: List, // 📋 for structured outlines
    path: "outlier-generator",
    desc: "Create structured AI outlines to plan your video flow and organize topics effectively before scripting.",
    border: "border-orange-200 dark:border-orange-600",
  },
  {
    id: 5,
    title: "Tags & Keyword Finder",
    icon: Tags, // 🏷️ for tags and keywords
    path: "tags-keyword-finder",
    desc: "Find the most relevant keywords and tags to boost your video's discoverability and organic reach.",
    border: "border-purple-200 dark:border-purple-600",
  },
  {
    id: 6,
    title: "Optimize Script",
    icon: Rocket, // 🚀 for boosting performance
    path: "optimize-script",
    desc: "Enhance your script's clarity and pacing with AI to improve audience retention and watch time.",
    border: "border-red-200 dark:border-red-600",
  },
];
