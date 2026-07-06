import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import CetasikasMandala from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CetasikasMandala />
  </StrictMode>
);
