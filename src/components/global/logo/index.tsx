import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 ml-5"
    >
      <Image
        src="/icon.svg"
        alt="logo"
        width={36}
        height={36}
      />
      <span className="text-zinc-900 text-2xl font-semibold">PersonaAI</span>
    </Link>
  );
};

export default Logo;
