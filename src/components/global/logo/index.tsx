import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2"
    >
      <div className="p-1 rounded-sm bg-white">
        <div className="h-5 w-5  bg-zinc-800 rounded-full"></div>
      </div>
      <span className="text-zinc-900 dark:text-white text-2xl font-semibold">PersonaAi</span>
    </Link>
  );
};

export default Logo;
