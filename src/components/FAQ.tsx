import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does the $20 commitment work?",
    a: "You pay $20 to join a 30-day challenge. If you check in at least 24 of those 30 days, you get $25 back. That's it.",
  },
  {
    q: "What counts as checking in?",
    a: "Upload a screenshot each day that proves you did the thing - a step count, a gym selfie, your sleep app, whatever fits your goal. It takes about 30 seconds.",
  },
  {
    q: "What if I miss more than 6 days?",
    a: "You don't get the $25. Your $20 goes toward paying out the people who did show up.",
  },
  {
    q: "Can I pick any goal?",
    a: "Right now we have three to choose from - hit the gym, walk 10,000 steps, or get 7 hours of sleep. We'll be adding more over time.",
  },
  {
    q: "When do I get paid?",
    a: "Once your 30 days are up, we review your check-ins and send the $25 to your account within 48 hours.",
  },
  {
    q: "Is this a subscription?",
    a: "No. You pay $20 per challenge. No recurring charges.",
  },
  {
    q: "How is this different from other habit apps?",
    a: "Most apps give you a badge when you hit a streak. This one gives you money. The difference in motivation is pretty significant.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pt-28 pb-20 px-6" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto" style={{ maxWidth: "760px" }}>
        <span
          className="block mb-4 font-body font-bold"
          style={{
            color: "#D4A843",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          FAQ
        </span>
        <h2
          className="font-display font-bold leading-[1.1] mb-12"
          style={{ color: "#FFFFFF", fontSize: "48px" }}
        >
          Everything you need to know.
        </h2>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left transition-colors duration-200"
                  style={{
                    color: isOpen ? "#D4A843" : "#FFFFFF",
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  <span className="pr-4">{faq.q}</span>
                  <span
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      color: "#D4A843",
                      fontSize: "22px",
                      fontWeight: 300,
                      width: "24px",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-5 font-body"
                        style={{
                          color: "#C8C0B0",
                          fontSize: "16px",
                          lineHeight: 1.75,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
