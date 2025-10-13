import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Roadmap", href: "/roadmap" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
        { label: "Licenses", href: "/licenses" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-zinc-900 backdrop-blur-sm">
      <div className=" py-20 px-[70px] mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-10">
          {/* Brand and social */}
          <div className="flex flex-col ">
            <Link
              href="/"
              className="inline-block"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">PersonaAI</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">AI-powered content creation tailored to your unique brand persona.</p>
            <div className="flex items-center mt-6 space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex md:gap-10">
            {footerLinks.map((section) => (
              <div
                key={section.title}
                className="lg:col-span-2"
              >
                <h3 className="text-sm font-medium text-foreground/90">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="fle flex-col">
            <h3 className="text-sm font-medium text-foreground/90">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">Get the latest updates and news delivered to your inbox.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your email"
                  className="pl-10 h-10 w-full bg-background/80 border-border/50 focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <Button
                type="submit"
                className="shrink-0 h-10"
              >
                Subscribe
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">© {currentYear} PersonaAI. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
