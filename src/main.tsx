import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Defer LogRocket until the browser is idle so it doesn't block initial
// render or contribute to Max Potential First Input Delay.
const initLogRocket = () => {
  import("logrocket")
    .then(({ default: LogRocket }) => {
      LogRocket.init("jybow9/nanocamp");
    })
    .catch(() => {
      /* analytics is non-critical */
    });
};

if (typeof window !== "undefined") {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(initLogRocket, { timeout: 4000 });
  } else {
    setTimeout(initLogRocket, 3000);
  }
}
