import { useState } from "react";

const faqs = [
  {
    q: "What if I cannot achieve the goal?",
    a: "You still showed up for yourself - and that matters. You put in real effort, built momentum, and made progress.  Start a new challenge and keep going.",
  },
  {
    q: "Can my goal be anything?",
    a: "Right now we have five to choose from: Hit the gym, get to bed on time, walk 10,000 steps, eat healthier, or lose 5 pounds.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel anytime. If you cancel within 7 days of joining, you wil not be charged. ",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pt-28 pb-20 px-6">
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
                <div
                  className="overflow-hidden faq-answer"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
                  }}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;