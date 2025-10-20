import type { Config } from "tailwindcss"
import { themeExtend } from "./config"

const baseConfig: Config = {
  darkMode: "class",
  theme: {
    extend: themeExtend,
  },
}

export default baseConfig


