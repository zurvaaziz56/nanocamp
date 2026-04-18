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
      width: "84px",
      height: "1px",
      backgroundColor: "rgba(38, 20, 6, 0.28)",
    }}
    aria-hidden="true"
  />
);

const noiseDataUri =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0 0.05  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>`
  );

const FounderNote = () => {
  return (
    <section
      className="py-28 px-6 relative"
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(232,190,92,0.14) 0%, rgba(232,190,92,0.06) 38%, transparent 72%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "760px" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, #d8b97d 0%, #cda56b 28%, #d3ad73 58%, #c09559 100%)",
            backgroundImage: `url("${noiseDataUri}"), linear-gradient(135deg, #d8b97d 0%, #cda56b 28%, #d3ad73 58%, #c09559 100%)`,
            backgroundBlendMode: "soft-light, normal",
            border: "1px solid rgba(255, 236, 197, 0.08)",
            borderRadius: "6px",
            padding: "68px 68px",
            transform: "rotate(-0.35deg)",
            boxShadow:
              "inset 0 0 28px rgba(70,40,10,0.16), 0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,235,190,0.05)",
            position: "relative",
          }}
          className="text-center max-[640px]:!px-8 max-[640px]:!py-12"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "24px",
              left: "32px",
              right: "32px",
              height: "1px",
              backgroundColor: "rgba(62, 36, 11, 0.24)",
            }}
          />

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
                width: "32px",
                height: "1px",
                backgroundColor: "#4b2c0d",
                display: "inline-block",
              }}
            />
            <span
              className="font-body uppercase"
              style={{
                color: "#321b06",
                fontSize: "12.5px",
                letterSpacing: "0.24em",
                fontWeight: 800,
              }}
            >
              A Note From Us
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#4b2c0d",
                display: "inline-block",
              }}
            />
          </motion.div>

          {paragraphs.map((p, i) => {
            const isOpener = p.variant === "opener";
            const isIntimate = p.variant === "intimate";

            const style: React.CSSProperties = isOpener
              ? {
                  color: "#140b02",
                  fontSize: "24px",
                  fontWeight: 650,
                  lineHeight: 1.5,
                  maxWidth: "560px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : isIntimate
              ? {
                  color: "#1c1105",
                  fontSize: "20px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.85,
                  maxWidth: "560px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : {
                  color: "#140b02",
                  fontSize: "22px",
                  fontWeight: 750,
                  lineHeight: 1.55,
                  maxWidth: "590px",
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
              color: "#f7ebd1",
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 500,
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "0.04em",
              marginTop: "34px",
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
