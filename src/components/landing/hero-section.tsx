"use client";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import BlackButton from "./button";
import Image from "next/image";
import { Aclonica, Comfortaa, Comforter, Inter, Outfit } from "next/font/google";
const outfit = Aclonica({ subsets: ["latin"], weight: ["400"] });

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
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto py-20 pt-36 flex flex-col items-center">
        <div className="absolute w-full h-[400px] top-52 opacity-70 bg-gradient-to-br from-[#fc5eea] via-[#ffffff] to-[#7a8cfa] rounded-[100%] blur-[100px]" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="container relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 md:px-6"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-purple-300 bg-white/30 px-2 py-1 text-zinc-600 backdrop-blur-sm text-sm"
          >
            <span className="mr-1">✨</span>
            AI-Powered Content Generation
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className={`my-4 mt-7 max-w-7xl text-center font-extrabold tracking-tight leading-[1.1] text-6xl text-foreground sm:text-6xl md:text-[58px] ${outfit.className}`}
          >
            Grow your brand and<br />create lasting engagement
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className=" max-w-[1000px] text-center text-zinc-600 text-lg "
          >
            Hey there, I'm a Product Designer based in Poland. I'm all about that minimalistic <br />
            vibe, with a passion for low-code and interactions.🔥
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-6 z-10 flex flex-col gap-2 sm:flex-row sm:gap-6"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="group w-44 rounded-full h-12"
              >
                Let's Start Creating
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="w-32 rounded-full h-12 bg-zinc-300"
              >
                Learn more
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-20 w-full max-w rounded-3xl border-4 border-white bg-[#f1f1f1] p-5 backdrop-blur-sm"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#fafafa] ">
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
                  <h3 className="text-2xl font-bold text-gray-900 ">Interactive Dashboard</h3>
                  <p className="mt-2 text-gray-600 ">Monitor your engagement in real-time</p>
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
