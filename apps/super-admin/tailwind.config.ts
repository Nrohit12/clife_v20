import type { Config } from "tailwindcss"
import base from "@tesseract/theme/tailwind-base.ts"

export default {
    ...base,
    content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/**/*"],
    theme: {
        extend: {
            ...base.theme?.extend,
            colors: {
                ...(base.theme?.extend as any)?.colors,
                "bg-n-98": "#9D310A",
            },
        },
    },
} satisfies Config
