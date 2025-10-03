import { Sparkles } from "lucide-react";
import React from "react";
import OnboardingComponent from "./onboarding-component";
import { auth } from "../../../auth";
import Link from "next/link";
import Logo from "@/components/global/logo";
import { SiteHeader } from "@/components/landing/site-header";

const page = async () => {
  const session = await auth();
  return (
    <div className="flex min-h-screen h-full flex-col bg-zinc-950">
      <SiteHeader session={session} />
      <div className="max-w-[1400px] w-full min-h-screen mx-auto border-x">
        <OnboardingComponent user={session?.user} />
      </div>
    </div>
  );
};

export default page;
