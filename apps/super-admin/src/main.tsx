import { ThemeProvider } from "@clife/theme/ThemeProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      storageKey={"clife_super_admin_theme"}
    >
      <Provider store={store}>

        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
