const stats = [
  { value: "$20", label: "Commitment" },
  { value: "$25", label: "Reward", highlight: true },
  { value: "30", label: "Days" },
];

const StatPills = () => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-default group"
          style={{
            minHeight: "110px",
            backgroundColor: "rgba(212,168,67,0.07)",
            border: "1px solid rgba(212,168,67,0.3)",
            borderTop: "2px solid rgba(212,168,67,0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)";
            e.currentTarget.style.borderTopColor = "rgba(212,168,67,0.6)";
          }}
        >
          {stat.highlight && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)",
              }}
            />
          )}
          <span
            className="text-[48px] font-[800] tracking-tight transition-transform duration-200 group-hover:scale-105"
            style={{ color: "#FFFFFF" }}
          >
            {stat.value}
          </span>
          <span className="text-[11px] uppercase tracking-[0.15em] mt-1" style={{ color: "#D4A843" }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatPills;
