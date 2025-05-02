import { cn } from "@/lib/utils";
import React from "react";

const ButtonLayout = ({ children, className, icon, ...props }: any) => {
  return (
    <div
      className={cn("flex items-center justify-center cursor-pointer bg-gradient-to-br hover:opacity-80 from-[#3352cc] to-[#1c2070] rounded-full", icon ? "h-10 w-10" : "py-2 px-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ButtonLayout;
