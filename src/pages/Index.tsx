import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import HowItWorks from "@/components/HowItWorks";
import StatPills from "@/components/StatPills";
import nanoCampLogo from "@/assets/nano-camp-logo.png";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground star-field">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6" style={{ minHeight: '64px' }}>
          <div className="flex items-center gap-3">
            <img src={nanoCampLogo} alt="Nano Camp" style={{ height: '40px', width: 'auto' }} />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground font-body">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#52c97a" }} />
              216 earning now
            </span>
            <button
              onClick={() => scrollToSection("how")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View demo
            </button>
            <button
              onClick={() => scrollToSection("founding")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-[8px] text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Become a founding member
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.img
            src={nanoCampLogo}
            alt="Nano Camp"
            className="mb-10 md:mb-14"
            style={{ height: '120px', width: 'auto' }}
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fade}
          />
          <div className="max-w-[600px]">
            <motion.h1
              className="font-display text-5xl md:text-[68px] font-light leading-[1.05] tracking-tight text-foreground"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
            >
              Get paid to reach your{" "}
              <span className="italic text-primary">goals.</span>
            </motion.h1>

            <motion.div
              className="mt-8"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
            >
              <StatPills />
            </motion.div>

            <motion.form
              onSubmit={validateAndSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
            >
              {!submitted ? (
                <>
                  <div className="flex-1 flex flex-col items-start">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className="w-full px-4 py-3 bg-secondary text-foreground placeholder:text-muted-foreground border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                    {error && (
                      <span className="mt-1.5 text-xs text-destructive">{error}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-[8px] text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                  >
                    Become a founding member
                  </button>
                </>
              ) : (
                <p className="text-primary font-medium">
                  You're in. We'll be in touch.
                </p>
              )}
            </motion.form>

            <motion.button
              onClick={() => scrollToSection("how")}
              className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fade}
            >
              View Demo
            </motion.button>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Willpower */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-body block mb-4" style={{ color: "#D4A843" }}>
              Why it works
            </span>
          </motion.div>
          <motion.div
            className="pl-6"
            style={{ borderLeft: "4px solid #D4A843" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            <h2 className="font-display text-[44px] md:text-[56px] font-bold leading-[1.1]" style={{ color: "#FFFFFF" }}>
              Willpower is overrated.
            </h2>
          </motion.div>
          <motion.p
            className="mt-8 font-body leading-[1.75] text-[18px]"
            style={{ color: "#C8C0B0" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fade}
          >
            Most people don't finish what they start. Not because they can't. Because they don't have to. Nano changes that. Put something on the line. Follow through. Get paid.
          </motion.p>
        </div>
      </section>

      {/* Founding Offer */}
      <section id="founding" className="pt-12 pb-28 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="rounded-2xl p-10 md:p-14"
            style={{
              backgroundColor: "#16140E",
              border: "1px solid rgba(212,168,67,0.25)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-body font-bold block mb-6" style={{ color: "#D4A843" }}>
              Founding Offer
            </span>
            <p className="font-body leading-[1.7] text-[17px]" style={{ color: "#C8C0B0" }}>
              This is Nano's first month. A small group of people get in at $20, prove it works, and walk away with $25. You in?
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "$20", label: "Commitment" },
                { value: "$25", label: "Reward" },
                { value: "30", label: "Days" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-xl"
                  style={{
                    height: "120px",
                    backgroundColor: "rgba(212,168,67,0.05)",
                    border: "1px solid rgba(212,168,67,0.3)",
                  }}
                >
                  <span className="text-[36px] font-bold" style={{ color: "#FFFFFF" }}>
                    {item.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] mt-1" style={{ color: "#D4A843" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollToSection("how")}
              className="mt-8 w-full rounded-[8px] text-sm font-bold transition-colors hover:opacity-90"
              style={{
                height: "52px",
                backgroundColor: "#D4A843",
                color: "#000000",
                fontSize: "15px",
              }}
            >
              Become a founding member
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <img src={nanoCampLogo} alt="Nano Camp" style={{ height: '32px', width: 'auto' }} />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#founding" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="mailto:hello@nano.app" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Nano. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
