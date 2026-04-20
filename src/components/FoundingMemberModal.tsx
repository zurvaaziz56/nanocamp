import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const RESEARCH_CALL_URL = "https://calendly.com/yadzia/nano-camp";

interface Props {
  open: boolean;
  onClose: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Confetti = () => {
  const pieces = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 1 + Math.random() * 0.6;
        const size = 4 + Math.random() * 6;
        const rotate = Math.random() * 360;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 400, opacity: 0, rotate: rotate + 360 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className="absolute"
            style={{
              left: `${left}%`,
              top: 0,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: i % 2 === 0 ? "#D4A843" : "#E8C068",
              borderRadius: "1px",
            }}
          />
        );
      })}
    </div>
  );
};

const FoundingMemberModal = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTriggered, setToastTriggered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setDiscountCode("");
      setShowToast(false);
      setToastTriggered(false);
      setFormError("");
      setFocusedField(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const triggerCelebration = async () => {
    if (toastTriggered) return;
    if (!name.trim() || !emailRegex.test(email.trim())) {
      setFormError("Please enter your name and a valid email first.");
      return;
    }
    setFormError("");
    setToastTriggered(true);
    setShowToast(true);
    setSubmitting(true);
    const { error } = await supabase
      .from("founding_signups")
      .insert({ name: name.trim(), email: email.trim().toLowerCase() });
    setSubmitting(false);
    if (error) {
      console.error("signup error", error);
    }
  };

  const handleCardClick = () => {
    triggerCelebration();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCelebration();
  };

  const firstName = name.trim().split(" ")[0] || "friend";

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: "48px",
    backgroundColor: "#1A1815",
    border: "1px solid rgba(212,168,67,0.18)",
    borderRadius: "8px",
    padding: "0 14px",
    color: "#F5F1E8",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
  };

  const focusStyle: React.CSSProperties = {
    borderColor: "rgba(212,168,67,0.55)",
    boxShadow: "0 0 0 3px rgba(212,168,67,0.12)",
    backgroundColor: "#1F1C18",
  };

  const inputStyle = (key: string): React.CSSProperties => ({
    ...inputBase,
    ...(focusedField === key ? focusStyle : {}),
  });

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-10 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: "rgba(0,0,0,0.78)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full text-center"
            style={{
              maxWidth: "460px",
              background:
                "linear-gradient(180deg, #181613 0%, #141210 100%)",
              border: "1px solid rgba(212,168,67,0.14)",
              borderRadius: "18px",
              padding: "44px 36px 36px",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,235,190,0.03), 0 0 60px rgba(212,168,67,0.06)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute flex items-center justify-center transition-all duration-200"
              style={{
                top: "14px",
                right: "14px",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#A09880",
                fontSize: "20px",
                lineHeight: 1,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#F5F1E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.color = "#A09880";
              }}
            >
              ×
            </button>

            {/* Header */}
            <h2
              className="font-display"
              style={{
                color: "#FBF7EE",
                fontSize: "28px",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              You're joining Nano Camp.
            </h2>
            <p
              className="mt-3 font-body mx-auto"
              style={{
                color: "#C9C0AB",
                fontSize: "14.5px",
                maxWidth: "340px",
                lineHeight: 1.5,
              }}
            >
              Lock in your spot in our first cohort.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col text-left">
              {/* Section: You */}
              <div className="flex flex-col gap-4">
                <Field label="Your name">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jane Smith"
                    style={inputStyle("name")}
                  />
                </Field>

                <Field label="Email address">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="jane@email.com"
                    style={inputStyle("email")}
                  />
                </Field>
              </div>

              {/* Divider */}
              <div
                className="my-6"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,168,67,0.18), transparent)",
                }}
              />

              {/* Section: Payment */}
              <div className="flex flex-col gap-4">
                <Field label="Card details">
                  <input
                    type="text"
                    readOnly
                    onClick={handleCardClick}
                    value=""
                    placeholder="1234 1234 1234 1234"
                    style={{ ...inputStyle("card"), cursor: "pointer" }}
                    onFocus={() => setFocusedField("card")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <div className="flex gap-3 mt-3">
                    <input
                      type="text"
                      readOnly
                      onClick={handleCardClick}
                      value=""
                      placeholder="MM/YY"
                      style={{ ...inputStyle("exp"), flex: 1, cursor: "pointer" }}
                      onFocus={() => setFocusedField("exp")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <input
                      type="text"
                      readOnly
                      onClick={handleCardClick}
                      value=""
                      placeholder="CVV"
                      style={{ ...inputStyle("cvv"), flex: 1, cursor: "pointer" }}
                      onFocus={() => setFocusedField("cvv")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </Field>

                <Field label="Discount code (optional)">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onFocus={() => setFocusedField("discount")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter code"
                    maxLength={40}
                    style={inputStyle("discount")}
                  />
                </Field>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="mt-5"
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(220, 38, 38, 0.10)",
                    border: "1px solid rgba(220, 38, 38, 0.40)",
                    color: "#FCA5A5",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="transition-all duration-200 mt-6 disabled:opacity-60"
                style={{
                  height: "54px",
                  width: "100%",
                  background: "linear-gradient(180deg, #FBF7EE 0%, #ECE4D2 100%)",
                  color: "#0A0908",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "10px",
                  letterSpacing: "0.01em",
                  boxShadow:
                    "0 10px 30px rgba(212,168,67,0.18), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 36px rgba(212,168,67,0.28), 0 3px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(212,168,67,0.18), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)";
                }}
              >
                {submitting ? "Saving…" : "Lock in my spot →"}
              </button>

              <p
                className="text-center font-body mt-4"
                style={{ color: "#8A8270", fontSize: "12px", letterSpacing: "0.02em" }}
              >
                🔒 Secure checkout · No charge until your challenge starts
              </p>

              <p
                className="text-center font-body mt-4"
                style={{ color: "#6A6250", fontSize: "11px", lineHeight: 1.5 }}
              >
                This is a pre-launch market test. Product not yet available. No purchase will be completed. No payment will be accepted. Provide your name and email and we'll send a $25 gift card for participating, subject to terms. Must be 18 or older to enter. Limit one entry per person/household.
              </p>
            </form>
          </motion.div>

          {/* Centered celebratory toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              >
                <div
                  className="relative"
                  style={{
                    width: "100%",
                    maxWidth: "440px",
                    backgroundColor: "#1A1600",
                    border: "1px solid #D4A843",
                    borderRadius: "12px",
                    padding: "28px 28px 24px",
                    color: "#FFFFFF",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,168,67,0.25)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => { setShowToast(false); onClose(); }}
                    aria-label="Close"
                    className="absolute top-3 right-3"
                    style={{ color: "#A09880", fontSize: "20px", lineHeight: 1, zIndex: 2 }}
                  >
                    ×
                  </button>
                  <Confetti />
                  <div className="relative text-left">
                    <div
                      className="font-display"
                      style={{ fontWeight: 700, marginBottom: "8px", fontSize: "18px", color: "#FBF7EE" }}
                    >
                      🎉 Thanks for raising your hand, {firstName}.
                    </div>
                    <div style={{ fontSize: "14px", lineHeight: 1.5, color: "#E8E4DC" }}>
                      This round's already full, but we'll send you a gift card as a thank you for your early support -  and we'll be in touch when we're ready for you to join.
                    </div>

                    <div
                      style={{
                        height: "1px",
                        background: "rgba(244, 228, 193, 0.18)",
                        margin: "22px 0",
                      }}
                    />

                    <div
                      className="font-display"
                      style={{ fontWeight: 700, marginBottom: "8px", fontSize: "18px", color: "#FBF7EE" }}
                    >
                      💬 One more thing - we'd love to hear from you.
                    </div>
                    <div style={{ fontSize: "14px", lineHeight: 1.5, color: "#E8E4DC" }}>
                      We're paying $50 for a 30-minute call with early supporters. Tell us why you joined, what you're hoping Nano Camp will do for you, or anything else on your mind. It genuinely helps us build the right thing.
                    </div>

                    <a
                      href={RESEARCH_CALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { setShowToast(false); onClose(); }}
                      className="transition-all duration-200 mt-5 block text-center"
                      style={{
                        height: "54px",
                        lineHeight: "54px",
                        width: "100%",
                        background: "linear-gradient(180deg, #FBF7EE 0%, #ECE4D2 100%)",
                        color: "#0A0908",
                        fontWeight: 700,
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "0.01em",
                        boxShadow:
                          "0 10px 30px rgba(212,168,67,0.18), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 14px 36px rgba(212,168,67,0.28), 0 3px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(212,168,67,0.18), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)";
                      }}
                    >
                      Book a call · Get $50 →
                    </a>

                    <button
                      type="button"
                      onClick={() => { setShowToast(false); onClose(); }}
                      className="block mx-auto transition-colors duration-200"
                      style={{
                        marginTop: "12px",
                        background: "transparent",
                        color: "#B8AE94",
                        fontSize: "13px",
                        fontWeight: 500,
                        padding: "6px 12px",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#FBF7EE"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#B8AE94"; }}
                    >
                      I’ll just take the gift card
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span
      className="block mb-2 font-body uppercase"
      style={{ color: "#B8AE94", fontSize: "11px", letterSpacing: "0.14em", fontWeight: 700 }}
    >
      {label}
    </span>
    {children}
  </label>
);

export default FoundingMemberModal;
