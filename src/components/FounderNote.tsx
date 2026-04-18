import { motion } from "framer-motion";

const paragraphs = [
  "We're new. Like, genuinely just getting started.",
  "Nanocamp is something we've been thinking about for a long time — the idea that showing up for yourself should actually mean something. Not just a badge. Not a streak you lose because your phone died. Real money, real accountability, real results.",
  "We're a small team and we're building this alongside you. Every person who joins this first cohort is shaping what Nanocamp becomes. We read every check-in, we think about every goal, and we genuinely celebrate every win.",
  "So thank you for being here early. It means more than you know.",
];

const FounderNote = () => {
  return (
    <section
      className="py-28 px-6 relative"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: "640px" }}>
        <motion.span
          className="block mb-8 font-body uppercase"
          style={{ color: "#D4A843", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          A Note From Us
        </motion.span>

        {paragraphs.map((p, i) => (
          <div key={i}>
            <motion.p
              className="font-display italic"
              style={{
                color: "#C8C0B0",
                fontSize: "19px",
                lineHeight: 1.9,
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {p}
            </motion.p>
            {i < paragraphs.length - 1 && (
              <div
                className="my-6"
                style={{ color: "#D4A843", fontSize: "14px" }}
                aria-hidden="true"
              >
                ✦
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FounderNote;
