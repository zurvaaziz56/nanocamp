import { useState } from "react";
import { motion } from "framer-motion";

const goals = [
  { emoji: "🌙", title: "Get to bed on time", desc: "Sleep before midnight 20 out of 30 nights." },
  { emoji: "👟", title: "Walk 10,000 steps", desc: "Hit your step count 20 out of 30 days." },
  { emoji: "🏋️", title: "Hit the gym", desc: "Show up and train 10 out of 30 days." },
  { emoji: "🥗", title: "Eat healthier", desc: "Make the better choice 20 out of 30 days." },
  { emoji: "⚖️", title: "Lose 5 pounds", desc: "One month. One number. You've got this." },
];

const steps = [
  {
    label: "Step 1 — Show up",
    title: "Show up",
    body: "Check in daily. Upload a quick photo, video, or screenshot to prove you're doing the work. Thirty days. One goal.",
  },
  {
    label: "Step 2 — Get Paid",
    title: "Get Paid",
    body: "Show up at least 20 of 30 days — because life happens. Finish strong and earn your $25. Plus bragging rights.",
  },
];

const HowItWorks = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="how" className="py-28 md:py-36 px-6">
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
            How It Works
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20 max-w-[1100px] mx-auto justify-items-center">
          {goals.map((goal, i) => {
            const isSelected = selected === i;
            // Center the last 2 cards on the second row (md+)
            const isSecondRow = i >= 3;
            const offsetClass =
              isSecondRow && i === 3 ? "md:col-start-2" : "";
            return (
              <motion.button
                key={goal.title}
                type="button"
                onClick={() => setSelected(isSelected ? null : i)}
                className={`relative text-center transition-all duration-200 w-full max-w-[320px] ${offsetClass}`}
                style={{
                  height: "380px",
                  borderRadius: "16px",
                  backgroundColor: isSelected ? "rgba(212,168,67,0.07)" : "#111111",
                  border: isSelected
                    ? "1px solid #D4A843"
                    : "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)";
                  }
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Checkmark */}
                {isSelected && (
                  <span
                    className="absolute top-3 right-3 z-10"
                    style={{ color: "#D4A843", fontSize: "16px", fontWeight: 700 }}
                  >
                    ✓
                  </span>
                )}

                {/* Emoji */}
                <div style={{ fontSize: "56px", paddingTop: "56px" }}>{goal.emoji}</div>

                {/* Title */}
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginTop: "24px",
                    padding: "0 20px",
                  }}
                >
                  {goal.title}
                </div>

                {/* Desc */}
                <div
                  style={{
                    color: "#A09880",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    padding: "14px 28px 0",
                  }}
                >
                  {goal.desc}
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
                      backgroundColor: "#D4A843",
                      color: "#000000",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      padding: "8px 60px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    $20 Monthly Subscription
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-16 max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <span
                className="block mb-3 font-body uppercase"
                style={{ color: "#D4A843", fontSize: "11px", letterSpacing: "0.15em", fontWeight: 700 }}
              >
                {step.label}
              </span>
              <h3
                className="font-display"
                style={{ color: "#FFFFFF", fontSize: "36px", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p
                className="mt-4 font-body mx-auto"
                style={{ color: "#C8C0B0", fontSize: "18px", lineHeight: 1.75 }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
