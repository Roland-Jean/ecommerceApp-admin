import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

// Log for debugging
console.log("App is loading...");
console.log("Base URL:", import.meta.env.BASE_URL);

const container = document.getElementById("root") as HTMLElement;

if (!container) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, rendering app...");
  const root = createRoot(container);
  root.render(<App />);
}
