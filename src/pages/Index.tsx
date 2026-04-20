import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatPills from "@/components/StatPills";
import PremiumCTAButton from "@/components/PremiumCTAButton";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FounderNote from "@/components/FounderNote";
import FAQ from "@/components/FAQ";

const FoundingMemberModal = lazy(() => import("@/components/FoundingMemberModal"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const nanoCampLogo = "/img/nano-camp-logo.webp";

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
  const [contactOpen, setContactOpen] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground editorial-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 pt-4 md:pt-7" style={{ minHeight: '56px' }}>
          <div className="flex items-center gap-3">
            <motion.img
              src={nanoCampLogo}
              alt="Nano Camp"
              width={144}
              height={72}
              fetchPriority="high"
              decoding="async"
              style={{ height: 'clamp(32px, 3.5vw, 44px)', width: 'auto' }}
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fade}
            />
          </div>
          <div className="flex items-center gap-4">
            <PremiumCTAButton onClick={openModal} size="sm" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="w-full flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
            >
              <h1
                className="font-display font-light leading-[1.05] tracking-tight max-w-[1000px] text-center"
                style={{ color: "#FFFFFF", fontSize: 'clamp(48px, 9vw, 104px)' }}
              >
                Get paid to reach your
              </h1>
              <span
                className="font-display font-light italic tracking-tight text-center"
                style={{ 
                  color: "#D4A843", 
                  fontSize: 'clamp(56px, 10.8vw, 124px)',
                  marginTop: 'clamp(8px, 1.2vw, 16px)',
                  lineHeight: 1.05
                }}
              >
                goals.
              </span>
            </motion.div>

            <motion.p
              className="max-w-[620px]"
              style={{ 
                color: "#F0DFB5", 
                lineHeight: 1.5, 
                fontSize: 'clamp(17px, 1.7vw, 23px)',
                fontWeight: 500,
                marginTop: 'clamp(64px, 7vw, 88px)'
              }}
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
            >
              Become someone who finishes. Follow the 30-day plan - we'll even pay you $25 to prove it works.
            </motion.p>

            <motion.div
              className="w-full max-w-[600px]"
              style={{ marginTop: 'clamp(40px, 4.5vw, 56px)' }}
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
            >
              <StatPills />
            </motion.div>
          </div>

          <motion.div
            className="w-full flex justify-center"
            style={{ marginTop: 'clamp(56px, 6vw, 80px)' }}
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fade}
          >
            <PremiumCTAButton onClick={openModal} size="xl" />
          </motion.div>
        </div>
      </section>

      <HowItWorks onGoalSelect={openModal} />
      <Testimonials />
      <FounderNote />
      <FAQ />

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          <img src={nanoCampLogo} alt="Nano Camp" width={64} height={32} loading="lazy" decoding="async" style={{ height: '32px', width: 'auto' }} />
          <div className="flex items-center gap-6 text-sm" style={{ color: "#C8C0B0" }}>
            <a href="#how" className="hover:opacity-80 transition-colors">How it works</a>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hover:opacity-80 transition-colors"
              style={{ color: "inherit", background: "none", padding: 0 }}
            >
              Contact
            </button>
          </div>
          <p className="text-xs" style={{ color: "#807868" }}>© 2025 Nano. All rights reserved.</p>
        </div>
      </footer>

      {modalOpen && (
        <Suspense fallback={null}>
          <FoundingMemberModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
      {contactOpen && (
        <Suspense fallback={null}>
          <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
