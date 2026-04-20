import { useState } from "react";
import { motion } from "framer-motion";
import ThirtyDayGallery from "./ThirtyDayGallery";

type Goal = {
  title: string;
  image: string;
  alt: string;
  bullets: string[];
  objectPosition?: string;
};

const goals: Goal[] = [
  {
    title: "Get to bed on time",
    image: "/img/goals/sleep-on-time.webp",
    alt: "Woman waking up peacefully in bed at sunrise",
    bullets: [
      "Sleep your way to better health",
      "Bed before 10:30 PM, 20 of 30 nights",
      "Nightly selfie proof",
    ],
    objectPosition: "center 35%",
  },
  {
    title: "Walk 10,000 steps",
    image: "/img/goals/walk-10k.webp",
    alt: "Smiling man standing on a sunlit city sidewalk",
    bullets: [
      "Move more, earn more",
      "10,000 steps, 20 of 30 days",
      "Daily step count proof",
    ],
    objectPosition: "center 25%",
  },
  {
    title: "Hit the gym",
    image: "/img/goals/hit-the-gym.webp",
    alt: "Woman taking a thumbs-up selfie in the gym",
    bullets: [
      "Show up, get stronger",
      "Train 10 of 30 days",
      "Gym selfie each session",
    ],
    objectPosition: "center 30%",
  },
  {
    title: "Eat healthier",
    image: "/img/goals/eat-healthier.webp",
    alt: "Man preparing a healthy bowl of food in his kitchen",
    bullets: [
      "Real food, real results",
      "20 better choices out of 30 days",
      "Daily food photo",
    ],
    objectPosition: "center 20%",
  },
  {
    title: "Lose 5 pounds",
    image: "/img/goals/lose-5-pounds.webp",
    alt: "Woman smiling confidently in front of a bathroom mirror",
    bullets: [
      "Drop 5 pounds in 30 days",
      "Hit your goal weight by day 30",
      "Weekly weigh-in selfie",
    ],
    objectPosition: "center 20%",
  },
];

interface HowItWorksProps {
  onGoalSelect?: () => void;
}

const HowItWorks = ({ onGoalSelect }: HowItWorksProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
            Get $25 for any of these goals.
          </h2>
          <p
            className="font-display italic mt-5"
            style={{ color: "#D4A843", fontSize: "24px" }}
          >
            Choose one.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-7 mb-20 max-w-[1180px] mx-auto">
          {goals.map((goal, i) => {
            const isSelected = selected === i;
            const isHovered = hovered === i;
            const offsetClass = i === 3 ? "md:col-start-2 md:col-span-2" : "md:col-span-2";
            const cardBg = "#141210";
            return (
              <motion.button
                key={goal.title}
                type="button"
                onClick={() => {
                  setSelected(i);
                  onGoalSelect?.();
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative text-left transition-all duration-200 w-full max-w-[340px] mx-auto ${offsetClass}`}
                style={{
                  aspectRatio: "3 / 4",
                  borderRadius: "18px",
                  background: cardBg,
                  border: isSelected
                    ? "1px solid rgba(212,168,67,0.7)"
                    : `1px solid rgba(201,169,97,${isHovered ? 0.25 : 0.12})`,
                  overflow: "hidden",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isSelected
                    ? "0 20px 50px -20px rgba(212,168,67,0.4), 0 0 0 1px rgba(212,168,67,0.2)"
                    : isHovered
                    ? "0 24px 60px -20px rgba(212,168,67,0.3), 0 0 0 1px rgba(212,168,67,0.1)"
                    : "0 14px 40px -18px rgba(0,0,0,0.7)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {/* Photo (top 55%) */}
                <div className="relative w-full overflow-hidden" style={{ height: "55%" }}>
                  <img
                    src={goal.image}
                    alt={goal.alt}
                    width={600}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: goal.objectPosition ?? "center",
                    }}
                  />
                  {/* Bottom fade into card bg */}
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: "60px",
                      background: `linear-gradient(to bottom, rgba(20,18,16,0) 0%, ${cardBg} 100%)`,
                    }}
                  />
                </div>

                {/* Content (bottom 45%) */}
                <div
                  className="relative flex flex-col"
                  style={{ height: "45%", padding: "20px 22px 24px" }}
                >
                  <h3
                    className="font-display"
                    style={{
                      color: "#F5F1E8",
                      fontSize: "22px",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: "12px",
                      textAlign: "left",
                    }}
                  >
                    {goal.title}
                  </h3>
                  <ul
                    className="font-body flex flex-col"
                    style={{ gap: "7px", textAlign: "left" }}
                  >
                    {goal.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start"
                        style={{
                          color: "rgba(232,212,168,0.92)",
                          fontSize: "14.5px",
                          lineHeight: 1.45,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: "inline-block",
                            flexShrink: 0,
                            width: "5px",
                            height: "5px",
                            borderRadius: "999px",
                            background: "#D4A843",
                            marginTop: "8px",
                            marginRight: "10px",
                            boxShadow: "0 0 6px rgba(212,168,67,0.5)",
                          }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checkmark badge */}
                {isSelected && (
                  <span
                    className="absolute top-3 left-3 z-10 flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #F4D27A 0%, #D4A843 100%)",
                      color: "#1A1200",
                      fontSize: "14px",
                      fontWeight: 800,
                      boxShadow: "0 4px 12px rgba(212,168,67,0.4)",
                    }}
                  >
                    ✓
                  </span>
                )}

                {/* Diagonal $20/MONTH ribbon */}
                <div
                  className="absolute pointer-events-none overflow-hidden"
                  style={{ bottom: 0, right: 0, width: "170px", height: "170px" }}
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
