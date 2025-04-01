
import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}

// Export the useTheme hook from next-themes
export { useTheme } from "next-themes"
