"use client";
import React from "react";
import { YT_Features } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Stars, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ feature }: { feature: (typeof YT_Features)[0] }) => (
  <div className="relative overflow-hidden group  dark:bg-zinc-800/40 backdrop-blur-sm rounded-2xl">
    <div className={`block h-full rounded-2xl border-2 border-zinc-100 dark:border-zinc-700/30 overflow-hidden`}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className={`p-3 rounded-xl bg-zinc-700 border backdrop-blur-sm`}>
              <feature.icon className={`h-6 w-6 `} />
            </div>
          </div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent mb-3">{feature.title}</h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 flex-grow">{feature.desc}</p>
        </div>

        <div className="mt-auto border-t border-zinc-100 dark:border-zinc-700/30 p-5">
          <Link href={`/dashboard/youtube-brain/${feature.path}`}>
            <Button>
              Try Now <Zap className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Page = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 ">
          <h1 className="text-3xl font-black dark:text-white mb-1">Welcome to Persona AI</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">This is a content generation and management software operate using AI </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {YT_Features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
