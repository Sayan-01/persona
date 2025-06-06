import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2"
    >
      <Image
        src="/icon.svg"
        alt="logo"
        width={32}
        height={32}
      />
      <span className="text-zinc-900 text-2xl font-semibold">PersonaAI</span>
    </Link>
  );
};

export default Logo;
