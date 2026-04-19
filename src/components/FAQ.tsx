import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "So how does this $20 thing actually work?",
    a: "You pay $20 to join a 30-day challenge. Then you show up, check in, and send a photo, video, or screenshot as proof you did the work. Hit 20 out of 30 days, and you get $25.\n\nIt's just enough skin in the game to keep you going — without making it feel heavy.",
  },
  {
    q: "What counts as checking in?",
    a: "A check-in is you showing up for your goal and uploading a photo, short video, or screenshot that proves you did the work that day — a step count, gym selfie, sleep app screenshot, whatever fits your goal. And it only takes about 30 seconds.",
  },
  {
    q: "What if I miss so many days that I can’t reach the goal anymore?",
    a: "You started showing up for yourself — and that's the whole point. You did real work, built real momentum, and moved closer to the person you're trying to become. The $25 doesn't come through this round, but the progress is yours. Jump into another 30-day challenge and keep going.",
  },
  {
    q: "Can my goal be anything?",
    a: "Right now we have five to choose from: Hit the gym, get to bed on time, walk 10,000 steps, eat healthier, or lose 5 pounds.",
  },
  {
    q: "When do I get my $25?",
    a: "Once your 30 days are up, we verify your check-ins and send you $25 within 72 hours.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. You can cancel within 7 days of joining if Nano isn't for you and get a full refund.",
  },
  {
    q: "Is this a subscription?",
    a: "Yes — your challenge renews every 30 days: $20 in, up to $25 back if you finish.\n\nYou can keep the same goal or switch it up each month. The idea is to keep growing, one challenge at a time.\n\nSkip or cancel anytime from your account.",
  },
  {
    q: "How is NanoCamp different from other habit apps?",
    a: "We've tried the habit apps too — and for a lot of people, they stop working around day 12. Streaks are easy to break when nothing's really on the line.\n\nNanoCamp adds just enough commitment to make showing up feel real. You put $20 on the line, show up for 20 out of 30 days, and if you finish, you get $25.\n\nIt's simple, flexible, and built to help you keep going.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pt-28 pb-20 px-6" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto text-center" style={{ maxWidth: "760px" }}>
        <span
          className="block mb-4 font-body font-bold"
          style={{
            color: "#D4A843",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          FAQs
        </span>
        <h2
          className="font-display font-bold leading-[1.1] mb-12"
          style={{ color: "#FFFFFF", fontSize: "52px" }}
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
                  className="w-full flex items-center justify-between text-left transition-colors duration-200"
                  style={{
                    color: isOpen ? "#D4A843" : "#FFFFFF",
                    fontSize: "19px",
                    fontWeight: 600,
                    padding: "28px 0",
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
                        className="pb-7 font-body text-left"
                        style={{
                          color: "#C8C0B0",
                          fontSize: "17px",
                          lineHeight: 1.8,
                          whiteSpace: "pre-line",
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
