const stats = [
  "$20 commitment",
  "$25 reward",
  "30 days",
];

const StatPills = () => {
  return (
    <div
      className="inline-flex items-center rounded-full px-1 py-1 font-body text-sm"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
    >
      {stats.map((stat, i) => (
        <span key={stat} className="flex items-center">
          <span className="px-4 py-1.5 text-muted-foreground text-[13px]">{stat}</span>
          {i < stats.length - 1 && (
            <span className="w-[1px] h-4 bg-border" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StatPills;
