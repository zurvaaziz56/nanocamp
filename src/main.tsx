import { createRoot } from "react-dom/client";
import LogRocket from "logrocket";
import App from "./App.tsx";
import "./index.css";

LogRocket.init("jybow9/nanocamp");

createRoot(document.getElementById("root")!).render(<App />);
