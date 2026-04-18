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
      backgroundColor: "rgba(255,255,255,0.06)",
    }}
    aria-hidden="true"
  />
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
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "64px 80px",
          }}
          className="text-center max-[640px]:!px-8 max-[640px]:!py-12"
        >
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
                backgroundColor: "#D4A843",
                display: "inline-block",
              }}
            />
            <span
              className="font-body uppercase"
              style={{
                color: "#D4A843",
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
                backgroundColor: "#D4A843",
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
                  color: "#FFFFFF",
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: 1.5,
                }
              : isIntimate
              ? {
                  color: "#C8C0B0",
                  fontSize: "18px",
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : {
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 600,
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
              color: "#D4A843",
              fontSize: "14px",
              fontStyle: "italic",
              fontWeight: 500,
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
