"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Aclonica } from "next/font/google";
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
    <section className="relative w-full overflow-hidden dark:bg-zinc-900 bg-white md:px-[70px] border-b ">
      <div className="md:border-x">
        <div className="w-full max-w-7xl mx-auto py-16 sm:py-20 sm:pt-[200px] pt-[150px] flex flex-col items-center">
          <div className="absolute w-full h-[400px] top-52 opacity-70 bg-gradient-to-br from-[#fc5eea] via-[#ffffff] to-[#7a8cfa] dark:from-[#00000000] dark:via-[#00000000] dark:to-[#00000000] rounded-[100%] blur-[100px]" />{" "}
          <div className="absolute inset-0 bg-[radial-gradient(#cccccc_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="container relative flex min-h-[90vh] flex-col items-center justify-center px-4  md:px-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center rounded-full border border-purple-300 dark:border-purple-600/50 bg-white/30 dark:bg-zinc-600/10 px-2 py-1 text-zinc-600 dark:text-zinc-300 backdrop-blur-sm sm:text-sm text-xs"
            >
              <span className="mr-1">✨</span>
              AI-Powered Content Generation
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className={`my-4 mt-7 max-w-7xl text-center font-extrabold tracking-tight leading-[1.1] lg:text-6xl md:text-5xl text-[34px]  text-[#000000] dark:text-white sm:text-6xl md:text-[58px] ${outfit.className}`}
            >
              Grow your brand
              <br className="sm:hidden" /> and
              <br className="hidden sm:block" />
              create lasting engagement
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className=" max-w-[1000px] text-center text-zinc-600 dark:text-zinc-200/80 md:text-lg text-sm max-sm:px-4"
            >
              Welcome to Our PersonaAI, your creative AI partner. Using our tool you<br className="md:block hidden" />
              can craft content, scripts<br className="block md:hidden" /> and stories easily.✨
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-6 z-10 flex gap-2 sm:gap-6"
            >
              <Link href="/dashboard/content-brain">
                <Button
                  size="lg"
                  className="group rounded-full md:h-12 h-10 dark:bg-primary dark:text-black"
                >
                  Let's Start Creating
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-32 rounded-full sm:block hidden  md:h-12 bg-zinc-300 dark:bg-zinc-800 dark:text-white"
                >
                  Learn more
                </Button>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="sm:mt-24 mt-12 sm:w-full w-[200%] relative sm:top-0 -right-[65%] sm:left-0  rounded-3xl border-4 border-white dark:border-black/70 bg-[#f1f1f1] dark:bg-zinc-800 sm:p-5 p-4 backdrop-blur-sm"
            >
              <div className=" w-full overflow-hidden rounded-2xl bg-[#212121] ">
                <div className="flex h-full items-center justify-center">
                  <Image
                    src="/dashboard-dark.png"
                    alt="dashboard"
                    width={5000}
                    height={5000}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
