"use client";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-[#e0e7ff] via-[#f5f7ff] to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
      <div className="w-full max-w-7xl mx-auto mt-20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="container relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 md:px-6"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-blue-200/50 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-900 backdrop-blur-sm dark:border-blue-800/50 dark:bg-gray-900/80 dark:text-blue-100"
          >
            <span className="mr-2">✨</span>
            AI-Powered Content Generation
            <ChevronRight className="ml-1 h-4 w-4" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-8 max-w-4xl text-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl"
          >
            Your Personal AI <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Content Assistant</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-[680px] text-center text-lg text-gray-700 dark:text-gray-200"
          >
            Effortlessly create, enhance, and manage your content with AI. From the social media posts to marketing copy, PersonaAI helps you maintain a consistent brand voice across all platforms.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="group h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-white hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-violet-500/20 transition-all duration-300"
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-blue-200 bg-white/50 px-8 hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-900/50 dark:hover:bg-blue-950 transition-all duration-300"
              >
                See how it works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 w-full max-w-6xl rounded-3xl border border-blue-100/50 bg-white/80 p-4 shadow-2xl shadow-blue-500/10 backdrop-blur-sm dark:border-blue-900/50 dark:bg-gray-900/80 dark:shadow-blue-500/5 md:p-8"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950 dark:to-violet-950">
              <div className="flex h-full items-center justify-center">
                <div className="px-8 py-12 text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Dashboard</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Monitor your engagement in real-time</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
