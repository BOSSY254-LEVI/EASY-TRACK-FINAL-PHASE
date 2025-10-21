import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: 'class' | 'data-theme' | 'data-mode';
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: string[];
}

export function ThemeProvider({ children, themes = ["light", "dark", "system"], ...props }: ThemeProviderProps) {
  return <NextThemesProvider themes={themes} {...props}>{children}</NextThemesProvider>;
}
