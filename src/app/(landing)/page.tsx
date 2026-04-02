import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import HeroSection from "@/components/landing/hero-section";
import { auth } from "../../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader session={session} />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection session={session}/>
        <PricingSection session={session}/>
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  );
}
