import { motion } from "framer-motion";

type Para = {
  text: string;
  variant: "opener" | "intimate" | "closer";
};

const paragraphs: Para[] = [
  {
    text: "We're new. Like, genuinely just getting started.",
    variant: "opener",
  },
  {
    text: "Everyone we know has a goal they keep starting over on. We wanted to build the thing that finally makes it stick — for them, and honestly, for us too.",
    variant: "intimate",
  },
  {
    text: "We're a small team and we're building this alongside you. Every person who joins this first cohort is shaping what Nanocamp becomes. We read every check-in, we think about every goal, and we genuinely celebrate every win.",
    variant: "intimate",
  },
  {
    text: "So thank you for being here early. It means more than you know.",
    variant: "closer",
  },
];

const Divider = () => (
  <div
    className="mx-auto my-10 flex items-center justify-center gap-3"
    aria-hidden="true"
  >
    <span style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, rgba(80,50,20,0.35), transparent)" }} />
    <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(80,50,20,0.4)" }} />
    <span style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, rgba(80,50,20,0.35), transparent)" }} />
  </div>
);

// Subtle paper grain
const noiseDataUri =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.10  0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  );

const FounderNote = () => {
  return (
    <section
      className="py-28 px-6 relative"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div
          style={{
            backgroundImage: `url("${noiseDataUri}"), linear-gradient(135deg, #f5e6c4 0%, #efd9a8 35%, #f2dfb4 65%, #e8cf9a 100%)`,
            backgroundBlendMode: "multiply, normal",
            border: "1px solid rgba(120,85,40,0.25)",
            borderRadius: "6px",
            padding: "72px 80px",
            transform: "rotate(-0.4deg)",
            boxShadow:
              "inset 0 0 80px rgba(140,95,40,0.18), inset 0 0 0 1px rgba(255,240,200,0.4), 0 25px 70px rgba(0,0,0,0.55), 0 6px 16px rgba(0,0,0,0.35)",
            position: "relative",
          }}
          className="text-center max-[640px]:!px-8 max-[640px]:!py-14"
        >
          {/* Top ruled-paper line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "28px",
              left: "40px",
              right: "40px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(80,50,20,0.2), transparent)",
            }}
          />

          {/* Label with gold lines */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#8B6340",
                display: "inline-block",
              }}
            />
            <span
              className="font-body uppercase"
              style={{
                color: "#5C3D1E",
                fontSize: "11px",
                letterSpacing: "0.28em",
                fontWeight: 700,
              }}
            >
              A Note From Us
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#8B6340",
                display: "inline-block",
              }}
            />
          </motion.div>

          {paragraphs.map((p, i) => {
            const isOpener = p.variant === "opener";
            const isIntimate = p.variant === "intimate";

            const style: React.CSSProperties = isOpener
              ? {
                  color: "#1F1108",
                  fontSize: "26px",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  maxWidth: "560px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : isIntimate
              ? {
                  color: "#2A1A0A",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.85,
                  maxWidth: "540px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : {
                  color: "#1F1108",
                  fontSize: "21px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                  letterSpacing: "-0.005em",
                  maxWidth: "560px",
                  marginLeft: "auto",
                  marginRight: "auto",
                };

            return (
              <div key={i}>
                <motion.p
                  className="font-display"
                  style={style}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  {p.text}
                </motion.p>
                {i < paragraphs.length - 1 && <Divider />}
              </div>
            );
          })}

          <motion.p
            className="font-display"
            style={{
              color: "#6B4423",
              fontSize: "14px",
              fontStyle: "italic",
              fontWeight: 500,
              marginTop: "40px",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            — The Nanocamp Team
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
