import { useState, useEffect } from "react";
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
  "Most people don't finish what they start.",
  "Not because they can't.",
  "Because they don't have to.",
];

const WillpowerSection = () => {
  const [crossed, setCrossed] = useState<boolean[]>([false, false, false]);
  const [allCrossed, setAllCrossed] = useState(false);
  const [showPayoff, setShowPayoff] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const crossOut = (index: number) => {
    if (crossed[index]) return;
    if (!hasInteracted) setHasInteracted(true);
    const next = [...crossed];
    next[index] = true;
    setCrossed(next);
  };

  useEffect(() => {
    if (crossed.every(Boolean) && !allCrossed) {
      setAllCrossed(true);
      setTimeout(() => setShowPayoff(true), 200);
    }
  }, [crossed, allCrossed]);

  const reset = () => {
    setCrossed([false, false, false]);
    setAllCrossed(false);
    setShowPayoff(false);
  };

  return (
    <section className="pt-28 pb-12 px-6">
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

        {/* Interactive strike-through sentences */}
        <div className="mt-10 flex flex-col gap-1">
          {sentences.map((text, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer select-none"
              style={{ cursor: crossed[i] ? "default" : "pointer" }}
              onClick={() => crossOut(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              <p
                className="font-display text-[28px] leading-[1.5] transition-all duration-400"
                style={{
                  color: crossed[i] ? "rgba(255,255,255,0.2)" : "#FFFFFF",
                  filter: crossed[i] ? "blur(0.4px)" : "none",
                }}
              >
                {text}
              </p>
              {/* Animated strikethrough line */}
              <span
                className="absolute left-0 pointer-events-none"
                style={{
                  top: "50%",
                  height: "2px",
                  backgroundColor: "#D4A843",
                  width: crossed[i] ? "100%" : "0%",
                  transition: "width 400ms ease",
                }}
              />
              {/* Prompt on first sentence */}
              {i === 0 && !hasInteracted && (
                <span
                  className="block mt-1 text-[13px] transition-opacity duration-300"
                  style={{ color: "#6B6560" }}
                >
                  sound familiar? tap to dismiss.
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Gold divider — visible after all crossed */}
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
            Nano changes that.
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
              Get paid.
            </span>
          </p>

          {/* Reset link */}
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
