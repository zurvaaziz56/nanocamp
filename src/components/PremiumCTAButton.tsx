interface Props {
  onClick?: () => void;
  size?: "sm" | "lg" | "xl";
  children?: React.ReactNode;
  className?: string;
}

const PremiumCTAButton = ({ onClick, size = "sm", children = "Join for Free", className = "" }: Props) => {
  const isXl = size === "xl";
  const isLg = size === "lg";

  const padding = isXl
    ? "clamp(16px, 2.4vw, 24px) clamp(28px, 5.5vw, 52px)"
    : isLg
    ? "16px 32px"
    : "10px 22px";
  const fontSize = isXl
    ? "clamp(16px, 2.4vw, 22px)"
    : isLg
    ? "16px"
    : "14px";
  const radius = isXl ? "14px" : isLg ? "10px" : "6px";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`premium-cta relative overflow-hidden group inline-flex items-center justify-center font-bold ${className}`}
      style={{
        padding,
        fontSize,
        letterSpacing: "0.01em",
        color: "#1A1200",
        borderRadius: radius,
        background:
          "linear-gradient(135deg, #F4D27A 0%, #D4A843 45%, #B8862F 100%)",
        boxShadow:
          "0 8px 32px rgba(212,168,67,0.4), 0 3px 8px rgba(212,168,67,0.3), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.15)",
        border: "1px solid rgba(255,220,140,0.6)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Inner gradient overlay for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, #FBE19A 0%, #E8C068 45%, #C99232 100%)",
        }}
      />

      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 -left-1/3 h-full w-1/3 -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
        }}
      />

      {/* Outer soft glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[inherit] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(212,168,67,0.45) 0%, transparent 70%)",
          filter: "blur(12px)",
          zIndex: -1,
        }}
      />

      <span className="relative flex items-center gap-2">
        {children}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </button>
  );
};

export default PremiumCTAButton;
