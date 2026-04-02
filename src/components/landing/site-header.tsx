"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../global/logo";
import { LandingPageNav } from "@/constants";
import { cn } from "@/lib/utils";
import UserButton from "../global/user-button";

export function SiteHeader({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn(
      "w-full fixed top-0 left-0 z-[100] transition-all duration-300",
      isMenuOpen ? "h-full bg-black" : "h-[80px]"
    )}>
      <nav className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <div className="z-[101]">
          <Logo />
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {LandingPageNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-[14px] font-medium text-white/90 hover:text-white transition-opacity duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* CTA - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <UserButton />
              <Link href="/dashboard">
                <button className="liquid-glass rounded-full px-6 py-2.5 text-[14px] font-medium text-white hover:scale-[1.03] transition-transform duration-200 cursor-pointer">
                  Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/auth/login" className="text-[14px] font-medium text-white/80 hover:text-white">
                Login
              </Link>
              <Link href="/auth/register">
                <button className="liquid-glass rounded-full px-6 py-2.5 text-[14px] font-medium text-white hover:scale-[1.03] transition-transform duration-200 cursor-pointer">
                  Begin Journey
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden z-[101]">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black pt-[100px] px-6 flex flex-col gap-8 animate-fade-rise duration-300">
          <div className="flex flex-col gap-6">
            {LandingPageNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-2xl font-instrument text-white border-b border-white/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-10 flex flex-col gap-4">
            {session?.user ? (
              <Link href="/dashboard" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <button className="liquid-glass w-full rounded-full py-4 text-white">
                  Enter Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-4 text-white border border-white/20 rounded-full">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <button className="liquid-glass w-full rounded-full py-4 text-white">
                    Start Creating
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
