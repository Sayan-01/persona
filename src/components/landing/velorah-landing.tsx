"use client";

import { useState, useEffect, useRef } from "react";

/* ── CSS injected into <head> ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --background: hsl(201,100%,13%);
    --foreground: hsl(0,0%,100%);
    --card: hsl(0,0%,6%);
    --card-foreground: hsl(0,0%,100%);
    --primary: hsl(0,0%,100%);
    --primary-foreground: hsl(0,0%,4%);
    --secondary: hsl(0,0%,10%);
    --secondary-foreground: hsl(0,0%,100%);
    --muted: hsl(0,0%,10%);
    --muted-foreground: hsl(240,4%,66%);
    --accent: hsl(0,0%,10%);
    --accent-foreground: hsl(0,0%,100%);
    --destructive: hsl(0,84.2%,60.2%);
    --destructive-foreground: hsl(0,0%,100%);
    --border: hsl(0,0%,18%);
    --input: hsl(0,0%,18%);
    --ring: hsl(0,0%,100%);
    --radius: 0.5rem;
    --font-body: 'Inter', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: #000;
    color: var(--foreground);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Liquid Glass */
  .liquid-glass {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255,255,255,0.45) 0%,
      rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0)    40%,
      rgba(255,255,255,0)    60%,
      rgba(255,255,255,0.15) 80%,
      rgba(255,255,255,0.45) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    border-radius: inherit;
  }

  /* Animations */
  @keyframes fade-rise {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-rise          { animation: fade-rise 0.8s ease-out both; }
  .animate-fade-rise-delay    { animation: fade-rise 0.8s 0.2s ease-out both; }
  .animate-fade-rise-delay-2  { animation: fade-rise 0.8s 0.4s ease-out both; }

  /* Instrument Serif helper */
  .serif { font-family: 'Instrument Serif', serif; }
`;

/* ── inject styles once ── */
function useGlobalStyles() {
  useEffect(() => {
    const id = "velorah-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);
}

/* ── HLS Video component ── */
function HlsVideo({ src, className = "", ...props }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any;
    const isHLS = src.includes(".m3u8");

    if (isHLS) {
      // @ts-ignore
      import("https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js")
        .catch(() => {
          // fallback: try script tag approach
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js";
          script.onload = () => attachHls();
          document.head.appendChild(script);
        })
        .then((mod) => {
          if (!mod) return;
          const Hls = mod.default || (window as any).Hls;
          attachWithHls(Hls);
        });
    } else {
      video.src = src;
    }

    function attachWithHls(Hls: any) {
      if (!Hls) return;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video!.canPlayType("application/vnd.apple.mpegurl")) {
        video!.src = src;
      }
    }

    function attachHls() {
      attachWithHls((window as any).Hls);
    }

    return () => { if (hls) hls.destroy(); };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover z-0 ${className}`}
      autoPlay
      loop
      muted
      playsInline
      {...props}
    />
  );
}

