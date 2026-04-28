import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setModalOpen(true);

  // Defer mounting of below-the-fold components until user scrolls near them
  // (or after a short idle window as a safety net). This dramatically improves
  // mobile TTI/FID without affecting layout or UX.
  useEffect(() => {
    if (showBelowFold) return;
    if (typeof window === "undefined") return;

    const trigger = () => setShowBelowFold(true);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && sentinelRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            trigger();
            observer?.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      observer.observe(sentinelRef.current);
    }

    // Safety fallback: if the user never scrolls, hydrate after idle so SEO
    // crawlers and direct deep-links still see the full page.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(trigger, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(trigger, 2500);
    }

    return () => {
      observer?.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [showBelowFold]);

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
      <section className="pt-4 sm:pt-12 pb-16 sm:pb-24 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Headline */}
          <h1
            className="font-display font-light leading-[1.02] sm:leading-[1.05] tracking-tight max-w-[980px] text-center"
            style={{ color: "#FFFFFF", fontSize: 'clamp(38px, 7.8vw, 84px)' }}
          >
            Get <span style={{ color: "#D4A843" }}>paid</span> to reach your goals.
            <span className="block" style={{ color: "#F5E8C4", fontStyle: 'italic', fontSize: '0.78em', marginTop: '0.18em' }}>
              Or help someone else reach theirs.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="max-w-[680px] hero-fade"
            style={{
              color: "#F5E8C4",
              lineHeight: 1.45,
              fontSize: 'clamp(18px, 2.1vw, 23px)',
              fontWeight: 500,
              marginTop: 'clamp(32px, 4vw, 44px)',
              animationDelay: '0.15s',
            }}
          >
            Earn <span style={{ color: '#D4A843', fontWeight: 700 }}>Nano Score</span> every time you check in.
            Cash it out, donate to charity, or send it to a friend who needs a push.
          </p>

          {/* CTA */}
          <div
            className="w-full flex justify-center hero-fade"
            style={{ marginTop: 'clamp(28px, 3.5vw, 40px)', animationDelay: '0.3s' }}
          >
            <PremiumCTAButton onClick={openModal} size="xl">
              Start your first goal
            </PremiumCTAButton>
          </div>

          {/* Sponsor micro-section */}
          <div
            className="hero-fade max-w-[640px] mx-auto"
            style={{
              marginTop: 'clamp(48px, 6vw, 72px)',
              padding: 'clamp(20px, 2.4vw, 28px) clamp(22px, 3vw, 32px)',
              borderRadius: '14px',
              border: '1px solid rgba(212,168,67,0.22)',
              background: 'linear-gradient(180deg, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 100%)',
              animationDelay: '0.45s',
            }}
          >
            <p
              className="font-display"
              style={{
                color: '#D4A843',
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '10px',
              }}
            >
              Why sponsors pay you
            </p>
            <p
              style={{
                color: '#E8DCC0',
                fontSize: 'clamp(15px, 1.7vw, 17px)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              In the post-AI era, content, advice, and plans are everywhere.
              What's rare is <span style={{ color: '#FFFFFF', fontWeight: 600 }}>follow-through</span>.
              NanoCamp gives sponsors a way to back real action and real progress.
            </p>
          </div>

          {/* How it works — compact 3-step */}
          <div
            className="hero-fade w-full"
            style={{ marginTop: 'clamp(56px, 7vw, 88px)', animationDelay: '0.6s' }}
          >
            <p
              className="font-display"
              style={{
                color: '#C8C0B0',
                fontSize: 'clamp(12px, 1.3vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: 'clamp(24px, 3vw, 32px)',
              }}
            >
              How it works
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-[920px] mx-auto text-left"
            >
              {[
                {
                  n: '01',
                  title: 'Pick one goal',
                  body: 'Choose one thing that matters to you right now.',
                },
                {
                  n: '02',
                  title: 'Show up',
                  body: 'Check in with proof, progress, or synced activity.',
                },
                {
                  n: '03',
                  title: 'Use what you earn',
                  body: 'Your progress becomes a Nano Score you can keep, spend, or pass forward.',
                },
              ].map((step) => (
                <div
                  key={step.n}
                  style={{
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(212,168,67,0.28)',
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      color: '#D4A843',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      marginBottom: '10px',
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      color: '#FFFFFF',
                      fontSize: 'clamp(18px, 2vw, 21px)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      margin: 0,
                      marginBottom: '8px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: '#C8C0B0',
                      fontSize: 'clamp(14px, 1.5vw, 15px)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sentinel placed right after the fold to trigger below-fold hydration.
          The min-height reserves space so the footer doesn't shift when the
          deferred below-fold content mounts (prevents CLS). */}
      <div
        ref={sentinelRef}
        aria-hidden
        style={{ minHeight: showBelowFold ? undefined : '6500px' }}
      >
        {showBelowFold && (
          <Suspense fallback={<div style={{ minHeight: '6500px' }} aria-hidden />}>
            <HowItWorks onGoalSelect={openModal} />
            <EnterpriseGrade />
            <Testimonials />
            <FounderNote />
            <FAQ />
          </Suspense>
        )}
      </div>

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
