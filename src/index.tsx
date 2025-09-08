import App from "@/App";
import { Provider } from "@/Provider";
import reportWebVitals from "@/reportWebVitals";
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <Provider>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

reportWebVitals(console.log);
