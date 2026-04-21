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
    alt: "Woman waking up peacefully in bed at sunrise",
    bullets: [
      "Sleep your way to better health",
      "Bed by 10:30PM, 20 of 30 nights",
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
      "20 better meals in 30 days",
      "Daily food photo",
    ],
    objectPosition: "center top",
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
    objectPosition: "center top",
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
                {/* Photo (top 55%) */}
                <div className="relative w-full overflow-hidden" style={{ height: "62%" }}>
                  <img
                    src={goal.image}
                    alt={goal.alt}
                    width={600}
                    height={800}
                    loading="lazy"
                    fetchPriority="low"
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
                  style={{ height: "38%", padding: "20px 22px 24px" }}
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
                    {goal.bullets.map((b, idx) => (
                      <li
                        key={b}
                        className="flex items-start"
                        style={{
                          color: "rgba(232,212,168,0.92)",
                          fontSize: "14.5px",
                          lineHeight: 1.45,
                          paddingRight: idx >= goal.bullets.length - 2 ? "115px" : "0",
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
                        <span style={{ whiteSpace: "pre-line" }}>{b}</span>
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
                  style={{ bottom: 0, right: 0, width: "210px", height: "210px" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "38px",
                      right: "-60px",
                      transform: "rotate(-45deg)",
                      background:
                        "linear-gradient(135deg, #f0c860 0%, #e0b84a 45%, #a87520 100%)",
                      color: "#1a0f03",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "11px 80px",
                      borderTop: "1.5px solid rgba(255,225,150,0.7)",
                      borderBottom: "1.5px solid rgba(0,0,0,0.28)",
                      boxShadow:
                        "0 6px 18px rgba(168,117,32,0.55), 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.18)",
                      whiteSpace: "nowrap",
                      textShadow: "0 1px 0 rgba(255,225,150,0.35)",
                      lineHeight: 1,
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "0.02em" }}>$20</span>
                    <span style={{ fontSize: "15px", letterSpacing: "0.06em" }}> / Month</span>
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
