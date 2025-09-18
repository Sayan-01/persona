import type React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CreditProvider } from "@/hooks/credit-provider";

const monaa = Roboto_Mono({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "PersonaAI - AI-Powered Content Creation",
  description: "Create personalized content for multiple platforms with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    className="dark"
      lang="en"
      suppressHydrationWarning
    >
      <body
        cz-shortcut-listen="true"
        className={`font-sans ${monaa.className} box `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
        <CreditProvider>
        {children}
        </CreditProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>

  );
}
