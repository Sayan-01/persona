import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import HeroSection from "@/components/landing/hero-section";
import { auth } from "../../../auth";

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex min-h-screen flex-col ">
      <div className="fixed top-6 z-50 w-full ">
        <SiteHeader session={session}/>
      </div>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
