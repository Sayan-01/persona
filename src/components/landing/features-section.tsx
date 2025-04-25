"use client";
import { ArrowRight, BrainCircuit, Calendar, FileText, Sparkles, Trophy, } from "lucide-react";
import { motion } from "motion/react";

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

const features = [
  {
    title: "Persona Trainer",
    description: "Train AI on your unique voice, industry expertise, and content goals to create on-brand content.",
    icon: BrainCircuit,
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "AI Content Brain",
    description: "Generate ideas, enhance content, and stay relevant with trending topics in your niche.",
    icon: Sparkles,
    color: "from-violet-600 to-purple-600",
  },
  {
    title: "Multi-Platform Writer",
    description: "Get intelligent recommendations and insights powered by our advanced AI algorithms.",
    icon: FileText,
    color: "from-orange-600 to-red-600",
  },
  /////
  {
    title: "Content Calendar",
    description: "Manage, schedule, and organize your content across multiple platforms from a single dashboard.",
    icon: Calendar,
    color: "from-red-700 to-red-400",
  },

  {
    title: "Brand Score System",
    description: "Track consistency, quality, and engagement metrics to improve your content strategy.",
    icon: Trophy,
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Quick Setup",
    description: "Get started in minutes with our guided setup process and start creating content immediately.",
    icon: ArrowRight,
    color: "from-green-600 to-emerald-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-900 sm:py-28">
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
              Your Ultimate AI <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Content Partner</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">PersonaAI combines powerful AI with your unique voice to create content that resonates with your audience.</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-gray-900/5 transition-shadow hover:shadow-xl dark:bg-gray-800"
              >
                <div className="relative z-10">
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
