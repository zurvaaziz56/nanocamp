import phone1 from "@/assets/nano-01-goals.png";
import phone2 from "@/assets/nano-02-home.png";
import phone3 from "@/assets/nano-03-submission.png";
import phone4 from "@/assets/nano-04-feed.png";
import phone5 from "@/assets/nano-05-celebration.png";

const phones = [
  {
    img: phone1,
    pill: "01 · PICK",
    headline: "Choose your goal",
    desc: "One thing. 30 days. See how many people are chasing the same win.",
  },
  {
    img: phone2,
    pill: "02 · TRACK",
    headline: "Your daily check-in.",
    desc: "Streak, progress, today's micro-goal. Coach-written. One tap to submit.",
  },
  {
    img: phone3,
    pill: "03 · PROVE",
    headline: "Submit in 5 seconds",
    desc: "Photo, video, or Apple Health. Your coach verifies. Streak survives.",
  },
  {
    img: phone4,
    pill: "04 · WITNESS",
    headline: "You're not alone",
    desc: "3,847 people chasing their $25 this month. Real posts. Real payouts.",
  },
  {
    img: phone5,
    pill: "05 · WIN",
    headline: "You get paid",
    desc: "30 days done. $25 hits your account. Pick the next goal and keep stacking wins.",
  },
];

const ThirtyDayGallery = () => {
  return (
    <section
      style={{
        padding: "144px 16px 8px",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
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
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 900,
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
                  width: "240px",
                  height: "500px",
                  background:
                    "linear-gradient(135deg, #2a2a30 0%, #15151a 35%, #2a2a30 50%, #15151a 70%, #1e1e24 100%)",
                  borderRadius: "36px",
                  padding: "7px",
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
                    borderRadius: "29px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#000",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.headline}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                  {/* Dynamic Island */}
                  <div
                    style={{
                      position: "absolute",
                      top: "11px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "74px",
                      height: "22px",
                      backgroundColor: "#000",
                      borderRadius: "12px",
                      zIndex: 2,
                    }}
                  />
                </div>
              </div>

              {/* Caption */}
              <div
                style={{
                  marginTop: "28px",
                  maxWidth: "240px",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "#fff",
                    lineHeight: 1.25,
                    marginBottom: "8px",
                    margin: "0 0 8px",
                  }}
                >
                  {p.headline}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#888",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
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
          gap: 24px;
        }
        .thirty-day-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 0 0 240px;
        }
        @media (max-width: 1380px) {
          .thirty-day-grid { gap: 16px; }
          .thirty-day-item { flex: 1 1 0; min-width: 0; max-width: 240px; }
          .thirty-day-item > div:nth-child(2) {
            width: 100% !important;
            aspect-ratio: 240 / 500;
            height: auto !important;
          }
        }
        @media (max-width: 899px) {
          .thirty-day-grid { flex-wrap: wrap; gap: 56px 32px; }
          .thirty-day-item { flex: 0 0 240px; }
          .thirty-day-item > div:nth-child(2) { height: 500px !important; aspect-ratio: auto; }
        }
        @media (max-width: 599px) {
          .thirty-day-grid { gap: 72px 24px; }
        }
      `}</style>
    </section>
  );
};

export default ThirtyDayGallery;
