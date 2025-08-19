"use client";
import React from "react";
import { YT_Features } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Stars, Rocket } from "lucide-react";

const FeatureCard = ({ feature }: { feature: (typeof YT_Features)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      background: `linear-gradient(145deg, ${feature.bg.replace("bg-", "")} 0%, ${feature.bg.replace("bg-", "bg-opacity-70")} 100%)`,
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    }}
    className="relative overflow-hidden group bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-800/50 backdrop-blur-sm"
  >
    <Link
      href={`/dashboard/youtube-brain/${feature.path}`}
      className={`block h-full p-6 rounded-2xl border-2 border-dashed border-opacity-30 dark:border-opacity-20 ${feature.border} transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/30 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className={`p-3 rounded-xl ${feature.bg} ${feature.border} border border-opacity-30 backdrop-blur-sm shadow-lg`}>
            <feature.icon className={`h-6 w-6 ${feature.color}`} />
          </div>
          <div className="p-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <h3 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent mb-3">{feature.title}</h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 flex-grow mb-4">{feature.desc}</p>

        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-700/30">
          <span
            className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full ${feature.color} ${feature.bg} bg-opacity-30 backdrop-blur-sm border ${feature.border} border-opacity-30`}
          >
            Try Now <Zap className="h-3 w-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-indigo-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 mb-12 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,#ffffff,rgba(255,255,255,0.5))]"></div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 backdrop-blur-md"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-400/20 backdrop-blur-md"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white/90 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> New Features Added
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400">YouTube</span> Game
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl">AI-powered tools to help you create, optimize, and grow your YouTube channel with ease.</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center">
                Get Started <Rocket className="h-4 w-4 ml-2" />
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-all border border-white/20">Watch Demo</button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {YT_Features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 md:p-10 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Stars className="h-10 w-10 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your YouTube content?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of creators who are already growing their channels with our AI tools.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Start Free Trial <Zap className="h-4 w-4 ml-2 fill-current" />
              </button>
              <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-all border border-white/20">Schedule Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
 