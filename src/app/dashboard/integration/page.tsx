"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Facebook, Instagram, Linkedin, Twitter, Zap } from "lucide-react";
import Image from "next/image";

interface Integration {
  title: string;
  description: string;
  url: string;
  icon: any
}

const integrations = [
  {
    title: "Connect Instagram",
    description: "Connect your Instagram account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/instagram.png"
  },
  {
    title: "Connect Facebook",
    description: "Connect your Facebook account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/facebook.png",
  },
  {
    title: "Connect Twitter/X",
    description: "Connect your Twitter account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/x.png",
  },
  {
    title: "Connect LinkedIn",
    description: "Connect your LinkedIn account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/linkedin.png",
  },
];

const FeatureCard = ({ feature }: { feature: Integration }) => (
  <div className="relative overflow-hidden group bg-zinc-100/60 dark:bg-zinc-800/40 backdrop-blur-sm rounded-2xl w-full">
    <div className={`block h-full rounded-2xl border border-zinc-100 dark:border-zinc-700/30 overflow-hidden`}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className={` rounded-xl dark:bg-white bg-zinc-200   backdrop-blur-sm`}>
              {/* <feature.icon
                className={`h-6 w-6 `}
                strokeWidth={1.2}
              /> */}
              <Image src={feature.icon} alt={feature.title} width={500} height={500} className="h-12 w-12" />
            </div>
            <div className="">
              <Button className="opacity-60">
                Try Now <ChevronRight className="h-4 w-4 " />
              </Button>
            </div>
          </div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent mb-3">{feature.title}</h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400/80 flex-grow">{feature.description}</p>
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
          {integrations.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
