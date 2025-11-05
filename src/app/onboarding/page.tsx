import { Sparkles } from "lucide-react";
import React from "react";
import OnboardingComponent from "./onboarding-component";
import { auth } from "../../../auth";
import Link from "next/link";
import Logo from "@/components/global/logo";
import { SiteHeader } from "@/components/landing/site-header";
import { getUserOnboardInfo } from "../../../server/user-profile";
import { redirect } from "next/navigation";


const page = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  const onboardUser = await getUserOnboardInfo(session?.user?.email || "");
  if (onboardUser.onBoarded) {
    return redirect("/");
  }
  
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
