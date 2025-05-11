import { cn } from "@/lib/utils";
import React from "react";
const AIinput = ({ className, ...props }: any) => {
  return (
    <div className="flex flex-col rounded-xl border mt-3 overflow-hidden h-min">
      <textarea
        className={cn("border-none outline-none p-3 box font-light w-full bg-[#222225]", className)}
        {...props}
      ></textarea>
      <div className="px-3 py-1 border-t text-white/60 text-sm">sayan</div>
    </div>
  );
};

export default AIinput;
