import { cn } from "@/lib/utils";
import React from "react";
const AIinput = ({ className, ...props }: any) => {
  return (
    <input
      className={cn("bg-white outline-none p-3 box font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 hover:border-indigo-400 transition-all", className)}
      {...props}
    ></input>
  );
};

export default AIinput;
