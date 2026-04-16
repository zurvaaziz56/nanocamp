import { useState, useEffect, useRef } from "react";

const quotes = [
  "Simply the feeling of showing up tired, doubtful, still choosing to try — and being witnessed by another human doing the same is so so rewarding in itself.",
  "This feels bigger than goals. The process asks you what matters to you right now, and gives you a way to think about that both privately and with others. Once you open up this space, you never know what will emerge, and that's the best part.",
  "Self worth and purpose are built when the individual learns to trust themselves and feel safe within a network of support.",
];

const Testimonials = () => {
  const [visible, setVisible] = useState([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          quotes.forEach((_, i) => {
            setTimeout(() => setVisible((p) => { const n = [...p]; n[i] = true; return n; }), i * 150);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.05) 0%, transparent 65%)",
        padding: "96px 60px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <span
          className="block font-body uppercase"
          style={{ color: "#D4A843", fontSize: "13px", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "16px" }}
        >
          What early testers have said
        </span>
        <h2
          className="font-display font-bold mb-14"
          style={{ color: "#FFFFFF", fontSize: "52px", lineHeight: 1.1 }}
        >
          Real words. Real results.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, i) => (
            <div
              key={i}
              className="rounded-xl transition-all duration-300"
              style={{
                backgroundColor: "#111111",
                border: i === 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderTop: i === 1 ? "2px solid rgba(212,168,67,0.4)" : undefined,
                padding: "40px",
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0)" : "translateY(20px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.25)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(212,168,67,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                if (i === 1) e.currentTarget.style.borderTopColor = "rgba(212,168,67,0.4)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="font-display block leading-none select-none"
                style={{ color: "#D4A843", fontSize: "72px" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p
                className="font-display italic mt-2"
                style={{ color: "#E8E4DC", fontSize: "18px", lineHeight: 1.8 }}
              >
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
