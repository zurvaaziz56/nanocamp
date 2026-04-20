import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalPageProps {
  title: string;
  metaDescription: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalPage = ({ title, metaDescription, lastUpdated, children }: LegalPageProps) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const previousDesc = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", metaDescription);

    return () => {
      document.title = previousTitle;
      if (previousDesc !== null) meta?.setAttribute("content", previousDesc);
    };
  }, [title, metaDescription]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[720px] px-6 py-16 md:py-24">
        <article className="legal-content">
          {children}
          <p className="mt-2 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
            Last updated: {lastUpdated}
          </p>
        </article>
        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/"
            className="text-accent hover:underline"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <style>{`
        .legal-content h1 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          line-height: 1.1;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .legal-content h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          line-height: 1.2;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .legal-content p {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.7;
          color: hsl(var(--foreground) / 0.85);
          margin-bottom: 1.25rem;
        }
        .legal-content a {
          color: hsl(var(--accent));
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .legal-content a:hover {
          opacity: 0.8;
        }
        .legal-content strong {
          color: hsl(var(--foreground));
          font-weight: 600;
        }
      `}</style>
    </main>
  );
};

export default LegalPage;
