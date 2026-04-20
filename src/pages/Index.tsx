import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import StatPills from "@/components/StatPills";
import PremiumCTAButton from "@/components/PremiumCTAButton";

const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FounderNote = lazy(() => import("@/components/FounderNote"));
const FAQ = lazy(() => import("@/components/FAQ"));
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
    <div className="min-h-screen bg-background text-foreground star-field">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6" style={{ minHeight: '64px' }}>
          <div className="flex items-center gap-3" />
          <div className="flex items-center gap-4">
            <PremiumCTAButton onClick={openModal} size="sm" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 md:pt-24 pb-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.img
            src={nanoCampLogo}
            alt="Nano Camp"
            width={144}
            height={72}
            fetchPriority="high"
            decoding="async"
            className="mb-16 md:mb-28"
            style={{ height: 'clamp(44px, 6vw, 64px)', width: 'auto' }}
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fade}
          />
          <div className="w-full flex flex-col items-center">
            <motion.h1
              className="font-display font-light leading-[1.05] tracking-tight max-w-[1000px]"
              style={{ color: "#FFFFFF", fontSize: 'clamp(48px, 9vw, 104px)' }}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
            >
              Get paid to reach your{" "}
              <span className="italic" style={{ color: "#D4A843" }}>goals.</span>
            </motion.h1>

            <motion.p
              className="mt-7 md:mt-8 max-w-[620px] text-base md:text-3xl"
              style={{ color: "#E8D4A8", lineHeight: 1.5 }}
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
            >
              You bring the goal. We bring the plan. Finish it in 30 days and we pay you $25.
            </motion.p>

            <motion.div
              className="mt-10 md:mt-12 w-full max-w-[600px]"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
            >
              <StatPills />
            </motion.div>
          </div>

          <motion.div
            className="mt-12 md:mt-14 w-full flex justify-center"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fade}
          >
            <PremiumCTAButton onClick={openModal} size="xl" />
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HowItWorks onGoalSelect={openModal} />
        <Testimonials />
        <FounderNote />
      </Suspense>


      <Suspense fallback={null}>
        <FAQ />
      </Suspense>

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
