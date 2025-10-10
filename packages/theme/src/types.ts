export type ColorHSL = `hsl(${number}, ${number}%, ${number}%)` | string
export type ColorHex = `#${string}`

export type ThemeJSON = {
  name?: string
  mode?: "light" | "dark" | "system"
  colors: {
    [key: string]: ColorHSL | ColorHex
  }
  radius?: string // e.g. "0.5rem"
}
