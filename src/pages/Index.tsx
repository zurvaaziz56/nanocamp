import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import HowItWorks from "@/components/HowItWorks";
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
          <img src={nanoCampLogo} alt="Nano Camp" style={{ height: '40px', width: 'auto' }} />
          <button
            onClick={() => scrollToSection("founding")}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Become a founding member
          </button>
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
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.05] tracking-tight text-foreground max-w-3xl"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
          >
            Get paid to reach your goals.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-xl"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fade}
          >
            The only app that pays you to show up.
          </motion.p>
          <motion.p
            className="mt-6 text-sm md:text-base text-muted-foreground font-light"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fade}
          >
            Pick a goal. Show up for 30 days. Walk away with $25.
          </motion.p>

          <motion.form
            onSubmit={validateAndSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-[480px]"
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
        </div>
      </section>

      <HowItWorks />

      {/* Why */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-semibold text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            Willpower is overrated.
          </motion.h2>
          <motion.p
            className="mt-8 text-muted-foreground font-light leading-relaxed text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            Most people don't finish what they start. Not because they can't. Because they don't have to. Nano changes that. Put something on the line. Follow through. Get paid.
          </motion.p>
        </div>
      </section>

      {/* Founding Offer */}
      <section id="founding" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fade}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Founding Offer
            </span>
            <p className="mt-6 text-muted-foreground font-light leading-relaxed text-lg">
              This is Nano's first month. A small group of people get in at $20, prove it works, and walk away with $25. You in?
            </p>
            <button
              onClick={() => scrollToSection("how")}
              className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-[8px] text-sm font-medium hover:bg-primary/90 transition-colors"
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
