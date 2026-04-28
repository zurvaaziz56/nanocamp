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
                  lineHeight: 1.02,
                }}
              >
                reach your goals.
              </span>
              <span
                className="font-display font-light tracking-tight text-center"
                style={{
                  color: "#F5E8C4",
                  fontSize: 'clamp(28px, 5.2vw, 52px)',
                  lineHeight: 1.08,
                  marginTop: 'clamp(16px, 2vw, 24px)',
                  opacity: 0.92,
                }}
              >
                Or help someone else reach theirs.
              </span>
            </div>

            <p
              className="max-w-[640px] hero-fade"
              style={{
                color: "#F5E8C4",
                lineHeight: 1.45,
                fontSize: 'clamp(18px, 2.1vw, 24px)',
                fontWeight: 500,
                marginTop: 'clamp(40px, 5vw, 56px)',
                animationDelay: '0.2s',
              }}
            >
              Earn Nano Score every time you check in. Cash it out, donate to charity, or send it to a friend who needs a push.
            </p>

          </div>

          <div
            className="w-full flex justify-center hero-fade"
            style={{ marginTop: 'clamp(28px, 3.5vw, 36px)', marginBottom: 'clamp(8px, 1.5vw, 16px)', animationDelay: '0.4s' }}
          >
            <PremiumCTAButton onClick={openModal} size="xl" />
          </div>

          {/* Why sponsors pay */}
          <div
            className="hero-fade w-full max-w-[760px] text-center"
            style={{
              marginTop: 'clamp(64px, 8vw, 96px)',
              animationDelay: '0.5s',
            }}
          >
            <h2
              className="font-display"
              style={{
                color: '#D4A843',
                fontSize: 'clamp(22px, 2.8vw, 30px)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Why would sponsors pay you?
            </h2>
            <p
              style={{
                color: '#F5E8C4',
                fontSize: 'clamp(17px, 1.9vw, 21px)',
                lineHeight: 1.55,
                marginTop: 'clamp(16px, 2vw, 20px)',
                fontWeight: 400,
              }}
            >
              In the post-AI era, content is everywhere. Advice is everywhere. Plans are everywhere. What's rare now is follow-through. NanoCamp gives sponsors a way to back real action and real progress.
            </p>
          </div>

          {/* Compact How it works */}
          <div
            className="hero-fade w-full max-w-[1000px]"
            style={{
              marginTop: 'clamp(56px, 7vw, 88px)',
              animationDelay: '0.6s',
            }}
          >
            <div
              className="grid gap-6 sm:gap-8 text-left"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Pick one goal',
                  body: 'Choose one thing that matters to you right now.',
                },
                {
                  step: '02',
                  title: 'Show up',
                  body: 'Check in with proof, progress, or synced activity.',
                },
                {
                  step: '03',
                  title: 'Use what you earn',
                  body: 'Your progress becomes a Nano Score you can keep, spend, or pass forward.',
                },
              ].map(({ step, title, body }) => (
                <div
                  key={step}
                  style={{
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    borderRadius: '14px',
                    border: '1px solid rgba(212, 168, 67, 0.18)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      color: '#D4A843',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                    }}
                  >
                    {step}
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      color: '#FFFFFF',
                      fontSize: 'clamp(20px, 2.2vw, 24px)',
                      fontWeight: 600,
                      marginTop: '10px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: '#C8C0B0',
                      fontSize: 'clamp(15px, 1.6vw, 17px)',
                      lineHeight: 1.5,
                      marginTop: '8px',
                    }}
                  >
                    {body}
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
