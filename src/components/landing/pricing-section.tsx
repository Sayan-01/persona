import { polar } from "@/lib/polar";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Heading from "./heading";

const plans = [
  {
    name: "Enterprise",
    price: "$100",
    description: "Advanced features for large organizations",
    features: ["Post Schedule Options", "Unlimited AI Usage", "Custom analytics solutions", "Dedicated support manager", "Custom AI model training", "Advanced security features", "API access", "White-label options"],
    buttonText: "Contact Sales",
    popular: false,
    color: "from-orange-500 to-rose-500",
  },
  {
    name: "Professional",
    price: "$50",
    description: "Best for growing businesses",
    features: [
      "Post Schedule Options",
      "Access of Advance Tools",
      "Priority 24/7 support",
      "100,000 Creadits For AI Usage",
      "Limited Custom integrations",
      "Team collaboration tools",
      "All Platform Access",
    ],
    buttonText: "Get Started",
    popular: true,
    color: "from-violet-500 to-purple-500",
  },

  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals and small teams",
    features: ["No Post Schedule Options", "Basic analytics dashboard", "24/7 email support", "1,000 Creadits For AI Usage", "Limited Platform Access"],
    buttonText: "Get Started",
    popular: false,
    color: "from-blue-500 to-cyan-500",
  },
];

export async function PricingSection({ session }: { session: any }) {
  const products = await polar.products.list({ isArchived: false });
  const mergedPlans = plans.map((plan, index) => ({
    ...plan,
    product: products.result.items[index],
  }));
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#f0f0f0]  dark:bg-zinc-900 border-b md:px-[70px]">
      <div className="md:border-x py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#cccccc_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="w-full max-w-7xl mx-auto sm:px-4 px-6">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] z-0" />
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Best Pricing</span>

              <Heading
                title="Ultimate Pricing For You"
                description="Get the best pricing for your business with PersonaAI and start creating high-quality content today!"
              />
            </div>
          </div>

          <div className="gap-8 mt-16 flex flex-col-reverse md:flex-row-reverse  relative z-10">
            {mergedPlans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-1 flex-col p-8 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-all duration-300",
                  plan.popular && "ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-medium px-4 py-1 rounded-full">Most Popular</div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.description}</p>

                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <Check className="w-5 h-5 mr-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={session ? `/checkout?products=${plan.product.id}&customerEmail=${session?.user?.email}` : `/auth/login`}
                  key={plan.product.id}
                >
                  <Button
                    className={cn(
                      "mt-8 w-full py-6 text-base font-medium rounded-xl transition-all duration-300",
                      plan.popular
                        ? "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Need a custom solution?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
