import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import HowItWorks from "@/components/HowItWorks";
import StatPills from "@/components/StatPills";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import FounderNote from "@/components/FounderNote";
import FoundingMemberModal from "@/components/FoundingMemberModal";
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
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    openModal();
  };

  return (
    <div className="min-h-screen bg-background text-foreground star-field">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6" style={{ minHeight: '64px' }}>
          <div className="flex items-center gap-3" />
          <div className="flex items-center gap-4">
            <button
              onClick={openModal}
              className="transition-all duration-200"
              style={{
                backgroundColor: "#D4A843",
                color: "#000000",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.01em",
                padding: "10px 22px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8C068";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,67,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D4A843";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Become a Founding Member
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
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
          <div className="max-w-[600px] w-full flex flex-col items-center">
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
              className="mt-8 w-full"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
            >
              <StatPills />
            </motion.div>

            <motion.form
              onSubmit={validateAndSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3 w-full justify-center"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
            >
              <div className="flex-1 flex flex-col items-center sm:items-start">
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
                className="shrink-0 transition-all duration-200"
                style={{
                  height: "54px",
                  padding: "0 22px",
                  backgroundColor: "#D4A843",
                  color: "#000000",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E8C068";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,67,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4A843";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Become a Founding Member
              </button>
            </motion.form>

            <motion.a
              href="https://zurvaaziz56.github.io/nanocamp-app/"
              target="_blank"
              rel="noopener noreferrer"
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
              <span className="inline-block animate-[bounce-arrow_1.5s_ease-in-out_infinite]">→</span>
            </motion.a>
          </div>
        </div>
      </section>

      <HowItWorks />

      <Testimonials />

      <FounderNote />

      {/* Founding Offer */}
      <section id="founding" className="pt-12 pb-28 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="rounded-2xl p-10 md:p-14 text-center"
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
            <span className="text-[13px] uppercase tracking-[0.2em] font-body font-bold block mb-6" style={{ color: "#D4A843" }}>
              Founding Offer
            </span>
            <p className="font-body text-[20px] mx-auto" style={{ color: "#C8C0B0", lineHeight: 1.75 }}>
              This is NanoCamp's first month. The first 100 members go in at $20, put in the work, and walk away with $25 — plus lifetime access. You in?
            </p>

            {/* Founding Member Perks */}
            <div className="mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 0" }}>
              <span className="block mb-4 font-body uppercase" style={{ color: "#D4A843", fontSize: "13px", letterSpacing: "0.15em", fontWeight: 700 }}>
                Founding Member Perks
              </span>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <span style={{ color: "#D4A843", fontSize: "12px" }}>✦</span>
                  <span className="font-body" style={{ color: "#E8E4DC", fontSize: "17px", fontWeight: 500 }}>Lifetime free access to the app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#D4A843", fontSize: "12px" }}>✦</span>
                  <span className="font-body" style={{ color: "#E8E4DC", fontSize: "17px", fontWeight: 500 }}>
                    A chance to win a <span style={{ color: "#D4A843" }}>$250 gift card</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "$20", label: "Start with $20*" },
                { value: "$25", label: "Finish and get $25" },
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
                  <span className="text-[52px] font-bold" style={{ color: "#FFFFFF" }}>
                    {item.value}
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.15em] mt-1" style={{ color: "#D4A843" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={openModal}
              className="mt-8 w-full transition-all duration-200"
              style={{
                height: "60px",
                backgroundColor: "#D4A843",
                color: "#000000",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8C068";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,67,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D4A843";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Become a Founding Member
            </button>
            <p style={{ color: "#6B6560", fontSize: "12px", lineHeight: 1.6, marginTop: "12px", textAlign: "center" }}>
              *Pay $20 and you're in. 7 days to cancel for a full refund if it's not for you right now. Renews every 30 days.
            </p>
          </motion.div>
        </div>
      </section>

      <FAQ />

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          <img src={nanoCampLogo} alt="Nano Camp" style={{ height: '32px', width: 'auto' }} />
          <div className="flex items-center gap-6 text-sm" style={{ color: "#C8C0B0" }}>
            <a href="#how" className="hover:opacity-80 transition-colors">How it works</a>
            <a href="#founding" className="hover:opacity-80 transition-colors">Pricing</a>
            <a href="mailto:hello@nano.app" className="hover:opacity-80 transition-colors">Contact</a>
          </div>
          <p className="text-xs" style={{ color: "#807868" }}>© 2025 Nano. All rights reserved.</p>
        </div>
      </footer>

      <FoundingMemberModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
