"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "trainer",
    label: "Persona Trainer",
    title: "Train your unique AI voice",
    description: "Train AI on your unique voice, industry expertise, and content goals to create on-brand content that sounds exactly like you.",
    icon: BrainCircuit,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
  },
  {
    id: "brain",
    label: "AI Content Brain",
    title: "The nucleus of your ideas",
    description: "Generate ideas, enhance content, and stay relevant with trending topics in your niche. Your creative companion 24/7.",
    icon: Sparkles,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
  },
  {
    id: "writer",
    label: "Multi-Platform Writer",
    title: "Write once, publish everywhere",
    description: "Get intelligent recommendations and insights powered by our advanced AI algorithms for every platform imaginable.",
    icon: FileText,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
  }
];

export function FeaturesSection({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState(features[0].id);
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section id="features" className="py-24 bg-black overflow-hidden px-6 lg:px-[70px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[600px]">
          
          {/* Left Content Card */}
          <div className="bg-[#0f0f0f] rounded-[2rem] p-8 md:p-14 flex flex-col justify-between border border-white/5">
            <div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8">
                <activeFeature.icon className="w-5 h-5 text-white/40" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-instrument text-[clamp(2rem,4vw,3rem)] leading-tight text-white mb-6 font-normal">
                    {activeFeature.title}
                  </h2>
                  <p className="text-white/40 text-[16px] leading-relaxed max-w-[440px] mb-12">
                    {activeFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-auto">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {features.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveTab(f.id)}
                    className={`px-5 py-2 rounded-full text-[12px] font-medium transition-all duration-300 border ${
                      activeTab === f.id 
                        ? "bg-white text-black border-white" 
                        : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-white/5 rounded-full mb-10 overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "33.33%" }}
                  key={activeTab}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <Link href="/dashboard/content-brain">
                <button className="liquid-glass px-8 py-3 rounded-full text-white text-[14px] font-medium hover:scale-[1.03] transition-transform cursor-pointer">
                  Explore the Persona Flow
                </button>
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative rounded-[2rem] overflow-hidden min-h-[400px] border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <video
                  src={activeFeature.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
