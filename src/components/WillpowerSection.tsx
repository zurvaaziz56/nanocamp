import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const statements = [
  { text: "You keep meaning to start.", size: "text-[22px] md:text-[26px]", color: "#C8C0B0", weight: 400 },
  { text: "Something always gets in the way.", size: "text-[22px] md:text-[26px]", color: "#C8C0B0", weight: 400 },
  { text: "That changes when real money is on the line.", size: "text-[26px] md:text-[30px]", color: "#FFFFFF", weight: 700 },
];

const WillpowerSection = () => {
  const statementsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statementsRef, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0); // 0=hidden, 1-3=lines, 4=bar, 5=closing

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1400),
      setTimeout(() => setPhase(5), 2200),
      setTimeout(() => setPhase(6), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section
      className="pt-28 pb-12 px-6 relative"
      style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.05) 0%, transparent 65%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Label */}
        <span
          className="text-[10px] uppercase tracking-[0.2em] font-body block mb-4"
          style={{ color: "#D4A843" }}
        >
          Why it works
        </span>

        {/* Headline — always visible */}
        <h2 className="font-display text-[44px] md:text-[56px] font-bold leading-[1.1]" style={{ color: "#FFFFFF" }}>
          Been on your list long{" "}
          <span className="italic" style={{ color: "#D4A843" }}>
            enough
          </span>
          <span style={{ color: "#D4A843" }}>.</span>
        </h2>

        {/* Scroll-triggered statements */}
        <div ref={statementsRef} className="mt-12 flex flex-col gap-6">
          {statements.map((s, i) => (
            <p
              key={i}
              className={`font-display ${s.size} leading-[1.5] transition-all duration-500 ease-out`}
              style={{
                color: s.color,
                fontWeight: s.weight,
                opacity: phase >= i + 1 ? 1 : 0,
                transform: phase >= i + 1 ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {s.text}
            </p>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-10 mb-10">
          <div
            className="h-[2px] rounded-full transition-all ease-out"
            style={{
              backgroundColor: "#D4A843",
              maxWidth: 120,
              width: phase >= 4 ? "100%" : "0%",
              transitionDuration: "800ms",
              opacity: phase >= 4 ? 1 : 0,
            }}
          />
        </div>

        {/* Closing statement */}
        <div>
          <p
            className="font-display text-[32px] md:text-[36px] font-bold leading-[1.3] transition-all duration-500 ease-out"
            style={{
              color: "#FFFFFF",
              opacity: phase >= 5 ? 1 : 0,
              transform: phase >= 5 ? "translateY(0)" : "translateY(30px)",
            }}
          >
            Set your goal. Put money on it.
          </p>
          <p
            className="font-display text-[38px] md:text-[44px] italic leading-[1.3] mt-2 transition-all duration-500 ease-out"
            style={{
              color: "#D4A843",
              fontWeight: 700,
              opacity: phase >= 6 ? 1 : 0,
              transform: phase >= 6 ? "translateY(0)" : "translateY(30px)",
              textShadow: phase >= 6 ? "0 0 30px rgba(212,168,67,0.4)" : "none",
            }}
          >
            Get paid.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WillpowerSection;
