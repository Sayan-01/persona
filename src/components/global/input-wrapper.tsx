import { Info } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";

const InputWrapper = ({ className, children, heading, label }: { className?: string; children: React.ReactNode; heading: string; label: string }) => {
  return (
    <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">{heading}</h3>
        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Label>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default InputWrapper;
