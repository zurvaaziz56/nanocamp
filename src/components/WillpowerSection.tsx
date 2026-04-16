import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const sentences = [
  "What if finishing what you started came with a reward? ",
  "Nano holds you accountable to your goals - and pays you back when you hit them. ",
  "Because they don't have to.",
];

const WillpowerSection = () => {
  const [crossed, setCrossed] = useState<boolean[]>([false, false, false]);
  const [allCrossed, setAllCrossed] = useState(false);
  const [showPayoff, setShowPayoff] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered strikethrough — revert when section leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        } else if (!entry.isIntersecting && triggered && !showPayoff) {
          setCrossed([false, false, false]);
          setAllCrossed(false);
          setTriggered(false);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered, showPayoff]);

  useEffect(() => {
    if (!triggered) return;
    const timers = [
      setTimeout(() => setCrossed((p) => { const n = [...p]; n[0] = true; return n; }), 600),
      setTimeout(() => setCrossed((p) => { const n = [...p]; n[1] = true; return n; }), 1800),
      setTimeout(() => setCrossed((p) => { const n = [...p]; n[2] = true; return n; }), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  useEffect(() => {
    if (crossed.every(Boolean) && !allCrossed) {
      setAllCrossed(true);
      setTimeout(() => setShowPayoff(true), 150);
    }
  }, [crossed, allCrossed]);

  const reset = () => {
    setCrossed([false, false, false]);
    setAllCrossed(false);
    setShowPayoff(false);
    setTriggered(false);
  };

  return (
    <section className="pt-28 pb-12 px-6" ref={sectionRef}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fade}
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-body block mb-4"
            style={{ color: "#D4A843" }}
          >
            Why it works
          </span>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fade}
        >
          <h2
            className="font-display text-[44px] md:text-[56px] font-bold leading-[1.1]"
            style={{ color: "#FFFFFF" }}
          >
            Willpower is overrated.
          </h2>
        </motion.div>

        {/* Strikethrough sentences */}
        <div className="mt-10 flex flex-col" style={{ gap: "32px" }}>
          {sentences.map((text, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              <p
                className="font-display text-[28px] md:text-[40px] leading-[1.4] transition-all duration-500"
                style={{
                  color: crossed[i] ? "rgba(255,255,255,0.35)" : "#FFFFFF",
                  filter: crossed[i] ? "blur(0.3px)" : "none",
                  textDecoration: crossed[i] ? "line-through" : "none",
                  textDecorationColor: "#D4A843",
                  textDecorationThickness: "3px",
                }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          className="transition-all duration-500"
          style={{
            width: 40,
            height: 2,
            backgroundColor: "#D4A843",
            marginTop: 32,
            marginBottom: 32,
            opacity: showPayoff ? 1 : 0,
            transform: showPayoff ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />

        {/* Payoff reveal */}
        <div style={{ minHeight: showPayoff ? "auto" : 0, overflow: "hidden" }}>
          <p
            className="font-display text-[32px] font-bold leading-[1.3] transition-all duration-500"
            style={{
              color: "#FFFFFF",
              opacity: showPayoff ? 1 : 0,
              transform: showPayoff ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "0ms",
            }}
          >
            Set your goal. Put money on it. Win.
          </p>
          <p
            className="font-display text-[32px] font-bold leading-[1.3] mt-1 transition-all duration-500"
            style={{
              color: "#FFFFFF",
              opacity: showPayoff ? 1 : 0,
              transform: showPayoff ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "150ms",
            }}
          >
            Put something on the line.{" "}
            <span
              className="italic"
              style={{
                color: "#D4A843",
                animation: showPayoff ? "gold-pulse 0.8s ease-out 0.65s 1" : "none",
              }}
            >
              {"\u00a0"}Get paid.
            </span>
          </p>

          {allCrossed && (
            <button
              onClick={reset}
              className="mt-6 text-[13px] transition-colors duration-200 hover:opacity-80 flex items-center gap-1.5 ml-auto"
              style={{ color: "#6B6560" }}
            >
              ↺ start over
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WillpowerSection;
