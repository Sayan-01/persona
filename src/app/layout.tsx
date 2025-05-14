import type React from "react";
import type { Metadata } from "next";
import {  DM_Sans, Inter, Mona_Sans, Nunito, Raleway, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const monaa = Nunito({ subsets: ["latin"]});

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
        className={`font-sans ${monaa.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
