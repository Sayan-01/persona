import type React from "react";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CreditProvider } from "@/hooks/credit-provider";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "PersonaAI - AI-Powered Content Creation",
  description: "Create personalized content for multiple platforms with AI",
};

export default async function RootLayout({
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
        className={`${inter.variable} ${instrumentSerif.variable} font-sans box scroll-smooth antialiased`}
      >
        <CreditProvider>
          <NextTopLoader
            color="#ffffff"
            height={2}
            showSpinner={false}
          />
          <SessionProvider>{children}</SessionProvider>
        </CreditProvider>
        <Toaster />
      </body>
    </html>
  );
}
