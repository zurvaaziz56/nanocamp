import { useState } from "react";
import { motion } from "framer-motion";
import ThirtyDayGallery from "./ThirtyDayGallery";

const goals = [
  { emoji: "🌙", title: "Get to bed on time", desc: "Sleep before midnight 20 out of 30 nights." },
  { emoji: "👟", title: "Walk 10,000 steps", desc: "Hit your step count 20 out of 30 days." },
  { emoji: "🏋️", title: "Hit the gym", desc: "Show up and train 10 out of 30 days." },
  { emoji: "🥗", title: "Eat healthier", desc: "Make the better choice 20 out of 30 days." },
  { emoji: "⚖️", title: "Lose 5 pounds", desc: "One month. One number. You've got this." },
];

const HowItWorks = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="how" className="pt-6 pb-28 md:pt-10 md:pb-36 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span
            className="block mb-5 font-body uppercase"
            style={{ color: "#D4A843", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700 }}
          >
            ​
          </span>
          <h2
            className="font-display font-medium leading-[1.1] mx-auto"
            style={{ color: "#FFFFFF", fontSize: "56px", maxWidth: "900px" }}
          >
            Pick a goal that pays you $25 each month.
          </h2>
          <p
            className="font-display italic mt-5"
            style={{ color: "#D4A843", fontSize: "24px" }}
          >
            Choose one.
          </p>
        </motion.div>

        {/* Cards grid: 3 per row, last row (2) centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-7 mb-20 max-w-[1180px] mx-auto">
          {goals.map((goal, i) => {
            const isSelected = selected === i;
            // 6-col grid: each card spans 2. First card of last row starts at col 2 to center the pair.
            const offsetClass = i === 3 ? "md:col-start-2 md:col-span-2" : "md:col-span-2";
            return (
              <motion.button
                key={goal.title}
                type="button"
                onClick={() => setSelected(isSelected ? null : i)}
                className={`group relative text-left transition-all duration-300 w-full max-w-[340px] mx-auto ${offsetClass}`}
                style={{
                  height: "440px",
                  borderRadius: "20px",
                  background: isSelected
                    ? "linear-gradient(160deg, rgba(212,168,67,0.10) 0%, rgba(22,20,14,0.95) 55%, rgba(15,13,10,1) 100%)"
                    : "linear-gradient(160deg, #1A1814 0%, #121110 60%, #0E0D0B 100%)",
                  border: isSelected
                    ? "1px solid rgba(212,168,67,0.7)"
                    : "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  boxShadow: isSelected
                    ? "0 20px 50px -20px rgba(212,168,67,0.35), 0 0 0 1px rgba(212,168,67,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                    : "0 14px 40px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 60px -20px rgba(212,168,67,0.25), 0 0 0 1px rgba(212,168,67,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
                  }
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 40px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Subtle top warm sheen */}
                <div
                  className="absolute inset-x-0 top-0 pointer-events-none"
                  style={{
                    height: "120px",
                    background:
                      "radial-gradient(ellipse at top, rgba(212,168,67,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Checkmark badge */}
                {isSelected && (
                  <span
                    className="absolute top-4 right-4 z-10 flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(135deg, #F4D27A 0%, #D4A843 100%)",
                      color: "#1A1200",
                      fontSize: "14px",
                      fontWeight: 800,
                      boxShadow: "0 4px 12px rgba(212,168,67,0.4)",
                    }}
                  >
                    ✓
                  </span>
                )}

                {/* Inner content with consistent padding */}
                <div className="relative h-full flex flex-col px-8 pt-12 pb-28">
                  {/* Emoji in soft warm chip */}
                  <div
                    className="flex items-center justify-center mb-8"
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "18px",
                      background:
                        "linear-gradient(160deg, rgba(212,168,67,0.12) 0%, rgba(212,168,67,0.04) 100%)",
                      border: "1px solid rgba(212,168,67,0.18)",
                      fontSize: "44px",
                      lineHeight: 1,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ transform: "translateY(1px)" }}>{goal.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display"
                    style={{
                      color: "#F5F1E8",
                      fontSize: "26px",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: "14px",
                    }}
                  >
                    {goal.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="font-body"
                    style={{
                      color: "#BFB6A0",
                      fontSize: "16px",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    {goal.desc}
                  </p>
                </div>

                {/* Diagonal banner bottom-right */}
                <div
                  className="absolute pointer-events-none overflow-hidden"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "170px",
                    height: "170px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "-50px",
                      transform: "rotate(-45deg)",
                      background:
                        "linear-gradient(135deg, #F4D27A 0%, #D4A843 45%, #B8862F 100%)",
                      color: "#1A1200",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      padding: "8px 70px",
                      borderTop: "1px solid rgba(255,220,140,0.6)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      boxShadow:
                        "0 4px 14px rgba(212,168,67,0.45), 0 2px 4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.15)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    $20 / Month
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <ThirtyDayGallery />
      </div>
    </section>
  );
};

export default HowItWorks;
