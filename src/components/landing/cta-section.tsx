import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 dark:from-slate-950 dark:to-slate-900/80">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/5 via-background/50 to-primary/5 dark:from-primary/10 dark:via-slate-900/80 dark:to-primary/10 rounded-3xl p-8 md:p-12 shadow-xl border border-border/30 dark:border-slate-800/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-600 dark:from-primary-300 dark:to-primary-100">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto">
              Join thousands of content creators who are saving time and creating better content with PersonaAI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className={buttonVariants({ size: 'lg', variant: 'default', className: 'gap-2 group bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90' })}
              >
                Get Started for Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo" 
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30' })}
              >
                Watch Demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-foreground/70 dark:text-muted-foreground">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
