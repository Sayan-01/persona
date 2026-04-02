import { polar } from "@/lib/polar";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals and small teams",
    features: ["No Post Schedule Options", "Basic analytics dashboard", "24/7 email support", "1,000 Credits For AI Usage", "Limited Platform Access"],
    buttonText: "Start for Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "$50",
    description: "Best for growing businesses",
    features: [
      "Post Schedule Options",
      "Access of Advance Tools",
      "Priority 24/7 support",
      "100,000 Credits For AI Usage",
      "Limited Custom integrations",
      "Team collaboration tools",
      "All Platform Access",
    ],
    buttonText: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$100",
    description: "Advanced features for large organizations",
    features: ["Post Schedule Options", "Unlimited AI Usage", "Custom analytics solutions", "Dedicated support manager", "Custom AI model training", "Advanced security features", "API access", "White-label options"],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export async function PricingSection({ session }: { session: any }) {
  const products = await polar.products.list({ isArchived: false });
  const mergedPlans = plans.map((plan, index) => ({
    ...plan,
    product: products.result.items[index],
  }));

  return (
    <section id="pricing" className="py-24 bg-black overflow-hidden px-6 lg:px-[70px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Investment</p>
          <h2 className="font-instrument text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-white font-normal mb-6">
            Everything you need,<br />at the right <em className="italic">pace.</em>
          </h2>
          <p className="font-sans text-white/40 max-w-[500px] mx-auto text-[16px] leading-relaxed">
            Reserve your spot today. Early adopters receive priority features and 
            exclusive founding-member benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mergedPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "liquid-glass rounded-[2rem] p-10 flex flex-col transition-all duration-300 border border-white/5",
                plan.popular ? "scale-[1.05] z-10 bg-white/5" : "opacity-80 hover:opacity-100"
              )}
            >
              {plan.popular && (
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="font-instrument text-3xl text-white font-normal mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-instrument text-4xl text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="mt-4 text-white/40 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-[14px]">
                    <Check className="w-4 h-4 text-white mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={session ? `/checkout?products=${plan.product?.id}&customerEmail=${session?.user?.email ?? ""}` : `/auth/login`}
                className="w-full"
              >
                <button
                  className={cn(
                    "w-full rounded-full py-4 text-[14px] font-medium transition-all duration-300",
                    plan.popular 
                      ? "bg-white text-black hover:scale-[1.03]" 
                      : "border border-white/10 text-white hover:bg-white/5"
                  )}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
