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
  {
    title: "Eat healthier",
    image: "/img/goals/eat-healthier.webp",
    alt: "Man preparing a healthy bowl of food in his kitchen",
    bullets: [
      "Eat better meals",
      "15 out of 30 days\n",
      "Daily meal photo",
    ],
    objectPosition: "center 5%",
  },
  {
    title: "Lose 5 pounds",
    image: "/img/goals/lose-5-pounds.webp",
    alt: "Overhead view of a person standing on a bathroom scale in soft natural light",
    bullets: [
      "Drop 5 pounds ",
      "In 30 days\n",
      "Track daily activity",
    ],
    objectPosition: "center 55%",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-9 mb-20 max-w-[1540px] mx-auto">
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
                className={`group relative text-left transition-all duration-200 w-full max-w-[450px] mx-auto ${offsetClass}`}
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
                          paddingRight: idx >= goal.bullets.length - 2 ? "165px" : "0",
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

                {/* Layered corner system: gold diagonal ribbon over a calm pink corner panel */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "270px",
                    height: "270px",
                    overflow: "hidden",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  {/* Pink lower corner panel — larger geometric block */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      clipPath: "polygon(100% 35%, 100% 100%, 35% 100%)",
                      background:
                        "linear-gradient(145deg, #E8A5B6 0%, #C56F89 50%, #8E3753 100%)",
                      boxShadow:
                        "inset 1px 1px 0 rgba(255,215,225,0.35), inset -1px -1px 0 rgba(0,0,0,0.18)",
                    }}
                  />
                  {/* Subtle divider line where gold meets pink */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "115px",
                      right: "-60px",
                      width: "330px",
                      height: "1px",
                      transform: "rotate(-45deg)",
                      background: "rgba(0,0,0,0.22)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  />
                  {/* Pink panel text — centered in triangle, bold, on diagonal */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "56px",
                      right: "56px",
                      transform: "translate(50%, 50%) rotate(-45deg)",
                      transformOrigin: "center",
                      textAlign: "center",
                      color: "#0a0207",
                      fontWeight: 1000,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      lineHeight: 1.18,
                      WebkitTextStroke: "1px #0a0207",
                      textShadow: "0 1px 0 rgba(255,220,228,0.45)",
                    }}
                  >
                    <div style={{ fontSize: "15px", letterSpacing: "0.14em", fontWeight: 1000 }}>EARN</div>
                    <div style={{ fontSize: "19px", fontWeight: 1000 }}>$25 / MONTH</div>
                  </div>

                  {/* Gold dominant diagonal ribbon */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "60px",
                      right: "-95px",
                      transform: "rotate(-45deg)",
                      width: "390px",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #f7d785 0%, #e0b84a 48%, #9d6c1c 100%)",
                      color: "#0a0500",
                      padding: "13px 0",
                      borderTop: "1px solid rgba(255,228,160,0.85)",
                      borderBottom: "1px solid rgba(0,0,0,0.35)",
                      boxShadow:
                        "0 8px 22px rgba(168,117,32,0.5), 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.2)",
                      whiteSpace: "nowrap",
                      lineHeight: 1.18,
                      fontWeight: 1000,
                      fontSize: "17px",
                      letterSpacing: "0.12em",
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
