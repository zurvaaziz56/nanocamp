const logos: { name: string; text: string; style?: React.CSSProperties }[] = [
  { name: "Google", text: "Google", style: { fontFamily: "'Product Sans', 'Inter', sans-serif", fontWeight: 400, letterSpacing: "-0.02em" } },
  { name: "amazon", text: "amazon", style: { fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.04em" } },
  { name: "pepsico", text: "pepsico", style: { fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "Telefónica", text: "Telefónica", style: { fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: "-0.01em" } },
  { name: "salesforce", text: "salesforce", style: { fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.03em" } },
  { name: "Deloitte", text: "Deloitte.", style: { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "SAP", text: "SAP", style: { fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: "0.02em" } },
  { name: "Allianz", text: "Allianz", style: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" } },
];

const EnterpriseGrade = () => {
  return (
    <section
      className="pt-0 pb-12 sm:pt-12 sm:pb-20 px-6 relative"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-display font-bold tracking-tight mx-auto"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(30px, 5.2vw, 56px)",
            lineHeight: 1.1,
            maxWidth: "880px",
            textWrap: "balance",
          }}
        >
          Enterprise-Grade R&amp;D,
          <br />
          Now Available to <span style={{ color: "#D4A843" }}>Everyone</span>.
        </h2>

        <p
          className="font-body mx-auto"
          style={{
            color: "#F5EFDD",
            fontSize: "clamp(15px, 1.6vw, 19px)",
            lineHeight: 1.6,
            fontWeight: 500,
            maxWidth: "720px",
            marginTop: "clamp(20px, 2.5vw, 28px)",
            textWrap: "balance",
          }}
        >
          Nano was shaped by a decade of research and client work through T Labs LLC and Adaptability.org. We distilled what we learned from working with leading organizations into one focused platform for personal goal achievement.
        </p>

        <div
          className="mx-auto grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center"
          style={{
            marginTop: "clamp(40px, 5vw, 64px)",
            maxWidth: "880px",
            columnGap: "clamp(20px, 3vw, 40px)",
            rowGap: "clamp(28px, 3.5vw, 44px)",
          }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center transition-opacity"
              style={{
                color: "rgba(200, 192, 176, 0.55)",
                fontSize: "clamp(18px, 2.2vw, 26px)",
                opacity: 0.85,
                ...logo.style,
              }}
            >
              {logo.text}
            </div>
          ))}
        </div>

        <p
          className="font-body mx-auto"
          style={{
            color: "#D4C9AE",
            fontSize: "clamp(11px, 1.1vw, 13px)",
            lineHeight: 1.5,
            marginTop: "clamp(36px, 4vw, 48px)",
            maxWidth: "780px",
            textWrap: "balance",
          }}
        >
          Logos represent organizations served by T Labs LLC and Adaptability.org. Some used earlier versions of Nano that helped shape Nano.com.
        </p>
      </div>
    </section>
  );
};

export default EnterpriseGrade;
