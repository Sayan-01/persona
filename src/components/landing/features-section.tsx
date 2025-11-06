"use client";

import { ArrowRight, BrainCircuit, Calendar, FileText, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Heading from "./heading";
import Link from "next/link";


const features = [
  {
    title: "Persona Trainer",
    description: "Train AI on your unique voice, industry expertise, and content goals to create on-brand content.",
    icon: BrainCircuit,
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600",
    href: "/blog/features",
  },
  {
    title: "AI Content Brain",
    description: "Generate ideas, enhance content, and stay relevant with trending topics in your niche.",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    hoverColor: "hover:from-violet-600 hover:to-purple-600",
    href: "/blog/features/#ai-content-brain",
  },
  {
    title: "Multi-Platform Writer",
    description: "Get intelligent recommendations and insights powered by our advanced AI algorithms.",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
    href: "/blog/features/#multi-platform-writer",
  },
  {
    title: "Content Calendar",
    description: "Manage, schedule, and organize your content across multiple platforms from a single dashboard.",
    icon: Calendar,
    color: "from-red-500 to-pink-500",
    hoverColor: "hover:from-red-600 hover:to-pink-600",
    href: "/blog/features/#content-calendar",
  },
  {
    title: "Brand Score System",
    description: "Track consistency, quality, and engagement metrics to improve your content strategy.",
    icon: Trophy,
    color: "from-blue-400 to-cyan-400",
    hoverColor: "hover:from-blue-500 hover:to-cyan-500",
    href: "/blog/features/#brand-score-system",
  },
  {
    title: "Quick Setup",
    description: "Get started in minutes with our guided setup process and start creating content immediately.",
    icon: ArrowRight,
    color: "from-emerald-500 to-green-500",
    hoverColor: "hover:from-emerald-600 hover:to-green-600",
    href: "/blog/features/#quick-setup",
  },
];

export function FeaturesSection({session}: {session: any}) {
  return (
    <section
      id="features"
      className="relative overflow-hidden  bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900 border-b md:px-[70px]"
    >
      <div className="md:border-x py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#cccccc_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="container relative px-4 w-full max-w-7xl mx-auto ">
          <div
            className="max-w-4xl mx-auto text-center"
          >
            <div
              className="text-center"
            >
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Powerful Features</span>

              <Heading
                title="Your Ultimate AI Partner"
                description="PersonaAI combines powerful AI with your unique voice to create content that resonates with your audience."
              />
            </div>
          </div>

          <div
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-700 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-violet-500/5"
                )}
              >
                <div className="relative z-10">
                  <div
                    className={cn("inline-flex h-14 w-14 items-center justify-center rounded-xl mb-6 transition-all duration-300", `bg-gradient-to-r ${feature.color} ${feature.hoverColor} shadow-lg`)}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  <Link href={feature.href} className="mt-6">
                    <button className={cn("inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors")}>
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
                <div className={cn("absolute -z-0 inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300", feature.color)} />
              </div>
            ))}
          </div>

          <div
            className="sm:mt-16 mt-8 text-center"
          >
            <p className="sm:text-lg text-base text-gray-600 dark:text-gray-400 mb-8">Ready to transform your content creation process?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href= {session ? "/dashboard" : "/auth/login"}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 dark:shadow-violet-500/10"
              >
                Get Started Free
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
