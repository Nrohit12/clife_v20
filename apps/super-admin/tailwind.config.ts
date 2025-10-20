import type { Config } from "tailwindcss"
import base from "@tesseract/theme/tailwind-base.ts"
import tailwindcssAnimate from "tailwindcss-animate"

export default {
    ...base,
    content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/**/*"],
    theme: {
        extend: {
            ...base.theme?.extend,
            colors: {
                ...(base.theme?.extend as any)?.colors,
                "color-1": {
                    DEFAULT: "var(--color-1)",
                    foreground: "var(--color-1-foreground)",
                  },
                  "color-2": {
                    DEFAULT: "var(--color-2)",
                    foreground: "var(--color-2-foreground)",
                  },
                  "color-3": {
                    DEFAULT: "var(--color-3)",
                    foreground: "var(--color-3-foreground)",
                  },
                  
                  "color-4": {
                    DEFAULT: "var(--color-4)",
                    foreground: "var(--color-4-foreground)",
                  },
                  "color-5": {
                    DEFAULT: "var(--color-5)",
                    foreground: "var(--color-5-foreground)",
                  },
                  "color-6": {
                    DEFAULT: "var(--color-6)",
                    foreground: "var(--color-6-foreground)",
                  },
                  "color-7": {
                    DEFAULT: "var(--color-7)",
                    foreground: "var(--color-7-foreground)",
                  },
                  "color-8": {
                    DEFAULT: "var(--color-8)",
                    foreground: "var(--color-8-foreground)",
                  },
            },
        },
    },
    plugins: [
        tailwindcssAnimate, // required for dialog animations
    ],

} satisfies Config
