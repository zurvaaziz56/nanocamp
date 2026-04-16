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

const HowItWorks = () => {
  return (
    <section id="how" className="py-40 md:py-52 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          className="mb-20 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="font-display text-[40px] md:text-[52px] font-semibold text-foreground leading-[1.1]">
            How it works.
          </h2>
          <div className="mt-4 w-8 h-[3px] bg-primary rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {/* Connector lines (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[33.33%] w-[1px] h-12 -translate-y-1/2 bg-foreground/[0.06]" />
          <div className="hidden md:block absolute top-1/2 left-[33.33%] w-8 h-[1px] -translate-y-1/2 -translate-x-4 bg-foreground/[0.06]" />
          <div className="hidden md:block absolute top-1/2 left-[66.66%] w-[1px] h-12 -translate-y-1/2 bg-foreground/[0.06]" />
          <div className="hidden md:block absolute top-1/2 left-[66.66%] w-8 h-[1px] -translate-y-1/2 -translate-x-4 bg-foreground/[0.06]" />

          {/* Card 01 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 md:p-10"
            style={{ backgroundColor: "#111114" }}
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
              <h3 className="font-display text-2xl font-bold text-foreground">
                Pick Your Goal.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.7]">
                You already know what it is.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <span
                    key={goal}
                    className="inline-block px-3.5 py-1.5 text-[13px] rounded-full border border-primary/20 text-muted-foreground font-body"
                    style={{ backgroundColor: "rgba(201,168,76,0.06)" }}
                  >
                    {goal}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-muted-foreground font-body text-[15px] leading-[1.7]">
                One thing you've been meaning to do.
              </p>
            </div>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 md:p-10"
            style={{ backgroundColor: "#111114" }}
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
              <h3 className="font-display text-2xl font-bold text-foreground">
                Show up daily.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.7]">
                Check in every day. Thirty days. One goal. That's it.
              </p>
            </div>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 md:p-10"
            style={{ backgroundColor: "#111114" }}
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
              <h3 className="font-display text-2xl font-bold text-foreground">
                Get paid.
              </h3>
              <p className="mt-4 text-muted-foreground font-body text-[15px] leading-[1.7]">
                Show up at least 24 out of 30 days and we pay you $25. Because you actually did it.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
