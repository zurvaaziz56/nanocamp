import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const ContactModal = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setMessage("");
      setError("");
      setSuccess(false);
      setFocusedField(null);
      setSubmitting(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your inputs.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        message: parsed.data.message,
      });
    setSubmitting(false);

    if (insertError) {
      console.error("contact submit error", insertError);
      setError("Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
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

  const inputStyle = (key: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
    ...inputBase,
    height: "48px",
    ...(focusedField === key ? focusStyle : {}),
    ...extra,
  });

  const textareaStyle = (key: string): React.CSSProperties => ({
    ...inputBase,
    minHeight: "120px",
    padding: "12px 14px",
    resize: "vertical",
    ...(focusedField === key ? focusStyle : {}),
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-y-auto"
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
            className="relative w-full text-center my-auto"
            style={{
              maxWidth: "460px",
              background: "linear-gradient(180deg, #181613 0%, #141210 100%)",
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
            >
              ×
            </button>

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
              {success ? "Message sent." : "Get in touch."}
            </h2>
            <p
              className="mt-3 font-body mx-auto"
              style={{ color: "#C9C0AB", fontSize: "14.5px", maxWidth: "340px", lineHeight: 1.5 }}
            >
              {success
                ? "Thanks for reaching out — we'll get back to you soon."
                : "Questions, feedback, or just saying hi? Drop us a note."}
            </p>

            {!success && (
              <form onSubmit={handleSubmit} className="mt-7 flex flex-col text-left gap-4">
                <Field label="Your name">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jane Smith"
                    maxLength={100}
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
                    maxLength={255}
                    style={inputStyle("email")}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="What's on your mind?"
                    maxLength={2000}
                    rows={5}
                    style={textareaStyle("message")}
                  />
                </Field>

                {error && (
                  <div
                    role="alert"
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
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="transition-all duration-200 mt-2 disabled:opacity-60"
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
                >
                  {submitting ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}

            {success && (
              <button
                type="button"
                onClick={onClose}
                className="mt-7 transition-all duration-200"
                style={{
                  backgroundColor: "#D4A843",
                  color: "#000000",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  padding: "12px 22px",
                }}
              >
                Close
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

export default ContactModal;
