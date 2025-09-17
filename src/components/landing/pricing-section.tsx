import { polar } from "@/lib/polar";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals and small teams",
    features: ["Up to 5 team members", "Basic analytics dashboard", "24/7 email support", "1,000 AI content generations", "5 custom workflows"],
    buttonText: "Get Started",
    popular: false,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Professional",
    price: "$49",
    description: "Best for growing businesses",
    features: ["Up to 20 team members", "Advanced analytics & reports", "Priority 24/7 support", "Unlimited AI generations", "Custom integrations", "Team collaboration tools", "Advanced automation"],
    buttonText: "Get Started",
    popular: true,
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "Enterprise",
    price: "$79",
    description: "Advanced features for large organizations",
    features: ["Unlimited team members", "Custom analytics solutions", "Dedicated support manager", "Custom AI model training", "Advanced security features", "API access", "White-label options"],
    buttonText: "Contact Sales",
    popular: false,
    color: "from-orange-500 to-rose-500",
  },
];

export async function PricingSection({ session }: { session: any }) {
  const products = await polar.products.list({ isArchived: false });
  return (
    <section className="relative overflow-hidden bg-[#f0f0f0] py-20 dark:bg-zinc-900 sm:py-28 border-b">
      <div className="absolute inset-0 bg-[radial-gradient(#cccccc_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] z-0" />

        <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {/* {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className={cn(
                "relative flex flex-col p-8 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-all duration-300",
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
            </motion.div>
          ))} */}

          {products.result.items.map((product) => (
            <Link href={`/checkout?products=${product.id}&customerEmail=${session?.user?.email}`} key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
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
    </section>
  );
}
