import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import HowItWorks from "@/components/HowItWorks";
import StatPills from "@/components/StatPills";
import FAQ from "@/components/FAQ";
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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6" style={{ minHeight: '64px' }}>
          <div className="flex items-center gap-3" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("how")}
              className="px-4 py-2 rounded-[8px] text-sm font-medium transition-all duration-200"
              style={{ color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.color = "#D4A843";
                e.currentTarget.style.backgroundColor = "rgba(212,168,67,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#F5F0E8";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              View demo
            </button>
            <button
              onClick={() => scrollToSection("founding")}
              className="px-4 py-2 rounded-[8px] text-sm font-bold transition-colors hover:opacity-90"
              style={{ backgroundColor: "#D4A843", color: "#000000" }}
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
               className="font-display text-5xl md:text-[68px] font-light leading-[1.05] tracking-tight"
               style={{ color: "#FFFFFF" }}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
            >
              Get paid to reach your{" "}
              <span className="italic" style={{ color: "#D4A843" }}>goals.</span>
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
                      className="w-full px-4 text-sm transition-all rounded-lg"
                      style={{
                        height: "54px",
                        backgroundColor: "#111111",
                        color: "#F5F0E8",
                        border: "1px solid rgba(255,255,255,0.15)",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#D4A843";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,168,67,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {error && (
                      <span className="mt-1.5 text-xs text-destructive">{error}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="rounded-[8px] shrink-0 transition-all duration-200"
                    style={{
                      height: "54px",
                      padding: "0 24px",
                      backgroundColor: "#D4A843",
                      color: "#000000",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#E8C068";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,168,67,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#D4A843";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Become a founding member
                  </button>
                </>
              ) : (
                <p className="font-medium" style={{ color: "#D4A843" }}>
                  You're in. We'll be in touch.
                </p>
              )}
            </motion.form>

            <motion.button
              onClick={() => scrollToSection("how")}
              className="mt-3 inline-flex items-center gap-2 rounded-[8px] group"
              style={{
                color: "#D4A843",
                fontSize: "15px",
                fontWeight: 600,
                padding: "12px 28px",
                border: "1.5px solid rgba(212,168,67,0.6)",
                backgroundColor: "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.backgroundColor = "rgba(212,168,67,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.6)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fade}
            >
              View Demo{" "}
              <span className="inline-block animate-[bounce-arrow_1.5s_ease-in-out_infinite]">↓</span>
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

      <FAQ />

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <img src={nanoCampLogo} alt="Nano Camp" style={{ height: '32px', width: 'auto' }} />
          <div className="flex items-center gap-6 text-sm" style={{ color: "#C8C0B0" }}>
            <a href="#how" className="hover:opacity-80 transition-colors">How it works</a>
            <a href="#founding" className="hover:opacity-80 transition-colors">Pricing</a>
            <a href="mailto:hello@nano.app" className="hover:opacity-80 transition-colors">Contact</a>
          </div>
          <p className="text-xs" style={{ color: "#807868" }}>© 2025 Nano. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
