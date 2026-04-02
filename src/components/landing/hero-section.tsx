"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-[80px]">
      {/* Background Media */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-black/40 z-1" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent z-1" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col items-center"
        >
          <h1 className="font-instrument text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.03em] font-normal text-white max-w-[1100px] mb-8">
            Create <em className="italic">personalized</em> content <br className="hidden md:block" />
             through the <em className="italic">silence</em> of AI.
          </h1>

          <p className="font-sans text-[clamp(1rem,1.5vw,1.125rem)] text-white/80 max-w-[640px] leading-relaxed mb-12">
            Design tools for deep thinkers and bold creators. 
            Amid the digital noise, we build spaces for sharp focus 
            and inspired content generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/dashboard/content-brain">
              <button className="liquid-glass rounded-full px-12 py-5 text-[16px] font-medium text-white hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                Begin Journey
              </button>
            </Link>
            <Link href="#features" className="text-white/60 hover:text-white text-[14px] font-medium transition-colors">
              Explore Features →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