/* ── Nav ── */
function Navbar() {
  return (
    <nav style={{ position: "relative", zIndex: 10 }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 2rem", maxWidth: "80rem", margin: "0 auto"
      }}>
        {/* Brand */}
        <span className="serif" style={{ fontSize: "1.875rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Velorah<sup style={{ fontSize: "0.55rem", verticalAlign: "super" }}>®</sup>
        </span>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {["Home","Studio","About","Journal","Reach Us"].map(link => (
            <a key={link} href="#" style={{
              fontSize: "0.875rem", color: "white", textDecoration: "none",
              transition: "opacity 0.2s"
            }}
              // @ts-ignore
              onMouseEnter={e => e.target.style.opacity = "0.7"}
              // @ts-ignore
              onMouseLeave={e => e.target.style.opacity = "1"}
            >{link}</a>
          ))}
        </div>

        {/* CTA */}
        <button className="liquid-glass" style={{
          borderRadius: "9999px", padding: "0.625rem 1.5rem",
          fontSize: "0.875rem", color: "var(--foreground)",
          background: "transparent", cursor: "pointer",
          transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >Begin Journey</button>
      </div>
    </nav>
  );
}

/* ── Section 1: Hero ── */
function Hero() {
  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        autoPlay loop muted playsInline
      />
      {/* Bottom gradient */}
      <div style={{
        position: "absolute", inset: "auto 0 0 0", height: "40%",
        background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
        zIndex: 1
      }} />

      <Navbar />

      {/* Hero Content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        padding: "28px 1.5rem 10rem"
      }}>
        <h1 className="animate-fade-rise serif" style={{
          color: "var(--foreground)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          lineHeight: "0.95",
          letterSpacing: "-2.46px",
          maxWidth: "80rem",
          fontWeight: "normal",
          marginBottom: 0
        }}>
          Where <em className="not-italic" style={{ color: "white" }}>dreams</em> rise{" "}
          <em className="not-italic" style={{ color: "white" }}>through the silence.</em>
        </h1>

        <p className="animate-fade-rise-delay" style={{
          color: "white", fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
          maxWidth: "42rem", marginTop: "2rem", lineHeight: "1.7",
          fontFamily: "var(--font-body)"
        }}>
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <button className="animate-fade-rise-delay-2 liquid-glass" style={{
          borderRadius: "9999px", padding: "1.25rem 3.5rem",
          fontSize: "1rem", color: "var(--foreground)",
          background: "transparent", cursor: "pointer",
          marginTop: "3rem", transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >Begin Journey</button>
      </div>
    </section>
  );
}

/* ── Section 2: Tagline ── */
function Tagline() {
  return (
    <section style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "70vh", padding: "2rem 1.5rem",
      background: "hsl(0,0%,0%)"
    }}>
      <h2 className="serif" style={{
        color: "var(--foreground)",
        fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
        lineHeight: "1.05",
        letterSpacing: "-1.5px",
        textAlign: "center",
        maxWidth: "56rem",
        fontWeight: "normal"
      }}>
        So you can feel at home,<br />anywhere.
      </h2>
    </section>
  );
}

/* ── Section 3: Feature Split ── */
function FeatureSplit() {
  const [activeTab, setActiveTab] = useState("electric");
  const tabs = [
    { label: "Living Electric", id: "electric" },
    { label: "Charge Faster",  id: "charge" },
    { label: "Sleep Well",     id: "sleep" },
    { label: "Acoustic Comfort", id: "acoustic" },
    { label: "5+ Seasons",    id: "seasons" },
  ];

  return (
    <section style={{ padding: "0 1.5rem", maxWidth: "80rem", margin: "0 auto" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem", borderRadius: "1rem", overflow: "hidden", minHeight: "520px"
      }}>
        {/* Left card */}
        <div style={{
          background: "var(--card)", borderRadius: "1rem",
          padding: "3.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between"
        }}>
          <div>
            <span style={{
              display: "inline-block", width: "2rem", height: "2rem",
              borderRadius: "9999px", border: "1px solid var(--border)", marginBottom: "2rem"
            }} />
            <h3 className="serif" style={{
              color: "var(--foreground)", fontSize: "clamp(1.75rem, 3vw, 3rem)",
              letterSpacing: "-1px", marginBottom: "1.5rem", fontWeight: "normal"
            }}>100% Electric</h3>
            <p style={{
              color: "var(--muted-foreground)", fontSize: "0.9rem",
              lineHeight: "1.7", maxWidth: "28rem"
            }}>
              No more fossil fuels, buzzing generators, and propane tanks.
              Velorah has power for days.
            </p>
          </div>

          <div>
            {/* Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  fontSize: "0.75rem", padding: "0.5rem 1rem",
                  borderRadius: "9999px", border: `1px solid ${activeTab === tab.id ? "var(--foreground)" : "var(--border)"}`,
                  background: activeTab === tab.id ? "var(--foreground)" : "transparent",
                  color: activeTab === tab.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)"
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{
              width: "100%", height: "2px", background: "var(--border)",
              borderRadius: "9999px", marginBottom: "1.5rem"
            }}>
              <div style={{ height: "100%", width: "35%", background: "var(--foreground)", borderRadius: "9999px" }} />
            </div>

            <button className="liquid-glass" style={{
              borderRadius: "9999px", padding: "0.75rem 2rem",
              fontSize: "0.875rem", color: "var(--foreground)",
              background: "transparent", cursor: "pointer", transition: "transform 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >Explore the Velorah Flow</button>
          </div>
        </div>

        {/* Right card */}
        <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", minHeight: "400px" }}>
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay loop muted playsInline
          />
        </div>
      </div>
    </section>
  );
}

/* ── Section 4: Big Statement ── */
function BigStatement() {
  const stats = [
    { value: "OTA",    label: "Over-the-air updates" },
    { value: "360°",   label: "System visibility" },
    { value: "AI",     label: "Adaptive routines" },
    { value: "24/7",   label: "Remote monitoring" },
  ];

  return (
    <section style={{
      position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      minHeight: "90vh", padding: "2rem 1.5rem", overflow: "hidden"
    }}>
      <HlsVideo src="https://stream.mux.com/9njY8qDfS02Uvbll018C8CK39p5EksK7mn02DDC1zYvppI.m3u8" />
      {/* Dark overlay for readability */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1 }} />

      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", maxWidth: "64rem"
      }}>
        <p style={{
          color: "var(--muted-foreground)", fontSize: "0.8rem",
          letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem"
        }}>Intelligent Companion</p>

        <h2 className="serif" style={{
          color: "var(--foreground)", fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
          lineHeight: "1.05", letterSpacing: "-1.5px", fontWeight: "normal"
        }}>
          Adventure inspired.<br />App driven.
        </h2>

        <p style={{
          color: "var(--muted-foreground)", fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
          maxWidth: "42rem", marginTop: "2rem", lineHeight: "1.7"
        }}>
          One app to control climate, lighting, navigation, and energy. Monitor every
          system in real time, automate your routines, and let Velorah learn how you
          live on the road.
        </p>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3rem", marginTop: "3.5rem"
        }}>
          {stats.map(s => (
            <div key={s.value} style={{ textAlign: "center" }}>
              <div className="serif" style={{
                color: "var(--foreground)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                fontWeight: "300", lineHeight: 1
              }}>{s.value}</div>
              <div style={{
                color: "var(--muted-foreground)", fontSize: "0.75rem",
                marginTop: "0.5rem"
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button className="liquid-glass" style={{
          borderRadius: "9999px", padding: "1rem 2.5rem",
          fontSize: "0.875rem", color: "var(--foreground)",
          background: "transparent", cursor: "pointer",
          marginTop: "3rem", transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >Discover the App</button>
      </div>
    </section>
  );
}

/* ── Section 5: CTA / Join ── */
function JoinSection() {
  return (
    <section style={{
      position: "relative", minHeight: "90vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "2rem 1.5rem", overflow: "hidden"
    }}>
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        autoPlay loop muted playsInline
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1 }} />

      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", maxWidth: "56rem"
      }}>
        <p style={{
          color: "var(--muted-foreground)", fontSize: "0.8rem",
          letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem"
        }}>Starting at $99,000</p>

        <h2 className="serif" style={{
          color: "var(--foreground)", fontSize: "clamp(3rem, 8vw, 6rem)",
          lineHeight: "0.95", letterSpacing: "-2px", fontWeight: "normal"
        }}>Join the ride</h2>

        <p style={{
          color: "var(--muted-foreground)", fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
          maxWidth: "36rem", marginTop: "1.5rem", lineHeight: "1.7"
        }}>
          Reserve your Velorah today with a fully refundable $500 deposit. Early
          adopters receive priority delivery and exclusive founding-member benefits.
        </p>

        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "1rem", marginTop: "2.5rem", justifyContent: "center"
        }}>
          <button className="liquid-glass" style={{
            borderRadius: "9999px", padding: "1rem 2.5rem",
            fontSize: "0.875rem", color: "var(--foreground)",
            background: "transparent", cursor: "pointer", transition: "transform 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >Preorder Now</button>

          <button style={{
            borderRadius: "9999px", padding: "1rem 2.5rem",
            fontSize: "0.875rem", color: "var(--muted-foreground)",
            border: "1px solid var(--border)", background: "transparent",
            cursor: "pointer", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >Schedule a Tour</button>
        </div>
      </div>
    </section>
  );
}

/* ── Section 6: Footer ── */
function Footer() {
  const links = ["product","app","company","community","press","preorder"];

  return (
    <footer style={{
      background: "hsl(0,0%,0%)",
      borderTop: "1px solid var(--border)",
      padding: "4rem 3rem 4rem",
      maxWidth: "80rem", margin: "0 auto"
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3rem", marginBottom: "4rem"
      }}>
        <div>
          <h3 className="serif" style={{
            color: "var(--foreground)", fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
            lineHeight: "1.2", fontWeight: "normal"
          }}>
            Where home<br />meets the road.
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {links.map(l => (
            <a key={l} href="#" style={{
              fontSize: "0.875rem", color: "var(--muted-foreground)",
              textDecoration: "none", textTransform: "capitalize", transition: "color 0.2s"
            }}
              // @ts-ignore
              onMouseEnter={e => e.target.style.color = "var(--foreground)"}
              // @ts-ignore
              onMouseLeave={e => e.target.style.color = "var(--muted-foreground)"}
            >{l}</a>
          ))}
        </div>

        <div>
          <p style={{
            fontSize: "0.875rem", color: "var(--muted-foreground)",
            marginBottom: "1rem", lineHeight: "1.6"
          }}>
            Subscribe for the latest<br />Velorah updates.
          </p>
          <button className="liquid-glass" style={{
            borderRadius: "9999px", padding: "0.625rem 1.5rem",
            fontSize: "0.875rem", color: "var(--foreground)",
            background: "transparent", cursor: "pointer", transition: "transform 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >Subscribe</button>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        justifyContent: "space-between", gap: "1rem",
        paddingTop: "2rem", borderTop: "1px solid var(--border)"
      }}>
        <span className="serif" style={{ color: "var(--foreground)", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
          Velorah<sup style={{ fontSize: "8px", verticalAlign: "super" }}>®</sup>
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy Policy","Terms & Conditions"].map(t => (
            <a key={t} href="#" style={{
              fontSize: "0.75rem", color: "var(--muted-foreground)",
              textDecoration: "none", transition: "color 0.2s"
            }}
              // @ts-ignore
              onMouseEnter={e => e.target.style.color = "var(--foreground)"}
              // @ts-ignore
              onMouseLeave={e => e.target.style.color = "var(--muted-foreground)"}
            >{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Root ── */
export default function VelorahLanding() {
  useGlobalStyles();

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Hero />
      <Tagline />
      <FeatureSplit />
      <BigStatement />
      <JoinSection />
      <Footer />
    </div>
  );
}
