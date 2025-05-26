import { cn } from "@/lib/utils";
import React from "react";
const AItextarea = ({ className, ...props }: any) => {
  return (
    <div className="flex flex-col rounded-xl border mt-3 overflow-hidden h-min border-">
      <textarea
        className={cn("border-none outline-none p-3 box font-light w-full", className)}
        {...props}
      ></textarea>
      <div className="px-3 py-1 border-t text-sm flex items-center gap-2">
        🚀<span>Powered by PersonaAI</span>
      </div>
    </div>
  );
};

export default AItextarea;
