import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Expand, Info, Minimize, RefreshCw, Sparkles, Stars, Zap } from "lucide-react";
import React from "react";
import { ContentEnhancePromptDetails } from "../../../../../types";

type EnhancementType = "rewrite" | "adjust" | "expand" | "condense";

interface Enhancement {
  id: EnhancementType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface EnhancementCardProps {
  title: string;
  description: string;
  isSelected?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const enhancements: Enhancement[] = [
  {
    id: "rewrite",
    title: "Rewrite",
    description: "Transform your content with AI-powered rewriting while preserving the essence and core message",
    icon: <RefreshCw className="w-5 h-5"/>,
  },
  {
    id: "adjust",
    title: "Adjust Tone",
    description: "Fine-tune the voice and style to match your brand - professional, casual, or creative",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "expand",
    title: "Expand",
    description: "Enrich your content with detailed explanations, examples, and comprehensive context",
    icon: <Expand className="w-5 h-5" />,
  },
  {
    id: "condense",
    title: "Condense",
    description: "Distill your message into concise, impactful content without losing important details",
    icon: <Minimize className="w-5 h-5" />,
  },
];

const EnhancetypeSelector = ({
  contentEnhancePromptDetails,
  setContentEnhancePromptDetails,
}: {
  contentEnhancePromptDetails: ContentEnhancePromptDetails;
  setContentEnhancePromptDetails: (e: ContentEnhancePromptDetails) => void;
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden rounded-2xl mb-8">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="p-6 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100 flex items-center">✨ Enhancement Type</h3>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-200">Choose which type enhancement best for your content</Label>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-6 pt-0">
        <div className="w-full max-w-7xl mx-auto">
          {/* Enhancement Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enhancements.map((enhancement) => (
              <EnhancementCard
                key={enhancement.id}
                title={enhancement.title}
                description={enhancement.description}
                icon={enhancement.icon}
                isSelected={contentEnhancePromptDetails.enhanceType === enhancement.id}
                onClick={() => setContentEnhancePromptDetails({ ...contentEnhancePromptDetails, enhanceType: enhancement.id })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancetypeSelector;

const EnhancementCard: React.FC<EnhancementCardProps> = ({ title, description, isSelected = false, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500  transform",
        "backdrop-blur-xl border-2 border-dashed border-white/30 shadow-2xl",
        isSelected ? "bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 " : "bg-white/10 hover:bg-white/20 hover:border-white/40"
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-fuchsia-600/10",
          isSelected ? "opacity-100" : "group-hover:opacity-50"
        )}
      />

      {/* Content */}
      <div className="relative p-4 h-full flex flex-col">
        {/* Icon and selection indicator */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={cn(
              "p-2 rounded-lg transition-all duration-300",
              isSelected ? "bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25" : "bg-white/20 group-hover:bg-white/30"
            )}
          >
            {icon || <Zap className={cn("w-5 h-5 transition-colors duration-300", isSelected ? "text-white" : "text-gray-300 group-hover:text-white")} />}
          </div>

          <div
            className={cn(
              "w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center",
              isSelected ? "bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg" : "bg-white/20 group-hover:bg-white/30"
            )}
          >
            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
        </div>

        {/* Title */}
        <h3 className={cn("text-normal mb-1 transition-colors duration-300", isSelected ? "text-white" : "text-gray-200 group-hover:text-white")}>{title}</h3>

        {/* Description */}
        <p className={cn("text-xs  flex-1 transition-colors duration-300", isSelected ? "text-gray-100" : "text-gray-300 group-hover:text-gray-100")}>{description}</p>
      </div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none",
          "bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"
        )}
      />
    </div>
  );
};
