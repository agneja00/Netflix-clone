import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { scan } from "react-scan";

if (import.meta.env.DEV) {
  scan({
    enabled: true,
    trackUnnecessaryRenders: true,
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
