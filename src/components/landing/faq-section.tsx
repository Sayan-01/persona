"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

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
      "PersonaAI currently supports Facebook and Instagram in the Free plan, with additional platforms available in the Pro and Business plans. Each platform has specialized formatting to ensure your content looks great and performs well.",
  },
  {
    question: "How many AI generations do I get?",
    answer:
      "The Free plan includes 10,000 credits per month. The Pro plan includes 100,000 generations per month, and the Business plan includes unlimited generations. Each generation can be used for content ideas, writing posts, or enhancing existing content.",
  },
  {
    question: "Can I try PersonaAI before subscribing?",
    answer:
      "Yes! We offer a Free plan that lets you try the core features of PersonaAI. You can create one persona, generate up to 10 pieces of content per month, and use the basic content calendar. No credit card required.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div className="mb-4">
    <button
      className={`flex w-full items-center justify-between p-8 text-left transition-all duration-300 rounded-[1.5rem] border ${
        isOpen ? "bg-white/5 border-white/20" : "bg-transparent border-white/5 hover:border-white/20"
      }`}
      onClick={onClick}
    >
      <span className="text-[18px] font-medium text-white/90">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: "circOut" }}
        className="ml-4 flex-shrink-0"
      >
        <Plus className="h-6 w-6 text-white/40" />
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="overflow-hidden"
        >
          <div className="p-8 pt-2 text-white/40 text-[16px] leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-black overflow-hidden px-6 lg:px-[70px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Support</p>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white font-normal mb-8">
              Answers to your <br /><em className="italic">curiosities.</em>
            </h2>
            <p className="font-sans text-white/40 text-[16px] leading-relaxed max-w-[400px]">
              Can't find what you're looking for? Our support team is available 24/7 
              to help you navigate your creative journey.
            </p>
          </div>

          <div className="max-w-2xl">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
