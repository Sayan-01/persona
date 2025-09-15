"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Heading from "./heading";

const faqs = [
  {
    question: "What is PersonaAI?",
    answer:
      "PersonaAI is an AI-powered content creation platform that helps you create personalized content for multiple platforms based on your unique brand persona. It includes features like persona training, content generation, multi-platform writing, content calendar, and brand score system.",
  },
  {
    question: "How does the Persona Trainer work?",
    answer:
      "The Persona Trainer is a step-by-step onboarding wizard that helps you define your brand voice. You'll configure your writing tone, industry, target audience, content goals, and optionally provide sample content. This information is used to train the AI to generate content that matches your unique style.",
  },
  {
    question: "Which social platforms are supported?",
    answer:
      "PersonaAI currently supports LinkedIn and Twitter in the Free plan, with additional platforms available in the Pro and Business plans. Each platform has specialized formatting to ensure your content looks great and performs well.",
  },
  {
    question: "How many AI generations do I get?",
    answer:
      "The Free plan includes 10 AI generations per month. The Pro plan includes 100 generations per month, and the Business plan includes unlimited generations. Each generation can be used for content ideas, writing posts, or enhancing existing content.",
  },
  {
    question: "Can I try PersonaAI before subscribing?",
    answer:
      "Yes! We offer a Free plan that lets you try the core features of PersonaAI. You can create one persona, generate up to 10 pieces of content per month, and use the basic content calendar. No credit card required.",
  },
];

const FAQItem = ({ question, answer, index, isOpen, onClick }: { question: string; answer: string; index: number; isOpen: boolean; onClick: () => void }) => (
  <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    className="overflow-hidden"
  >
    <motion.button
      className={`flex w-full items-center justify-between p-6 text-left transition-colors ${
        isOpen ? "bg-gradient-to-r from-blue-50 to-violet-50 dark:from-gray-800 dark:to-gray-800/80" : "bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/70"
      } rounded-xl border border-gray-200 dark:border-gray-700`}
      onClick={onClick}
    >
      <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
      <motion.span
        variants={{
          open: { rotate: 45 },
          closed: { rotate: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="ml-4 flex-shrink-0"
      >
        <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </motion.span>
    </motion.button>
    <motion.div
      initial={false}
      variants={{
        open: {
          opacity: 1,
          height: "auto",
          marginTop: "0.5rem",
          marginBottom: "1rem",
        },
        closed: {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
        },
      }}
      transition={{ duration: 0.3 }}
      className="px-6"
    >
      <div className="pb-4 text-gray-600 dark:text-gray-300">{answer}</div>
    </motion.div>
  </motion.div>
);

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="container relative px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Heading title="Frequently Asked Questions" description="Everything you need to know about PersonaAI" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 space-y-4 max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
