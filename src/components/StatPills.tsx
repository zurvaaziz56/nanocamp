const stats = [
  { value: "30", label: "30 Days" },
];

const StatPills = () => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center rounded-xl transition-colors"
          style={{
            minHeight: "110px",
            backgroundColor: "rgba(212,168,67,0.07)",
            border: "1px solid rgba(212,168,67,0.3)",
            borderTop: "2px solid rgba(212,168,67,0.6)",
          }}
        >
          <span className="text-[48px] font-[800] tracking-tight" style={{ color: "#FFFFFF" }}>
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
