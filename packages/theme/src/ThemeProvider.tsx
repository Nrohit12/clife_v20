// packages/theme/src/ThemeProvider.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react"
import {
  applyThemeJSON,
  loadTheme,
  saveTheme,
} from "./utils"
import type { ThemeJSON } from "./types"

type ThemeContextType = {
  theme: ThemeJSON | null
  mode: "light" | "dark"
  systemMode: "light" | "dark"
  setThemeFromAPI: (url: string, init?: RequestInit) => Promise<void>
  setThemeLocal: (json: ThemeJSON) => void
  setMode: (mode: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  mode: "light",
  systemMode: "light",
  setThemeFromAPI: async () => { },
  setThemeLocal: () => { },
  setMode: () => { },
})

export function ThemeProvider({
  children,
  darkClassOn = typeof document !== "undefined"
    ? document.documentElement
    : undefined,
}: {
  children: React.ReactNode
  darkClassOn?: HTMLElement
}) {
  const [theme, setTheme] = useState<ThemeJSON | null>(() => loadTheme())
  const [systemMode, setSystemMode] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  const [mode, setModeState] = useState<"light" | "dark" | "system">(() => {
    return loadTheme()?.mode ?? "system"
  })

  // update systemMode on change
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => {
      setSystemMode(media.matches ? "dark" : "light")
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const resolvedMode = mode === "system" ? systemMode : mode

  useEffect(() => {
    const el = darkClassOn ?? document.documentElement
    el.classList.toggle("dark", resolvedMode === "dark")
  }, [resolvedMode, darkClassOn])

  useEffect(() => {
    if (theme) applyThemeJSON({ ...theme, mode }, { darkClassOn })
  }, [theme, mode, darkClassOn])

  const setThemeFromAPI = useCallback(
    async (url: string, init?: RequestInit) => {
      const res = await fetch(url, init)
      if (!res.ok)
        throw new Error(`Theme fetch failed: ${res.status} ${res.statusText}`)
      const json = (await res.json()) as ThemeJSON
      applyThemeJSON(json, { darkClassOn })
      saveTheme(json)
      setTheme(json)
      if (json.mode) setModeState(json.mode)
    },
    [darkClassOn]
  )

  const setThemeLocal = useCallback(
    (json: ThemeJSON) => {
      applyThemeJSON(json, { darkClassOn })
      saveTheme(json)
      setTheme(json)
      if (json.mode) setModeState(json.mode)
    },
    [darkClassOn]
  )

  const setMode = useCallback(
    (newMode: "light" | "dark" | "system") => {
      setModeState(newMode)
      const current = loadTheme()
      const updated = {
        ...current,
        mode: newMode,
        colors: current?.colors ?? {},
      }
      applyThemeJSON(updated, { darkClassOn })
      saveTheme(updated)
      setTheme(updated)
    },
    [darkClassOn]
  )

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      mode: resolvedMode,
      systemMode,
      setThemeFromAPI,
      setThemeLocal,
      setMode,
    }),
    [theme, resolvedMode, systemMode, setThemeFromAPI, setThemeLocal, setMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
