const stats = [
  { value: "$20", label: "Commitment" },
  { value: "$25", label: "Reward" },
  { value: "30", label: "Days" },
];

const StatPills = () => {
  return (
    <div className="flex gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center rounded-xl px-6 py-4 transition-colors"
          style={{
            width: "140px",
            height: "80px",
            backgroundColor: "#141414",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
        >
          <span className="text-xl font-medium tracking-tight" style={{ color: "#F5F0E8" }}>
            {stat.value}
          </span>
          <span className="text-[11px] uppercase tracking-[0.15em] mt-1" style={{ color: "#B0A898" }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatPills;
