import phone1 from "@/assets/nano-01-goals.webp";
import phone3 from "@/assets/nano-03-submission.webp";
import phone5 from "@/assets/nano-05-celebration.webp";

const phones = [
  {
    img: phone1,
    pill: "01 · Choose a Goal",
    headline: "Choose your goal",
    desc: "One thing. 30 days. See how many people are chasing the same win.",
  },
  {
    img: phone3,
    pill: "02 · Show Up Daily",
    headline: "Submit in 5 seconds",
    desc: "Photo, video, or Apple Health. Your coach verifies. Streak survives.",
  },
  {
    img: phone5,
    pill: "03 · Get Paid",
    headline: "You get paid",
    desc: "30 days done. $25 hits your account. Pick the next goal and keep stacking wins.",
  },
];

const ThirtyDayGallery = () => {
  return (
    <section
      style={{
        padding: "48px 16px 8px",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Fraunces', 'Fraunces-fallback', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "#fff",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Here's how your{" "}
            <span style={{ fontStyle: "italic", color: "#F5C518" }}>
              30 days
            </span>{" "}
            actually look.
          </h2>
        </div>

        {/* Gallery */}
        <div className="thirty-day-grid" style={{ marginTop: "48px" }}>
          {phones.map((p) => (
            <div key={p.pill} className="thirty-day-item">
              {/* Step pill */}
              <div
                style={{
                  fontFamily: "'DM Sans', 'DMSans-fallback', Arial, sans-serif",
                  fontWeight: 800,
                  fontSize: "13px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "#F5C518",
                  backgroundColor: "#1a1400",
                  border: "1px solid #F5C51840",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  marginBottom: "24px",
                }}
              >
                {p.pill}
              </div>

              {/* Phone */}
              <div
                style={{
                  width: "320px",
                  height: "667px",
                  background:
                    "linear-gradient(135deg, #2a2a30 0%, #15151a 35%, #2a2a30 50%, #15151a 70%, #1e1e24 100%)",
                  borderRadius: "44px",
                  padding: "8px",
                  position: "relative",
                  boxShadow:
                    "inset 0 0 0 1px #3c3c44, inset 0 0 0 2px #0a0a0d, 0 30px 60px -15px rgba(0,0,0,0.9), 0 20px 40px -10px rgba(245,197,24,0.08)",
                }}
              >
                {/* Screen */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "36px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#000",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.headline}
                    width={480}
                    height={1041}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    sizes="(max-width: 599px) 280px, (max-width: 899px) 300px, 320px"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "480 / 1041",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                  {/* Dynamic Island */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "98px",
                      height: "28px",
                      backgroundColor: "#000",
                      borderRadius: "16px",
                      zIndex: 2,
                    }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .thirty-day-grid {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-start;
          gap: 96px;
        }
        .thirty-day-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 0 0 320px;
        }
        @media (max-width: 1380px) {
          .thirty-day-grid { gap: 56px; }
          .thirty-day-item { flex: 1 1 0; min-width: 0; max-width: 320px; }
          .thirty-day-item > div:nth-child(2) {
            width: 100% !important;
            aspect-ratio: 320 / 667;
            height: auto !important;
          }
        }
        @media (max-width: 899px) {
          .thirty-day-grid { flex-wrap: wrap; gap: 80px 48px; }
          .thirty-day-item { flex: 0 0 300px; }
          .thirty-day-item > div:nth-child(2) { width: 300px !important; height: 625px !important; aspect-ratio: auto; }
        }
        @media (max-width: 599px) {
          .thirty-day-grid { gap: 72px 24px; }
          .thirty-day-item { flex: 0 0 280px; }
          .thirty-day-item > div:nth-child(2) { width: 280px !important; height: 583px !important; }
        }
      `}</style>
    </section>
  );
};

export default ThirtyDayGallery;
