"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import BlackButton from "./button";
import Logo from "../global/logo";

export function SiteHeader({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full absolute z-10  px-3 border-b">
      <div className="bg-white">
        <div className="container flex h-[70px] items-center justify-between max-w-[1400px] mx-auto">
          <Logo />
          <nav className="hidden md:flex gap-6  text-foreground/60">
            <Link
              href="#features"
              className=" font-medium transition-colors hover:text-blue-600 "
            >
              Features
            </Link>
            <Link
              href="#features"
              className=" font-medium transition-colors hover:text-blue-600 "
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className=" font-medium transition-colors hover:text-blue-600 "
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className=" font-medium transition-colors hover:text-blue-600 "
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className=" font-medium transition-colors hover:text-blue-600 "
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-gray-800 hover:text-blue-700 hover:bg-blue-50/50 "
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-md hover:shadow-blue-500/25 ">Get Started</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-blue-700 "
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className=" font-medium text-gray-800 transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className=" font-medium text-gray-800 transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className=" font-medium text-gray-800 transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className=" font-medium text-gray-800 transition-colors hover:text-blue-600 "
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 bg-white/50 text-blue-700 hover:bg-blue-50 hover:text-blue-800 "
                >
                  Login
                </Button>
              </Link>
              <Link href="auth/register">
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 text-white hover:shadow-md hover:shadow-blue-500/25 ">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
