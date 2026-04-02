import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/SayanDas21670", label: "Twitter" },
    { icon: Facebook, href: "https://www.facebook.com/sayan.das.427380", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/sayan_200462", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sayandas-s1", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Sayan-01", label: "GitHub" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-white/5 py-20 px-6 lg:px-[70px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-1">
            <h3 className="font-instrument text-2xl text-white font-normal mb-4">
              PersonaAI<sup className="text-[10px] ml-1">®</sup>
            </h3>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-[240px]">
              Where content meets the soul. Built with precision for the modern creator.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-[12px] uppercase tracking-[0.2em] mb-6 font-medium">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/40 hover:text-white transition-colors text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-[12px] uppercase tracking-[0.2em] mb-6 font-medium">
              Join the ride
            </h4>
            <p className="text-white/40 text-[14px] mb-6 leading-relaxed">
              Subscribe for the latest Persona updates and AI insights.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[14px] text-white focus:outline-none focus:border-white/30 flex-1"
              />
              <button className="liquid-glass px-6 py-2 rounded-full text-white text-[12px] font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link 
                key={label} 
                href={href} 
                className="text-white/20 hover:text-white transition-colors"
                target="_blank"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
          
          <div className="text-white/20 text-[12px] tracking-wide">
            © {currentYear} PersonaAI. All rights reserved. Built by Sayan Das.
          </div>
        </div>
      </div>
    </footer>
  );
}
