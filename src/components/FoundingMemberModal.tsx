import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setDiscountCode("");
      setShowToast(false);
      setToastTriggered(false);
      setFormError("");
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full text-center"
            style={{
              maxWidth: "480px",
              backgroundColor: "#0D0D0D",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "40px 32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4"
              style={{ color: "#6B6560", fontSize: "20px", lineHeight: 1 }}
            >
              ×
            </button>

            <h2
              className="font-display"
              style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: 700 }}
            >
              You're joining Nanocamp.
            </h2>
            <p
              className="mt-3 font-body mx-auto"
              style={{ color: "#A09880", fontSize: "15px", maxWidth: "380px" }}
            >
              First month. $20. Walk away with $25 if you show up.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 text-left">
              <Field label="Your name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="modal-input"
                />
              </Field>

              <Field label="Email address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@email.com"
                  className="modal-input"
                />
              </Field>

              <Field label="Card details">
                <input
                  type="text"
                  readOnly
                  onClick={handleCardClick}
                  value=""
                  placeholder="1234 1234 1234 1234"
                  className="modal-input"
                  style={{ cursor: "pointer" }}
                />
                <div className="flex gap-3 mt-3">
                  <input
                    type="text"
                    readOnly
                    onClick={handleCardClick}
                    value=""
                    placeholder="MM/YY"
                    className="modal-input"
                    style={{ flex: 1, cursor: "pointer" }}
                  />
                  <input
                    type="text"
                    readOnly
                    onClick={handleCardClick}
                    value=""
                    placeholder="CVV"
                    className="modal-input"
                    style={{ flex: 1, cursor: "pointer" }}
                  />
                </div>
              </Field>

              <Field label="Discount code (optional)">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter code"
                  maxLength={40}
                  className="modal-input"
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="transition-all duration-200 mt-2 disabled:opacity-60"
                style={{
                  height: "52px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0EDE6";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {submitting ? "Saving…" : "Lock in my spot →"}
              </button>

              <p
                className="text-center font-body"
                style={{ color: "#6B6560", fontSize: "12px" }}
              >
                🔒 Secure checkout · No charge until your challenge starts
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
                className="fixed inset-0 z-[110] flex items-center justify-center px-4"
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
                    <div className="font-display" style={{ fontWeight: 700, marginBottom: "8px", fontSize: "18px" }}>
                      🎉 Thanks for raising your hand, {firstName}.
                    </div>
                    <div style={{ fontSize: "14px", lineHeight: 1.5, color: "#E8E4DC" }}>
                      This round's already full, but we'll send you a gift card as a thank you for your early support — and we'll be in touch when we're ready for you to join.
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowToast(false); onClose(); }}
                      className="mt-5 transition-all duration-200"
                      style={{
                        backgroundColor: "#D4A843",
                        color: "#000000",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        padding: "10px 18px",
                      }}
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span
      className="block mb-2 font-body uppercase"
      style={{ color: "#A09880", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 600 }}
    >
      {label}
    </span>
    {children}
  </label>
);

export default FoundingMemberModal;
