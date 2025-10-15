import { ThemeProvider } from "@clife/theme/ThemeProvider";
import { ThemeJSON } from "@clife/theme/types";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

const defaultTheme: ThemeJSON = {
  name: "Default",
  mode: "light",
  colors: {
    background: "#FFFFFF",
    // "bg-n-98": "#FAF7F0",

    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    "bg-accent": "oklch(0.577 0.245 27.325)",

    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",

    // Primary

    primary: "#000000",
    // primary: "#0D7E55",
    "primary-10": "#003108",
    "primary-20": "#004B22",
    "primary-30": "#00643B",
    "primary-40": "#0D7E55",
    "primary-50": "#3D9877",
    "primary-60": "#6EB299",
    "primary-70": "#86BEAA",
    "primary-80": "#9ECBBB",
    "primary-90": "#B6D8CC",
    "primary-foreground": "oklch(0.985 0 0)",

    // Secondary
    secondary: "#000000",
    "secondary-10": "#510000",
    "secondary-20": "#9D310A",
    "secondary-30": "#B74B24",
    "secondary-40": "#EA7E57",
    "secondary-50": "#EC8B68",
    "secondary-60": "#EE9879",
    "secondary-70": "#F2B29A",
    "secondary-80": "#F4BEAB",
    "secondary-90": "#F7CBBC",
    "secondary-foreground": "oklch(0.205 0 0)",

    //tertiary
    tertiary: "#000000",
    "tertiary-10": "#404D41",
    "tertiary-20": "#59665A",
    "tertiary-30": "#738074",
    "tertiary-40": "#8C998D",
    "tertiary-50": "#BFCCC0",
    "tertiary-60": "#D9E6DA",
    "tertiary-70": "#E1EBE1",
    "tertiary-80": "#E8F0E9",
    "tertiary-90": "#ECF2EC",
    "tertiary-foreground": "oklch(0.205 0 0)",

    //error
    error: "#000000",
    "error-10": "#550000",
    "error-20": "#6F0000",
    "error-30": "#880000",
    "error-40": "#A2000A",
    "error-50": "#D5233E",
    "error-60": "#D93951",
    "error-70": "#E16578",
    "error-80": "#E16578",
    "error-90": "#EEA7B2",
    "error-foreground": "oklch(0.985 0 0)",

    //text
    text: "#000000",
    "text-50": "#A0A3A3",
    "text-100": "#FFFFFF",

    //secondary text
    "text-secondary": "#5B5F5C",
    "text-secondary-50": "#ADAFAD",
    "text-secondary-100": "#FFFFFF",

    // Destructive
    destructive: "oklch(0.577 0.245 27.325)",
    "destructive-foreground": "oklch(0.985 0 0)",

    // Muted
    muted: "oklch(0.97 0 0)",
    "muted-foreground": "oklch(0.556 0 0)",

    // Accent
    accent: "oklch(0.97 0 0)",
    // accent: "#0D7E55",
    "accent-foreground": "oklch(0.205 0 0)",

    // Chart colors
    "chart-1": "oklch(0.646 0.222 41.116)",
    "chart-2": "oklch(0.6 0.118 184.704)",
    "chart-3": "oklch(0.398 0.07 227.392)",
    "chart-4": "oklch(0.828 0.189 84.429)",
    "chart-5": "oklch(0.769 0.188 70.08)",

    // Sidebar
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.205 0 0)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.708 0 0)",
  },
  radius: "0.625rem",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      storageKey={"clife_super_admin_theme"}
      initialColors={defaultTheme.colors || null}
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
