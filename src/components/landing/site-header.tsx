"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import BlackButton from "./button";
import Logo from "../global/logo";
import { LandingPageNav } from "@/constants";
import { cn } from "@/lib/utils";
import UserButton from "../global/user-button";

export function SiteHeader({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("w-full absolute z-10 px-6 border-b backdrop-blur-lg bg-zinc-900/90 max-sm:fixed max-sm:top-0 max-sm:z-50", isMenuOpen ? "h-full" : "")}>
      <div className="">
        <div className="container flex h-[70px] items-center justify-between max-w-[1400px] mx-auto">
          <Logo />
          <nav className="hidden md:flex gap-6 ">
            {LandingPageNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className=" font-medium transition-colors hover:text-blue-600 "
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <>
                <UserButton />
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="rounded-full"
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="hover:text-blue-700 hover:bg-blue-50/50 h-10"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-md hover:shadow-blue-500/25 h-10">Get Started</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center gap-4 border rounded-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:text-blue-700 "
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container h-[calc(100vh-70px)] md:hidden py-4 pb-6 flex flex-col gap-5">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href="#faq"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/dashboard/settings"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/blog/know-more"
              className=" font-medium transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Know More
            </Link>
          </nav>
          <div className="flex flex-col gap-5 mt-2">
            {session?.user ? (
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 bg-white/50 text-blue-700 hover:bg-blue-50 hover:text-blue-800 "
                >
                  Dashbord
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 bg-white/50 text-blue-700 hover:bg-blue-50 hover:text-blue-800 "
                  >
                    Login
                  </Button>
                </Link>
                <Link href="auth/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
