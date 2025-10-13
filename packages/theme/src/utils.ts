
import type { ThemeJSON } from "./types"
import { setLocalStorageItem, getLocalStorageItem } from "@clife/utils/localStorage.js"

const LOCAL_STORAGE_THEME_SECRET_KEY = import.meta.env.VITE_LOCAL_STORAGE_THEME_SECRET_KEY;

console.log("Theme secret key:", LOCAL_STORAGE_THEME_SECRET_KEY);

// HEX -> HSL string compatible with our CSS var style "h s% l%"
function hexToHslString(hex: string): string {
  let c = hex.replace("#", "")
  if (c.length === 3) c = c.split("").map(x => x + x).join("")
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

function toHsl(value: string): string {
  if (value.startsWith("#")) return hexToHslString(value)
  // already in "h s% l%" form
  return value
}

export function applyThemeJSON(json: ThemeJSON, opts?: { target?: HTMLElement, darkClassOn?: HTMLElement }) {
  const root = opts?.target ?? document.documentElement

  Object.entries(json.colors ?? {}).forEach(([key, val]) => {
    if (!val) return
    root.style.setProperty(`--${key}`, toHsl(val))
  })

  if (json.radius) {
    root.style.setProperty("--radius", json.radius)
  }

  // handle mode
  const darkRoot = opts?.darkClassOn ?? document.documentElement
  if (json.mode === "light") darkRoot.classList.remove("dark")
  else if (json.mode === "dark") darkRoot.classList.add("dark")
  else if (json.mode === "system") {
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    darkRoot.classList.toggle("dark", preferDark)
  }
}

export function saveTheme(json: ThemeJSON, storageKey: string) {
  setLocalStorageItem(storageKey, json, LOCAL_STORAGE_THEME_SECRET_KEY)
}

export function loadTheme(storageKey: string): ThemeJSON | null {
  const raw = getLocalStorageItem(storageKey, LOCAL_STORAGE_THEME_SECRET_KEY)
  if (!raw) return null
  try { return raw as ThemeJSON } catch { return null }
}
