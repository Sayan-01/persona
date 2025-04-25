"use client";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals and small teams getting started.",
    features: ["Up to 5 team members", "Basic analytics dashboard", "24/7 email support", "1,000 AI content generations", "5 custom workflows"],
    color: "from-blue-600 to-cyan-600",
    popular: false,
  },
  {
    name: "Professional",
    price: "$49",
    description: "Best for growing businesses and professional teams.",
    features: ["Up to 20 team members", "Advanced analytics & reports", "Priority 24/7 support", "Unlimited AI generations", "Custom integrations", "Team collaboration tools", "Advanced automation"],
    color: "from-violet-600 to-purple-600",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$79",
    description: "Advanced features for large organizations.",
    features: ["Unlimited team members", "Custom analytics solutions", "Dedicated support manager", "Custom AI model training", "Advanced security features", "API access", "White-label options"],
    color: "from-orange-600 to-red-600",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-gray-950 sm:py-28">
            <div className="w-full max-w-7xl mx-auto ">

      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="container px-4 md:px-6"
      >
        <motion.div
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Flexible pricing <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Choose the perfect plan for your needs. No hidden fees.</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-gray-900/5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-xl dark:bg-gray-800 dark:ring-gray-800 ${
                plan.popular ? "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-600/20 before:to-violet-600/20 before:opacity-10" : ""
              }`}
            >
              {plan.popular && <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-sm font-medium text-white">Popular</div>}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <Check className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-8 w-full rounded-full bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-blue-500/25`}>Get Started</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div></div>
    </section>
  );
}
