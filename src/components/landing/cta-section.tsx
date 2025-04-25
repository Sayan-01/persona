import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 gradient-bg">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl opacity-90">
              Join thousands of content creators who are saving time and creating better content with PersonaAI.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-1.5">
                Get Started for Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
