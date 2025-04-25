import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "PersonaAI has completely transformed how I create content. I'm saving hours every week and my engagement has increased by 40%.",
      author: "Sarah Johnson",
      role: "Content Creator",
      avatar: "SJ",
    },
    {
      quote:
        "The persona trainer is brilliant. It captured my brand voice perfectly and now all my content feels consistent across platforms.",
      author: "Michael Chen",
      role: "Marketing Director",
      avatar: "MC",
    },
    {
      quote:
        "As a small business owner, I never had time for social media. PersonaAI makes it possible to maintain a professional presence without the hassle.",
      author: "Emma Rodriguez",
      role: "Entrepreneur",
      avatar: "ER",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of content creators who love PersonaAI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-lg">{testimonial.quote}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
