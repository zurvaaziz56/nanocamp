import { useState, lazy, Suspense } from "react";

const ThirtyDayGallery = lazy(() => import("./ThirtyDayGallery"));

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
    alt: "Woman smiling as she settles into bed under warm lamp light",
    bullets: [
      "Get to bed by 10:30 PM, 20 out of 30 nights",
      "Nightly selfie proof",
    ],
    objectPosition: "center 30%",
  },
  {
    title: "Walk 10,000 steps",
    image: "/img/goals/walk-10k.webp",
    alt: "Man walking outdoors on a tree-lined path at golden hour",
    bullets: [
      "Hit 10,000 steps 20 out of 30 days",
      "Daily step count proof",
    ],
    objectPosition: "center 25%",
  },
  {
    title: "Hit the gym",
    image: "/img/goals/hit-the-gym.webp",
    alt: "Athletic woman training with dumbbells in a dark premium gym",
    bullets: [
      "Train 10 out of 30 days",
      "Gym selfie each day",
    ],
    objectPosition: "center 20%",
  },
  {
    title: "Eat healthier",
    image: "/img/goals/eat-healthier.webp",
    alt: "Man assembling a fresh salad bowl in a sunlit kitchen",
    bullets: [
      "20 better meals in 30 days",
      "Daily food choice photo",
    ],
    objectPosition: "center 30%",
  },
  {
    title: "Lose 5 pounds",
    image: "/img/goals/lose-5-pounds.webp",
    alt: "Fit woman hiking a coastal trail at sunrise",
    bullets: [
      "Drop five pounds in 30 days",
      "Track daily activity",
    ],
    objectPosition: "center 25%",
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
        <div className="mb-14">
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
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-7 mb-20 max-w-[1180px] mx-auto">
          {goals.map((goal, i) => {
            const isSelected = selected === i;
            const isHovered = hovered === i;
            const offsetClass = i === 3 ? "md:col-start-2 md:col-span-2" : "md:col-span-2";
            const cardBg = "#141210";
            return (
              <button
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
              >
                {/* Full-bleed cinematic photo */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ borderRadius: "18px" }}
                >
                  <img
                    src={goal.image}
                    alt={goal.alt}
                    width={800}
                    height={1024}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="absolute inset-0 w-full h-full block transition-transform duration-700 ease-out"
                    style={{
                      objectFit: "cover",
                      objectPosition: goal.objectPosition ?? "center",
                      transform: isHovered ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                  {/* Cinematic dark gradient for text legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(10,8,6,0.15) 0%, rgba(10,8,6,0) 35%, rgba(10,8,6,0.55) 65%, rgba(8,6,4,0.95) 100%)",
                    }}
                  />
                  {/* Subtle warm vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Content overlaid on bottom of image */}
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col"
                  style={{ padding: "0 24px 26px" }}
                >
                  <h3
                    className="font-display"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "26px",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      marginBottom: "14px",
                      textAlign: "left",
                      textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                    }}
                  >
                    {goal.title}
                  </h3>
                  <ul
                    className="font-body flex flex-col"
                    style={{ gap: "9px", textAlign: "left" }}
                  >
                    {goal.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start"
                        style={{
                          color: "rgba(245,235,215,0.96)",
                          fontSize: "14.5px",
                          lineHeight: 1.45,
                          textShadow: "0 1px 6px rgba(0,0,0,0.55)",
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
                            background: "#E8B94A",
                            marginTop: "8px",
                            marginRight: "10px",
                            boxShadow: "0 0 8px rgba(232,185,74,0.7)",
                          }}
                        />
                        <span style={{ whiteSpace: "pre-line" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checkmark badge */}
                {isSelected && (
                  <span
                    className="absolute top-3 left-3 z-20 flex items-center justify-center"
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

                {/* Two-part diagonal ribbon (top-right corner) */}
                <div
                  className="absolute pointer-events-none overflow-hidden z-10"
                  style={{ top: 0, right: 0, width: "180px", height: "180px" }}
                >
                  {/* Primary gold ribbon: Pay $20/mo */}
                  <div
                    style={{
                      position: "absolute",
                      top: "26px",
                      right: "-58px",
                      transform: "rotate(45deg)",
                      background:
                        "linear-gradient(135deg, #f5d27a 0%, #e0b84a 50%, #a87520 100%)",
                      color: "#1a0f03",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "7px 70px",
                      borderTop: "1px solid rgba(255,230,160,0.8)",
                      borderBottom: "1px solid rgba(0,0,0,0.3)",
                      boxShadow:
                        "0 4px 14px rgba(168,117,32,0.5), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                      lineHeight: 1,
                      letterSpacing: "0.04em",
                      fontSize: "11.5px",
                    }}
                  >
                    Pay $20 / mo
                  </div>
                  {/* Secondary pink ribbon: Get $25 back */}
                  <div
                    style={{
                      position: "absolute",
                      top: "60px",
                      right: "-58px",
                      transform: "rotate(45deg)",
                      background:
                        "linear-gradient(135deg, #f8a8c8 0%, #e8729c 50%, #b03e6a 100%)",
                      color: "#2a0612",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "5px 70px",
                      borderTop: "1px solid rgba(255,210,225,0.75)",
                      borderBottom: "1px solid rgba(0,0,0,0.28)",
                      boxShadow:
                        "0 4px 12px rgba(176,62,106,0.45), 0 2px 4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
                      whiteSpace: "nowrap",
                      lineHeight: 1,
                      letterSpacing: "0.04em",
                      fontSize: "10px",
                    }}
                  >
                    Get $25 back
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reinforcement text block */}
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: "640px",
            marginTop: "clamp(32px, 4vw, 48px)",
            marginBottom: "clamp(32px, 4vw, 48px)",
            padding: "0 16px",
          }}
        >
          <h3
            className="font-display"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 48px)",
              lineHeight: 1.15,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Join Nano Camp for free
          </h3>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 1.4vw, 19px)",
              lineHeight: 1.5,
              color: "rgba(232, 212, 168, 0.85)",
              marginTop: "14px",
              marginBottom: 0,
            }}
          >
            7-day free trial. Then $20/month. Cancel anytime.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 1.4vw, 19px)",
              lineHeight: 1.5,
              color: "#D4A84A",
              fontWeight: 600,
              marginTop: "6px",
              marginBottom: 0,
            }}
          >
            Achieve your goal. Get $25 back.
          </p>
        </div>

        <Suspense fallback={<div style={{ minHeight: "800px" }} aria-hidden />}>
          <ThirtyDayGallery />
        </Suspense>
      </div>
    </section>
  );
};

export default HowItWorks;
