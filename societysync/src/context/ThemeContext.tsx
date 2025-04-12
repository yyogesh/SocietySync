import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type ThemeConfig, defaultTheme } from "../utils/theme"

type ThemeContextType = {
  theme: ThemeConfig
  setTheme: (theme: ThemeConfig) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("societyTheme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme(parsedTheme)
      } catch (error) {
        console.error("Failed to parse saved theme:", error)
      }
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("societyTheme", JSON.stringify(theme))
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
