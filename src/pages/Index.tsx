import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import StatPills from "@/components/StatPills";
import PremiumCTAButton from "@/components/PremiumCTAButton";

const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const EnterpriseGrade = lazy(() => import("@/components/EnterpriseGrade"));
const FounderNote = lazy(() => import("@/components/FounderNote"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FoundingMemberModal = lazy(() => import("@/components/FoundingMemberModal"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const nanoCampLogo = "/img/nano-camp-logo.webp";

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
            <img
              src={nanoCampLogo}
              alt="Nano Camp"
              width={144}
              height={72}
              fetchPriority="high"
              decoding="async"
              style={{ height: 'clamp(32px, 3.5vw, 44px)', width: 'auto' }}
            />
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <PremiumCTAButton onClick={openModal} size="sm" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-4 sm:pt-12 pb-0 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center">
              <h1
                className="font-display font-light leading-[1.02] sm:leading-[1.05] tracking-tight max-w-[1000px] text-center"
                style={{ color: "#FFFFFF", fontSize: 'clamp(42px, 9.5vw, 96px)' }}
              >
                Get{" "}
                <span style={{ color: "#D4A843" }}>paid</span>
                {" "}to
              </h1>
              <span
                className="font-display font-light tracking-tight text-center"
                style={{
                  color: "#FFFFFF",
                  fontSize: 'clamp(42px, 9.5vw, 96px)',
                  lineHeight: 1.02
                }}
              >
                reach your goals.
              </span>
            </div>

            <p
              className="max-w-[620px] hero-fade"
              style={{
                color: "#F5E8C4",
                lineHeight: 1.4,
                fontSize: 'clamp(22px, 2.6vw, 30px)',
                fontWeight: 600,
                marginTop: 'clamp(56px, 6.5vw, 72px)',
                animationDelay: '0.2s',
              }}
            >
              Finish one goal. Earn $25.
            </p>

            {/* Proof points */}
            <div
              className="mx-auto text-center flex flex-col items-center"
              style={{
                marginTop: 'clamp(40px, 5vw, 56px)',
                gap: '12px',
              }}
            >
              {[
                { prefix: "Powered by", word: "science" },
                { prefix: "Verified by", word: "AI" },
                { prefix: "Funded by", word: "sponsors" },
              ].map(({ prefix, word }) => (
                <p
                  key={word}
                  className="font-display whitespace-nowrap"
                  style={{
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    fontSize: 'clamp(20px, 2.6vw, 26px)',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {prefix}{" "}
                  <span style={{ color: '#D4A843', fontWeight: 700 }}>{word}</span>
                </p>
              ))}
            </div>

            <div
              className="w-full max-w-[600px] hero-fade"
              style={{ marginTop: 'clamp(28px, 3.2vw, 32px)', animationDelay: '0.3s' }}
            >
              <StatPills />
            </div>
          </div>

          <div
            className="w-full flex justify-center hero-fade"
            style={{ marginTop: 'clamp(28px, 3.5vw, 36px)', marginBottom: 'clamp(8px, 1.5vw, 16px)', animationDelay: '0.4s' }}
          >
            <PremiumCTAButton onClick={openModal} size="xl" />
          </div>
        </div>
      </section>

      <Suspense fallback={<div style={{ minHeight: '2400px' }} aria-hidden />}>
        <HowItWorks onGoalSelect={openModal} />
        <EnterpriseGrade />
        <Testimonials />
        <FounderNote />
        <FAQ />
      </Suspense>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          <img src={nanoCampLogo} alt="Nano Camp" width={64} height={32} loading="lazy" decoding="async" style={{ height: '32px', width: 'auto' }} />
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "#C8C0B0" }}>
            <a href="#how" className="hover:opacity-80 transition-colors">How it works</a>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hover:opacity-80 transition-colors"
              style={{ color: "inherit", background: "none", padding: 0 }}
            >
              Contact
            </button>
            <Link to="/terms" className="hover:opacity-80 transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:opacity-80 transition-colors">Privacy</Link>
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
