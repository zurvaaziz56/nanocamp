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
    title: "​Go to bed early",
    image: "/img/goals/sleep-on-time.webp",
    alt: "Woman waking up peacefully in bed at sunrise",
    bullets: [
      "Get to bed by 10.30 PM",
      "20 out of 30 nights",
      "Nightly selfie proof",
    ],
    objectPosition: "center 20%",
  },
  {
    title: "Walk 10,000 steps",
    image: "/img/goals/walk-10k.webp",
    alt: "Smiling man jogging along a riverside path at sunset with city skyline in the background",
    bullets: [
      "Hit 10,000 steps ",
      "20 out of 30 days\n",
      "Step count proof ",
    ],
    objectPosition: "center 5%",
  },
  {
    title: "Hit the gym",
    image: "/img/goals/hit-the-gym.webp",
    alt: "Woman taking a thumbs-up selfie in the gym",
    bullets: [
      "Train consistently",
      "10 out of 30 days",
      "Selfie each session",
    ],
    objectPosition: "center 10%",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 mb-20 max-w-[1540px] mx-auto">
          {goals.map((goal, i) => {
            const isSelected = selected === i;
            const isHovered = hovered === i;
            const offsetClass = "";
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
                className={`group relative text-left transition-all duration-200 w-full max-w-[560px] mx-auto ${offsetClass}`}
                style={{
                  aspectRatio: "3 / 4",
                  borderRadius: "20px",
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
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "62%",
                    marginLeft: "-1px",
                    marginRight: "-1px",
                    marginTop: "-1px",
                    width: "calc(100% + 2px)",
                  }}
                >
                  <img
                    src={goal.image}
                    alt={goal.alt}
                    width={600}
                    height={800}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="absolute inset-0 w-full h-full block"
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

                {/* Content (bottom 38%) */}
                <div
                  className="relative flex flex-col"
                  style={{ height: "38%", padding: "22px 26px 28px" }}
                >
                  <h3
                    className="font-display"
                    style={{
                      color: "#F5F1E8",
                      fontSize: "24px",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: "14px",
                      textAlign: "left",
                    }}
                  >
                    {goal.title}
                  </h3>
                  <ul
                    className="font-body flex flex-col"
                    style={{ gap: "8px", textAlign: "left" }}
                  >
                    {goal.bullets.map((b, idx) => (
                      <li
                        key={b}
                        className="flex items-start"
                        style={{
                          color: "rgba(232,212,168,0.92)",
                          fontSize: "15.5px",
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
                        <span>{b.replace(/\n/g, "").trim()}</span>
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

                {/* Layered corner system: gold diagonal ribbon over a calm pink corner panel */}
                <div
                  className="goal-corner pointer-events-none absolute"
                  style={{
                    bottom: 0,
                    right: 0,
                    overflow: "hidden",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  {/* Pink lower corner panel */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      clipPath: "polygon(100% 35%, 100% 100%, 35% 100%)",
                      background:
                        "linear-gradient(145deg, #0A8F55 0%, #046A38 50%, #034A27 100%)",
                      boxShadow:
                        "inset 1px 1px 0 rgba(255,200,215,0.18), inset -1px -1px 0 rgba(0,0,0,0.35)",
                    }}
                  />
                  {/* Subtle divider line */}
                  <div
                    className="goal-corner-divider"
                    style={{
                      position: "absolute",
                      transform: "rotate(-45deg)",
                      background: "rgba(0,0,0,0.22)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.12)",
                      height: "1px",
                    }}
                  />
                  {/* GET PAID $25 text */}
                  <div
                    className="goal-corner-paid"
                    style={{
                      position: "absolute",
                      transform: "translate(50%, 50%) rotate(-45deg)",
                      transformOrigin: "center",
                      textAlign: "center",
                      color: "#FFFFFF",
                      fontWeight: 1000,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      lineHeight: 1.18,
                      WebkitTextStroke: "0.5px rgba(255,255,255,0.6)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.55)",
                    }}
                  >
                    <div className="goal-corner-paid-label" style={{ fontWeight: 1000 }}>GET PAID</div>
                    <div className="goal-corner-paid-amount" style={{ fontWeight: 1000 }}>$25</div>
                  </div>

                  {/* Gold diagonal ribbon */}
                  <div
                    className="goal-corner-ribbon"
                    style={{
                      position: "absolute",
                      transform: "rotate(-45deg)",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #f7d785 0%, #e0b84a 48%, #9d6c1c 100%)",
                      color: "#0a0500",
                      borderTop: "1px solid rgba(255,228,160,0.85)",
                      borderBottom: "1px solid rgba(0,0,0,0.35)",
                      boxShadow:
                        "0 8px 22px rgba(168,117,32,0.5), 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.2)",
                      whiteSpace: "nowrap",
                      lineHeight: 1.18,
                      fontWeight: 1000,
                      textTransform: "uppercase",
                      WebkitTextStroke: "1px #0a0500",
                      textShadow: "0 1px 0 rgba(255,228,160,0.5)",
                    }}
                  >
                    PAY $20 / MONTH
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <style>{`
          .goal-corner { width: 270px; height: 270px; }
          .goal-corner-divider { bottom: 115px; right: -60px; width: 330px; }
          .goal-corner-paid { bottom: 56px; right: 56px; }
          .goal-corner-paid-label { font-size: 18px; letter-spacing: 0.14em; }
          .goal-corner-paid-amount { font-size: 23px; }
          .goal-corner-ribbon { bottom: 78px; right: -90px; width: 360px; padding: 11px 0; font-size: 18px; letter-spacing: 0.12em; }
          @media (max-width: 1279px) {
            .goal-corner { width: 170px; height: 170px; }
            .goal-corner-divider { bottom: 72px; right: -38px; width: 210px; }
            .goal-corner-paid { bottom: 34px; right: 34px; }
            .goal-corner-paid-label { font-size: 11px; letter-spacing: 0.1em; }
            .goal-corner-paid-amount { font-size: 15px; }
            .goal-corner-ribbon { bottom: 50px; right: -60px; width: 235px; padding: 7px 0; font-size: 11px; letter-spacing: 0.08em; }
          }
          @media (max-width: 599px) {
            .goal-corner { width: 180px; height: 180px; }
            .goal-corner-divider { bottom: 76px; right: -40px; width: 220px; }
            .goal-corner-paid { bottom: 36px; right: 36px; }
            .goal-corner-paid-label { font-size: 12px; letter-spacing: 0.1em; }
            .goal-corner-paid-amount { font-size: 16px; }
            .goal-corner-ribbon { bottom: 53px; right: -62px; width: 245px; padding: 7px 0; font-size: 12px; letter-spacing: 0.08em; }
          }
        `}</style>

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
            Join Nano for free
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
            Get paid $25 to achieve your goals
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
