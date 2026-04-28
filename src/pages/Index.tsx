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
                className="font-display font-light leading-[1.02] sm:leading-[1.05] tracking-tight max-w-[1100px] text-center"
                style={{ color: "#FFFFFF", fontSize: 'clamp(38px, 8.2vw, 84px)' }}
              >
                Get{" "}
                <span style={{ color: "#D4A843" }}>paid</span>
                {" "}to reach your goals.
              </h1>
              <span
                className="font-display font-light tracking-tight text-center max-w-[1000px]"
                style={{
                  color: "#FFFFFF",
                  fontSize: 'clamp(38px, 8.2vw, 84px)',
                  lineHeight: 1.04,
                  marginTop: 'clamp(8px, 1vw, 14px)',
                }}
              >
                Help others do the same.
              </span>
            </div>

            <p
              className="max-w-[720px] hero-fade"
              style={{
                color: "#F5E8C4",
                lineHeight: 1.4,
                fontSize: 'clamp(19px, 2.2vw, 26px)',
                fontWeight: 500,
                marginTop: 'clamp(40px, 5vw, 56px)',
                animationDelay: '0.2s',
              }}
            >
              NanoCamp helps you follow through on meaningful goals, earn{" "}
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Nano Score</span>, and turn your progress into rewards, support, or impact.
            </p>

            {/* Mini 1-2-3 explainer */}
            <div
              className="mx-auto hero-fade flex flex-wrap items-center justify-center"
              style={{
                marginTop: 'clamp(32px, 4vw, 44px)',
                gap: 'clamp(10px, 1.5vw, 18px)',
                color: '#FFFFFF',
                fontSize: 'clamp(14px, 1.5vw, 17px)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                animationDelay: '0.3s',
              }}
            >
              <span>Pick a goal</span>
              <span style={{ color: '#D4A843', fontWeight: 700 }}>→</span>
              <span>Show up & earn <span style={{ color: '#D4A843', fontWeight: 700 }}>Nano Score</span></span>
              <span style={{ color: '#D4A843', fontWeight: 700 }}>→</span>
              <span>Use it for you or for someone else</span>
            </div>
          </div>

          <div
            className="w-full flex flex-col items-center hero-fade"
            style={{ marginTop: 'clamp(28px, 3.5vw, 36px)', marginBottom: 'clamp(8px, 1.5vw, 16px)', animationDelay: '0.4s' }}
          >
            <PremiumCTAButton onClick={openModal} size="xl" />
            <p
              className="max-w-[560px] text-center"
              style={{
                color: '#C8C0B0',
                fontSize: 'clamp(14px, 1.5vw, 17px)',
                fontWeight: 500,
                lineHeight: 1.45,
                marginTop: 'clamp(16px, 2vw, 22px)',
              }}
            >
              Pocket the reward or pass it on.{" "}
              <span style={{ color: '#F5E8C4' }}>Sponsors make both possible.</span>
            </p>
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
