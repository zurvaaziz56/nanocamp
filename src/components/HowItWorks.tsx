import { motion } from "framer-motion";

const goals = ["Hit the gym", "Sleep 7 hours", "Walk 10,000 steps"];

const cardFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

const StreakBar = () => {
  const filled = 14;
  const total = 30;
  return (
    <div className="mt-6">
      <div className="flex gap-[3px]">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full"
            style={{
              backgroundColor: i < filled ? "#c9a84c" : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground font-body">Day 14 streak</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-body block mb-4">
            How it works
          </span>
          <h2 className="font-display text-[40px] md:text-[52px] font-medium text-foreground leading-[1.1]">
            How it works.
          </h2>
          <div className="mt-4 w-8 h-[3px] bg-primary rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 01 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: "#111114",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={cardFade}
          >
            <span className="absolute top-6 left-8 font-display text-[68px] font-semibold leading-none text-primary/20 select-none">
              01
            </span>
            <div className="relative pt-16">
              <h3 className="font-display text-2xl font-medium text-foreground">
                Pick Your Goal.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.75]">
                You already know what it is. The gym you keep meaning to get back to. The sleep you keep sacrificing. The steps you keep skipping. Pick one. Just one.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <span
                    key={goal}
                    className="inline-block px-3.5 py-1.5 text-[13px] rounded-full text-muted-foreground font-body"
                    style={{
                      border: "1px solid rgba(201,168,76,0.3)",
                      backgroundColor: "rgba(201,168,76,0.06)",
                    }}
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: "#111114",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={cardFade}
          >
            <span className="absolute top-6 left-8 font-display text-[68px] font-semibold leading-none text-primary/20 select-none">
              02
            </span>
            <div className="relative pt-16">
              <h3 className="font-display text-2xl font-medium text-foreground">
                Show up daily.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.75]">
                Check in every day. Upload a quick screenshot — your step count, your gym check-in, your sleep data. Thirty days. One goal. That's the whole job.
              </p>
              <StreakBar />
            </div>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: "#111114",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={cardFade}
          >
            <span className="absolute top-6 left-8 font-display text-[68px] font-semibold leading-none text-primary/20 select-none">
              03
            </span>
            <div className="relative pt-16">
              <h3 className="font-display text-2xl font-medium text-foreground">
                Get paid.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.75]">
                Show up at least 24 out of 30 days and we send you $25. Not a discount. Not credits. Real money. Because you actually did it.
              </p>
              <div className="mt-6">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] rounded-full font-body font-medium"
                  style={{
                    color: "#52c97a",
                    backgroundColor: "rgba(82,201,122,0.08)",
                    border: "1px solid rgba(82,201,122,0.2)",
                  }}
                >
                  ✓ $25 paid to your account
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
