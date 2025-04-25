import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
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
    {
      question: "Is there a mobile app?",
      answer:
        "Currently, PersonaAI is available as a web application that works on all devices, including mobile browsers. A dedicated mobile app is on our roadmap for future development.",
    },
  ]

  return (
    <section id="faq" className="py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to know about PersonaAI
            </p>
          </div>
          <div className="mx-auto w-full max-w-3xl mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
