import { cn } from "@/lib/utils";
import React from "react";

const BlackButton = ({ outline = false, children, className }: { outline?: boolean; children: React.ReactNode; className?: string }) => {
  if (!outline) {
    return <div className={cn("flex items-center gap-1 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-6 py-2 rounded-lg text-white border-2 border-zinc-800/80", className)}>{children}</div>;
  } else return <div className={cn("flex items-center gap-1 bg-zinc-100 px-6 py-2 rounded-lg text-black border border-zinc-400/80", className)}>{children}</div>;
};

export default BlackButton;
