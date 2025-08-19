import { cn } from "@/lib/utils";
import React from "react";
const AIinput = ({ className, ...props }: any) => {
  return (
    <input
      className={cn("bg-white dark:bg-zinc-800/50 p-3 box font-light w-full rounded-xl overflow-hidden h-12 border-2 border-dashed border-indigo-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-zinc-600 transition-all outline-none", className)}
      {...props}
    ></input>
  );
};

export default AIinput;
