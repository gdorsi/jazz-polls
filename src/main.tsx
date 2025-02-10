import { JazzProvider } from "jazz-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { apiKey } from "./apiKey";
import { JazzAccount } from "./schema";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JazzProvider
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
      }}
      AccountSchema={JazzAccount}
    >
        <App />
    </JazzProvider>
  </StrictMode>,
);

declare module "jazz-react" {
  interface Register {
    Account: JazzAccount;
  }
}
