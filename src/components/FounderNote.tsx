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
    className="mx-auto my-8"
    style={{
      width: "80px",
      height: "1px",
      backgroundColor: "rgba(80,50,20,0.25)",
    }}
    aria-hidden="true"
  />
);

const Pin = () => (
  <span
    aria-hidden="true"
    style={{
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#8B6340",
      boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 1px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
      display: "block",
    }}
  />
);

// SVG noise texture for aged paper grain
const noiseDataUri =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0 0.05  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>`
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
      <div className="mx-auto relative" style={{ maxWidth: "720px", paddingTop: "60px" }}>
        {/* Twine strings hanging from above */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0",
            left: "12%",
            width: "2px",
            height: "70px",
            background: "#5C3010",
            transform: "rotate(-12deg)",
            transformOrigin: "top center",
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0",
            right: "12%",
            width: "2px",
            height: "70px",
            background: "#5C3010",
            transform: "rotate(12deg)",
            transformOrigin: "top center",
            zIndex: 1,
          }}
        />
        {/* Pins at the top corners of the card */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "calc(12% + 40px)",
            zIndex: 3,
          }}
        >
          <Pin />
        </div>
        <div
          style={{
            position: "absolute",
            top: "56px",
            right: "calc(12% + 40px)",
            zIndex: 3,
          }}
        >
          <Pin />
        </div>
        <div
          style={{
            background:
              "linear-gradient(135deg, #d4a96e 0%, #c89860 30%, #d0a068 60%, #c4955a 100%)",
            backgroundImage: `url("${noiseDataUri}"), linear-gradient(135deg, #d4a96e 0%, #c89860 30%, #d0a068 60%, #c4955a 100%)`,
            backgroundBlendMode: "multiply, normal",
            border: "none",
            borderRadius: "4px",
            padding: "64px 80px",
            transform: "rotate(-0.5deg)",
            boxShadow:
              "inset 0 0 60px rgba(80,50,20,0.4), 0 20px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
            position: "relative",
          }}
          className="text-center max-[640px]:!px-8 max-[640px]:!py-12"
        >
          {/* Top ruled-paper line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "24px",
              left: "32px",
              right: "32px",
              height: "1px",
              backgroundColor: "rgba(80,50,20,0.15)",
            }}
          />

          {/* Label with gold lines */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "28px",
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
                letterSpacing: "0.2em",
                fontWeight: 700,
              }}
            >
              A Note From Us
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "28px",
                height: "1px",
                backgroundColor: "#8B6340",
                display: "inline-block",
              }}
            />
          </motion.div>

          {paragraphs.map((p, i) => {
            const isOpener = p.variant === "opener";
            const isIntimate = p.variant === "intimate";
            const isCloser = p.variant === "closer";

            const style: React.CSSProperties = isOpener
              ? {
                  color: "#1A0E06",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                }
              : isIntimate
              ? {
                  color: "#2A1A0A",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : {
                  color: "#1A0E06",
                  fontSize: "20px",
                  fontWeight: 800,
                  lineHeight: 1.55,
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
              color: "#4A2E10",
              fontSize: "14px",
              fontStyle: "italic",
              fontWeight: 600,
              marginTop: "32px",
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
