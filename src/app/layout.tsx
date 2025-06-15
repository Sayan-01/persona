import type React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const monaa = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "PersonaAI - AI-Powered Content Creation",
  description: "Create personalized content for multiple platforms with AI",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        cz-shortcut-listen="true"
        className={`font-sans ${monaa.className} box `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
