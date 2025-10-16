export const themeExtend = {
  colors: {
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--ring)",
    background: "var(--background)",
    foreground: "var(--foreground)",
    primary: {
      DEFAULT: "var(--primary)",
      foreground: "var(--primary-foreground)",
      10: "var(--primary-10)",
      20: "var(--primary-20)",
      30: "var(--primary-30)",
      40: "var(--primary-40)",
      50: "var(--primary-50)",
      60: "var(--primary-60)",
      70: "var(--primary-70)",
      80: "var(--primary-80)",
      90: "var(--primary-90)",
    },
    secondary: {
      DEFAULT: "var(--secondary)",
      foreground: "var(--secondary-foreground)",
      10: "var(--secondary-10)",
      20: "var(--secondary-20)",
      30: "var(--secondary-30)",
      40: "var(--secondary-40)",
      50: "var(--secondary-50)",
      60: "var(--secondary-60)",
      70: "var(--secondary-70)",
      80: "var(--secondary-80)",
      90: "var(--secondary-90)",
    },
    destructive: {
      DEFAULT: "var(--destructive)",
      foreground: "var(--destructive-foreground)",
    },
    muted: {
      DEFAULT: "var(--muted)",
      foreground: "var(--muted-foreground)",
    },
    accent: {
      DEFAULT: "var(--accent)",
      foreground: "var(--accent-foreground)",
    },
    popover: {
      DEFAULT: "var(--popover)",
      foreground: "var(--popover-foreground)",
    },
    card: {
      DEFAULT: "var(--card)",
      foreground: "var(--card-foreground)",
    },
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
  },
  keyframes: {
    "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
    "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
  },
};

export const themeExtensions = { extend: themeExtend };
