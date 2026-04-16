import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sentences = [
  "What if finishing what you started came with a reward? ",
  "Nano holds you accountable to your goals - and pays you back when you hit them. ",
  "\u200b",
];

const WillpowerSection = () => {
  const [visibleLines, setVisibleLines] = useState<boolean[]>([false, false, false]);
  const [showBar, setShowBar] = useState(false);
  const [showClosing1, setShowClosing1] = useState(false);
  const [showClosing2, setShowClosing2] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered staggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const timers = [
      setTimeout(() => setVisibleLines((p) => { const n = [...p]; n[0] = true; return n; }), 200),
      setTimeout(() => setVisibleLines((p) => { const n = [...p]; n[1] = true; return n; }), 600),
      setTimeout(() => setVisibleLines((p) => { const n = [...p]; n[2] = true; return n; }), 1000),
      setTimeout(() => setShowBar(true), 1200),
      setTimeout(() => setShowClosing1(true), 2000),
      setTimeout(() => setShowClosing2(true), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  return (
    <section
      className="pt-28 pb-12 px-6 relative"
      ref={sectionRef}
      style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.05) 0%, transparent 65%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <span
          className="text-[10px] uppercase tracking-[0.2em] font-body block mb-4"
          style={{ color: "#D4A843" }}
        >
          Why it works
        </span>

        {/* Headline — no animation, renders immediately */}
        <h2
          className="font-display text-[44px] md:text-[56px] font-bold leading-[1.1]"
          style={{ color: "#FFFFFF" }}
        >
          Been on your list{" "}
          <span className="italic" style={{ color: "#D4A843" }}>
            long enough
          </span>{" "}
          ...
        </h2>

        {/* Statement lines — scroll-triggered stagger */}
        <div className="mt-10 flex flex-col" style={{ gap: "32px" }}>
          {sentences.map((text, i) => (
            <p
              key={i}
              className="font-display leading-[1.4] transition-all duration-500 ease-out"
              style={{
                fontSize: i === 2 ? "30px" : "26px",
                fontWeight: i === 2 ? 700 : 400,
                color: i === 2 ? "#FFFFFF" : "#C8C0B0",
                opacity: visibleLines[i] ? 1 : 0,
                transform: visibleLines[i] ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Gold progress bar */}
        <div
          className="mt-8 mb-8 h-[2px] transition-all ease-out"
          style={{
            maxWidth: 120,
            backgroundColor: "#D4A843",
            width: showBar ? "120px" : "0px",
            transitionDuration: "800ms",
            opacity: showBar ? 1 : 0,
          }}
        />

        {/* Closing statement */}
        <div>
          <p
            className="font-display text-[36px] font-bold leading-[1.3] transition-all duration-500 ease-out"
            style={{
              color: "#FFFFFF",
              opacity: showClosing1 ? 1 : 0,
              transform: showClosing1 ? "translateY(0)" : "translateY(30px)",
            }}
          >
            Set your goal. Put money on it.
          </p>
          <p
            className="font-display text-[44px] italic leading-[1.3] mt-2 transition-all duration-300 ease-out"
            style={{
              color: "#D4A843",
              opacity: showClosing2 ? 1 : 0,
              transform: showClosing2 ? "translateY(0)" : "translateY(20px)",
              textShadow: showClosing2 ? "0 0 30px rgba(212,168,67,0.6)" : "none",
              animation: showClosing2 ? "gold-glow-flash 0.8s ease-out 1" : "none",
            }}
          >
            Win.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gold-glow-flash {
          0% { text-shadow: 0 0 40px rgba(212,168,67,0.9), 0 0 80px rgba(212,168,67,0.4); }
          100% { text-shadow: 0 0 30px rgba(212,168,67,0.6); }
        }
      `}</style>
    </section>
  );
};

export default WillpowerSection;
