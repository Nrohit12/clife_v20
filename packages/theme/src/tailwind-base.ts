import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import { themeExtend } from "./config"

const baseConfig: Config = {
  darkMode: "class",
  theme: {
    extend: themeExtend,
  },
  plugins: [tailwindcssAnimate],
}

export default baseConfig


