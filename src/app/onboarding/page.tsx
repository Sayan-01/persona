import { Sparkles } from "lucide-react";
import React from "react";
import OnboardingComponent from "./onboarding-component/index.";
import { auth } from "../../../auth";
import Link from "next/link";

const page = async () => {
  const session = await auth()
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full px-5 fixed top-0 z-10 bg-background">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">PersonaAI</span>
          </Link>
        </div>
      </header>
      <OnboardingComponent user={session?.user} />
    </div>
  );
};

export default page;
